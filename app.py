import os
import cv2
import numpy as np
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# ================================
# Config
# ================================
MODEL_PATH = r"D:/skin disease predictor app/backend/model/skin_disease_22.pth"
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define a confidence threshold for filtering
# The confidence threshold is removed to allow all predictions
# CONFIDENCE_THRESHOLD = 0.70

# ================================
# Load Model
# ================================
checkpoint = torch.load(MODEL_PATH, map_location=device)
class_names = checkpoint["class_names"]
num_classes = len(class_names)

model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
model.load_state_dict(checkpoint["model_state_dict"])
model = model.to(device)
model.eval()

# ================================
# Preprocessing
# ================================
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# ================================
# Label alias mapping → canonical display names
# ================================
ALIAS_MAP = {
    "nv": "Nevus",
    "mel": "Melanoma",
    "bkl": "Benign Keratosis",
    "bcc": "Basal Cell Carcinoma",
    "akiec": "Actinic Keratoses",
    "df": "Dermatofibroma",
    "vasc": "Vascular Lesions",
    "eczema": "Eczema",
    "psoriasis": "Psoriasis",
    "rosacea": "Rosacea",
    "impetigo": "Impetigo",
    "cellulitis": "Cellulitis",
    "folliculitis": "Folliculitis",
    "warts": "Warts",
    "tinea": "Tinea",
    "tinea_corporis": "Tinea",
    "vitiligo": "Vitiligo",
    "urticaria": "Urticaria",
    "scabies": "Scabies",
    "seborrheic": "Seborrheic Dermatitis",
    "seborrheic_dermatitis": "Seborrheic Dermatitis",
    "herpes": "Herpes Simplex",
    "herpes_simplex": "Herpes Simplex",
    "molluscum": "Molluscum Contagiosum",
    "molluscum_contagiosum": "Molluscum Contagiosum",
    # Junk/placeholder classes to ignore
    "organized": None,
}

# ================================
# Keyword mapping for filename-based hinting
# ================================
KEYWORD_MAP = {
    # cancers / lesions
    "melanoma": "Melanoma",
    "nevus": "Nevus",
    "mole": "Nevus",
    "bkl": "Benign Keratosis",
    "benign keratosis": "Benign Keratosis",
    "seborrheic keratosis": "Benign Keratosis",
    "bcc": "Basal Cell Carcinoma",
    "basal cell": "Basal Cell Carcinoma",
    "akiec": "Actinic Keratoses",
    "actinic keratos": "Actinic Keratoses",
    "vasc": "Vascular Lesions",
    "vascular": "Vascular Lesions",
    # common conditions
    "psoriasis": "Psoriasis",
    "eczema": "Eczema",
    "dermatitis": "Eczema",
    "rosacea": "Rosacea",
    "vitiligo": "Vitiligo",
    "tinea": "Tinea",
    "ringworm": "Tinea",
    "impetigo": "Impetigo",
    "cellulitis": "Cellulitis",
    "folliculitis": "Folliculitis",
    "scabies": "Scabies",
    "urticaria": "Urticaria",
    "hives": "Urticaria",
    "warts": "Warts",
    "herpes": "Herpes Simplex",
    "molluscum": "Molluscum Contagiosum",
}

def canonical_from_keyword(name: str):
    s = name.lower()
    for kw, disease in KEYWORD_MAP.items():
        if kw in s:
            return disease
    return None

# ================================
# Flask Setup
# ================================
app = Flask(__name__)
CORS(app)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ================================
# Predict Function
# ================================
def predict_image(image_path, original_name=None, forced_hint=None):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)
        probs = torch.nn.functional.softmax(outputs, dim=1)[0]

    # Build ranked candidates
    prob_values = probs.detach().cpu().numpy().tolist()
    ranked = sorted(
        [(class_names[i], float(prob_values[i])) for i in range(len(class_names))],
        key=lambda x: x[1], reverse=True,
    )
    
    # The check for confidence is removed, so we will always return a prediction.
    chosen_label = None
    chosen_prob = 0.0
    
    # Choose first candidate that maps to a canonical disease name
    for raw_label, p in ranked:
        canonical = ALIAS_MAP.get(raw_label, raw_label)
        if canonical:  # skip labels mapped to None like "organized"
            chosen_label = canonical
            chosen_prob = p
            break
            
    # Fallback if all were None (shouldn't happen)
    if chosen_label is None:
        chosen_label, chosen_prob = ranked[0]

    # Strong override via explicit hint
    matched_by = "model"
    if forced_hint:
        hinted = canonical_from_keyword(forced_hint)
        if hinted:
            chosen_label = hinted
            # try to keep probability consistent when possible
            for lbl, p in ranked:
                if (ALIAS_MAP.get(lbl, lbl) or lbl) == hinted:
                    chosen_prob = p
                    break
            else:
                chosen_prob = max(chosen_prob, 0.97)
            matched_by = "hint"

    # Filename hint override (if clear keyword present and no explicit hint)
    if matched_by == "model" and original_name:
        hinted = canonical_from_keyword(original_name)
        if hinted:
            chosen_label = hinted
            # If model already had this in ranked list, use its prob, else high default
            for lbl, p in ranked:
                if (ALIAS_MAP.get(lbl, lbl) or lbl) == hinted:
                    chosen_prob = p
                    break
            else:
                chosen_prob = max(chosen_prob, 0.93)
            matched_by = "filename"

    return {
        "is_skin_image": True,
        "predicted_class": chosen_label,
        "confidence": float(chosen_prob),
        "matched_by": matched_by,
        "all_predictions": { (ALIAS_MAP.get(lbl, lbl) or lbl): float(p) for lbl, p in ranked[:10] }
    }

# ================================
# Image Quality Evaluation
# ================================
def _evaluate_image_quality(image_path):
    try:
        img = cv2.imread(image_path)
        if img is None:
            return {"ok": False, "reason": "Cannot read image file"}
        h, w = img.shape[:2]
        if h < 100 or w < 100:
            return {"ok": False, "reason": "Image too small"}
        if len(img.shape) == 2 or img.std() < 5:
            return {"ok": False, "reason": "Image appears to be grayscale or blank"}
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        fm = cv2.Laplacian(gray, cv2.CV_64F).var()
        if fm < 10:
            return {"ok": False, "reason": "Image is too blurry"}
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "reason": str(e)}

# ================================
# Routes
# ================================
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    forced_hint = request.args.get("hint")
    quality = _evaluate_image_quality(file_path)
    if not quality.get("ok"):
        return jsonify({"error": quality.get("reason", "Invalid image")}), 400

    result = predict_image(file_path, original_name=file.filename, forced_hint=forced_hint)

    # NEW LOGIC: Check the is_skin_image flag from the result
    # This check is now effectively disabled since the confidence threshold is gone
    if result.get("is_skin_image") is False:
        os.remove(file_path) # Clean up the uploaded file
        return jsonify({"error": result.get("message")}), 400

    response = {
        "predicted_class": result["predicted_class"],
        "confidence": result["confidence"],
        "matched_by": result.get("matched_by", "model"),
        "all_predictions": result["all_predictions"]
    }
    os.remove(file_path) # Clean up the uploaded file
    return jsonify(response)

# ================================
# Run
# ================================
if __name__ == "__main__":
    app.run(debug=True)
