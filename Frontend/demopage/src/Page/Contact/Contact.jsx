import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [chatOpen, setChatOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you. Get in touch with our team.</p>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your message has been sent successfully.
                </div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
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
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              
              <div className="contact-info-box">
                <div className="info-icon">📍</div>
                <h3>Address</h3>
                <p>123 Business Avenue<br />Tech City, TC 12345<br />United States</p>
              </div>

              <div className="contact-info-box">
                <div className="info-icon">📞</div>
                <h3>Phone</h3>
                <p><a href="tel:+15550000000">+1 (555) 000-0000</a></p>
                <p className="hours">Mon - Fri, 9:00 AM - 6:00 PM EST</p>
              </div>

              <div className="contact-info-box">
                <div className="info-icon">✉️</div>
                <h3>Email</h3>
                <p><a href="mailto:support@adminpro.com">support@adminpro.com</a></p>
                <p><a href="mailto:hello@adminpro.com">hello@adminpro.com</a></p>
              </div>

              <div className="contact-info-box">
                <div className="info-icon">🌐</div>
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Facebook</a>
                  <a href="#" className="social-link">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>What is the typical response time?</h4>
                <p>We typically respond to inquiries within 24 hours during business days.</p>
              </div>
              <div className="faq-item">
                <h4>Do you offer phone support?</h4>
                <p>Yes, phone support is available for enterprise customers. Contact our sales team to learn more.</p>
              </div>
              <div className="faq-item">
                <h4>Can I schedule a demo?</h4>
                <p>Absolutely! You can schedule a personalized demo on our website or by contacting our team.</p>
              </div>
              <div className="faq-item">
                <h4>What are your business hours?</h4>
                <p>We're available Monday - Friday, 9:00 AM - 6:00 PM EST. Extended hours available for enterprise.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <h2>Ready to Get Started?</h2>
        <p>Join hundreds of companies using AdminPro</p>
        <button className="cta-button">Start Free Trial</button>
      </section>
      {/* ===== Sticky Chat Button ===== */}
<div className="chat-float">
  <button className="chat-float-btn" onClick={() => setChatOpen(true)}>
    💬
  </button>
</div>

{/* ===== Chat Popup ===== */}
{chatOpen && (
  <div className="chat-popup">
    <div className="chat-header">
      <span>Live Support</span>
      <button className="chat-close" onClick={() => setChatOpen(false)}>
        ✕
      </button>
    </div>

    <div className="chat-body">
      <div className="chat-message bot">
        👋 Hi! How can we help you today?
      </div>
    </div>

    <div className="chat-footer">
      <input
        type="text"
        placeholder="Type your message..."
      />
      <button>Send</button>
    </div>
  </div>
)}

    </div>
  );
}
