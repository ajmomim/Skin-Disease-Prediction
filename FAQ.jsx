import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  
  const [expandedItems, setExpandedItems] = useState({});
  

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  
  const faqItems = [
    {
      id: 1,
      question: 'How accurate is the AI skin disease detection?',
      answer: 'Our AI system has over 85% accuracy based on AI and clinical database validation. However, it is important to note that the scan result is not a diagnosis. For an accurate diagnosis and treatment recommendation, please consult your doctor.'
    },
    {
      id: 2,
      question: 'How do I take a good photo for analysis?',
      answer: 'For best results, take a clear, well-lit photo of the affected skin area. Make sure the area is clean and the photo is in focus. Take multiple photos if needed from different angles and distances to provide the AI with the best information.'
    },
    {
      id: 3,
      question: 'Is my data secure and private?',
      answer: 'Yes, we take data privacy very seriously. All images and personal information are encrypted and stored securely. We comply with HIPAA and GDPR regulations. Your data is never shared with third parties without your explicit consent.'
    },
    {
      id: 4,
      question: 'What skin conditions can the AI detect?',
      answer: 'Our AI can detect a wide range of skin conditions including but not limited to: acne, eczema, psoriasis, rosacea, skin cancer (including melanoma), dermatitis, fungal infections, and many other common skin disorders.'
    },
    {
      id: 5,
      question: 'How long does it take to get results?',
      answer: 'Results are typically available within 1 minute after uploading your photo. The AI analysis is performed instantly, and a detailed PDF report is generated immediately afterward.'
    },
    {
      id: 6,
      question: 'Can I use this service instead of seeing a doctor?',
      answer: 'No, this service is not a replacement for professional medical advice. It is designed to be a preliminary screening tool. Always consult with a qualified healthcare provider for proper diagnosis and treatment of any medical condition.'
    },
    {
      id: 7,
      question: 'Is there a limit to how many scans I can do?',
      answer: 'Free accounts have a limited number of scans per month. Premium subscribers have unlimited access to our AI analysis services. Check your account settings for your current usage and limits.'
    },
    {
      id: 8,
      question: 'How do I speak with an AI consultant about my results?',
      answer: 'After receiving your analysis, you can click on the "Speak with AI Consultant" button in your results page. This will open our AI chat interface where you can ask specific questions about your results and receive detailed explanations.'
    },
  ];

  return (
    <div className="page-container">
      <motion.div 
        className="content-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Frequently Asked Questions</h1>
        <p className="subtitle">Find answers to common questions about our AI Dermatologist service</p>
        
        <div className="faq-list">
          {faqItems.map(item => (
            <motion.div 
              key={item.id} 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: item.id * 0.1 }}
            >
              <div 
                className={`faq-question ${expandedItems[item.id] ? 'active' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <h3>{item.question}</h3>
                <span className="toggle-icon">{expandedItems[item.id] ? '−' : '+'}</span>
              </div>
              
              {expandedItems[item.id] && (
                <motion.div 
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="contact-section">
          <h2>Still have questions?</h2>
          <p>Contact our support team for more information</p>
          <button className="contact-btn">Contact Support</button>
        </div>
      </motion.div>
      
      <style jsx>{`
        .page-container {
          padding: 2rem;
          background-color: var(--bg-color, #f0f2f5);
          min-height: 100vh;
        }
        
        .content-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        h1 {
          font-size: 2.5rem;
          color: #0d1a26;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .subtitle {
          color: #6b7280;
          text-align: center;
          margin-bottom: 3rem;
          font-size: 1.1rem;
        }
        
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .faq-item {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .faq-question {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .faq-question:hover {
          background-color: #f9fafb;
        }
        
        .faq-question.active {
          background-color: #f0f9ff;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .faq-question h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #111827;
          font-weight: 500;
        }
        
        .toggle-icon {
          font-size: 1.5rem;
          color: #2563eb;
          font-weight: bold;
        }
        
        .faq-answer {
          padding: 1.25rem;
          background-color: #f9fafb;
        }
        
        .faq-answer p {
          margin: 0;
          line-height: 1.6;
          color: #4b5563;
        }
        
        .contact-section {
          text-align: center;
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .contact-section h2 {
          font-size: 1.5rem;
          color: #0d1a26;
          margin-bottom: 0.5rem;
        }
        
        .contact-section p {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        
        .contact-btn {
          padding: 0.75rem 2rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .contact-btn:hover {
          background-color: #1d4ed8;
        }
        
        @media (max-width: 640px) {
          h1 {
            font-size: 2rem;
          }
          
          .faq-question h3 {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ;