import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Container,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Divider,
  Tabs,
  Tab,
  Fade,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InfoIcon from "@mui/icons-material/Info";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Navbar from "./components/Navbar";
import CameraCapture from "./components/CameraCapture";
import GalleryPicker from "./components/GalleryPicker";
import ResultPanel from "./components/ResultPanel";
import HistoryDrawer from "./components/HistoryDrawer";
import Header from "./components/Header";
import CarouselSection from "./components/CarouselSection";
import LifeSaverSection from "./components/LifeSaverSection";
import EarlyDetectionSection from "./components/EarlyDetectionSection";
import Footer from "./Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DiseasesDictionary from "./pages/DiseasesDictionary";
import FAQ from "./pages/FAQ";
import DiseasesDosAndDonts from "./pages/DiseasesDosAndDonts";
import UserReviews from "./components/UserReviews";
import WhyUsSection from "./components/WhyUsSection";
import { DISEASE_INFO } from "./data/diseaseInfo";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/predict";

const PredictionPage = ({ history, pushHistory, setHistory }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const lastInputRef = useRef("none");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: "", type: "info" });
  const [historyOpen, setHistoryOpen] = useState(false);
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
    <Container id="upload-section" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Skin Disease Predictor
      </Typography>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          borderRadius: 3,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(148, 213, 241, 1)',
            zIndex: 1,
            borderRadius: 3,
          },
          '& > *': {
            position: 'relative',
            zIndex: 2,
          }
        }}
      >
        <Fade in timeout={500}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                justifyContent: "center",
              }}
            >
              <CameraCapture onShot={onCameraShot} />
              <GalleryPicker onPick={onGalleryPick} />
              <Button
                variant="contained"
                onClick={doPredict}
                disabled={!file || loading}
              >
                {loading ? "Analyzing…" : "Analyze Image"}
              </Button>
              <select
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                style={{ padding: 8, borderRadius: 8 }}
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
              <Button
                variant="outlined"
                startIcon={<RestartAltOutlinedIcon />}
                onClick={resetAll}
              >
                Reset
              </Button>
              <Button
                variant="text"
                startIcon={<ImageOutlinedIcon />}
                component={Link}
                to="/diseases-dictionary"
              >
                View All Diseases
              </Button>
            </Box>
            <Divider sx={{ my: 3 }} />
            <ResultPanel
              preview={preview}
              result={result}
              DISEASE_INFO={DISEASE_INFO}
              loading={loading}
            />
          </Box>
        </Fade>
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
      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        items={history}
        onReAnalyze={(item) => {
          setHistoryOpen(false);
          setFile(item.preview);
          setPreview(item.preview);
          setResult(null);
          lastInputRef.current = "history";
        }}
        onClear={() => {
          localStorage.removeItem("pred_history");
          setHistory([]);
        }}
      />
    </Container>
  );
};

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: dark ? "light" : "light", primary: { main: "#1976d2" } },
        shape: { borderRadius: 16 },
      }),
    [dark]
  );
  useEffect(() => {
    localStorage.setItem("theme", dark ? "light" : "light");
  }, [dark]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => setDrawerOpen(open);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("pred_history");
    return saved ? JSON.parse(saved) : [];
  });

  const pushHistory = (item) => {
    const next = [item, ...history].slice(0, 100);
    setHistory(next);
    localStorage.setItem("pred_history", JSON.stringify(next));
  };

  const menuItems = [
    { text: "Home", icon: <PhotoCameraOutlinedIcon />, action: () => window.location.href = "/" },
    {
      text: "History",
      icon: <HistoryOutlinedIcon />,
      action: () => window.location.href = "/predict-disease"
    },
    {
      text: "Find Dermatologists",
      icon: <LocalHospitalOutlinedIcon />,
      action: () =>
        window.open(
          "https://www.google.com/maps/search/dermatologist+near+me",
          "_blank"
        ),
    },
    {
      text: "About App",
      icon: <InfoIcon />,
      action: () => alert("Skin Disease Predictor App - Detects skin issues using AI."),
    },
    {
      text: "Do’s & Don’ts",
      icon: <InfoIcon />,
      action: () => window.location.href = "/diseases-dos-and-donts",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Header />

                <CarouselSection />
                <LifeSaverSection />
                <EarlyDetectionSection />
                <Container sx={{ mt: 5 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      textAlign: "center",
                      borderRadius: 3,
                      background: "transparent",
                      boxShadow: "none"
                    }}
                  > 
                    <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
                      Get a Prediction
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                      Upload an image to get an AI-powered skin disease prediction.
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      component={Link}
                      to="/predict-disease"
                      startIcon={<PhotoCameraOutlinedIcon />}
                    >
                      Start Analysis
                    </Button>
                  </Paper>
                </Container>

                <Box sx={{ py: 6 }}>
                  <Container maxWidth="md">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "transparent", boxShadow: "none" }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                        Do’s, Don’ts, Diet & Precautions
                      </Typography>
                      <Typography sx={{ mb: 3, opacity: 0.85 }}>
                        Open our comprehensive guidelines for common skin conditions.
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/diseases-dos-and-donts"
                      >
                        View Do’s & Don’ts
                      </Button>
                    </Paper>
                  </Container>
                </Box>
                <WhyUsSection />
                <UserReviews />

                <Footer />
              </>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/diseases-dictionary" element={<DiseasesDictionary />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/diseases-dos-and-donts" element={<DiseasesDosAndDonts />} />
          <Route
            path="/predict-disease"
            element={<PredictionPage history={history} pushHistory={pushHistory} setHistory={setHistory} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
