import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingModal from "./OnboardingModal";

export default function CarouselSection() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % 2);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    // This will be handled by CSS hover state
  };

  const handleMouseLeave = () => {
    // This will be handled by CSS hover state
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .carousel-container {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 3rem 2rem;
            color: #333;
            position: relative;
            border-radius: 20px;
            margin: 2rem 0;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .carousel-content {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }

        .carousel-slide {
            display: none;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.5s ease-in-out;
        }

        .carousel-slide.active {
            display: block;
            opacity: 1;
            transform: translateX(0);
        }

        .slide-container {
            background: white;
            border-radius: 16px;
            padding: 2.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        }

        .slide-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        }

        .section-title {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #1e3a8a;
        }

        .section-subtitle {
            font-size: 1rem;
            color: #666;
            margin-bottom: 2rem;
        }

        .features-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
            gap: 2rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }

        .features-column {
            flex: 1;
            text-align: left;
        }

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            padding: 0.75rem;
            border-radius: 8px;
            transition: background-color 0.3s ease;
        }

        .feature-item:hover {
            background-color: rgba(59, 130, 246, 0.05);
        }

        .checkmark {
            color: #10b981;
            font-size: 1.5rem;
            margin-right: 0.75rem;
            font-weight: bold;
        }

        .certifications {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .cert-logo {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: bold;
            color: #374151;
            border: 2px solid #e5e7eb;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }

        .cert-logo:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .cta-button {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: bold;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0 auto;
            box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(139, 92, 246, 0.4);
        }

        .question-mark {
            font-size: 2rem;
            font-weight: bold;
        }

        .disease-lists-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
            gap: 2rem;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid #bae6fd;
        }

        .disease-column {
            flex: 1;
            text-align: left;
        }

        .disease-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            padding: 0.75rem;
            border-radius: 8px;
            transition: background-color 0.3s ease;
        }

        .disease-item:hover {
            background-color: rgba(14, 165, 233, 0.05);
        }

        .ai-info-box {
            background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
            border: 2px solid #0ea5e9;
            border-radius: 16px;
            padding: 2rem;
            margin-left: 2rem;
            text-align: center;
            max-width: 300px;
            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.15);
            transition: all 0.3s ease;
        }

        .ai-info-box:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(14, 165, 233, 0.2);
        }

        .ai-info-text {
            font-size: 1rem;
            color: #0277bd;
            margin-bottom: 1rem;
            font-weight: 500;
        }

        .brain-icon {
            width: 60px;
            height: 60px;
            background-color: white;
            border: 2px solid #0277bd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            font-size: 1.5rem;
            color: #0277bd;
        }

        .try-now-button {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 1.5rem auto;
            display: block;
            box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
        }

        .try-now-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(220, 38, 38, 0.4);
        }

        .tip-section {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
            color: #f59e0b;
            font-size: 0.9rem;
        }

        .tip-icon {
            background-color: #f59e0b;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
        }

        .pagination-dots {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #d1d5db;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .dot.active {
            background-color: #3b82f6;
            position: relative;
        }

        .dot.active::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border: 2px solid #3b82f6;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: pulse 5s linear infinite;
        }

        @keyframes pulse {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }

        .signup-section {
            margin: 2rem 0;
        }

        .signup-button {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            border: none;
            border-radius: 16px;
            padding: 1.5rem 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            display: block;
            box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
        }

        .signup-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
        }

        .signup-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .signup-text {
            text-align: left;
        }

        .signup-title {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .signup-subtitle {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .phone-illustration {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .phone-icon {
            font-size: 2rem;
            margin-right: 0.5rem;
        }

        .star-icon {
            font-size: 1.5rem;
            position: absolute;
            top: -10px;
            right: -5px;
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 2rem;
          }
          
          .features-container {
            flex-direction: column;
            gap: 1rem;
          }
          
          .certifications {
            flex-direction: column;
            gap: 1rem;
          }
          
          .cta-button {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .disease-lists-container {
            flex-direction: column;
            gap: 2rem;
          }
          
          .ai-info-box {
            margin-left: 0;
            max-width: 100%;
          }
          
          .try-now-button {
            padding: 1rem 2rem;
            font-size: 1.2rem;
          }
          
          .tip-section {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
          
          .signup-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .signup-text {
            text-align: center;
          }
        }
      `}</style>
      
      <div className="carousel-content">
        {/* Slide 1: Why should you use AI Dermatologist? */}
        <div className={`carousel-slide ${activeSlide === 0 ? 'active' : ''}`}>
          <div className="slide-container">
            <h2 className="section-title">Why should you use AI Dermatologist?</h2>
            <p className="section-subtitle">Developed with dermatologists and powered by artificial intelligence.</p>
            
            <div className="features-container">
              <div className="features-column">
                <div className="feature-item">
                  <span className="checkmark">✓</span>
                  <span>Detects 58+ skin diseases, including melanoma and skin cancer</span>
                </div>
                <div className="feature-item">
                  <span className="checkmark">✓</span>
                  <span>Over 97% accuracy, based on AI and clinical database</span>
                </div>
                <div className="feature-item">
                  <span className="checkmark">✓</span>
                  <span>Result within 1 minute</span>
                </div>
              </div>
              
              <div className="features-column">
                <div className="feature-item">
                  <span className="checkmark">✓</span>
                  <span>Enables instant at-home screening</span>
                </div>
                
              </div>
            </div>
            
            <div className="certifications">
              <div className="cert-logo">CE</div>
              <div className="cert-logo">ISO 13485 LL-C (Certification)</div>
            </div>
            
            {/* Sign up section */}
            <div className="signup-section">
              <button className="signup-button" onClick={() => navigate('/register')}>
                <div className="signup-content">
                  <div className="signup-text">
                    <div className="signup-title">Sign up, get more!</div>
                    <div className="signup-subtitle">Fast checkout • Reports • Results history</div>
                  </div>
                  <div className="phone-illustration">
                    <div className="phone-icon">📱</div>
                    <div className="star-icon">⭐</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2: What do you know in 1 minute? */}
        <div className={`carousel-slide ${activeSlide === 1 ? 'active' : ''}`}>
          <div className="slide-container">
            <h2 className="section-title">What do you know in 1 minute?</h2>
            <p className="section-subtitle">Risks Detection and Assessment of more than 58 diseases:</p>
            
            <div className="disease-lists-container">
              <div className="disease-column">
                <div className="disease-item">
                  <span className="checkmark">✓</span>
                  <span>Skin cancer (melanoma, BKK, BCC, etc.)</span>
                </div>
                <div className="disease-item">
                  <span className="checkmark">✓</span>
                  <span>Precancerous lesions (blue and dysplastic nevus, etc.)</span>
                </div>
                <div className="disease-item">
                  <span className="checkmark">✓</span>
                  <span>6 types of acne</span>
                </div>
              </div>
              
              <div className="disease-column">
                <div className="disease-item">
                  <span className="checkmark">✓</span>
                  <span>Benign formations (moles, angeoma, dermatofibroma, etc.)</span>
                </div>
                <div className="disease-item">
                  <span className="checkmark">✓</span>
                  <span>Papilloma virus (warts, papillomas, mollusks, etc.)</span>
                </div>
              </div>
              
              <div className="ai-info-box">
                <p className="ai-info-text">AI Dermatologist is based on Artificial Intelligence technologies</p>
                <div className="brain-icon">🧠</div>
              </div>
            </div>
            
            <div className="tip-section">
              <div className="tip-icon">i</div>
              <span>Tip: For more accurate results, upload 3 high-quality photos so the AI can thoroughly analyze the affected skin area.</span>
            </div>
            
            <button className="try-now-button" onClick={() => setShowOnboarding(true)}>
              TRY NOW!
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          <div 
            className={`dot ${activeSlide === 0 ? 'active' : ''}`}
            onClick={() => handleDotClick(0)}
          ></div>
          <div 
            className={`dot ${activeSlide === 1 ? 'active' : ''}`}
            onClick={() => handleDotClick(1)}
          ></div>
        </div>
      </div>
      {showOnboarding && (
        <OnboardingModal
          open={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onGotIt={() => {
            setShowOnboarding(false);
            const el = document.getElementById('upload-section');
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />
      )}
    </div>
  );
}