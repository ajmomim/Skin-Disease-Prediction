import { Container } from '@mui/material';
import Navbar from './navbar';
import UploadCard from './UploadCard';
import ResultCard from './ResultCard';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (file) => {
    setSelectedImage(file);
  };

  const handlePrediction = async () => {
    if (!selectedImage) return alert("Please upload an image first.");

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check backend.");
    }
  };

  return (
    <>
    
      <Navbar />
      <Container>
        <UploadCard onImageUpload={handleImageUpload} />
        <button
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 20px',
            marginTop: '20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={handlePrediction}
        >
          Predict
        </button>
        <ResultCard result={result} />
      </Container>
    </>
  );
}

export default App;
