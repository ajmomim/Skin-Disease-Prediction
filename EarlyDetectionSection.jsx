import React, { useState } from "react";
import QuizModal from "./QuizModal";

export default function EarlyDetectionSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="early-detection-section">
      <style>{`
        .early-detection-section { 
        padding: 10px 16px 32px; 
        }
        
        .ed-wrap { 
        max-width: 1100px; 
        margin: 0 auto; 
        border-radius: 22px; 
        overflow: hidden; 
        box-shadow: 0 10px 30px rgba(2,6,23,0.08); 
        
    }
    
        .ed-bg { 
        background: linear-gradient(90deg, rgba(238,242,255,1) 0%, rgba(238,242,255,0.95) 45%, rgba(238,242,255,0.65) 60%, rgba(238,242,255,0.2) 75%, rgba(238,242,255,0) 100%), url('/images/image_back.webp'); 
        background-position: right center; 
        background-size: cover; 
        background-repeat: no-repeat; 
        }

        .ed-content {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        align-items: center;
        min-height: 260px;
        }

        .ed-copy {
        padding: 34px 28px;
        }
        
        .ed-title { 
        margin: 0 0 10px; 
        color: #0b2d63; 
        font-weight: 900; 
        font-size: clamp(22px, 3.4vw, 36px); 
        }

        .ed-sub { 
        color: #4b5563; 
        margin: 0 0 20px; 
        }

        .ed-btn { 
        background: #ef4444; 
        color: #fff; 
        border: none; 
        padding: 24px 108px; 
        border-radius: 999px; 
        font-weight: 700; 
        cursor: pointer; 
        }

        @media 
        (max-width: 900px) 
        { .ed-content { grid-template-columns: 1fr; 
        }

        .ed-copy {
        text-align:center; 
        } }
        
      `}</style>

      <div className="ed-wrap ed-bg">
        <div className="ed-content">
          <div className="ed-copy">
            <h3 className="ed-title">Early Detection Saves Lives!</h3>
            <p className="ed-sub">Small changes can mean big problems. 7 simple questions can reveal what your skin needs to stay healthy.</p>
            <button className="ed-btn" onClick={() => setOpen(true)}>ACT NOW</button>
          </div>
        </div>
      </div>
      <QuizModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

