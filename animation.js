import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { motion } from "framer-motion";

export default function App() {
  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <>
      {/* ======== HEADER WITH VIDEO ======== */}
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src="/videos/skin-bg.mp4" type="video/mp4" />
        </video>

        {/* Glassmorphism Overlay */}
        <Box
          sx={{
            zIndex: 1,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 2, color: "#fff" }}
          >
            AI Skin Disease Detection
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: "#eee" }}>
            Detect skin conditions instantly using our advanced AI technology —
            fast, accurate, and easy to use.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<PlayCircleIcon />}
            sx={{
              backgroundColor: "#d46cf4",
              "&:hover": { backgroundColor: "#b54fd1" },
              px: 4,
              py: 1,
              borderRadius: "25px",
              fontWeight: "bold",
            }}
          >
            GET STARTED
          </Button>
        </Box>
      </Box>

      {/* ======== ABOUT & HOW TO USE ======== */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            backgroundColor: "#1e1e1e",
            color: "#fff",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 2, color: "#d46cf4" }}
          >
            About This Website
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "800px", mx: "auto", mb: 3 }}
          >
            Our AI Skin Disease Predictor helps you quickly detect potential
            skin conditions from a photo. It uses a deep learning model trained
            on thousands of images for high accuracy. This tool is designed for
            educational and informational purposes and should not replace
            professional medical advice.
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2, color: "#d46cf4" }}
          >
            How to Use
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: "700px",
              mx: "auto",
              textAlign: "left",
            }}
          >
            {[
              "Click Camera to take a live photo or Gallery to upload an existing image.",
              "Make sure the skin area is clear and well-lit.",
              "Click Analyze Image to get an AI prediction.",
              "View the results and read about the predicted condition.",
              "If unsure, consult a certified dermatologist.",
            ].map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={stepVariants}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                    borderRadius: "10px",
                    fontSize: "1rem",
                  }}
                >
                  {index + 1}️⃣ {step}
                </Paper>
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
