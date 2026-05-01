import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
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
    // Login logic would go here
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="page-container">
      <motion.div 
        className="form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome Back</h1>
        <p className="subtitle">Log in to access your AI Dermatologist account</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
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
              autoComplete="current-password"
            />
            {errors.password && <div style={{color: "#e11d48", fontSize: "0.95em", marginTop: 4}}>{errors.password}</div>}
          </div>
          
          <div className="forgot-password">
            <a href="#/forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="submit-btn">Log In</button>
        </form>
        
        <p className="form-footer">
          Don't have an account? <Link to="/register">Register</Link>
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
        
        .forgot-password {
          text-align: right;
          margin-bottom: 1.5rem;
        }
        
        .forgot-password a {
          color: #2563eb;
          text-decoration: none;
          font-size: 0.875rem;
        }
        
        .forgot-password a:hover {
          text-decoration: underline;
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

export default Login;