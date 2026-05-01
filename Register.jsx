import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      errs.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: undefined }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Registration logic would go here
    console.log('Registration form submitted:', formData);
    // In a real app, you would send this data to your backend API
  };

  return (
    <div className="page-container">
      <motion.div 
        className="form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Create an Account</h1>
        <p className="subtitle">Join AI Dermatologist to get personalized skin analysis</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div style={{color: "#e11d48", fontSize: "0.95em", marginTop: 4}}>{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div style={{color: "#e11d48", fontSize: "0.95em", marginTop: 4}}>{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
            {errors.password && <div style={{color: "#e11d48", fontSize: "0.95em", marginTop: 4}}>{errors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="8"
            />
            {errors.confirmPassword && <div style={{color: "#e11d48", fontSize: "0.95em", marginTop: 4}}>{errors.confirmPassword}</div>}
          </div>
          
          <button type="submit" className="submit-btn">Register</button>
        </form>
        
        <p className="form-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </motion.div>
      
      <style jsx>{`
        .page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
          background-color: var(--bg-color, #f0f2f5);
        }
        
        .form-container {
          background-color: white;
          border-radius: 10px;
          padding: 2.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }
        
        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #0d1a26;
        }
        
        .subtitle {
          color: #6b7280;
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }
        
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        
        input:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .submit-btn {
          width: 100%;
          padding: 0.75rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .submit-btn:hover {
          background-color: #1d4ed8;
        }
        
        .form-footer {
          margin-top: 1.5rem;
          text-align: center;
          color: #6b7280;
        }
        
        .form-footer a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        
        .form-footer a:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 640px) {
          .form-container {
            padding: 1.5rem;
          }
          
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;