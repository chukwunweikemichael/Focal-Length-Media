import { useState, useEffect, useRef } from "react";
import "./index.css";

const services = [
  { icon: "🎬", title: "Media Production", desc: "Cinema-grade video production for every vision." },
  { icon: "🎤", title: "Artist Management", desc: "Elevating talent from the studio to the spotlight." },
  { icon: "📅", title: "Event & Project Mgt", desc: "Flawless execution from concept to curtain call." },
  { icon: "📺", title: "Commercials", desc: "Brand stories that stop the scroll and sell." },
  { icon: "📷", title: "Photography", desc: "Still frames that move the soul." },
  { icon: "🎭", title: "General Entertainment", desc: "Full-spectrum entertainment, no limits." },
];

const LOGO_URL = "/length.jpeg";

export default function FocalLengthMedia() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [slamActive, setSlamActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Advanced Kinetic Image tracking vectors
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const heroRef = useRef(null);

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

  const parallax = scrollY * 0.35;
  // Compute image scaling directly connected to modern scroll analytics
  const dynamicImageScale = Math.max(0.85, 1 - scrollY * 0.0008);

  return (
    <>
      {/* ENTERPRISE LOGO ASSET PRELOADER */}
      <div className={`studio-preloader ${!preloaderActive ? "is-hidden" : ""}`}>
        <img 
          src={LOGO_URL} 
          alt="FLM Loader" 
          style={{ height: "60px", objectFit: "contain", opacity: 0.85, filter: "drop-shadow(0 0 30px rgba(212,175,55,0.2))" }} 
        />
        <div className="load-bar-container">
          <div className="load-bar-fluid" style={{ width: `${loadingProgress}%` }} />
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "4px", color: "rgba(255,255,255,0.3)", marginTop: 14, textTransform: "uppercase" }}>
          Loading FLM Core Script Systems {loadingProgress}%
        </div>
      </div>

      <div className={`main-viewport-wrapper stage-drop-container ${slamActive ? "is-slammed-down" : ""}`}>
        <div className="grain" />

        {/* ULTRA-PREMIUM REFRACTIVE NAVIGATION INTERFACE */}
        <nav 
          className="nav-drop-element"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            padding: "26px 6%",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: scrollY > 60 ? "rgba(3, 4, 6, 0.96)" : "linear-gradient(to bottom, rgba(3, 4, 6, 0.85), transparent)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            borderBottom: "1px solid rgba(255,255,255,0.015)",
            boxShadow: scrollY > 60 ? "0 25px 60px rgba(0,0,0,0.95)" : "none",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <img
                src={LOGO_URL}
                alt="FLM Logo"
                style={{ 
                  height: "40px", 
                  objectFit: "contain", 
                  borderRadius: "6px",
                  boxShadow: "0 8px 25px rgba(212,175,55,0.12)"
                }}
              />
              <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,.1)" }} />
              <span style={{ fontSize: ".85rem", fontWeight: 900, letterSpacing: "6px", color: "#ffffff", fontFamily: "'Montserrat', sans-serif" }}>
                FOCAL LENGTH
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 48 }}>
            {["Services", "About", "Contact"].map(l => (
              <span 
                key={l} 
                className="nav-link"
                onClick={() => {
                  const element = document.getElementById(l.toLowerCase());
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </nav>

        {/* HERO BLOCK STAGE */}
        <section ref={heroRef} className="hero-viewport-section">
          <div className="scanline" />

          {/* Matrix Structural Grid Mapping Lines */}
          <div 
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `
                linear-gradient(rgba(212,175,55,0.008) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,175,55,0.008) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
              transform: `translateY(${parallax}px)`,
              pointerEvents: "none",
              zIndex: 1
            }} 
          />

          {/* Real-Time Operational System Track Badge */}
          <div className="cyber-status-tag" style={{ zIndex: 2 }}>
            <div className="pulse-dot" />
            <span>FLM Studio System : Live Engine</span>
          </div>

          {/* Volumetric Layered Gold Core Aura & Advanced Gyroscope Tracking container */}
          <div 
            ref={containerRef}
            className="logo-hero-container hero-logo-drop"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${mouseCoords.y}deg) rotateY(${mouseCoords.x}deg) scale(${dynamicImageScale})`,
            }}
          >
            <div className="glow-backdrop-mesh" />
            <div className="ambient-blur-ring" />
            <div className="hud-target-bracket" />
            <img
              src={LOGO_URL}
              alt="Focal Length Media Platform Core"
              className={`premium-hero-logo ${loaded ? "is-active-floating" : ""}`}
              style={{ borderRadius: "20px" }}
            />
          </div>

          {/* Luxury Metallic Composite Gradient Typography */}
          <div className={`name-enter ${loaded ? "active" : ""}`} style={{ marginBottom: 20, zIndex: 2 }}>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 9.5vw, 7.5rem)",
              letterSpacing: "0.2em",
              lineHeight: 0.85,
              background: "linear-gradient(180deg, #ffffff 35%, #dfdacb 65%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.9))"
            }}>
              FOCAL LENGTH MEDIA
            </h1>
          </div>

          {/* Sub-Tagline Field */}
          <div className={`tagline-enter ${loaded ? "active" : ""}`} style={{ marginBottom: 60, zIndex: 2 }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.8rem, 2vw, 1.15rem)",
              letterSpacing: "0.42em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
            }}>
              Your One-Stop Production Place
            </p>
          </div>

          {/* Action Trigger Interface Layout */}
          <div className={`cta-enter ${loaded ? "active" : ""}`} style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", zIndex: 2 }}>
            <button className="btn-red" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>Our Services</button>
            <button className="btn-outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Get In Touch</button>
          </div>

          {/* Luxury Scroll Track Indicator */}
          <div style={{
            position: "absolute", bottom: 36,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            opacity: 0.25,
            animation: "float 2.5s ease-in-out infinite",
            pointerEvents: "none"
          }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", fontWeight: 900, letterSpacing: 6, color: "#fff" }}>SCROLL</div>
            <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, #d4af37, transparent)" }} />
          </div>
        </section>

        <div className="red-line" />

        {/* SERVICES DISPLAY MATRICES */}
        <section id="services" style={{ padding: "160px 6% 180px", maxWidth: 1250, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 100 }}>
            <p className="section-label" style={{ marginBottom: 22 }}>What We Do</p>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.2rem)",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}>
              FULL-SPECTRUM{" "}
              <span style={{ color: "#d4af37" }}>CREATIVE</span>{" "}
              POWER
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="service-card"
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: activeCard === i ? "100%" : "50px", 
                  height: "2px",
                  background: "linear-gradient(90deg, #d4af37, transparent)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }} />
                <div style={{ fontSize: "3rem", marginBottom: 28, display: "inline-block", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.9rem", letterSpacing: "0.08em", marginBottom: 18, color: "#ffffff" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.9rem", lineHeight: 1.9, color: "rgba(255,255,255,0.42)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CORE NARRATIVE FIELD */}
        <section id="about" style={{ background: "linear-gradient(135deg, #090d14 0%, #05070a 60%, #030406 100%)", padding: "160px 6%", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.01)" }}>
          <div style={{ position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1250, margin: "0 auto", display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 450px" }}>
              <p className="section-label" style={{ marginBottom: 22 }}>Who We Are</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 6vw, 4.6rem)", letterSpacing: "0.06em", lineHeight: 1.05, marginBottom: 36 }}>
                WE TURN <span style={{ color: "#d4af37" }}>VISIONS</span> INTO VISUAL LEGACIES
              </h2>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.98rem", lineHeight: 2.2, color: "rgba(255,255,255,0.42)", maxWidth: 580 }}>
                Focal Length Media is Nigeria's premier creative production house — where storytelling meets strategy, and every frame is engineered for impact. From the studio floor to the main stage, we deliver excellence at every focal point.
              </p>
            </div>
            <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 38 }}>
              {[["🎯", "Precision", "Every project executed with intentional detail."],
                ["🔥", "Passion", "Driven by creativity, fueled by culture."],
                ["🚀", "Impact", "Results that resonate far beyond the screen."]].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                  <div style={{ width: 60, height: 60, flexShrink: 0, background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", borderRadius: 8, boxShadow: "0 10px 25px rgba(0,0,0,0.6)" }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.08em", marginBottom: 6, color: "#ffffff" }}>{title}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.88rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.85 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PIPELINE CONTACT INTERFACE */}
        <section id="contact" style={{ padding: "160px 6% 180px", maxWidth: 1250, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 100 }}>
            <p className="section-label" style={{ marginBottom: 22 }}>Let's Work</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6.5vw, 5rem)", letterSpacing: "0.08em" }}>
              READY TO <span style={{ color: "#d4af37" }}>CREATE</span>?
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 90, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 46 }}>
              {[
                { label: "Email", value: "focallengthmedia26@gmail.com", icon: "✉️" },
                { label: "Phone", value: "07067349942", icon: "📞" },
                { label: "Alternative", value: "08161880830", icon: "📱" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 26, alignItems: "center" }}>
                  <div style={{ width: 56, height: 56, flexShrink: 0, background: "rgba(255,255,255,0.005)", border: "1px solid rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", borderRadius: 8 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem", letterSpacing: "0.12em", color: "#d4af37", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.98rem", color: "#ffffff", fontWeight: 600 }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="contact-input-wrapper"><input className="contact-input" placeholder="Your Name" /></div>
              <div className="contact-input-wrapper"><input className="contact-input" placeholder="Your Email or Phone" /></div>
              <div className="contact-input-wrapper">
                <select className="contact-input" defaultValue="">
                  <option value="" disabled>Service Interest</option>
                  {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div className="contact-input-wrapper"><textarea className="contact-input" placeholder="Tell us about your project..." rows={5} style={{ resize: "none" }} /></div>
              <button className="btn-red" style={{ alignSelf: "flex-start", marginTop: 10 }}>SEND MESSAGE</button>
            </div>
          </div>
        </section>

        {/* OUTRO BRAND LINE */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.015)", padding: "60px 6%", display: "flex", flexWrap: "wrap", gap: 26, alignItems: "center", justifyContent: "space-between", background: "#020304" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={LOGO_URL} alt="FLM Studio Brand" style={{ height: 34, borderRadius: "4px", opacity: 0.9 }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: 4, color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>Your One-Stop Production Place</span>
          </div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.12)", letterSpacing: 2 }}>
            © 2026 FOCAL LENGTH MEDIA
          </div>
        </footer>
      </div>
    </>
  );
}