import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Results = () => {
  // In a real app, this data would come from the backend API after image analysis
  const [result, setResult] = useState({
    condition: 'Eczema',
    confidence: 97.5,
    description: 'Eczema is a condition that makes your skin red and itchy. It\'s common in children but can occur at any age. Eczema is long lasting (chronic) and tends to flare periodically.',
    recommendations: [
      'Keep your skin moisturized',
      'Avoid harsh soaps and detergents',
      'Identify and avoid triggers that worsen symptoms',
      'Apply prescribed topical medications as directed'
    ],
    similarConditions: [
      { name: 'Contact Dermatitis', similarity: 85 },
      { name: 'Psoriasis', similarity: 62 },
      { name: 'Seborrheic Dermatitis', similarity: 58 }
    ]
  });

  return (
    <div className="page-container">
      <motion.div 
        className="content-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Your Skin Analysis Results</h1>
        
        <div className="disclaimer-banner">
          <p>
            <strong>Important:</strong> This is not a medical diagnosis. Please consult with a healthcare professional for proper diagnosis and treatment.
          </p>
        </div>
        
        <div className="results-grid">
          <motion.div 
            className="result-card primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="result-header">
              <h2>Detected Condition</h2>
              <div className="confidence-badge">
                {result.confidence.toFixed(1)}% confidence
              </div>
            </div>
            <h3 className="condition-name">{result.condition}</h3>
            <p className="condition-description">{result.description}</p>
            
            <div className="action-buttons">
              <button className="primary-btn">Download PDF Report</button>
              <button className="secondary-btn">Speak with AI Consultant</button>
            </div>
          </motion.div>
          
          <motion.div 
            className="result-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h2>Recommendations</h2>
            <ul className="recommendations-list">
              {result.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="result-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h2>Similar Conditions</h2>
            <div className="similar-conditions">
              {result.similarConditions.map((condition, index) => (
                <div key={index} className="similar-condition">
                  <span className="condition-name">{condition.name}</span>
                  <div className="similarity-bar-container">
                    <div 
                      className="similarity-bar" 
                      style={{ width: `${condition.similarity}%` }}
                    ></div>
                    <span className="similarity-percentage">{condition.similarity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="next-steps">
          <h2>Next Steps</h2>
          <p>
            For a complete diagnosis and personalized treatment plan, we recommend consulting with a dermatologist. 
            You can share your AI analysis results with your healthcare provider.
          </p>
          <button className="find-doctor-btn">Find a Dermatologist Near You</button>
        </div>
      </motion.div>
      
      <style jsx>{`
        .page-container {
          padding: 2rem;
          background-color: var(--bg-color, #f0f2f5);
          min-height: 100vh;
        }
        
        .content-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        h1 {
          font-size: 2.5rem;
          color: #0d1a26;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .disclaimer-banner {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 1rem;
          margin-bottom: 2rem;
          border-radius: 4px;
        }
        
        .disclaimer-banner p {
          margin: 0;
          color: #856404;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .result-card {
          background-color: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .result-card.primary {
          grid-column: 1 / -1;
          background-color: #f0f9ff;
          border: 1px solid #bae6fd;
        }
        
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .result-card h2 {
          color: #0d1a26;
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
        }
        
        .confidence-badge {
          background-color: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .condition-name {
          font-size: 1.75rem;
          color: #1e40af;
          margin: 0 0 1rem 0;
        }
        
        .condition-description {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .primary-btn, .secondary-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
        }
        
        .primary-btn {
          background-color: #2563eb;
          color: white;
          border: none;
        }
        
        .primary-btn:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
        }
        
        .secondary-btn {
          background-color: white;
          color: #2563eb;
          border: 1px solid #2563eb;
        }
        
        .secondary-btn:hover {
          background-color: #f0f9ff;
          transform: translateY(-2px);
        }
        
        .recommendations-list {
          padding-left: 1.5rem;
          margin: 0;
        }
        
        .recommendations-list li {
          margin-bottom: 0.75rem;
          color: #4b5563;
        }
        
        .recommendations-list li:last-child {
          margin-bottom: 0;
        }
        
        .similar-conditions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .similar-condition {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .similarity-bar-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 20px;
        }
        
        .similarity-bar {
          height: 8px;
          background-color: #2563eb;
          border-radius: 4px;
        }
        
        .similarity-percentage {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .next-steps {
          background-color: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        
        .next-steps h2 {
          color: #0d1a26;
          margin-bottom: 1rem;
        }
        
        .next-steps p {
          color: #4b5563;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .find-doctor-btn {
          padding: 0.75rem 1.5rem;
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .find-doctor-btn:hover {
          background-color: #059669;
        }
        
        @media (max-width: 768px) {
          .action-buttons {
            flex-direction: column;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
          
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Results;