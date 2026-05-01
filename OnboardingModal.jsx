import React from 'react';

const OnboardingModal = ({ open, onClose, onGotIt }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  // --- UPDATE THE IMAGE PATHS HERE ---
  const steps = [
    {
      title: "Before you start - learn",
      description: "How to make a suitable photo",
      image: "/images/onboarding-step1.png", // Path from the public folder
      tip: "The smallest possible distance (2-4\" or 5-10 cm) for a clear frame"
    },
    {
      title: "Taking a clear photo",
      description: "Ensure good lighting and focus",
      image: "/images/onboarding-step2.png", // Path from the public folder
      tip: "Avoid shadows and blurriness for accurate analysis"
    },
    {
      title: "Upload your photos",
      description: "Upload 3 high-quality photos for best results",
      image: "/images/onboarding-step3.png", // Path from the public folder
      tip: "Multiple angles help the AI analyze thoroughly"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onGotIt();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!open) return null;

  const currentStepContent = steps[currentStep];

  return (
    <div className="onboarding-modal-overlay">
      <style>{`
        /* ... all your styles remain the same ... */
        .onboarding-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .onboarding-modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 1.4rem;
          font-weight: bold;
          color: #1e3a8a;
        }

        .modal-close-button {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #666;
        }

        .modal-image-container {
          margin: 1.5rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          background-color: #f8fafc;
          border-radius: 8px;
        }

        .modal-image {
          max-width: 100%;
          max-height: 200px;
          height: auto;
          border-radius: 8px;
        }

        .modal-description {
          font-size: 1rem;
          color: #555;
          margin-bottom: 1rem;
        }

        .modal-tip {
          font-size: 0.9rem;
          color: #777;
          margin-top: 1rem;
          background-color: #f0f9ff;
          border-left: 4px solid #3b82f6;
          padding: 0.75rem;
          border-radius: 4px;
        }

        .modal-pagination-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .modal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #d1d5db;
          transition: background-color 0.3s;
        }

        .modal-dot.active {
          background-color: #3b82f6;
        }

        .modal-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }

        .modal-button {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-button.prev {
          background: #e2e8f0;
          color: #475569;
          border: none;
        }

        .modal-button.prev:hover {
          background: #cbd5e1;
        }

        .modal-button.next {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
          border: none;
        }

        .modal-button.next:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
        }
      `}</style>
      <div className="onboarding-modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{currentStepContent.title}</h3>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <p className="modal-description">{currentStepContent.description}</p>
        
        {/* --- ADD THE <img> TAG HERE --- */}
        <div className="modal-image-container">
          <img 
            src={currentStepContent.image} 
            alt={currentStepContent.title} 
            className="modal-image" 
          />
        </div>

        <p className="modal-tip">{currentStepContent.tip}</p>

        <div className="modal-pagination-dots">
          {steps.map((_, index) => (
            <div key={index} className={`modal-dot ${currentStep === index ? 'active' : ''}`}></div>
          ))}
        </div>

        <div className="modal-buttons">
          <button 
            className="modal-button prev" 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <button className="modal-button next" onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Got It!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;