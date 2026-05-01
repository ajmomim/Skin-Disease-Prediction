import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <style>{`
        body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            transition: background-color 0.3s, color 0.3s;
        }

        .app {
            background-color: #1e3a8a;
            background-image: url('/images/back.png');
            background-size: cover;
            background-position: right center;
            background-repeat: no-repeat;
            color: white;
            min-height: 50vh;
        }

        .header-container {
          background-color: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
          min-height: 80px;
          width: 100%;
        }
        
        .header-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: transparent;
            border-radius: 50%;
            transform: translate(150px, 150px);
            z-index: 1;
        }

        .header-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            position: relative;
            padding: 1.5rem 2rem;
            background-color: transparent;
            z-index: 100;
        }

        .header-logo-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;
        }

        .logo-icon {
            width: 48px;
            height: 48px;
            background-color: #f3f4f6;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .logo-circle {
            width: 32px;
            height: 32px;
            background-color: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .logo-plus {
            color: white;
            font-size: 18px;
            font-weight: bold;
        }

        .logo-camera {
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 12px;
            height: 12px;
            background-color: white;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo-text {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .logo-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            color: white;
            line-height: 1;
        }

        .logo-subtitle {
            font-size: 0.875rem;
            font-weight: 400;
            margin: 0;
            color: #d1d5db;
            line-height: 1;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .nav-link {
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: color 0.2s;
            font-size: 0.9rem;
            text-decoration: none;
        }
        
        .nav-link:hover {
            color: #93c5fd;
        }

        .header-content {
          padding: 2rem;
          max-width: 50%;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 2rem;
        }

        .header-content h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          text-align: left;
        }
        
        .process-steps {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 2rem;
        }
        
        .process-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 22%;
        }
        
        .step-icon {
            position: relative;
            width: 60px;
            height: 60px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.5rem;
            background-size: 30px 30px;
            background-position: center;
            background-repeat: no-repeat;
        }
        
        .step-1 {
            background-image: url('/images/camera-icon.svg');
            background-color: rgba(135, 206, 250, 0.3);
        }
        
        .step-2 {
            background-image: url('/images/analyze-icon.svg');
            background-color: rgba(0, 0, 139, 0.3);
        }
        
        .step-3 {
            background-image: url('/images/report-icon.svg');
            background-color: rgba(144, 238, 144, 0.3);
        }
        
        .step-4 {
            background-image: url('/images/consultant-icon.svg');
            background-color: rgba(221, 160, 221, 0.3);
        }
        
        .step-number {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 24px;
            height: 24px;
            background-color: #ff5722;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 0.8rem;
        }
        
        .step-description {
            text-align: center;
            font-size: 0.9rem;
            line-height: 1.3;
        }
        
        .skin-sample-container {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            background-color: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 8px;
            width: 100%;
        }
        
        .skin-sample {
            width: 80px;
            height: 80px;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            margin-right: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border: 2px solid rgba(255, 255, 255, 0.5);
        }
        
        .sample-image {
            width: 100%;
            height: 100%;
            background-image: url('/images/person-back.svg');
            background-size: cover;
            background-position: center;
        }
        
        .sample-description {
            flex: 1;
            font-size: 0.9rem;
            margin: 0;
        }
        
        .get-result-btn {
            background-color: #ff5722;
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 50px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-bottom: 1.5rem;
            width: auto;
            min-width: 300px;
            text-align: center;
        }
        
        .get-result-btn:hover {
            background-color: #e64a19;
        }
        
        .disclaimer {
            font-size: 0.8rem;
            opacity: 0.7;
            text-align: center;
            max-width: 80%;
            line-height: 1.4;
        }


        .header-buttons-container {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          border: 2px solid white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s, color 0.2s;
          font-family: 'Inter', sans-serif;
        }

        .action-btn:first-of-type {
          background-color: white;
          color:rgb(252, 252, 252);
        }

        .action-btn:last-of-type {
          background-color: transparent;
          color: white;
        }
        
        .action-btn:hover {
          transform: translateY(-2px) scale(1.05);
        }

        @media (max-width: 768px) {
          .header-container {
            min-height: 80px;
          }
          .header-top-bar {
            padding: 1rem;
          }
          .header-content h1 {
            font-size: clamp(1.5rem, 6vw, 2.5rem);
          }
          .header-buttons-container {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          .process-steps {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
          
          .process-step {
            width: 45%;
            margin-bottom: 1rem;
          }
          
          .get-result-btn {
            width: 100%;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
          
          .nav-links {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .process-step {
            width: 100%;
          }
          
          .skin-sample-container {
            flex-direction: column;
          }
          
          .skin-sample {
            margin-right: 0;
            margin-bottom: 1rem;
          }
          
          .sample-description {
            text-align: center;
          }
          
        }
        
      `}</style>
      
      {/* Header Component */}
      <header className="header-container">
        <div className="header-top-bar">
            <div className="header-logo-container" onClick={() => navigate('/')}>
                <div className="logo-icon">
                    <div className="logo-circle">
                        <span className="logo-plus">+</span>
                    </div>
                    <div className="logo-camera">
                        <PhotoCameraOutlinedIcon style={{ fontSize: '8px', color: '#374151' }} />
                    </div>
                </div>
                <div className="logo-text">
                    <h1 className="logo-title">AI Dermatologist</h1>
                    <p className="logo-subtitle">Skin Scanner</p>
                </div>
            </div>
            <div className="nav-links">
                <span className="nav-link" onClick={() => navigate('/faq')}>FAQ</span>
                <span className="nav-link" onClick={() => navigate('/diseases-dictionary')}>Diseases dictionary</span>
                <span className="nav-link" onClick={() => navigate('/register')}>Register</span>
                <span className="nav-link" onClick={() => navigate('/login')}>Log In</span>
            </div>
        </div>
      </header>

      <div style={{ padding: "20px 0", marginTop: "0" }}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="header-content"
        >
          <h1>Check your skin!</h1>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon step-1">
                <span className="step-number">1</span>
              </div>
              <p className="step-description">Take a photo of a skin problem</p>
            </div>
            
            <div className="process-step">
              <div className="step-icon step-2">
                <span className="step-number">2</span>
              </div>
              <p className="step-description">AI instantly analyzes your photo</p>
            </div>
            
            <div className="process-step">
              <div className="step-icon step-3">
                <span className="step-number">3</span>
              </div>
              <p className="step-description">Get a personalized PDF report</p>
            </div>
            
            
          </div>
          
          <div className="skin-sample-container">
            <div className="skin-sample">
            <img
              src="/images/skin-sample.jpg" // <-- put your image in public/images/skin-sample.jpg
              alt="Skin sample"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
            <p className="sample-description">Take a clear, well-lit photo with more details about your skin</p>
          </div>
          
          <button className="get-result-btn" onClick={() => navigate('/results')}>GET INSTANT RESULT</button>
          
          <p className="disclaimer">* The scan result is not a diagnosis. To obtain an accurate diagnosis and a recommendation for treatment - consult your doctor.</p>
        </motion.div>
      </div>


    </div>
  );
}

