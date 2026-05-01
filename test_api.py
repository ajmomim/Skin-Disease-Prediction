import requests

url = 'http://127.0.0.1:5000/predict'
file_path = 'app.py'  # Use a real image file in practice

with open(file_path, 'rb') as f:
    files = {'image': f}
    response = requests.post(url, files=files)
    print('Status code:', response.status_code)
    print('Response:', response.json()) 