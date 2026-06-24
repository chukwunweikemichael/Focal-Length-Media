import { useState, useEffect } from "react";

const LOGO_URL = "/length.jpeg";
const DIRECTOR_1_IMG = "/team/olaniyan-olugbenga.jpg";
const DIRECTOR_2_IMG = "/team/alagbile-matthew.jpg";

const pillars = [
  { num: "01", icon: "🎥", title: "Video Production", desc: "Commercials, brand films, documentaries, event coverage." },
  { num: "02", icon: "✍️", title: "Creative Direction", desc: "Scripting, storyboarding, visual identity." },
  { num: "03", icon: "🎞️", title: "Post Production", desc: "Editing, color grading, motion graphics, sound design." },
  { num: "04", icon: "📱", title: "Digital Content", desc: "Short-form content for TikTok, Instagram & YouTube that actually gets watched." },
];

const serviceGroups = [
  {
    title: "Video Production",
    items: [
      ["Music Videos", "Concept, shoot, edit, color grade, VFX"],
      ["Commercials & Ads", "TVC, online ads, product videos, testimonials"],
      ["Branded Content", "Short films for brands"],
      ["Corporate Videos", "Company profiles, training videos, event recaps"],
      ["Documentary", "Short docs, docu-series, NGO impact stories"],
      ["Social Content", "Reels, TikTok, YouTube"],
    ],
  },
  {
    title: "Live & Event Production",
    items: [
      ["Multi-Cam Live Stream", "Concerts, conferences, church services"],
      ["Event Coverage", "Highlights, edits, full event films"],
      ["Stage & Concert Production", "LED screens, sound, lighting, directing"],
    ],
  },
  {
    title: "Pre-Production & Creative",
    items: [
      ["Concept & Script Writing", "Advert scripts and film treatments"],
      ["Casting & Talent Sourcing", "Actors, models, voice-over artists"],
      ["Location Scouting", "Permits, recce, location management"],
      ["Production Design", "Set design, art direction, props, styling"],
    ],
  },
  {
    title: "Post-Production",
    items: [
      ["Video Editing", "Narrative edits, social cuts, trailer cuts"],
      ["Color Grading", "DaVinci Resolve, look development"],
      ["Motion Graphics & Animation", "2D explainers, logo animation, VFX"],
      ["Sound Design & Mix", "Music scoring, SFX, audio cleanup"],
      ["Subtitling & Dubbing", "English, Pidgin, Yoruba, Igbo & Hausa"],
    ],
  },
  {
    title: "Photography & Design",
    items: [
      ["Commercial Photography", "Products, fashion, headshots, campaigns"],
      ["Event Photography", "Weddings, corporate concerts"],
      ["Graphic Design", "Key visuals, posters, album covers"],
      ["Brand Identity", "Logos, brand kits for artists/creators"],
    ],
  },
];

const values = [
  { num: "01", title: "Integrity", desc: "We hold the highest level of honesty, ethics and moral correctness. We will not compromise." },
  { num: "02", title: "Respect", desc: "Ensuring respect circulates between employees, customers, third parties, principles, laws, and environment." },
  { num: "03", title: "Teamwork", desc: "We work as a team with our customers and collaborate with third parties to deliver better services." },
  { num: "04", title: "Innovation", desc: "As the world evolves with technology, we improve our future and current systems continuously." },
];

const manifesto = [
  { ph: "Story First", en: "If e no get heart, we no shoot am." },
  { ph: "Deadline Na Deadline", en: "We no dey postpone excellence." },
  { ph: "We Build Our Own", en: "Client work pay bills, our work builds legacy." },
  { ph: "Focal Length To The World", en: "Global quality, rooted in Naija." },
];

const team = [
  {
    img: DIRECTOR_1_IMG,
    name: "Olaniyan Olugbenga",
    alias: "Mourinho",
    role: "Director — Operations & Administration",
    bio: "An astute and dynamic director with over 15 years of expertise overseeing music studio operations, entertainment facility management, production coordination, client relations and business administration within and outside the Nigerian entertainment industry. He has a proven track record managing high-profile music, film and commercial productions while improving operational efficiency, reducing costs and enhancing client satisfaction.",
    bio2: "He previously served as Head of Administration and Operations at KOGA Entertainment, and Head of Operations (Studios and Entertainment) at SANDBOX Ltd — a subsidiary of FILMHOUSE.",
    credentials: ["BSc & MBA, Business Administration — University of Abuja", "Member, Nigeria Institute of Management (MNIM)"],
  },
  {
    img: DIRECTOR_2_IMG,
    name: "Alagbile Matthew",
    alias: "D.ICON",
    role: "Director — Creative & Production Design",
    bio: "A pragmatic director, award-winning and highly sought-after film fixer, art director and production designer with a proven track record of delivering top-tier creative and logistical solutions for local and international film and television productions. Recognised for exceptional problem solving, a strong work ethic and a street-smart approach to transforming complex briefs into successful outcomes.",
    bio2: "He has worked as a filmmaker, production designer and art director across feature films, television commercials, music videos and documentary films — committed to showcasing Nigerian talent on the global stage.",
    credentials: ["BA, Dramatic Arts — Obafemi Awolowo University (OAU), Ile-Ife", "Award-winning Production Designer & Art Director"],
  },
];

