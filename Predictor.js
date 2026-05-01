// src/components/Predictor.js
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function Predictor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setPrediction(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading file!");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Skin Disease Predictor
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {prediction && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Prediction: {prediction.result || JSON.stringify(prediction)}
          </Typography>
        )}
      </CardContent>
      <CardActions>r
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading || !selectedFile}
        >
          Predict
        </Button>
      </CardActions>
    </Card>
  );
}
