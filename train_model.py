import torch
import torch.nn as nn
from torchvision import datasets, transforms
from torchvision.models import mobilenet_v2, MobileNet_V2_Weights
from torch.utils.data import DataLoader
import os
import warnings

# Hide user warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Paths
data_dir = os.path.join('data', 'HAM10000_images')  # Update if needed
save_path = os.path.join('model', 'skin_model.pth')

# Device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"🔧 Using device: {device}")

# Transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Load dataset
dataset = datasets.ImageFolder(data_dir, transform=transform)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

print(f"✅ Dataset size: {len(dataset)}")
print(f"✅ Classes found: {dataset.classes}")

# Model
weights = MobileNet_V2_Weights.DEFAULT
mobilenet = mobilenet_v2(weights=weights)

# Freeze feature extractor
for param in mobilenet.features.parameters():
    param.requires_grad = False

# Replace classifier
num_classes = len(dataset.classes)
mobilenet.classifier = nn.Sequential(
    nn.Dropout(0.2),
    nn.Linear(mobilenet.last_channel, num_classes)
)

mobilenet = mobilenet.to(device)

# Training
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(mobilenet.classifier.parameters(), lr=0.001)

epochs = 3
mobilenet.train()

for epoch in range(epochs):
    running_loss = 0.0
    for images, labels in dataloader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = mobilenet(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    print(f"📦 Epoch [{epoch+1}/{epochs}] - Loss: {running_loss / len(dataloader):.4f}")

# Save model
os.makedirs(os.path.dirname(save_path), exist_ok=True)
torch.save(mobilenet.state_dict(), save_path)
print(f"\n✅ Model saved successfully at: {save_path}")

# Save class names for app.py
with open('model/labels.txt', 'w') as f:
    for label in dataset.classes:
        f.write(label + '\n')