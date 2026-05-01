import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Divider,
  Tooltip,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoIcon from "@mui/icons-material/Info";
import { DISEASE_INFO } from "../data/diseaseInfo";

const API_URL = "http://127.0.0.1:5000/predict";

export default function PredictionPage({ history, pushHistory, setHistory }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const lastInputRef = useRef("none");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: "", type: "info" });
  const [hint, setHint] = useState("");

  const onCameraShot = (dataUrl) => {
    lastInputRef.current = "camera";
    setFile(dataUrl);
    setPreview(dataUrl);
    setResult(null);
  };

  const onGalleryPick = (pickedFile) => {
    lastInputRef.current = "gallery";
    setFile(pickedFile);
    setPreview(URL.createObjectURL(pickedFile));
    setResult(null);
  };

  const dataUrlToBlob = async (dataUrl) => {
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const doPredict = async () => {
    try {
      if (!file) {
        setToast({
          open: true,
          msg: "Please capture or select an image first.",
          type: "warning",
        });
        return;
      }
      setLoading(true);
      setResult(null);

      const form = new FormData();
      if (typeof file === "string" && file.startsWith("data:image")) {
        const blob = await dataUrlToBlob(file);
        form.append("file", blob, "camera.jpg");
      } else {
        form.append("file", file);
      }

      const url = hint ? `${API_URL}?hint=${encodeURIComponent(hint)}` : API_URL;
      const resp = await fetch(url, { method: "POST", body: form });

      if (!resp.ok) {
        const errorData = await resp.json();
        if (errorData && errorData.error) {
          throw new Error(errorData.error);
        } else {
          throw new Error("Prediction failed with a server error.");
        }
      }

      const data = await resp.json();
      setResult(data);

      pushHistory({
        id: Date.now(),
        preview: preview,
        result: data,
        source: lastInputRef.current,
        at: new Date().toISOString(),
      });

      setToast({ open: true, msg: "Prediction ready!", type: "success" });
    } catch (e) {
      setToast({
        open: true,
        msg: e.message || "Prediction error",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    lastInputRef.current = "none";
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" fontWeight={800} gutterBottom>
        Skin Disease Predictor
      </Typography>
      <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
        Upload a clear skin image to get an instant AI-powered prediction and health advice.
      </Typography>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "#f8e4e4",
          boxShadow: "0 4px 32px #0002",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2 }}>
          <Tooltip title="Capture from camera">
            <Button
              variant="outlined"
              startIcon={<CameraAltIcon />}
              onClick={() => document.getElementById("camera-input").click()}
            >
              Camera
            </Button>
          </Tooltip>
          <input
            id="camera-input"
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                onGalleryPick(e.target.files[0]);
              }
            }}
          />
          <Tooltip title="Pick from gallery">
            <Button
              variant="outlined"
              startIcon={<ImageIcon />}
              onClick={() => document.getElementById("gallery-input").click()}
            >
              Gallery
            </Button>
          </Tooltip>
          <input
            id="gallery-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                onGalleryPick(e.target.files[0]);
              }
            }}
          />
          <Tooltip title="Reset">
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={resetAll}
            >
              Reset
            </Button>
          </Tooltip>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: 180,
                height: 180,
                objectFit: "cover",
                borderRadius: 16,
                boxShadow: "0 2px 16px #0002",
                marginBottom: 16,
                border: "4px solid #fff"
              }}
            />
          )}
          <Button
            variant="contained"
            size="large"
            onClick={doPredict}
            disabled={!file || loading}
            sx={{ mb: 2, minWidth: 180 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze Image"}
          </Button>
          <select
            value={hint}
            onChange={e => setHint(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 8,
              minWidth: 180,
              marginBottom: 8,
              border: "1px solid #ccc"
            }}
            aria-label="Expected disease hint"
          >
            <option value="">Expected disease (optional)</option>
            <option value="psoriasis">Psoriasis</option>
            <option value="eczema">Eczema</option>
            <option value="rosacea">Rosacea</option>
            <option value="tinea">Tinea</option>
            <option value="vitiligo">Vitiligo</option>
            <option value="impetigo">Impetigo</option>
            <option value="cellulitis">Cellulitis</option>
            <option value="folliculitis">Folliculitis</option>
            <option value="urticaria">Urticaria</option>
            <option value="warts">Warts</option>
            <option value="herpes">Herpes</option>
            <option value="molluscum">Molluscum</option>
            <option value="akiec">Actinic Keratoses</option>
            <option value="bkl">Benign Keratosis</option>
            <option value="bcc">Basal Cell Carcinoma</option>
            <option value="mel">Melanoma</option>
            <option value="nv">Nevus</option>
            <option value="vasc">Vascular Lesions</option>
          </select>
        </Box>
        {result && (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 2, background: "#fff" }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              AI Analysis
            </Typography>
            <Chip
              label={result.predicted_class}
              color="primary"
              sx={{ fontWeight: 700, mb: 1 }}
            />
            <Typography sx={{ mb: 1 }}>
              Confidence: <b>{(result.confidence * 100).toFixed(2)}%</b>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              About this condition
            </Typography>
            <Typography sx={{ mb: 1 }}>
              {DISEASE_INFO[result.predicted_class]?.description || "No description available."}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Common symptoms:</b> {DISEASE_INFO[result.predicted_class]?.symptoms?.join(", ") || "N/A"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Risk factors:</b> {DISEASE_INFO[result.predicted_class]?.risk_factors?.join(", ") || "N/A"}
            </Typography>
          </Paper>
        )}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Paper>
      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.type} variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}