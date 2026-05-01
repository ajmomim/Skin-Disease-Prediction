import os
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
from PIL import Image
import requests
from io import BytesIO

# Real skin disease labels (based on HAM10000 dataset)
SKIN_DISEASE_LABELS = [
    "Melanoma",
    "Melanocytic Nevus", 
    "Basal Cell Carcinoma",
    "Actinic Keratosis / Bowen's Disease",
    "Benign Keratosis",
    "Dermatofibroma",
    "Vascular Lesion"
]

def create_demo_skin_data():
    """
    Create synthetic skin disease data for demo purposes.
    In a real scenario, you would use actual skin disease images.
    """
    print("Creating synthetic skin disease data for demo...")
    
    # Generate synthetic features for each disease class
    n_samples_per_class = 100
    n_features = 64  # 8x8 image flattened
    
    X = []
    y = []
    
    for disease_id in range(len(SKIN_DISEASE_LABELS)):
        # Generate synthetic features for each disease
        # In reality, these would be actual image features
        for _ in range(n_samples_per_class):
            # Create synthetic image-like features
            features = np.random.normal(disease_id * 0.5, 1.0, n_features)
            features = np.clip(features, 0, 16)  # Scale to match our preprocessing
            
            X.append(features)
            y.append(disease_id)
    
    return np.array(X), np.array(y)

def train_skin_disease_model():
    """Train a skin disease classification model"""
    print("Training skin disease classification model...")
    
    # Create synthetic data (replace with real data in production)
    X, y = create_demo_skin_data()
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Train a Random Forest classifier
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    
    # Evaluate the model
    train_score = clf.score(X_train, y_train)
    test_score = clf.score(X_test, y_test)
    
    print(f"Training accuracy: {train_score:.3f}")
    print(f"Testing accuracy: {test_score:.3f}")
    
    # Save the model
    os.makedirs('model', exist_ok=True)
    joblib.dump(clf, 'model/skin_disease_model.pkl')
    
    # Save the labels
    joblib.dump(SKIN_DISEASE_LABELS, 'model/disease_labels.pkl')
    
    print("Skin disease model trained and saved to model/skin_disease_model.pkl")
    print("Disease labels saved to model/disease_labels.pkl")
    
    return clf, SKIN_DISEASE_LABELS

if __name__ == "__main__":
    train_skin_disease_model() 