export default function AboutPage() {
  const [heroActive, setHeroActive] = useState(false);

  useEffect(() => {
    // Trigger hero load animation slightly after mount
    const timer = setTimeout(() => setHeroActive(true), 150);

    // Dynamic scroll reveals using standard Intersection Observer
    const scrollElements = document.querySelectorAll(".reveal-on-scroll");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: unobserve if you only want it to animate once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      scrollElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div style={{ background: "#050607", color: "#fff", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100vw; scroll-behavior: smooth; }

        /* Cinematic CSS Scroll Reveals */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 1.2s cubic-bezier(.16, 1, .3, 1), transform 1.2s cubic-bezier(.16, 1, .3, 1);
          will-change: transform, opacity;
        }
        .reveal-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Direct Delay Utilities */
        .d1 { transition-delay: 0.1s !important; }
        .d2 { transition-delay: 0.2s !important; }
        .d3 { transition-delay: 0.3s !important; }
        .d4 { transition-delay: 0.4s !important; }
        .d5 { transition-delay: 0.5s !important; }

        /* Text Typography styles */
        .serif { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #cda44e; }
        .gold-grad {
          background: linear-gradient(180deg, #ffffff 10%, #e9dfc4 65%, #cda44e 100%);
          -webkit-background-clip: text; 
          background-clip: text; 
          -webkit-text-fill-color: transparent;
        }

        .eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 4px;
          color: #cda44e; text-transform: uppercase;
          display: flex; align-items: center; gap: 14px;
        }
        .eyebrow .tick { width: 22px; height: 1px; background: rgba(205,164,78,0.5); }

        .ornament {
          display: flex; align-items: center; justify-content: center; gap: 16px; padding: 0;
        }
        .ornament .line { height: 1px; width: 60px; background: linear-gradient(90deg, transparent, rgba(205,164,78,0.45)); }
        .ornament .line.right { background: linear-gradient(90deg, rgba(205,164,78,0.45), transparent); }
        .ornament .diamond { width: 6px; height: 6px; background: #cda44e; transform: rotate(45deg); box-shadow: 0 0 10px rgba(205,164,78,0.5); }

        /* Card Effects & Interactive Hover States */
        .pillar-card {
          position: relative;
          background: linear-gradient(160deg, rgba(255,255,255,0.02), rgba(255,255,255,0.002));
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px;
          padding: 40px 30px 34px;
          transition: transform 0.6s cubic-bezier(.16, 1, .3, 1), border-color 0.6s cubic-bezier(.16, 1, .3, 1), box-shadow 0.6s cubic-bezier(.16, 1, .3, 1);
        }
        .pillar-card::before {
          content: '';
          position: absolute; top: 0; left: 0; width: 0%; height: 2px;
          background: linear-gradient(90deg, #cda44e, transparent);
          transition: width 0.5s cubic-bezier(.16, 1, .3, 1);
        }
        .pillar-card:hover { 
          transform: translateY(-8px); 
          border-color: rgba(205,164,78,0.35); 
          box-shadow: 0 30px 60px rgba(0,0,0,0.6); 
        }
        .pillar-card:hover::before { width: 100%; }
        .pillar-num { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.95rem; color: rgba(205,164,78,0.45); letter-spacing: 1px; margin-bottom: 18px; }

        .svc-card {
          background: rgba(255,255,255,0.01);
          border-left: 2px solid rgba(205,164,78,0.15);
          border-radius: 0 8px 8px 0;
          padding: 16px 20px;
          transition: background 0.3s ease, border-left-color 0.3s ease, transform 0.3s cubic-bezier(.16, 1, .3, 1);
        }
        .svc-card:hover { 
          background: rgba(205,164,78,0.04); 
          border-left-color: #cda44e; 
          transform: translateX(6px); 
        }

        .value-row { border-bottom: 1px solid rgba(255,255,255,0.05); padding: 34px 0; display: flex; gap: 32px; align-items: flex-start; }
        .value-row:last-child { border-bottom: none; }
        .value-num { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 2.4rem; color: rgba(205,164,78,0.28); flex-shrink: 0; line-height: 1; min-width: 56px; }

        .team-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.6s cubic-bezier(.16, 1, .3, 1), box-shadow 0.6s cubic-bezier(.16, 1, .3, 1), transform 0.6s cubic-bezier(.16, 1, .3, 1);
        }
        .team-card:hover { 
          border-color: rgba(205,164,78,0.3); 
          box-shadow: 0 40px 80px rgba(0,0,0,0.6); 
          transform: translateY(-4px); 
        }
        .team-photo-wrap { position: relative; width: 100%; aspect-ratio: 4/5; overflow: hidden; background: #0a0d14; }
        .team-photo-wrap img { 
          width: 100%; height: 100%; object-fit: cover; 
          filter: grayscale(40%) contrast(1.05) brightness(0.95); 
          transition: filter 0.8s cubic-bezier(.16, 1, .3, 1), transform 0.8s cubic-bezier(.16, 1, .3, 1); 
          transform: scale(1); 
        }
        .team-card:hover .team-photo-wrap img { filter: grayscale(0%) contrast(1.08) brightness(1); transform: scale(1.03); }
        .team-photo-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(5,6,7,0.98) 100%); }
        .team-frame { position: absolute; inset: 14px; border: 1px solid rgba(205,164,78,0.22); pointer-events: none; }

        .manifesto-line { border-bottom: 1px solid rgba(255,255,255,0.05); padding: 30px 0; }
        .manifesto-line:last-child { border-bottom: none; }

        .credential-row { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 9px; font-size: 0.78rem; color: rgba(255,255,255,0.42); line-height: 1.6; }
        .credential-mark { color: #cda44e; flex-shrink: 0; font-family: 'Cormorant Garamond', serif; font-style: italic; }

        .back-link { color: rgba(255,255,255,0.5); font-size: 0.75rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: color .25s; position: relative; }
        .back-link:hover { color: #cda44e; }

        /* ============ RESPONSIVE LAYOUT BREAKPOINTS ============ */
        @media (max-width: 1024px) {
          .about-grid { gap: 56px !important; }
        }

        @media (max-width: 768px) {
          .nav-bar { padding: 18px 6% !important; }
          .nav-bar .brand-text { font-size: 0.68rem !important; letter-spacing: 3px !important; }
          .hero-sec { padding: 120px 6% 50px !important; min-height: 65vh !important; }
          .about-sec { padding: 80px 6% 60px !important; }
          .pillars-sec { padding: 0 6% 70px !important; }
          .services-sec { padding: 70px 6% !important; }
          .values-sec { padding: 70px 6% !important; }
          .manifesto-sec { padding: 70px 6% !important; }
          .team-sec { padding: 80px 6% 90px !important; }
          .team-card-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .contact-grid-info { grid-template-columns: 1fr !important; gap: 20px !important; }
        }

        @media (max-width: 480px) {
          .hero-eyebrow { font-size: 0.6rem !important; letter-spacing: 2.5px !important; }
          .pillar-card { padding: 34px 22px 28px !important; }
          .team-photo-wrap { aspect-ratio: 1/1 !important; }
          .ornament .line { width: 35px !important; }
          .svc-card { padding: 14px 16px !important; }
          .value-row { gap: 20px !important; padding: 26px 0 !important; }
          .value-num { font-size: 1.9rem !important; min-width: 40px !important; }
        }
      `}</style>

      {/* ===== NAV ===== */}
      <nav className="nav-bar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "22px 6%", display: "flex", alignItems: "center", justifyBetween: "space-between", justifyContent: "space-between", background: "rgba(5,6,7,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 34, width: 34, objectFit: "cover", borderRadius: 6 }} />
          <span className="brand-text" style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 800, letterSpacing: 5 }}>FOCAL LENGTH</span>
        </a>
        <a href="/" className="back-link">← Back Home</a>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-sec" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "160px 6% 60px", position: "relative", background: "radial-gradient(circle at 50% 30%, #0d1117 0%, #050607 75%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(205,164,78,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(205,164,78,0.01) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className={`reveal-on-scroll ${heroActive ? "visible" : ""}`} style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-eyebrow" style={{ fontSize: "0.72rem", letterSpacing: 4, color: "rgba(255,255,255,0.4)", marginBottom: 24, fontWeight: 600 }}>
            RC: 9528632 &nbsp;·&nbsp; LAGOS, NIGERIA
          </div>
          <h1 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.6rem, 7.5vw, 5.8rem)", letterSpacing: "0.08em", lineHeight: 1, margin: 0 }}>
            COMPANY PROFILE
          </h1>
          <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1rem, 2.5vw, 1.45rem)", letterSpacing: "0.06em", color: "rgba(255,255,255,0.45)", marginTop: 20, fontWeight: 400 }}>
            The Future
          </p>
        </div>
      </section>

      <div className="ornament"><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== ABOUT US ===== */}
      <section className="about-sec reveal-on-scroll" style={{ padding: "110px 6% 90px", maxWidth: 960, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 26 }}><span className="tick" />About Us</div>
        <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.7rem, 4vw, 2.9rem)", fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1.3, margin: "0 0 32px", color: "#f4f1e9" }}>
          A creative production company that turns ideas and stories into <span className="gold">magical visuals</span>.
        </h2>
        <p style={{ fontSize: "0.98rem", lineHeight: 2, color: "rgba(255,255,255,0.48)", fontWeight: 300, marginBottom: 28 }}>
          At Focal Length Media, we believe every brand, artist and idea has a story worth telling right. Our focus is on the in-between moments — the details, emotions and perspective that make content stick. From corporate campaigns and documentaries to music videos and social content, we handle concept to final cut with one goal: make it sharp, cinematic and unforgettable.
        </p>
        
        <div className="contact-grid-info" style={{ display: "grid", gridTemplateColumns: "repeat(2, auto)", gap: "16px 60px", marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 30 }}>
          <div>
            <div style={{ fontSize: "0.66rem", letterSpacing: 3, color: "rgba(205,164,78,0.7)", textTransform: "uppercase", marginBottom: 7, fontWeight: 700 }}>Address</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>2 Bolaji Street, off Kudirat Abiola Way, Ikeja, Lagos</div>
          </div>
          <div>
            <div style={{ fontSize: "0.66rem", letterSpacing: 3, color: "rgba(205,164,78,0.7)", textTransform: "uppercase", marginBottom: 7, fontWeight: 700 }}>Contact</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>focallengthmedia26@gmail.com · 0706 734 9942 · 0816 188 0830</div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO — 4 PILLARS ===== */}
      <section className="pillars-sec reveal-on-scroll d1" style={{ padding: "0 6% 120px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {pillars.map((p, index) => (
            <div key={p.title} className={`pillar-card reveal-on-scroll d${Math.min(index + 1, 4)}`}>
              <div className="pillar-num">{p.num}</div>
              <div style={{ fontSize: "1.7rem", marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", margin: "0 0 10px", color: "#f4f1e9" }}>{p.title}</h3>
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="serif reveal-on-scroll d2" style={{ textAlign: "center", marginTop: 64, fontStyle: "italic", fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)", letterSpacing: "0.01em", color: "rgba(255,255,255,0.55)" }}>
          Get the shot. Tell the story. <span className="gold">Make it matter.</span>
        </p>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services-sec" style={{ background: "linear-gradient(135deg, #090c10 0%, #06070a 60%, #050607 100%)", padding: "120px 6%", borderTop: "1px solid rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.025)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal-on-scroll" style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Services<span className="tick" /></div>
            <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4.6vw, 3.4rem)", letterSpacing: "0.05em", margin: "24px 0 0" }}>
              EVERYTHING UNDER ONE LENS
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 44 }}>
            {serviceGroups.map((g, gi) => (
              <div key={g.title} className={`reveal-on-scroll d${Math.min(gi + 1, 4)}`}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem", letterSpacing: "0.1em", color: "#cda44e", margin: "0 0 18px", paddingBottom: 14, borderBottom: "1px solid rgba(205,164,78,0.18)" }}>
                  {g.title.toUpperCase()}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {g.items.map(([t, d]) => (
                    <div key={t} className="svc-card">
                      <div style={{ fontSize: "0.86rem", fontWeight: 600, color: "#f4f1e9", marginBottom: 4 }}>{t}</div>
                      <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="values-sec reveal-on-scroll" style={{ padding: "120px 6%", maxWidth: 880, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 26 }}><span className="tick" />Our Values</div>
        <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 500, margin: "0 0 50px", color: "#f4f1e9" }}>
          What we stand <span className="gold">for</span>
        </h2>
        {values.map((v, vi) => (
          <div key={v.num} className={`value-row reveal-on-scroll d${Math.min(vi + 1, 3)}`}>
            <div className="value-num">{v.num}</div>
            <div>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "0.08em", margin: "0 0 9px", color: "#fff" }}>{v.title.toUpperCase()}</h4>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.85, margin: 0, fontWeight: 300, maxWidth: 600 }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="manifesto-sec" style={{ background: "linear-gradient(135deg, #180909 0%, #0e0c0a 55%, #050607 100%)", padding: "120px 6%", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle, rgba(189,44,44,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="reveal-on-scroll" style={{ maxWidth: 780, margin: "0 auto", position: "relative" }}>
          <div className="eyebrow" style={{ marginBottom: 26 }}><span className="tick" />The Manifesto</div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)", fontWeight: 500, margin: "0 0 48px", color: "#f4f1e9" }}>
            How we <span style={{ color: "#bd2c2c", fontStyle: "normal", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>MOVE</span>
          </h2>
          {manifesto.map((m, i) => (
            <div key={m.ph} className={`manifesto-line reveal-on-scroll d${Math.min(i + 1, 4)}`}>
              <div style={{ fontSize: "0.66rem", letterSpacing: 3, color: "#bd2c2c", fontWeight: 700, marginBottom: 9, textTransform: "uppercase" }}>
                0{i + 1} — {m.ph}
              </div>
              <div className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.15rem, 2.6vw, 1.6rem)", letterSpacing: "0.01em", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                {m.en}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LEADERSHIP TEAM ===== */}
      <section className="team-sec reveal-on-scroll" style={{ padding: "120px 6% 140px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Leadership<span className="tick" /></div>
          <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4.6vw, 3.4rem)", letterSpacing: "0.05em", margin: "24px 0 0" }}>
            THE MANAGEMENT TEAM
          </h2>
        </div>

        <div className="team-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 44 }}>
          {team.map((m, mi) => (
            <div key={m.name} className={`team-card reveal-on-scroll d${mi + 1}`}>
              <div className="team-photo-wrap">
                <img src={m.img} alt={m.name} onError={(e) => { e.target.style.display = "none"; }} />
                <div className="team-frame" />
                <div className="team-photo-overlay" />
                <div style={{ position: "absolute", bottom: 26, left: 28, right: 28 }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.04em", margin: 0, color: "#fff" }}>
                    {m.name}
                  </h3>
                  <div className="serif" style={{ fontStyle: "italic", fontSize: "0.88rem", color: "#cda44e", fontWeight: 500, letterSpacing: "0.02em", marginTop: 5 }}>
                    "{m.alias}" · {m.role}
                  </div>
                </div>
              </div>
              <div style={{ padding: "30px 28px 32px" }}>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.9, color: "rgba(255,255,255,0.45)", fontWeight: 300, margin: "0 0 16px" }}>
                  {m.bio}
                </p>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.9, color: "rgba(255,255,255,0.45)", fontWeight: 300, margin: "0 0 22px" }}>
                  {m.bio2}
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20 }}>
                  {m.credentials.map((c) => (
                    <div key={c} className="credential-row">
                      <span className="credential-mark">—</span>{c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ornament" style={{ paddingBottom: 60 }}><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "50px 6%", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyBetween: "space-between", justifyContent: "space-between", background: "#020304" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 30, borderRadius: 4, opacity: 0.85 }} />
          <span style={{ fontSize: "0.62rem", letterSpacing: 4, color: "rgba(255,255,255,0.22)", textTransform: "uppercase", fontWeight: 600 }}>
            RC: 9528632 · Lagos, Nigeria
          </span>
        </div>
        <a href="/" className="back-link" style={{ fontSize: "0.68rem" }}>← Back to Home</a>
      </footer>
    </div>
  );
}