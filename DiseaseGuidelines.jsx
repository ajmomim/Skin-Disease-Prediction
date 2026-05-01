// src/components/DiseaseInfo.js
import React from "react";
import { motion } from "framer-motion";
import "./DiseaseInfo.css";

export default function DiseaseInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}   // start right
      animate={{ opacity: 1, x: 0 }}     // slide in
      transition={{ duration: 1 }}
      className="disease-info"
    >
      <h2>Do’s & Don’ts</h2>
      <ul>
        <li><b>Do:</b> Consult a dermatologist early</li>
        <li><b>Do:</b> Keep affected area clean</li>
        <li><b>Don’t:</b> Self-medicate without advice</li>
        <li><b>Don’t:</b> Ignore warning signs</li>
      </ul>
    </motion.div>
  );
}
