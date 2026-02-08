import React from "react";
import "./ScrollStory.css";

const scrollSections = [
  {
    image: "../../../assets/1.png",
    title: "Powerful Administrative Features",
    points: [
      "Role-based access & permissions",
      "Attendance & biometric integration",
      "Academic, HR & finance modules",
      "Complete operational control",
    ],
  },
 
  {
    image: "../../asseys/2.png",
    title: "Built for Schools & Colleges",
    points: [
      "Student lifecycle management",
      "Exams, attendance & fees",
      "Parent & staff portals",
      "Academic compliance",
    ],
  },
  {
    image: "../../asseys/3.png",
    title: "Government Institutions",
    points: [
      "Secure workflows",
      "Audit-ready reporting",
      "Document management",
      "Centralized control",
    ],
  },
  {
    image: "../../asseys/4.png",
    title: "Corporate Organizations",
    points: [
      "HR & payroll automation",
      "Attendance & performance",
      "Multi-branch operations",
      "Data-driven decisions",
    ],
  },
];

const ScrollStory = () => {
  return (
    <section className="scroll-story">
      <div className="story-grid">
        {scrollSections.map((item, i) => (
          <div className="story-card" key={i}>
            <div className="story-image">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="story-content">
              <h2>{item.title}</h2>
              <ul>
                {item.points.map((p, idx) => (
                  <li key={idx}>✔ {p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollStory;
