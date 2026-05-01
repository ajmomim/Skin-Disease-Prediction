// src/components/AnalyzeBox.js
import React from "react";
import { motion } from "framer-motion";
import "./AnalyzeBox.css";

export default function AnalyzeBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}   // start bottom
      animate={{ opacity: 1, y: 0 }}     // slide up
      transition={{ duration: 1 }}
      className="analyze-box"
    >
      <h2>Analyze Your Skin</h2>
      <p>Upload an image and let AI detect possible conditions.</p>
      <div className="buttons">
        <button>Camera</button>
        <button>Gallery</button>
        <button>Analyze Image</button>
      </div>
    </motion.div>
  );
}
