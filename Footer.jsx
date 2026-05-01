import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css"; 
import TermsOfUse from "./pages/termofuse";

const Footer = () => {
  return (
    <footer>
      {/* Wave Design */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z" fill="#6c2bd9"></path>
        </svg>
      </div>
      

      <div className="footer-container">
        {/* Brand */}
        <div>
          <h3>AI Dermatologist</h3>
          <p>
            AI Dermatologist is an innovative prediagnostic app helping you monitor your skin health and detect any unusual or alerting skin conditions.
          </p>

          <div className="social-icons">
            <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
          </div>
        </div>

        
        <div>
          <h3>Products</h3>
          <ul>
            <li><Link to="/skin-disease-detection">Skin Disease Detection</Link></li>
            <li><Link to="/DiseaseDosDonts">Do's and Dont's</Link></li>
            <li><Link to="/mri-support">treatment</Link></li>
            <li><Link to="/ai-reports">result</Link></li>
          </ul>
        </div>

        
        <div>
          <h3>Useful Links</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/diseases-dictionary">Diseases dictionary</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/TermsOfUse">Terms of use</Link></li>          </ul>
        </div>

      
        <div>
          <h3>Contact</h3>
          
          <ul>
            <li>
              <a href="mailto:dermoai@gmail.com" className="contact-link">
                <FaEnvelope /> support@ai-derm.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className="contact-link">
                <FaPhone /> +91 98765 43210
              </a>
            </li>
      
            <li>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FaWhatsapp /> WhatsApp
              </a>
            </li>
            <li className="contact-link">
              📍 Mumbai, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar">AI Dermatologist | All Rights Reserved. Copyright © 2025</div>
    </footer>
  );
};

export default Footer;