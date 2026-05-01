# export_torchscript.py
import json, torch
from torchvision import models
import torch.nn as nn

ckpt_path = "artifacts_22/mobilenetv2_22.pt"
class_json = "artifacts_22/class_names.json"

with open(class_json, "r") as f:
    CLASS_NAMES = json.load(f)
NUM_CLASSES = len(CLASS_NAMES)

model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Linear(model.last_channel, NUM_CLASSES)
model.load_state_dict(torch.load(ckpt_path, map_location="cpu"))
model.eval()

example = torch.randn(1, 3, 224, 224)
ts = torch.jit.trace(model, example)
ts.save("artifacts_22/mobilenetv2_22.ts")
print("Saved TorchScript to artifacts_22/mobilenetv2_22.ts")
