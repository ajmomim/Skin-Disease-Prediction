import os
import shutil

# Paths
BASE_DIR = r"D:\skin disease predictor app\backend\data\DermNet"
COMBINED_DIR = os.path.join(BASE_DIR, "organized")

# Mapping: DermNet folder name → Target folder name
FOLDER_MAPPING = {
    "Acne and Rosacea Photos": "rosacea",
    "Atopic Dermatitis Photos": "eczema",
    "Cellulitis Impetigo and other Bacterial Infections Photos": "cellulitis",
    "Eczema Photos": "eczema",
    "Folliculitis and other Hair Follicle Disorders": "folliculitis",
    "Herpes HPV and other STDs Photos": "herpes_simplex",
    "Impetigo Photos": "impetigo",
    "Molluscum Contagiosum Photos": "molluscum_contagiosum",
    "Psoriasis pictures Lichen Planus and related diseases": "psoriasis",
    "Rosacea Photos": "rosacea",
    "Scabies Lyme Disease and other Infestations and Bites": "scabies",
    "Seborrheic Keratoses and other Benign Tumors": "seborrheic_dermatitis",
    "Tinea Ringworm Candidiasis and other Fungal Infections": "tinea_corporis",
    "Urticaria Hives": "urticaria",
    "Vitiligo and other Pigmentary Disorders": "vitiligo",
    "Warts HPV": "warts"
}

# Function to move files
def reorganize_data(src_dir, dest_dir):
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    for folder in os.listdir(src_dir):
        src_path = os.path.join(src_dir, folder)
        if not os.path.isdir(src_path):
            continue

        # Find target name from mapping
        target_name = FOLDER_MAPPING.get(folder, None)
        if target_name is None:
            print(f"[SKIP] No mapping for: {folder}")
            continue

        dest_path = os.path.join(dest_dir, target_name)
        os.makedirs(dest_path, exist_ok=True)

        # Move files
        for file in os.listdir(src_path):
            file_path = os.path.join(src_path, file)
            if os.path.isfile(file_path):
                shutil.copy(file_path, dest_path)

        print(f"[OK] {folder} → {target_name} ({len(os.listdir(dest_path))} images)")

# Run on data folder
print("🔄 Organizing DermNet data...")
reorganize_data(BASE_DIR, COMBINED_DIR)

print("✅ Done! Dataset ready at:", COMBINED_DIR)
