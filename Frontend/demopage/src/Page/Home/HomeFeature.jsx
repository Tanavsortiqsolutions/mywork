import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Feature.css";

const features = [
  {
    id: 1,
    title: "Real Time Analytics",
    description:
      "Task performance metrics and KPI in real time with comprehensive dashboards and reports",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/combo-chart--v1.png",
  },
  {
    id: 2,
    title: "User Friendly Interface",
    description:
      "Intuitive and user-friendly interface designed for easy navigation and seamless user experience",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/user.png",
  },
  {
    id: 3,
    title: "Schedule Management",
    description:
      "Efficiently manage and schedule tasks with our built-in calendar and scheduling tools",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/calendar.png",
  },
  {
    id: 4,
    title: "Performance Tracking",
    description:
      "Track and monitor task performance with detailed analytics and insights to optimize productivity",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/combo-chart.png",
  },
  {
    id: 5,
    title: "Security & Compliance",
    description:
      "Robust security measures and compliance with industry standards to protect your data",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/lock--v1.png",
  },
  {
    id: 6,
    title: "Customization & Integration",
    description:
      "Easily customize and integrate with your existing tools and workflows",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/settings.png",
  },
  {
    id: 7,
    title: "Collaboration & Communication",
    description:
      "Built-in messaging and collaboration features for teams",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/collaborator.png",
  },
  {
    id: 8,
    title: "Mobile Accessibility",
    description:
      "Access tasks anywhere with a fully mobile-responsive design",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/smartphone.png",
  },
];

const HomeFeature = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: "-50%",
        duration: 30,
        repeat: -1,
        ease: "linear",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="feature-section">
      {/* Background images */}
      <div className="bg-images">
        {[1, 2, 3].map((i) => (
          <img
            key={i}
            src={`https://source.unsplash.com/800x600/?technology,office,education&sig=${i}`}
            alt="background"
          />
        ))}
      </div>

      {/* Header */}
      <div className="feature-header">
        <h2>Powerful Features</h2>
        <p>Everything you need to run your institution smarter</p>
      </div>

      {/* Slider */}
      <div className="slider">
        <div className="slider-track" ref={trackRef}>
          {[...features, ...features].map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;
