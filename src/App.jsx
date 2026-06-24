import { useState, useEffect, useRef } from "react";
import "./index.css";
import API_URL from "./config.js";
const services = [
  {
    icon: "🎬",
    title: "Media Production",
    desc: "Cinema-grade video production for every vision.",
  },
  {
    icon: "🎤",
    title: "Artist Management",
    desc: "Elevating talent from the studio to the spotlight.",
  },
  {
    icon: "📅",
    title: "Event & Project Mgt",
    desc: "Flawless execution from concept to curtain call.",
  },
  {
    icon: "📺",
    title: "Commercials",
    desc: "Brand stories that stop the scroll and sell.",
  },
  {
    icon: "📷",
    title: "Photography",
    desc: "Still frames that move the soul.",
  },
  {
    icon: "🎭",
    title: "General Entertainment",
    desc: "Full-spectrum entertainment, no limits.",
  },
];

const testimonials = [
  {
    quote:
      "FLM completely reshaped our brand voice. The cinematography was pure cinematic legacy.",
    author: "Tunde Kolawole",
    role: "Executive Producer",
  },
  {
    quote:
      "Unparalleled execution. They managed our global stadium tour rollout with absolute precision.",
    author: "Amara Nwosu",
    role: "Talent Director",
  },
  {
    quote:
      "The commercials they engineered stopped the scroll and skyrocketed our conversion margins.",
    author: "David Alao",
    role: "CMO, V-Tech Systems",
  },
];

const faqs = [
  {
    q: "What is your typical production turnaround window?",
    a: "Standard pipeline development captures final rendering within 14-21 operational business days depending on visual complexity frames.",
  },
  {
    q: "Do you handle cross-border entertainment deployments?",
    a: "Yes, our operational network functions globally, bringing premium Nigerian storytelling matrices anywhere on earth.",
  },
  {
    q: "Can we book modular components of your creative stack?",
    a: "Absolutely. You can select single services like raw photography or retain us for full-spectrum end-to-end creative direction.",
  },
];

const LOGO_URL = "/length.jpeg";

