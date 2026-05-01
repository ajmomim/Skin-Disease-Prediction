import os
import shutil
import random

# Paths
BASE_DIR = os.path.join("data", "DermNet_split")
OUTPUT_DIR = os.path.join("data", "DermNet_split")

TRAIN_RATIO = 0.8  # 80% train, 20% val
IMAGE_EXTS = [".jpg", ".jpeg", ".png"]

def split_dataset():
    if not os.path.exists(BASE_DIR):
        raise FileNotFoundError(f"Dataset not found at {BASE_DIR}")

    # Remove old split if exists
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)

    train_dir = os.path.join(OUTPUT_DIR, "train")
    val_dir = os.path.join(OUTPUT_DIR, "val")

    os.makedirs(train_dir, exist_ok=True)
    os.makedirs(val_dir, exist_ok=True)

    # Loop through each disease class
    for class_name in os.listdir(BASE_DIR):
        class_path = os.path.join(BASE_DIR, class_name)
        if not os.path.isdir(class_path):
            continue

        # Recursively collect all image files
        images = []
        for root, _, files in os.walk(class_path):
            for f in files:
                if f.lower().endswith(tuple(IMAGE_EXTS)):
                    images.append(os.path.join(root, f))

        if len(images) == 0:
            print(f"[⚠] Skipping {class_name} (no images)")
            continue

        random.shuffle(images)

        split_index = int(len(images) * TRAIN_RATIO)
        train_images = images[:split_index]
        val_images = images[split_index:]

        # Create class dirs
        os.makedirs(os.path.join(train_dir, class_name), exist_ok=True)
        os.makedirs(os.path.join(val_dir, class_name), exist_ok=True)

        # Copy images safely
        for img_path in train_images:
            shutil.copy(img_path,
                        os.path.join(train_dir, class_name, os.path.basename(img_path)))

        for img_path in val_images:
            shutil.copy(img_path,
                        os.path.join(val_dir, class_name, os.path.basename(img_path)))

        print(f"[✔] {class_name}: {len(train_images)} train, {len(val_images)} val")

    print(f"\n✅ Dataset split completed! Check: {OUTPUT_DIR}")


if __name__ == "__main__":
    split_dataset()
