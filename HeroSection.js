import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-header">
          <h1>AI Skin Disease Detection</h1>
          <div className="menu-icon">☰</div>
        </div>
        <p>
          Detect skin conditions instantly using AI — fast, accurate, and easy to use.
        </p>
        <div className="hero-buttons">
          <button className="btn">Get Started</button>
          <button className="btn btn-outline">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
