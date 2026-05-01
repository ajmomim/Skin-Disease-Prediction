import torch

checkpoint = torch.load("skin_model.pth", map_location="cpu")
print(type(checkpoint))
print(checkpoint.keys() if isinstance(checkpoint, dict) else "Not a dict")
