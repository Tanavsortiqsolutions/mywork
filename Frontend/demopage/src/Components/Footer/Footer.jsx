import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <Link to="/" className="footer-logo">
                <span className="logo-icon">📊</span>
                <span className="logo-text">AdminPro</span>
              </Link>
              <p className="footer-description">
                Simplifying administrative management for businesses of all sizes. Transform your operations with our powerful platform.
              </p> 
              <div className="social-links">
                <a href="#" className="social-icon" title="Facebook">f</a>
                <a href="#" className="social-icon" title="Twitter">𝕏</a>
                <a href="#" className="social-icon" title="LinkedIn">in</a>
                <a href="#" className="social-icon" title="Instagram">📷</a>
              </div>
            </div>

            {/* Product Links */}
            <div className="footer-section">
              <h4>Product</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
                <li><a href="#updates">Updates</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h4>Company</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press Kit</a></li>
                <li><a href="#partners">Partners</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="footer-section">
              <h4>Resources</h4>
              <ul className="footer-links">
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#api">API Reference</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#status">System Status</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="footer-section">
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
                <li><a href="#gdpr">GDPR</a></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2026 AdminPro. All rights reserved.</p>
            <div className="footer-badges">
              <span className="badge">🔒 Secure</span>
              <span className="badge">✓ GDPR Compliant</span>
              <span className="badge">⭐ SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
