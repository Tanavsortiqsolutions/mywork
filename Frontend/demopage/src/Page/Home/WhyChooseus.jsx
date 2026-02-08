import React, { useEffect, useRef, } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhyChooseUs.css";

gsap.registerPlugin(ScrollTrigger);

const storyData = [
  {
    id: "01",
    title: "Complete Institutional Control",
    desc:
      "Centralized management for academics, staff, students, finance, and daily operations with full visibility and control.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO98so3f_O8MsheVzS2_D2pQePnewaBHXOzg&s",
  },
  {
    id: "02",
    title: "All-in-One ERP Modules",
    desc:
      "Attendance, exams, HR, payroll, transport, hostel, library, admissions and more — fully integrated.",
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  },
  {
    id: "03",
    title: "Secure Role-Based Access",
    desc:
      "Dedicated dashboards for Admins, Teachers, Parents, and Students with enterprise-grade security.",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
  },
  {
    id: "04",
    title: "Future-Ready Platform",
    desc:
      "Cloud-based, scalable, mobile-friendly ERP with real-time analytics and reporting.",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
  },
];

const WhyChooseUs = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      const fromX = index % 2 === 0 ? -120 : 120;
      const rotate = index % 2 === 0 ? -4 : 4;

      gsap.fromTo(
        card,
        { opacity: 0, x: fromX, rotate },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.9,
          ease: "back.out(1.6)", // 👈 bounce feel
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="why-section">
      {/* OUTSIDE HEADING */}
      <div className="why-heading">
        <h2>
          Why <span>Choose Us</span>
        </h2>
        <p>Designed to simplify, scale, and secure your institution</p>
      </div>

      {/* STORY CARDS */}
      <div className="why-cards">
        {storyData.map((item, index) => (
          <div
            className="why-card"
            key={item.id}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="card-image">
              <img src={item.img} alt={item.title} />
            </div>

            <div className="card-content">
              <span className="card-step">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
