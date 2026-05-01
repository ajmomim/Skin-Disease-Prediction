import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DiseasesDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const diseases = [
    {
      id: 1,
      name: 'Acne',
      description: 'A skin condition that occurs when hair follicles plug with oil and dead skin cells.',
      symptoms: 'Pimples, blackheads, whiteheads, and cysts.',
      treatments: 'Topical treatments, oral medications, lifestyle changes.'
    },
    {
      id: 2,
      name: 'Eczema',
      description: 'A condition that makes your skin red and itchy.',
      symptoms: 'Dry, itchy skin, redness, inflammation, rough or scaly patches.',
      treatments: 'Moisturizers, topical corticosteroids, antihistamines.'
    },
    {
      id: 3,
      name: 'Psoriasis',
      description: 'A skin disease that causes red, itchy scaly patches.',
      symptoms: 'Red patches of skin covered with thick, silvery scales, dry/cracked skin, itching.',
      treatments: 'Topical treatments, light therapy, oral or injected medications.'
    },
    {
      id: 4,
      name: 'Melanoma',
      description: 'The most serious type of skin cancer that develops in melanocytes.',
      symptoms: 'Unusual moles, changes in existing moles, dark lesions on mucous membranes.',
      treatments: 'Surgery, immunotherapy, targeted therapy, radiation therapy.'
    },
    {
      id: 5,
      name: 'Rosacea',
      description: 'A common skin condition that causes redness and visible blood vessels in your face.',
      symptoms: 'Facial redness, swollen red bumps, eye problems, enlarged nose.',
      treatments: 'Topical medications, oral antibiotics, laser therapy.'
    },
    
  ];
  
  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <motion.div 
        className="content-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Skin Diseases Dictionary</h1>
        <p className="subtitle">Learn about common skin conditions and their treatments</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a skin condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="diseases-list">
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map(disease => (
              <motion.div 
                key={disease.id} 
                className="disease-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2>{disease.name}</h2>
                <p><strong>Description:</strong> {disease.description}</p>
                <p><strong>Symptoms:</strong> {disease.symptoms}</p>
                <p><strong>Treatments:</strong> {disease.treatments}</p>
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <p>No diseases found matching your search.</p>
            </div>
          )}
        </div>
      </motion.div>
      
      <style jsx>{`
        .page-container {
          padding: 2rem;
          background-color: var(--bg-color, #f0f2f5);
          min-height: 100vh;
        }
        
        .content-container {
          max-width: 1200px;
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
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .search-container {
          margin-bottom: 2rem;
        }
        
        .search-input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .search-input:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .diseases-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .disease-card {
          background-color: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .disease-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        
        .disease-card h2 {
          color: #1e40af;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .disease-card p {
          margin-bottom: 0.75rem;
          line-height: 1.5;
          color: #4b5563;
        }
        
        .disease-card p:last-child {
          margin-bottom: 0;
        }
        
        .disease-card p strong {
          color: #111827;
        }
        
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          background-color: white;
          border-radius: 10px;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .diseases-list {
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

export default DiseasesDictionary;