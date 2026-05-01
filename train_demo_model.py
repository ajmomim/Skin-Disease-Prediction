import os
from sklearn.datasets import load_digits
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load digits dataset
digits = load_digits()
X, y = digits.data, digits.target
# Map digit classes to skin disease names for demo purposes
DISEASE_LABELS = [
    "Melanoma", "Nevus", "Basal Cell Carcinoma", "Actinic Keratosis",
    "Benign Keratosis", "Dermatofibroma", "Vascular Lesion", "Psoriasis",
    "Eczema", "Lichen Planus"
]
# For demonstration, print the mapping of digit classes to disease names
print("Digit class to disease label mapping:")
for i, label in enumerate(DISEASE_LABELS):
    print(f"{i}: {label}")

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Save the model
os.makedirs('model', exist_ok=True)
joblib.dump(clf, 'model/model.pkl')

print("Demo model trained and saved to model/model.pkl")