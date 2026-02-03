import React from 'react';
import './Landing.css';

export default function Landing() {
  const features = [
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track performance metrics and KPIs in real-time with comprehensive dashboards'
    },
    {
      icon: '👥',
      title: 'User Management',
      description: 'Efficiently manage teams, roles, and permissions with granular control'
    },
    {
      icon: '📅',
      title: 'Schedule Management',
      description: 'Organize tasks, events, and deadlines with an intuitive calendar system'
    },
    {
      icon: '📈',
      title: 'Performance Tracking',
      description: 'Monitor employee productivity and project progress with detailed reports'
    },
    {
      icon: '🔒',
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with data encryption and compliance standards'
    },
    {
      icon: '⚙️',
      title: 'Customization',
      description: 'Tailor the system to your business needs with flexible configurations'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      company: 'TechCorp Inc.',
      image: '👩‍💼',
      quote: 'This system has transformed how we manage our team. We\'ve increased productivity by 40% in just 3 months.'
    },
    {
      name: 'Michael Chen',
      role: 'HR Director',
      company: 'Global Solutions Ltd.',
      image: '👨‍💼',
      quote: 'The user interface is intuitive and the support team is exceptional. Highly recommended!'
    },
    {
      name: 'Emma Davis',
      role: 'Project Lead',
      company: 'Innovation Studios',
      image: '👩‍💼',
      quote: 'Best administrative tool we\'ve used. It saves us hours every week on routine tasks.'
    }
  ];

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Simplify Your Administrative Management
          </h1>
          <p className="hero-subtitle">
            Streamline operations, boost productivity, and manage your business with ease
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start Free Trial</button>
            <button className="btn btn-secondary">Watch Demo</button>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration-placeholder">📱💼📊</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtitle">
            Everything you need to manage your organization efficiently
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="who-for">
        <div className="container">
          <h2 className="section-title">Who It's For</h2>
          <div className="who-for-grid">
            <div className="who-card">
              <div className="who-icon">🏢</div>
              <h3>Enterprise Organizations</h3>
              <p>Scale your operations with a robust system designed for large teams and complex workflows</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🚀</div>
              <h3>Growing Startups</h3>
              <p>Establish efficient processes from day one with flexible and affordable solutions</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🏭</div>
              <h3>Mid-Size Companies</h3>
              <p>Optimize your operations with features tailored for teams of 50-500+ employees</p>
            </div>
            <div className="who-card">
              <div className="who-icon">🌍</div>
              <h3>Remote Teams</h3>
              <p>Collaborate seamlessly across time zones with cloud-based administration tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="benefits-content">
            <div className="benefits-left">
              <div className="benefit-item">
                <h3>⚡ 50% Time Savings</h3>
                <p>Automate routine tasks and reduce administrative overhead significantly</p>
              </div>
              <div className="benefit-item">
                <h3>💰 Cost Effective</h3>
                <p>Reduce operational costs while maintaining enterprise-grade quality</p>
              </div>
              <div className="benefit-item">
                <h3>🎯 Higher Productivity</h3>
                <p>Empower teams to focus on strategic work, not administrative tasks</p>
              </div>
            </div>
            <div className="benefits-right">
              <div className="benefit-item">
                <h3>🔄 Easy Integration</h3>
                <p>Seamlessly connect with your existing tools and workflows</p>
              </div>
              <div className="benefit-item">
                <h3>📱 Mobile Access</h3>
                <p>Manage operations on-the-go with our mobile-friendly platform</p>
              </div>
              <div className="benefit-item">
                <h3>🎓 Expert Support</h3>
                <p>24/7 dedicated support and comprehensive training resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.image}</div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p className="role">{testimonial.role}</p>
                    <p className="company">{testimonial.company}</p>
                  </div>
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Operations?</h2>
          <p>Join hundreds of companies already using our platform to streamline their administration</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large">Get Started Today</button>
            <button className="btn btn-secondary btn-large">Schedule a Demo</button>
          </div>
          <p className="cta-note">✓ 14-day free trial • No credit card required • Full feature access</p>
        </div>
      </section>
    </div>
  );
}
