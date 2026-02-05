// Simple Module page showing product features with Framer Motion animations
// If you don't have framer-motion installed run: npm install framer-motion

import React from 'react';
import { motion } from 'framer-motion';
import './Module.css';

const features = [
  {
    id: 1,
    title: 'Fast Performance',
    desc: 'Optimized rendering, lazy loading and a lightweight bundle for quick load times.',
    emoji: '⚡️',
  },
  {
    id: 2,
    title: 'Secure by Design',
    desc: 'Built with authentication, role-based access and secure defaults.',
    emoji: '🔒',
  },
  {
    id: 3,
    title: 'Intuitive UI',
    desc: 'Clean components and consistent design language for fast onboarding.',
    emoji: '✨',
  },
  {
    id: 4,
    title: 'Extensible',
    desc: 'Plugin friendly and easy to extend with your custom modules.',
    emoji: '🧩',
  },
  {
    id: 5,
    title: 'Analytics',
    desc: 'Built-in dashboards and reporting for actionable metrics.',
    emoji: '📊',
  },
  {
    id: 6,
    title: '24/7 Support',
    desc: 'Responsive support to help you run smoothly at all times.',
    emoji: '🤝',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 14 } },
};

const modules = [
  { id: 1, title: 'Student Management', desc: 'Admissions, profiles, guardians and document management', emoji: '🎓' },
  { id: 2, title: 'Attendance', desc: 'Daily attendance, reports and automated alerts', emoji: '🕒' },
  { id: 3, title: 'Timetable & Scheduling', desc: 'Automated timetables and room allocations', emoji: '📅' },
  { id: 4, title: 'Fee Management', desc: 'Invoicing, payments, concessions and receipts', emoji: '💳' },
  { id: 5, title: 'Exams & Grading', desc: 'Exam scheduling, grading and transcript generation', emoji: '📝' },
  { id: 6, title: 'Library', desc: 'Catalog, lending, returns and fines', emoji: '📚' },
  { id: 7, title: 'HR & Payroll', desc: 'Staff records, payroll processing and leave management', emoji: '👥' },
  { id: 8, title: 'Transport', desc: 'Route planning, tracking and driver logs', emoji: '🚌' },
  { id: 9, title: 'Hostel Management', desc: 'Room allocation, billing and maintenance', emoji: '🏨' },
  { id: 10, title: 'Inventory', desc: 'Assets, stock and procurement workflows', emoji: '📦' },
  { id: 11, title: 'Reports & Analytics', desc: 'Custom reports, dashboards and actionable insights', emoji: '📈' },
  { id: 12, title: 'Noticeboard & Communication', desc: 'Announcements, emails and SMS notifications', emoji: '📣' },
];

export default function Module() {
  return (
    <div className="module-page">
      <header className="module-hero">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Product Features
        </motion.h1>

        <motion.p
          className="module-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Everything your team needs to build, ship and scale — all in one place.
        </motion.p>

        <motion.div
          className="module-cta"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Contact Sales</button>
        </motion.div>
      </header>

      <motion.section className="features-wrap" variants={container} initial="hidden" animate="show">
        {features.map((f) => (
          <motion.article
            key={f.id}
            className="feature-card"
            variants={item}
            whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(16,24,40,0.12)', scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="feature-icon" aria-hidden>
              <span className="emoji">{f.emoji}</span>
            </div>
            <div className="feature-content">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* Core Modules Section */}
      <section className="modules-section">
        <h2 className="section-title">Core Modules</h2>
        <p className="section-subtitle">Modules used across schools, colleges and offices</p>

        <motion.div className="modules-wrap" variants={container} initial="hidden" animate="show">
          {modules.map((m) => (
            <motion.div
              key={m.id}
              className="module-card"
              variants={item}
              whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(16,24,40,0.08)', scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="module-icon" aria-hidden>{m.emoji}</div>
              <div className="module-info">
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="module-footer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <small>© {new Date().getFullYear()} Your Company — Built for scale</small>
        </motion.div>
      </footer>
    </div>
  );
}
