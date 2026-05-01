import os
import numpy as np
import pandas as pd
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split

# Paths
DATA_DIR = '../../backend/data'
IMG_DIR_1 = os.path.join(DATA_DIR, 'HAM10000_images_part_1')
IMG_DIR_2 = os.path.join(DATA_DIR, 'HAM10000_images_part_2')
CSV_PATH = os.path.join(DATA_DIR, 'HAM10000_metadata.csv')
MODEL_PATH = '../../backend/model/skin_cancer_mobilenetv2.h5'

# Load metadata
df = pd.read_csv(CSV_PATH)
df['image_path'] = df['image_id'].apply(
    lambda x: os.path.join(IMG_DIR_1, f'{x}.jpg') if os.path.exists(os.path.join(IMG_DIR_1, f'{x}.jpg'))
    else os.path.join(IMG_DIR_2, f'{x}.jpg')
)

# Use only a subset for demo (for speed)
df = df.sample(2000, random_state=42)

# Encode labels
label_map = {label: idx for idx, label in enumerate(df['dx'].unique())}
df['label'] = df['dx'].map(label_map)
labels = list(label_map.keys())

# Load images and labels
X = []
y = []
for _, row in df.iterrows():
    img = load_img(row['image_path'], target_size=(224, 224))
    img = img_to_array(img) / 255.0
    X.append(img)
    y.append(row['label'])
X = np.array(X)
y = to_categorical(y, num_classes=len(labels))

# Split data
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Build model
base_model = MobileNetV2(weights='imagenet', include_top=False, input_tensor=Input(shape=(224,224,3)))
x = GlobalAveragePooling2D()(base_model.output)
output = Dense(len(labels), activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=output)
model.compile(optimizer=Adam(learning_rate=1e-4), loss='categorical_crossentropy', metrics=['accuracy'])

# Train model (for demo, just 2 epochs)
model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=2, batch_size=32)

# Save model and labels
os.makedirs('../../backend/model', exist_ok=True)
model.save(MODEL_PATH)
with open('../../backend/model/labels.txt', 'w') as f:
    for label in labels:
        f.write(label + '\n')

print(f"Model saved to {MODEL_PATH}")
print(f"Labels: {labels}")
