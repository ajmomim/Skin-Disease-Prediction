import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader

# Paths
DATA_DIR = "data/HAM10000_images"
MODEL_PATH = "skin_disease_model_22.pth"

# Parameters
BATCH_SIZE = 32
EPOCHS = 10
NUM_CLASSES = 22
LR = 0.001
IMG_SIZE = 224

# Transforms
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

def get_data_loaders():
    dataset = datasets.ImageFolder(DATA_DIR, transform=transform)
    print(f"Found {len(dataset)} images across {len(dataset.classes)} classes: {dataset.classes}")

    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)  # set to 0 for Windows
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)

    print("DataLoader created successfully!")
    return train_loader, val_loader, dataset.classes

def train():
    train_loader, val_loader, class_names = get_data_loaders()

    # Model
    model = models.mobilenet_v2(weights="IMAGENET1K_V1")
    num_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_features, NUM_CLASSES)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=LR)

    print("Starting training...")
    for epoch in range(EPOCHS):
        model.train()
        running_loss = 0.0
        correct, total = 0, 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        epoch_loss = running_loss / len(train_loader)
        epoch_acc = 100 * correct / total
        print(f"Epoch [{epoch+1}/{EPOCHS}], Loss: {epoch_loss:.4f}, Accuracy: {epoch_acc:.2f}%")

    torch.save({"model_state": model.state_dict(), "classes": class_names}, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

if __name__ == "__main__":
    train()
