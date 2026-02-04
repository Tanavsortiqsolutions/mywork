import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "./Contact.css";

export default function Contact() {
  const [chatOpen, setChatOpen] = useState(false);
  const formRef = useRef(null);
  const chatRef = useRef(null);

  /* ===== GSAP EFFECTS ===== */
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll("input, textarea, button"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (chatOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [chatOpen]);

  /* ===== Framer Variants ===== */
  const sectionVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="contact-container">
      {/* ===== HERO ===== */}
      <motion .section
        className="contact-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you.</p>
      </motion .section>

      {/* ===== CONTENT ===== */}
      <motion .section
        className="contact-content"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="contact-grid">
            {/* ===== FORM ===== */}
            <motion.div
              className="contact-form-section"
              ref={formRef}
              whileHover={{ scale: 1.01 }}
            >
              <h2>Send us a Message</h2>

              <form className="contact-form">
                <input placeholder="Full Name" />
                <input placeholder="Email" />
                <input placeholder="Phone" />
                <input placeholder="Subject" />
                <textarea rows="5" placeholder="Your Message" />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="submit-btn"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* ===== INFO ===== */}
            <motion.div
              className="contact-info-section"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {["📍 Address", "📞 Phone", "✉️ Email", "🌐 Social"].map(
                (item, i) => (
                  <motion.div
                    key={i}
                    className="contact-info-box"
                    whileHover={{ y: -6, scale: 1.03 }}
                  >
                    <h3>{item}</h3>
                    <p>Sample content here</p>
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== CTA ===== */}
      <motion.section
        className="contact-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Ready to Get Started?</h2>
        <motion.button whileHover={{ scale: 1.1 }} className="cta-button">
          Start Free Trial
        </motion.button>
      </motion.section>

      {/* ===== CHAT BUTTON ===== */}
      <motion.div
        className="chat-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button onClick={() => setChatOpen(true)}>💬</button>
      </motion.div>

      {/* ===== CHAT POPUP ===== */}
      {chatOpen && (
        <div className="chat-popup" ref={chatRef}>
          <div className="chat-header">
            Live Support
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>
          <div className="chat-body">
            👋 Hi! How can we help?
          </div>
          <div className="chat-footer">
            <input placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
