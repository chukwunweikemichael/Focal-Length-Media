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
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Elite 3D Dynamic Matrix Perspective Controller engine
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / 14;
    const angleY = (x - xc) / 14;
    
    card.style.transform = `perspective(1200px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.03, 1.03, 1.03)`;
    
    const shine = card.querySelector(".laser-shimmer");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(205,164,78,0.2) 0%, transparent 65%)`;
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const shine = card.querySelector(".laser-shimmer");
    if (shine) shine.style.background = "transparent";
  };

  return (
    <div style={{ background: "#030406", color: "#f3f4f6", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Bebas+Neue&family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        html, body { overflow-x: hidden; max-width: 100vw; background: #030406; scroll-behavior: smooth; }

        /* Custom scrollbar track */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #030406; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #cda44e, #9a762e, transparent); border-radius: 20px; }

        /* Liquid Light Organic Glow Tracker Cursor */
        .custom-cursor-glow {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(205,164,78,0.06) 0%, transparent 75%);
          pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
          mix-blend-mode: screen; transition: transform 0.12s cubic-bezier(0.33, 1, 0.68, 1);
        }

        /* Multilayered Atmospheric Void Space Intersections */
        .ambient-glow {
          position: fixed; width: 1000px; height: 1000px; border-radius: 50%;
          background: radial-gradient(circle, rgba(205,164,78,0.04) 0%, transparent 70%);
          z-index: 1; pointer-events: none; mix-blend-mode: plus-lighter;
          animation: atmosphericMovement 45s infinite alternate ease-in-out;
        }
        .glow-2 { background: radial-gradient(circle, rgba(189,44,44,0.03) 0%, transparent 65%); animation-duration: 55s; animation-delay: -12s; right: -15%; top: 15%; }
        .glow-3 { background: radial-gradient(circle, rgba(205,164,78,0.03) 0%, transparent 60%); animation-duration: 65s; animation-delay: -25s; left: 15%; bottom: -10%; }
        @keyframes atmosphericMovement {
          0% { transform: translate(-20%, -30%) rotate(0deg) scale(1); }
          50% { transform: translate(25%, 20%) rotate(180deg) scale(1.25); }
          100% { transform: translate(-5%, 35%) rotate(360deg) scale(0.95); }
        }

        /* Continuous Film Noise Map Filter Overlay */
        .film-grain {
          position: fixed; top: -100%; left: -100%; right: -100%; bottom: -100%;
          width: 300%; height: 300%; background: transparent url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.03"/%3E%3C/svg%3E') repeat;
          z-index: 2; pointer-events: none; animation: kineticGrain .7s steps(6) infinite;
        }
        @keyframes kineticGrain { 0%, 100% { transform:translate(0, 0); } 20% { transform:translate(-1%, -2%); } 60% { transform:translate(2%, -1%); } 80% { transform:translate(-2%, 1%); } }

        /* Fluid Animation Entrance Architectures */
        .fu { opacity: 0; transform: translateY(40px) scale(0.99); transition: opacity 1.5s cubic-bezier(.16,1,.3,1), transform 1.5s cubic-bezier(.16,1,.3,1); }
        .fu.show { opacity: 1; transform: translateY(0) scale(1); }
        .d1 { transition-delay: .1s!important; } .d2 { transition-delay: .2s!important; } .d3 { transition-delay: .3s!important; }
        .d4 { transition-delay: .4s!important; } .d5 { transition-delay: .5s!important; }

        .serif { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #cda44e; text-shadow: 0 0 30px rgba(205,164,78,0.3); }
        
        /* Premium Anisotropic Metallic Text Shimmer Effect */
        .gold-grad {
          background: linear-gradient(90deg, #ffffff 0%, #fffbf0 15%, #cda44e 42%, #fffbf0 55%, #cda44e 68%, #ffffff 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto; animation: premiumTextShine 8s linear infinite;
        }
        @keyframes premiumTextShine { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }

        .eyebrow {
          font-family: 'Montserrat', sans-serif; font-size: 0.72rem; font-weight: 800; letter-spacing: 9px;
          color: #cda44e; text-transform: uppercase; display: flex; align-items: center; gap: 18px;
        }
        .eyebrow .tick { width: 50px; height: 1px; background: linear-gradient(90deg, transparent, rgba(205,164,78,0.7)); position: relative; overflow: hidden; }
        .eyebrow .tick::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, #fff, transparent); animation: linearLaserScan 3s infinite linear;
        }
        @keyframes linearLaserScan { 0% { left: -100%; } 100% { left: 100%; } }

        /* Ornamental Structures */
        .ornament { display: flex; align-items: center; justify-content: center; gap: 26px; padding: 40px 0; }
        .ornament .line { height: 1px; width: 180px; background: linear-gradient(90deg, transparent, rgba(205,164,78,0.4)); position: relative; }
        .ornament .line::after { content: ''; position: absolute; inset: 0; background: inherit; filter: blur(3px); }
        .ornament .line.right { background: linear-gradient(90deg, rgba(205,164,78,0.4), transparent); }
        .ornament .diamond-composite { display: flex; align-items: center; gap: 6px; }
        .ornament .diamond { width: 8px; height: 8px; background: #cda44e; transform: rotate(45deg); box-shadow: 0 0 15px rgba(205,164,78,0.7); animation: luxuryPulse 3s infinite ease-in-out; }
        .ornament .diamond.small { width: 4px; height: 4px; background: rgba(205,164,78,0.4); animation-delay: 0.5s; }
        @keyframes luxuryPulse { 0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.6; } 50% { transform: rotate(45deg) scale(1.3); opacity: 1; box-shadow: 0 0 20px #cda44e; } }

        /* Card Framework Architecture & Interactive Mirrors */
        .laser-shimmer { position: absolute; inset: 0; mix-blend-mode: screen; pointer-events: none; z-index: 4; transition: background 0.1s ease; }

        .pillar-card {
          position: relative; background: linear-gradient(145deg, rgba(255,255,255,0.015), rgba(255,255,255,0.002));
          border: 1px solid rgba(255,255,255,0.03); border-radius: 16px; padding: 45px 35px;
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.75s ease, border-color 0.75s ease;
          transform-style: preserve-3d; box-shadow: 0 25px 60px rgba(0,0,0,0.4);
        }
        .pillar-card::before {
          content: ''; position: absolute; inset: 0; border: 1px solid transparent; border-radius: 16px;
          background: linear-gradient(135deg, rgba(205,164,78,0.5), transparent 40%, transparent 60%, rgba(205,164,78,0.2)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.6s ease; pointer-events: none;
        }
        .pillar-card:hover { border-color: transparent; box-shadow: 0 50px 100px rgba(0,0,0,0.7), 0 0 40px rgba(205,164,78,0.08); }
        .pillar-card:hover::before { opacity: 1; }
        .pillar-num { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1rem; color: rgba(205,164,78,0.4); letter-spacing: 2px; margin-bottom: 20px; transform: translateZ(20px); }

        .svc-card {
          background: rgba(255,255,255,0.008); border-left: 2px solid rgba(205,164,78,0.12);
          border-radius: 0 12px 12px 0; padding: 18px 22px; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .svc-card:hover { background: rgba(205,164,78,0.04); border-left-color: #cda44e; transform: translateX(6px) scale(1.02); box-shadow: -10px 15px 30px rgba(0,0,0,0.3); }

        .value-row { border-bottom: 1px solid rgba(255,255,255,0.03); padding: 40px 0; display: flex; gap: 40px; align-items: flex-start; transition: transform 0.4s ease; }
        .value-row:hover { transform: translateX(4px); }
        .value-num { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 2.8rem; color: rgba(205,164,78,0.22); flex-shrink: 0; line-height: 1; min-width: 70px; transition: color 0.4s; }
        .value-row:hover .value-num { color: rgba(205,164,78,0.6); text-shadow: 0 0 20px rgba(205,164,78,0.3); }

        .manifesto-line { border-bottom: 1px solid rgba(255,255,255,0.03); padding: 35px 0; transition: all 0.4s ease; }
        .manifesto-line:hover { padding-left: 10px; background: rgba(189,44,44,0.01); }

        /* Studio Management Profile System blocks */
        .team-card {
          background: rgba(255,255,255,0.008); border: 1px solid rgba(255,255,255,0.03);
          border-radius: 24px; overflow: hidden; transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.8s ease, border-color 0.8s ease;
          transform-style: preserve-3d; box-shadow: 0 40px 90px rgba(0,0,0,0.5);
        }
        .team-card:hover { border-color: rgba(205,164,78,0.25); box-shadow: 0 60px 130px rgba(0,0,0,0.8), 0 0 50px rgba(205,164,78,0.1); }
        .team-photo-wrap { position: relative; width: 100%; aspect-ratio: 4/5; overflow: hidden; background: #07090e; transform-style: preserve-3d; }
        .team-photo-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(40%) contrast(1.05) brightness(0.85); transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
        .team-card:hover .team-photo-wrap img { filter: grayscale(0%) contrast(1.1) brightness(1); transform: scale(1.08) translateZ(10px); }
        .team-photo-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(3,4,6,0.98) 100%); z-index: 2; }
        .team-frame { position: absolute; inset: 20px; border: 1px solid rgba(205,164,78,0.15); pointer-events: none; z-index: 3; transition: inset 0.6s ease, border-color 0.6s ease; }
        .team-card:hover .team-frame { inset: 15px; border-color: rgba(205,164,78,0.5); }

        .back-link { color: rgba(255,255,255,0.38); font-size: 0.72rem; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; text-decoration: none; transition: all .6s cubic-bezier(.16,1,.3,1); position: relative; display: inline-flex; align-items: center; }
        .back-link::after { content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 1px; background: #cda44e; transition: width 0.45s ease; }
        .back-link:hover { color: #cda44e; transform: translateY(-4px); letter-spacing: 6px; }
        .back-link:hover::after { width: 100%; }

        @media (max-width: 768px) {
          .nav-bar { padding: 22px 6% !important; }
          .hero-sec { padding: 190px 6% 80px !important; min-height: 55vh !important; }
          .about-sec, .pillars-sec, .services-sec, .values-sec, .manifesto-sec, .team-sec { padding: 90px 6% !important; }
          .about-grid { display: flex !important; flex-direction: column !important; gap: 40px !important; }
          .team-card-grid { grid-template-columns: 1fr !important; gap: 45px !important; }
          .custom-cursor-glow { display: none !important; }
        }
      `}</style>

      {/* Global Canvas Layers */}
      <div className="custom-cursor-glow" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="film-grain" />
      <div className="ambient-glow" />
      <div className="ambient-glow glow-2" />
      <div className="ambient-glow glow-3" />

      {/* Progress Track Line */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${scrollProgress}%`, background: "linear-gradient(90deg, #7c5f23, #cda44e, #fff3d1)", zIndex: 9999, transition: "width 0.1s linear" }} />

      {/* ===== LUXURY TOP NAV ARCHITECTURE ===== */}
      <nav className="nav-bar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "26px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(3,4,6,0.8)", backdropFilter: "blur(50px)", borderBottom: "1px solid rgba(255,255,255,0.015)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 12, height: 44, width: 44 }}>
            <img src={LOGO_URL} alt="FLM" style={{ height: "100%", width: "100%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.12)", transition: "transform 0.8s cubic-bezier(.16,1,.3,1)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg) scale(1.15)"} onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1)"} />
          </div>
          <span style={{ color: "#fff", fontSize: "0.92rem", fontWeight: 900, letterSpacing: 9, transition: "color 0.4s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#cda44e"} onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>FOCAL LENGTH</span>
        </a>
        <a href="/" className="back-link">← Back Home</a>
      </nav>

      {/* ===== CINEMATIC HERO CHRONICLES ===== */}
      <section className="hero-sec" style={{ minHeight: "68vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "220px 6% 100px", position: "relative", background: "radial-gradient(circle at 50% 40%, #0d121c 0%, #030406 80%)", zIndex: 3 }}>
        {/* Dynamic Vector Space Grid Overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(205,164,78,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(205,164,78,0.015) 1px,transparent 1px)", backgroundSize: "100px 100px", maskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)", WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)" }} />
        
        <div className={`fu ${loaded ? "show" : ""}`} style={{ position: "relative", zIndex: 4 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 28 }}><span className="tick" />Corporate Profile<span className="tick" /></div>
          <h1 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.8rem,11vw,8rem)", letterSpacing: "0.1em", lineHeight: 0.98, margin: 0, fontWeight: 400 }}>
            COMPANY PROFILE
          </h1>
          <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.2rem,2.5vw,1.55rem)", letterSpacing: "0.01em", color: "rgba(255,255,255,0.55)", marginTop: 28, fontWeight: 300, maxWidth: 760, lineHeight: 1.8 }}>
            RC: 9528632 &nbsp;·&nbsp; Operational Blueprint & Narrative Foundations
          </p>
        </div>
      </section>

      <div className="ornament"><span className="line" /><div className="diamond-composite"><span className="diamond small" /><span className="diamond" /><span className="diamond small" /></div><span className="line right" /></div>

      {/* ===== ABOUT EXECUTIVE NARRATIVE ===== */}
      <section className={`about-sec fu d1 ${loaded ? "show" : ""}`} style={{ padding: "120px 6% 100px", maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 3 }}>
        <div className="eyebrow" style={{ marginBottom: 26 }}><span className="tick" />ABOUT THE STUDIO</div>
        <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", fontWeight: 400, letterSpacing: "0.01em", lineHeight: 1.3, margin: "0 0 36px", color: "#f4f1e9" }}>
          A creative production firm turning structural concepts into <span className="gold">legendary high-fidelity visual assets</span>.
        </h2>
        <p style={{ fontSize: "1.08rem", lineSpacing: "1.9", lineHeight: 2, color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: 45 }}>
          At Focal Length Media, we believe every brand, artist and idea has a story worth telling right. Our focus is on the in-between moments — the details, emotions and perspective that make content stick. From corporate campaigns and documentaries to music videos and social content, we handle concept to final cut with one goal: make it sharp, cinematic and unforgettable.
        </p>
        
        <div className="contact-grid-info" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px 80px", marginTop: 45, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 40 }}>
          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: 4, color: "#cda44e", textTransform: "uppercase", marginBottom: 12, fontWeight: 800 }}>HQ Physical Base</div>
            <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", fontWeight: 400, lineHeight: 1.6 }}>2 Bolaji Street, off Kudirat Abiola Way, Ikeja, Lagos</div>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: 4, color: "#cda44e", textTransform: "uppercase", marginBottom: 12, fontWeight: 800 }}>Communications Pipeline</div>
            <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", fontWeight: 400, lineHeight: 1.6 }}>focallengthmedia26@gmail.com<br />0706 734 9942 · 0816 188 0830</div>
          </div>
        </div>
      </section>

      {/* ===== THE 4 PILLARS STRATOSPHERE ===== */}
      <section className={`pillars-sec fu d2 ${loaded ? "show" : ""}`} style={{ padding: "40px 6% 120px", maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 3 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 30 }}>
          {pillars.map((p, i) => (
            <div 
              key={p.title} 
              className="pillar-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="laser-shimmer" />
              <div className="pillar-num">{p.num}</div>
              <div style={{ fontSize: "2.2rem", marginBottom: 22, filter: "drop-shadow(0 0 15px rgba(205,164,78,0.3))" }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.08em", margin: "0 0 14px", color: "#f4f1e9", fontWeight: 400 }}>{p.title}</h3>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="serif" style={{ textAlign: "center", marginTop: 75, fontStyle: "italic", fontSize: "clamp(1.2rem,2.5vw,1.65rem)", letterSpacing: "0.02em", color: "rgba(255,255,255,0.6)" }}>
          Get the shot. Tell the story. <span className="gold">Make it matter.</span>
        </p>
      </section>

      {/* ===== INTEGRATED METRICS SERVICES MATRIX ===== */}
      <section className="services-sec" style={{ background: "linear-gradient(180deg, #05070a 0%, #030406 100%)", padding: "130px 6%", borderTop: "1px solid rgba(255,255,255,0.015)", position: "relative", zIndex: 3 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className={`fu ${loaded ? "show" : ""}`} style={{ textAlign: "center", marginBottom: 90 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />SERVICES MATRIX<span className="tick" /></div>
            <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,5.5vw,4.8rem)", letterSpacing: "0.08em", margin: "26px 0 0", fontWeight: 400 }}>
              EVERYTHING UNDER ONE LENS
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 50 }}>
            {serviceGroups.map((g, gi) => (
              <div 
                key={g.title} 
                className={`fu d${Math.min(gi + 1, 5)} ${loaded ? "show" : ""}`}
                style={{ background: "rgba(255,255,255,0.005)", border: "1px solid rgba(255,255,255,0.015)", padding: 35, borderRadius: 20, transformStyle: "preserve-3d", transition: "transform 0.25s ease" }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="laser-shimmer" />
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.12em", color: "#cda44e", margin: "0 0 24px", paddingBottom: 16, borderBottom: "1px solid rgba(205,164,78,0.15)", fontWeight: 400 }}>
                  {g.title.toUpperCase()}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, transform: "translateZ(15px)" }}>
                  {g.items.map(([t, d]) => (
                    <div key={t} className="svc-card">
                      <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#f4f1e9", marginBottom: 6 }}>{t}</div>
                      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontWeight: 300, lineHeight: 1.5 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDATIONAL ETHICAL VALUES ===== */}
      <section className={`values-sec fu d2 ${loaded ? "show" : ""}`} style={{ padding: "130px 6%", maxWidth: 940, margin: "0 auto", position: "relative", zIndex: 3 }}>
        <div className="eyebrow" style={{ marginBottom: 26 }}><span className="tick" />Corporate Core</div>
        <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 400, margin: "0 0 60px", color: "#f4f1e9" }}>
          What we stand <span className="gold">firmly upon</span>
        </h2>
        <div>
          {values.map((v) => (
            <div key={v.num} className="value-row">
              <div className="value-num">{v.num}</div>
              <div>
                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.1em", margin: "0 0 12px", color: "#fff", fontWeight: 400 }}>{v.title.toUpperCase()}</h4>
                <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.9, margin: 0, fontWeight: 300, maxWidth: 680 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== KINETIC THEATRE MANIFESTO ===== */}
      <section className="manifesto-sec" style={{ background: "linear-gradient(135deg,#160707 0%,#090807 55%,#030406 100%)", padding: "130px 6%", position: "relative", zIndex: 3 }}>
        <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: 750, height: 750, border: "1px solid rgba(189,44,44,0.03)", borderRadius: "50%", background: "radial-gradient(circle, rgba(189,44,44,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className={`fu ${loaded ? "show" : ""}`} style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
          <div className="eyebrow" style={{ marginBottom: 26 }}><span className="tick" />Operational Creed</div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, margin: "0 0 60px", color: "#f4f1e9" }}>
            How we executionally <span style={{ color: "#bd2c2c", fontStyle: "normal", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", fontWeight: 400 }}>MOVE</span>
          </h2>
          {manifesto.map((m, i) => (
            <div key={m.ph} className="manifesto-line">
              <div style={{ fontSize: "0.72rem", letterSpacing: 4, color: "#bd2c2c", fontWeight: 800, marginBottom: 12, textTransform: "uppercase" }}>
                0{i + 1} — {m.ph}
              </div>
              <div className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.3rem,3vw,1.85rem)", letterSpacing: "0.01em", color: "rgba(255,255,255,0.95)", fontWeight: 400 }}>
                {m.en}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXECUTIVE LEADERSHIP BOARD ===== */}
      <section className={`team-sec fu d3 ${loaded ? "show" : ""}`} style={{ padding: "140px 6%", maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 3 }}>
        <div style={{ textAlign: "center", marginBottom: 90 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />LEADERSHIP CORE<span className="tick" /></div>
          <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,5.5vw,4.8rem)", letterSpacing: "0.08em", margin: "26px 0 0", fontWeight: 400 }}>
            THE MANAGEMENT TEAM
          </h2>
        </div>

        <div className="team-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: 50 }}>
          {team.map((m, mi) => (
            <div 
              key={m.name} 
              className="team-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="laser-shimmer" />
              <div className="team-photo-wrap">
                <img src={m.img} alt={m.name} onError={(e) => { e.target.style.display = "none"; }} />
                <div className="team-frame" />
                <div className="team-photo-overlay" />
                <div style={{ position: "absolute", bottom: 35, left: 35, right: 35, zIndex: 3, transform: "translateZ(30px)" }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.05em", margin: 0, color: "#fff", fontWeight: 400 }}>
                    {m.name}
                  </h3>
                  <div className="serif" style={{ fontStyle: "italic", fontSize: "0.95rem", color: "#cda44e", fontWeight: 500, letterSpacing: "0.02em", marginTop: 8 }}>
                    "{m.alias}" · {m.role}
                  </div>
                </div>
              </div>
              <div style={{ padding: "40px 35px 45px", transform: "translateZ(10px)" }}>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.95, color: "rgba(255,255,255,0.5)", fontWeight: 300, margin: "0 0 20px" }}>
                  {m.bio}
                </p>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.95, color: "rgba(255,255,255,0.5)", fontWeight: 300, margin: "0 0 30px" }}>
                  {m.bio2}
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 26 }}>
                  {m.credentials.map((c) => (
                    <div key={c} className="credential-row" style={{ display: "flex", gap: 14, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                      <span className="credential-mark" style={{ color: "#cda44e" }}>—</span>{c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ornament" style={{ paddingBottom: 100 }}><span className="line" /><div className="diamond-composite"><span className="diamond small" /><span className="diamond" /><span className="diamond small" /></div><span className="line right" /></div>

      {/* ===== STRUCTURAL SYSTEM FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.015)", padding: "70px 6%", display: "flex", flexWrap: "wrap", gap: 35, alignItems: "center", justifyContent: "space-between", background: "#010204", position: "relative", zIndex: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 38, width: 38, objectFit: "cover", borderRadius: 8, opacity: 0.75, border: "1px solid rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: "0.72rem", letterSpacing: 7, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontWeight: 600 }}>
            RC: 9528632 · Lagos, Nigeria
          </span>
        </div>
        <a href="/" className="back-link" style={{ fontSize: "0.72rem" }}>← Back to Home</a>
      </footer>
    </div>
  );
}