export default function FocalLengthMedia() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [slamActive, setSlamActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom Premium Dropdown System States Restored
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Operational Contact Backend Engine States
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // New Interactive Feature States Restored/Added
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Advanced Kinetic Image tracking vectors
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Backend Submission Handler Pipeline
  const handleSubmit = async () => {
    if (!formData.name || !formData.contact) {
      alert("Please enter your name and contact details.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setFormData({ name: "", contact: "", service: "", message: "" });
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Cannot reach server. Make sure backend is running.");
    }
    setSending(false);
  };

  useEffect(() => {
    // Stage 1: Procedural Asset Simulation Loading Pipeline
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      const exitTimer = setTimeout(() => {
        setPreloaderActive(false);
        setSlamActive(true);
      }, 400);

      const componentsTimer = setTimeout(() => {
        setLoaded(true);
      }, 600);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(componentsTimer);
      };
    }
  }, [loadingProgress]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Event handler to collapse custom dropdown if user taps anywhere outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);
  // 3D Mouse Coordinates Tracking Engine
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Compute center coordinates
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Restrict displacement angle thresholds for an expensive feel
    const rotateX = -(mouseY / height) * 22;
    const rotateY = (mouseX / width) * 22;

    setMouseCoords({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setMouseCoords({ x: 0, y: 0 });
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      // Offset scroll height calculation slightly for sticky navbar depth
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const goToAbout = () => {
    setMobileMenuOpen(false);
    window.location.href = "/about";
  };

  const goToPortfolio = () => {
    setMobileMenuOpen(false);
    window.location.href = "/portfolio";
  };

  const handleNavClick = (l) => {
    if (l === "About") {
      goToAbout();
    } else if (l === "Portfolio") {
      goToPortfolio();
    } else {
      scrollToSection(l);
    }
  };

  const parallax = scrollY * 0.35;
  const dynamicImageScale = Math.max(0.85, 1 - scrollY * 0.0008);

  return (
    <>
      {/* GLOBAL HIGH-END STYLESHEET EXTRAPOLATION INTO NEXT-GEN CORE GRAPHICS */}
      <style>{`
        *{box-sizing:border-box;}
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }

        .service-card {
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.02);
          padding: 48px 36px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-card:hover {
          background: rgba(212, 175, 55, 0.02);
          border-color: rgba(212, 175, 55, 0.2);
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
        }
        .service-card.is-active-filter {
          background: rgba(212, 175, 55, 0.04);
          border-color: #d4af37;
        }
        .contact-input-wrapper {
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .contact-input-wrapper:focus-within {
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.01);
          box-shadow: 0 0 30px rgba(212,175,55,0.05);
        }
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          padding: 20px 24px;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
        }
        .contact-input::placeholder {
          color: rgba(255,255,255,0.25);
        }
        .custom-dropdown-container {
          position: relative;
          width: 100%;
        }
        .custom-dropdown-trigger {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
        }
        .custom-dropdown-trigger:hover, .custom-dropdown-trigger.is-active {
          border-color: #d4af37;
        }
        .custom-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: #090d14;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          list-style: none;
          padding: 8px;
          margin: 0;
          z-index: 10;
          display: none;
          box-shadow: 0 30px 60px rgba(0,0,0,0.9);
        }
        .custom-dropdown-menu.is-open {
          display: block;
        }
        .custom-dropdown-item {
          padding: 14px 18px;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          border-radius: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .custom-dropdown-item:hover, .custom-dropdown-item.selected {
          background: rgba(212, 175, 55, 0.08);
          color: #ffffff;
        }
        .dropdown-chevron {
          font-size: 0.7rem;
          transition: transform 0.3s ease;
          color: rgba(255,255,255,0.3);
        }
        .dropdown-chevron.rotated {
          transform: rotate(180deg);
          color: #d4af37;
        }
        .faq-row {
          border-bottom: 1px solid rgba(255,255,255,0.03);
          padding: 28px 0;
          cursor: pointer;
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
          opacity: 0;
          color: rgba(255,255,255,0.42);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          line-height: 2;
        }
        .faq-answer.is-expanded {
          max-height: 200px;
          opacity: 1;
          margin-top: 18px;
        }
        .nav-link {
          transition: color 0.3s;
          color: rgba(255,255,255,0.5);
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 0%;
          height: 1px;
          background: #d4af37;
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: #d4af37;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .btn-red {
          background: linear-gradient(135deg, #bd2c2c 0%, #911b1b 100%);
          border: none;
          color: #ffffff;
          padding: 18px 38px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 15px 35px rgba(189,44,44,0.25);
        }
        .btn-red:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(189,44,44,0.4);
          filter: brightness(1.15);
        }
        .btn-outline {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #ffffff;
          padding: 18px 38px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-outline:hover {
          border-color: #d4af37;
          color: #d4af37;
          background: rgba(212,175,55,0.02);
          transform: translateY(-2px);
        }
        .studio-preloader {
          position: fixed;
          inset: 0;
          background: #030406;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.6s ease, visibility 0.6s;
        }
        .studio-preloader.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .load-bar-container {
          width: 220px;
          height: 2px;
          background: rgba(255,255,255,0.04);
          border-radius: 4px;
          margin-top: 32px;
          overflow: hidden;
        }
        .load-bar-fluid {
          height: 100%;
          background: linear-gradient(90deg, #911b1b, #d4af37);
          transition: width 0.1s ease;
        }
        .cyber-status-tag {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 8px 18px;
          border-radius: 30px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 32px;
        }
        .pulse-dot {
          width: 6px;
          height: 6px;
          background: #2ecc71;
          border-radius: 50%;
          box-shadow: 0 0 10px #2ecc71;
          animation: pulseGlow 2s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { opacity: 0.4; }
          100% { opacity: 1; box-shadow: 0 0 14px #2ecc71; }
        }
        .section-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 4px;
          color: #d4af37;
          text-transform: uppercase;
          display: inline-block;
          border-bottom: 1px solid rgba(212,175,55,0.3);
          padding-bottom: 6px;
        }
        .hero-viewport-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 120px 6% 80px;
          overflow: hidden;
          background: radial-gradient(circle at 50% 50%, #080d14 0%, #030406 100%);
        }

        /* Classic ornamental divider used between major sections */
        .ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 0;
        }
        .ornament-divider .line {
          height: 1px;
          width: 64px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4));
        }
        .ornament-divider .line.right {
          background: linear-gradient(90deg, rgba(212,175,55,0.4), transparent);
        }
        .ornament-divider .mark {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af37;
          box-shadow: 0 0 10px rgba(212,175,55,0.5);
        }

        /* ============ MOBILE NAV ============ */
        .mobile-menu-trigger {
          display: none;
        }
        .mobile-menu-panel {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: min(78vw, 320px);
          background: #05070a;
          border-left: 1px solid rgba(255,255,255,0.06);
          z-index: 1500;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          padding: 110px 36px 40px;
          gap: 30px;
        }
        .mobile-menu-panel.is-open {
          transform: translateX(0);
        }
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 1400;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu-overlay.is-open {
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s;
        }
        .mobile-nav-link:active,
        .mobile-nav-link:hover {
          color: #d4af37;
        }
        .mobile-menu-close {
          position: absolute;
          top: 28px;
          right: 28px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          font-size: 1.6rem;
          cursor: pointer;
          line-height: 1;
          padding: 6px;
        }

        @media (max-width: 860px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-menu-trigger {
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
          }
          .hamburger-line {
            width: 22px;
            height: 2px;
            background: #fff;
            display: block;
            transition: all 0.3s ease;
            border-radius: 1px;
          }
          .mobile-menu-trigger.is-open .hamburger-line:first-child {
            transform: translateY(3.5px) rotate(45deg);
          }
          .mobile-menu-trigger.is-open .hamburger-line:last-child {
            transform: translateY(-3.5px) rotate(-45deg);
          }
        }

        /* ============ TABLET ============ */
        @media (max-width: 1024px) {
          .hero-viewport-section {
            padding: 110px 6% 60px !important;
          }
        }

        /* ============ MOBILE ============ */
        @media (max-width: 640px) {
          .hero-viewport-section {
            padding: 100px 5% 50px !important;
            min-height: 92vh !important;
          }
          .premium-hero-logo {
            height: 120px !important;
            width: 120px !important;
          }
          .cyber-status-tag {
            font-size: 0.52rem !important;
            padding: 6px 14px !important;
            margin-bottom: 22px !important;
            text-align: center;
          }
          .btn-red, .btn-outline {
            padding: 16px 28px !important;
            font-size: 0.78rem !important;
            width: 100%;
            text-align: center;
          }
          .service-card {
            padding: 34px 24px !important;
          }
          .contact-input {
            padding: 16px 18px !important;
            font-size: 0.9rem !important;
          }
          .custom-dropdown-trigger {
            padding: 16px 18px !important;
          }
          .ornament-divider .line {
            width: 36px;
          }
        }

        @media (max-width: 400px) {
          .hero-viewport-section h1 {
            font-size: clamp(2.4rem, 11vw, 3.2rem) !important;
          }
        }

        @media (max-width: 768px) {
          section[id="contact"] > div:last-child,
          section[id="about"] > div {
            gap: 50px !important;
          }
        }
      `}</style>

      {/* ENTERPRISE LOGO ASSET PRELOADER */}
      <div
        className={`studio-preloader ${!preloaderActive ? "is-hidden" : ""}`}
      >
        <img
          src={LOGO_URL}
          alt="FLM Loader"
          style={{
            height: "60px",
            objectFit: "contain",
            opacity: 0.85,
            filter: "drop-shadow(0 0 30px rgba(212,175,55,0.2))",
          }}
        />
        <div className="load-bar-container">
          <div
            className="load-bar-fluid"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "4px",
            color: "rgba(255,255,255,0.3)",
            marginTop: 14,
            textTransform: "uppercase",
          }}
        >
          Loading FLM Core Script Systems {loadingProgress}%
        </div>
      </div>

      {/* ULTRA-PREMIUM REFRACTIVE FIXED NAVIGATION INTERFACE */}
      <nav
        className={`nav-fixed-anchor ${loaded ? "nav-fade-in" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrollY > 60 ? "18px 6%" : "26px 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            scrollY > 60
              ? "rgba(3, 4, 6, 0.95)"
              : "linear-gradient(to bottom, rgba(3, 4, 6, 0.9), transparent)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          borderBottom:
            scrollY > 60
              ? "1px solid rgba(255,255,255,0.04)"
              : "1px solid rgba(255,255,255,0.015)",
          boxShadow: scrollY > 60 ? "0 20px 50px rgba(0,0,0,0.9)" : "none",
          transition:
            "padding 0.4s ease, background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <img
            src={LOGO_URL}
            alt="FLM Logo"
            style={{
              height: "38px",
              width: "38px",
              objectFit: "cover",
              borderRadius: "6px",
              boxShadow: "0 8px 25px rgba(212,175,55,0.12)",
            }}
          />
          <div
            style={{
              width: "1px",
              height: "18px",
              background: "rgba(255,255,255,.1)",
            }}
          />
          <span
            style={{
              fontSize: ".85rem",
              fontWeight: 900,
              letterSpacing: "6px",
              color: "#ffffff",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            FOCAL LENGTH
          </span>
        </div>

        {/* Desktop Menu Links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 48 }}>
          {["Services", "About", "Portfolio", "Faq", "Contact"].map((l) => (
            <span
              key={l}
              className="nav-link"
              onClick={() => handleNavClick(l)}
              style={{
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* Hamburger Trigger */}
        <button
          className={`mobile-menu-trigger ${mobileMenuOpen ? "is-open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Mobile menu overlay + sliding panel */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "is-open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-menu-panel ${mobileMenuOpen ? "is-open" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {["Services", "About", "Portfolio", "Faq", "Contact"].map((l) => (
          <span
            key={l}
            className="mobile-nav-link"
            onClick={() => handleNavClick(l)}
          >
            {l}
          </span>
        ))}
      </div>

      {/* VIEWPORT GRAPHIC CONTENT HUB */}
      <div
        className={`main-viewport-wrapper stage-drop-container ${slamActive ? "is-slammed-down" : ""}`}
      >
        <div className="grain" />

        {/* HERO BLOCK STAGE */}
        <section ref={heroRef} className="hero-viewport-section">
          {/* Matrix Structural Grid Mapping Lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(212,175,55,0.008) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,175,55,0.008) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
              transform: `translateY(${parallax}px)`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Real-Time Operational System Track Badge */}
          <div className="cyber-status-tag" style={{ zIndex: 2 }}>
            <div className="pulse-dot" />
            <span>FLM Studio System : Live Engine</span>
          </div>

          {/* Volumetric Layered Gold Core Aura Container */}
          <div
            ref={containerRef}
            className="logo-hero-container hero-logo-drop"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              zIndex: 2,
              marginBottom: 40,
              transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
              transform: `rotateX(${mouseCoords.y}deg) rotateY(${mouseCoords.x}deg) scale(${dynamicImageScale})`,
            }}
          >
            <img
              src={LOGO_URL}
              alt="Focal Length Media Platform Core"
              className={`premium-hero-logo ${loaded ? "is-active-floating" : ""}`}
              style={{
                borderRadius: "20px",
                height: "180px",
                width: "180px",
                objectFit: "cover",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
              }}
            />
          </div>

          {/* Luxury Metallic Composite Gradient Typography */}
          <div style={{ marginBottom: 20, zIndex: 2, textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.5rem, 9.5vw, 7.5rem)",
                letterSpacing: "0.2em",
                lineHeight: 0.85,
                background:
                  "linear-gradient(180deg, #ffffff 35%, #dfdacb 65%, #d4af37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.9))",
                margin: 0,
              }}
            >
              FOCAL LENGTH MEDIA
            </h1>
          </div>

          {/* Sub-Tagline Field */}
          <div style={{ marginBottom: 60, zIndex: 2, textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.8rem, 2vw, 1.15rem)",
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Your One-Stop Production Place
            </p>
          </div>

          {/* Action Trigger Interface Layout */}
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <button
              className="btn-red"
              onClick={() => scrollToSection("services")}
            >
              Our Services
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </button>
          </div>
        </section>

        {/* SERVICES DISPLAY MATRICES */}
        <section
          id="services"
          style={{
            padding: "160px 6% 140px",
            maxWidth: 1250,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p className="section-label" style={{ marginBottom: 22 }}>
              What We Do
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.2rem)",
                letterSpacing: "0.08em",
                lineHeight: 1,
                margin: 0,
              }}
            >
              FULL-SPECTRUM <span style={{ color: "#d4af37" }}>CREATIVE</span>{" "}
              POWER
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.85rem",
                marginTop: 20,
                letterSpacing: "1px",
              }}
            >
              Click any architecture to profile individual service arrays
            </p>
          </div>

          {/* FILTER CONTROLS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-outline"
              onClick={() => setSelectedServiceFilter(null)}
              style={{
                padding: "10px 22px",
                fontSize: "0.75rem",
                borderColor:
                  selectedServiceFilter === null
                    ? "#d4af37"
                    : "rgba(255,255,255,0.1)",
              }}
            >
              Show All Vectors
            </button>
            {services.map((s) => (
              <button
                key={s.title}
                className="btn-outline"
                onClick={() => setSelectedServiceFilter(s.title)}
                style={{
                  padding: "10px 22px",
                  fontSize: "0.75rem",
                  borderColor:
                    selectedServiceFilter === s.title
                      ? "#d4af37"
                      : "rgba(255,255,255,0.05)",
                }}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
            }}
          >
            {services.map((s, i) => {
              const isHidden =
                selectedServiceFilter && selectedServiceFilter !== s.title;
              return (
                <div
                  key={i}
                  className={`service-card ${selectedServiceFilter === s.title ? "is-active-filter" : ""}`}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  onClick={() => setFormData({ ...formData, service: s.title })}
                  style={{
                    opacity: isHidden ? 0.15 : 1,
                    transform: isHidden ? "scale(0.95)" : "scale(1)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width:
                        activeCard === i || selectedServiceFilter === s.title
                          ? "100%"
                          : "50px",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, #d4af37, transparent)",
                      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: 28,
                      display: "inline-block",
                      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))",
                    }}
                  >
                    {s.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.9rem",
                      letterSpacing: "0.08em",
                      marginBottom: 18,
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.9rem",
                      lineHeight: 1.9,
                      color: "rgba(255,255,255,0.42)",
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* classic ornamental divider */}
        <div className="ornament-divider">
          <span className="line" />
          <span className="mark" />
          <span className="line right" />
        </div>

        {/* CORE NARRATIVE FIELD */}
        <section
          id="about"
          style={{
            background:
              "linear-gradient(135deg, #090d14 0%, #05070a 60%, #030406 100%)",
            padding: "160px 6%",
            position: "relative",
            overflow: "hidden",
            borderTop: "1px solid rgba(255,255,255,0.01)",
            borderBottom: "1px solid rgba(255,255,255,0.01)",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "-10%",
              top: "50%",
              transform: "translateY(-50%)",
              width: 800,
              height: 800,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div
            style={{
              maxWidth: 1250,
              margin: "0 auto",
              display: "flex",
              gap: 80,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1 1 450px" }}>
              <p className="section-label" style={{ marginBottom: 22 }}>
                Who We Are
              </p>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 4.6rem)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.05,
                  marginBottom: 36,
                  margin: 0,
                }}
              >
                WE TURN <span style={{ color: "#d4af37" }}>VISIONS</span> INTO
                VISUAL LEGACIES
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.98rem",
                  lineHeight: 2.2,
                  color: "rgba(255,255,255,0.42)",
                  maxWidth: 580,
                  margin: 0,
                }}
              >
                Focal Length Media is Nigeria's premier creative production
                house — where storytelling meets strategy, and every frame is
                engineered for impact. From the studio floor to the main stage,
                we deliver excellence at every focal point.
              </p>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginTop: 32 }}>
                <a
                  href="/about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#d4af37",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(212,175,55,0.3)",
                    paddingBottom: 4,
                  }}
                >
                  Read Full Company Profile →
                </a>
                <a
                  href="/portfolio"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                    paddingBottom: 4,
                  }}
                >
                  View Our Portfolio →
                </a>
              </div>
            </div>
            <div
              style={{
                flex: "1 1 340px",
                display: "flex",
                flexDirection: "column",
                gap: 38,
              }}
            >
              {[
                [
                  "🎯",
                  "Precision",
                  "Every project executed with intentional detail.",
                ],
                ["🔥", "Passion", "Driven by creativity, fueled by culture."],
                [
                  "🚀",
                  "Impact",
                  "Results that resonate far beyond the screen.",
                ],
              ].map(([icon, title, desc]) => (
                <div
                  key={title}
                  style={{ display: "flex", gap: 28, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      flexShrink: 0,
                      background: "rgba(212,175,55,0.03)",
                      border: "1px solid rgba(212,175,55,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      borderRadius: 8,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.4rem",
                        letterSpacing: "0.08em",
                        marginBottom: 6,
                        color: "#ffffff",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.38)",
                        lineHeight: 1.85,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIGH-END TESTIMONIALS SLIDER SECTION */}
        <section
          style={{
            padding: "120px 6%",
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p className="section-label" style={{ marginBottom: 32 }}>
            Global Co-Signs
          </p>
          <div
            style={{
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "#ffffff",
                fontStyle: "italic",
              }}
            >
              "{testimonials[activeTestimonial].quote}"
            </p>
            <h4
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.4rem",
                letterSpacing: "2px",
                color: "#d4af37",
                marginTop: 24,
                marginBottom: 4,
              }}
            >
              {testimonials[activeTestimonial].author}
            </h4>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {testimonials[activeTestimonial].role}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 40,
            }}
          >
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                style={{
                  width: idx === activeTestimonial ? "40px" : "10px",
                  height: "4px",
                  background:
                    idx === activeTestimonial
                      ? "#d4af37"
                      : "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        </section>

        {/* REFINERY FAQ ACCORDION COMPONENT MATRIX */}
        <section
          id="faq"
          style={{ padding: "100px 6% 120px", maxWidth: 850, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p className="section-label" style={{ marginBottom: 22 }}>
              Faq System
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "3rem",
                letterSpacing: "2px",
                margin: 0,
              }}
            >
              TECHNICAL ENGINE BLUEPRINTS
            </h2>
          </div>
          <div>
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="faq-row"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: expandedFaq === idx ? "#d4af37" : "#ffffff",
                      margin: 0,
                      transition: "color 0.3s",
                    }}
                  >
                    {f.q}
                  </h4>
                  <span
                    style={{
                      color:
                        expandedFaq === idx
                          ? "#d4af37"
                          : "rgba(255,255,255,0.2)",
                      transform: expandedFaq === idx ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s",
                      fontSize: "1.2rem",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  className={`faq-answer ${expandedFaq === idx ? "is-expanded" : ""}`}
                >
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PIPELINE CONTACT INTERFACE */}
        <section
          id="contact"
          style={{
            padding: "120px 6% 180px",
            maxWidth: 1250,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 100 }}>
            <p className="section-label" style={{ marginBottom: 22 }}>
              Let's Work
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3rem, 6.5vw, 5rem)",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              READY TO <span style={{ color: "#d4af37" }}>CREATE</span>?
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 90,
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 46 }}>
              {[
                {
                  label: "Email",
                  value: "focallengthmedia26@gmail.com",
                  icon: "✉️",
                },
              {
  label: "Project Inquiries, Bookings & Support",
  value: (
    <>
      <a>0706 734 9942</a>
      <br />
      <a>0816 188 0830</a>
    </>
  ),
  icon: "📞📱",
}
              ].map((c) => (
                <div
                  key={c.label}
                  style={{ display: "flex", gap: 26, alignItems: "center" }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      flexShrink: 0,
                      background: "rgba(255,255,255,0.005)",
                      border: "1px solid rgba(255,255,255,0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      borderRadius: 8,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.05rem",
                        letterSpacing: "0.12em",
                        color: "#d4af37",
                        marginBottom: 2,
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.98rem",
                        color: "#ffffff",
                        fontWeight: 600,
                      }}
                    >
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="contact-input-wrapper">
                <input
                  className="contact-input"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="contact-input-wrapper">
                <input
                  className="contact-input"
                  placeholder="Your Email or Phone"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
              </div>

              {/* RESTORED BRAND NEW CUSTOM SYSTEM DROPDOWN ENGINE */}
              <div className="custom-dropdown-container" ref={dropdownRef}>
                <div
                  className={`custom-dropdown-trigger ${dropdownOpen ? "is-active" : ""}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span
                    style={{
                      color: formData.service
                        ? "#ffffff"
                        : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {formData.service || "Service Interest"}
                  </span>
                  <span
                    className={`dropdown-chevron ${dropdownOpen ? "rotated" : ""}`}
                  >
                    ▼
                  </span>
                </div>

                <ul
                  className={`custom-dropdown-menu ${dropdownOpen ? "is-open" : ""}`}
                >
                  <li
                    className="custom-dropdown-item placeholder-option"
                    onClick={() => {
                      setFormData({ ...formData, service: "" });
                      setDropdownOpen(false);
                    }}
                  >
                    Service Interest
                  </li>
                  {services.map((s) => (
                    <li
                      key={s.title}
                      className={`custom-dropdown-item ${formData.service === s.title ? "selected" : ""}`}
                      onClick={() => {
                        setFormData({ ...formData, service: s.title });
                        setDropdownOpen(false);
                      }}
                    >
                      <span
                        style={{ marginRight: "12px", display: "inline-block" }}
                      >
                        {s.icon}
                      </span>
                      {s.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-input-wrapper">
                <textarea
                  className="contact-input"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  style={{ resize: "none" }}
                />
                {/* CHARACTER METRIC TELEMETRY COUNTER */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 16,
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    color:
                      formData.message.length > 400
                        ? "#bd2c2c"
                        : "rgba(255,255,255,0.2)",
                  }}
                >
                  {formData.message.length} chars
                </div>
              </div>

              {sent ? (
                <div
                  style={{
                    color: "#2ecc71",
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: 3,
                    marginTop: 10,
                  }}
                >
                  MESSAGE SENT ✓ WE WILL BE IN TOUCH!
                </div>
              ) : (
                <button
                  className="btn-red"
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{
                    alignSelf: "flex-start",
                    opacity: sending ? 0.6 : 1,
                    marginTop: 10,
                  }}
                >
                  {sending ? "SENDING..." : "SEND MESSAGE"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* OUTRO BRAND LINE */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.015)",
            padding: "60px 6%",
            display: "flex",
            flexWrap: "wrap",
            gap: 26,
            alignItems: "center",
            justifyContent: "space-between",
            background: "#020304",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={LOGO_URL}
              alt="FLM Studio Brand"
              style={{ height: 34, borderRadius: "4px", opacity: 0.9 }}
            />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: 4,
                color: "rgba(255,255,255,0.22)",
                textTransform: "uppercase",
              }}
            >
              Your One-Stop Production Place
            </span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a
              href="/about"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: 2,
                textDecoration: "none",
              }}
            >
              Company Profile
            </a>
            <a
              href="/portfolio"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: 2,
                textDecoration: "none",
              }}
            >
              Portfolio
            </a>
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.12)",
              letterSpacing: 2,
            }}
          >
            © 2026 FOCAL LENGTH MEDIA
          </div>
        </footer>
      </div>
    </>
  );
}