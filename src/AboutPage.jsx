import { useState, useEffect } from "react";

const LOGO_URL = "/length.jpeg";
const DIRECTOR_1_IMG = "/team/olaniyan-olugbenga.jpg";
const DIRECTOR_2_IMG = "/team/alagbile-matthew.jpg";
const STUDIO_SHOWCASE_IMG = "watermarked_img_464284263149969593.png";

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

const techStack = [
  { cat: "Acquisition", items: ["ARRI Amira & Alexa Ecosystems", "RED Digital Cinema", "Sony FX Series Cine Rigs", "Anamorphic & Prime Lens Matrix"] },
  { cat: "Post-Production", items: ["DaVinci Resolve Studio (Advanced Color Grading Panels)", "Avid Media Composer & Premiere Pipeline", "After Effects Pro Studio Platform"] },
  { cat: "Audio Engineering", items: ["Sennheiser Wireless Multi-Channel Infrastructure", "ProTools Audio Architecture", "Custom Spatial Sound Design Mix Engines"] }
];

const faqPipeline = [
  { q: "What is your typical production turnaround timeline?", a: "Depending on scale, commercial short-form deliverables resolve inside 5–7 working days, while complex documentaries or feature multi-camera concert cuts run on optimized 2–4 week post-production pipelines." },
  { q: "Do you deploy regional operations outside of Lagos?", a: "Yes, our production crews maintain modular mobilization mechanics, enabling execution of cinematic capture footprints globally and across all geopolitical zones within Nigeria." }
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
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    setLoaded(true);
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

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleCardMouseMove = (e) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / 16;
    const angleY = (x - xc) / 16;
    
    card.style.transform = `perspective(1400px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    const shine = card.querySelector(".laser-shimmer");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(205,164,78,0.18) 0%, transparent 70%)`;
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const shine = card.querySelector(".laser-shimmer");
    if (shine) shine.style.background = "transparent";
  };

  return (
    <div style={{ background: "#030406", color: "#f3f4f6", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Bebas+Neue&family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        html, body { overflow-x: hidden; max-width: 100vw; background: #030406; scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #030406; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #cda44e, #221a0f); border-radius: 10px; }

        /* Liquid Light Tracker */
        .custom-cursor-glow {
          position: fixed; width: 550px; height: 550px; border-radius: 50%;
          background: radial-gradient(circle, rgba(205,164,78,0.05) 0%, transparent 75%);
          pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
          mix-blend-mode: screen; transition: transform 0.08s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Ambient Space Intersections */
        .ambient-glow {
          position: fixed; width: 85vw; height: 85vw; max-width: 1200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(205,164,78,0.03) 0%, transparent 70%);
          z-index: 1; pointer-events: none; mix-blend-mode: plus-lighter;
          animation: atmosphericMovement 50s infinite alternate ease-in-out;
        }
        .glow-2 { background: radial-gradient(circle, rgba(189,44,44,0.02) 0%, transparent 65%); animation-duration: 60s; animation-delay: -15s; right: -10%; top: 20%; }

        @keyframes atmosphericMovement {
          0% { transform: translate(-10%, -20%) scale(1); }
          50% { transform: translate(15%, 15%) scale(1.15); }
          100% { transform: translate(-5%, 25%) scale(0.95); }
        }

        /* Kinetic Grain Overlay */
        .film-grain {
          position: fixed; top: -50%; left: -50%; right: -50%; bottom: -50%; width: 200%; height: 200%;
          background: transparent url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.025"/%3E%3C/svg%3E') repeat;
          z-index: 2; pointer-events: none; animation: kineticGrain .6s steps(4) infinite;
        }
        @keyframes kineticGrain { 0%, 100% { transform:translate(0, 0); } 50% { transform:translate(-0.5%, -1%); } }

        /* Smooth Entrances */
        .fu { opacity: 0; transform: translateY(30px); transition: opacity 1.2s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1); }
        .fu.show { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: .1s; } .d2 { transition-delay: .2s; } .d3 { transition-delay: .3s; }

        .serif { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #cda44e; }
        
        .gold-grad {
          background: linear-gradient(90deg, #ffffff 0%, #fffdf6 20%, #cda44e 50%, #fffdf6 80%, #ffffff 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto; animation: premiumTextShine 10s linear infinite;
        }
        @keyframes premiumTextShine { 0% { background-position: 200% center; } 100% { background-position: 0% center; } }

        .eyebrow {
          font-family: 'Montserrat', sans-serif; font-size: clamp(0.6rem, 1.5vw, 0.68rem); font-weight: 800; letter-spacing: clamp(3px, 1vw, 7px);
          color: #cda44e; text-transform: uppercase; display: flex; align-items: center; gap: 14px;
        }
        .eyebrow .tick { width: clamp(15px, 3vw, 35px); height: 1px; background: linear-gradient(90deg, transparent, rgba(205,164,78,0.5)); }

        /* Card Framework Architecture */
        .laser-shimmer { position: absolute; inset: 0; mix-blend-mode: screen; pointer-events: none; z-index: 4; transition: background 0.15s ease; border-radius: inherit; }

        .pillar-card {
          position: relative; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03);
          border-radius: 12px; padding: clamp(24px, 4vw, 40px) clamp(20px, 3vw, 30px); transition: border-color 0.6s ease, box-shadow 0.6s ease;
          transform-style: preserve-3d;
        }
        @media (hover: hover) {
          .pillar-card:hover { border-color: rgba(205,164,78,0.25); box-shadow: 0 30px 60px rgba(0,0,0,0.6); }
        }

        .svc-card {
          background: rgba(255,255,255,0.005); border-left: 2px solid rgba(205,164,78,0.1);
          padding: 14px 18px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) {
          .svc-card:hover { background: rgba(205,164,78,0.03); border-left-color: #cda44e; transform: translateX(4px); }
        }

        .team-card {
          background: rgba(255,255,255,0.008); border: 1px solid rgba(255,255,255,0.02);
          border-radius: 16px; overflow: hidden; transform-style: preserve-3d; transition: border-color 0.5s ease;
        }
        @media (hover: hover) {
          .team-card:hover { border-color: rgba(205,164,78,0.2); }
        }
        .team-photo-wrap { position: relative; width: 100%; aspect-ratio: 4/4.5; overflow: hidden; background: #07090e; }
        .team-photo-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%) brightness(0.9); transition: transform 0.8s ease; }
        @media (hover: hover) {
          .team-card:hover .team-photo-wrap img { transform: scale(1.05); filter: grayscale(0%) brightness(1); }
        }

        /* Fluid Studio Showcase Section */
        .showcase-container {
          position: relative; border: 1px solid rgba(255,255,255,0.03); border-radius: 20px;
          overflow: hidden; background: #07090e; box-shadow: 0 40px 80px rgba(0,0,0,0.7);
        }
        .showcase-img { width: 100%; height: auto; display: block; filter: contrast(1.04) brightness(0.9); }

        /* Responsive Adaptive Layout Utilities */
        .responsive-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 24px;
        }
        .service-layout-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 32px;
        }

        @media (max-width: 1024px) {
          .custom-cursor-glow { display: none !important; }
          .pillar-card, .team-card { transform: none !important; }
        }
        @media (max-width: 640px) {
          .svc-card { padding: 10px 14px; }
        }
      `}</style>

      <div className="custom-cursor-glow" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="film-grain" />
      <div className="ambient-glow" />
      <div className="ambient-glow glow-2" />

      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${scrollProgress}%`, background: "#cda44e", zIndex: 9999 }} />

      {/* ===== STRUCTURAL HEADER ===== */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "clamp(12px, 2vw, 24px) 5%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(3,4,6,0.85)", backdropFilter: "blur(30px)", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 32, width: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }} />
          <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 800, letterSpacing: 4 }}>FOCAL LENGTH</span>
        </a>
        <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none" }}>← Back</a>
      </nav>

      {/* ===== CINEMATIC HERO ===== */}
      <section style={{ minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "140px 5% 60px", position: "relative", background: "radial-gradient(circle at 50% 50%, #0d121c 0%, #030406 100%)" }}>
        <div className={`fu ${loaded ? "show" : ""}`} style={{ maxWidth: 900 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 16 }}><span className="tick" />Corporate Profile<span className="tick" /></div>
          <h1 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "0.05em", lineHeight: 1, margin: 0, fontWeight: 400 }}>
            INSIDE THE FRAME
          </h1>
          <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "rgba(255,255,255,0.5)", marginTop: 16, lineHeight: 1.6 }}>
            RC: 9528632 &nbsp;·&nbsp; Structural Directives & Visual Ecosystem
          </p>
        </div>
      </section>

      {/* ===== EXECUTIVE NARRATIVE ===== */}
      <section className={`fu d1 ${loaded ? "show" : ""}`} style={{ padding: "40px 5%", maxWidth: 1140, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}><span className="tick" />THE STUDIO OVERVIEW</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "32px 60px", alignItems: "start" }}>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)", fontWeight: 400, lineHeight: 1.3, color: "#f4f1e9" }}>
            A precision-driven creative production firm turning complex concepts into <span className="gold">legendary visual assets</span>.
          </h2>
          <div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", fontWeight: 300, marginBottom: 24 }}>
              At Focal Length Media, we map vision directly to premium execution. We eliminate the noise between abstract strategy and screen-ready clarity. Catering to blue-chip corporate entities, global NGOs, creative agencies, and dynamic artists, our facility coordinates end-to-end media operations with standard-setting technical rigor.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20 }}>
              <div>
                <span style={{ display: "block", fontSize: "0.6rem", color: "#cda44e", fontWeight: 800, letterSpacing: 2, marginBottom: 4 }}>HQ BASE</span>
                <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>Ikeja, Lagos, Nigeria</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.6rem", color: "#cda44e", fontWeight: 800, letterSpacing: 2, marginBottom: 4 }}>SECURE LINE</span>
                <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>0706 734 9942</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE MEDIA SHOWCASE LAYOUT ===== */}
      <section style={{ padding: "40px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div className="showcase-container">
          <img src={STUDIO_SHOWCASE_IMG} className="showcase-img" alt="Focal Length Media Studio Facility Showcase Layout" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(3,4,6,0.95) 0%, rgba(3,4,6,0.3) 60%, transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(16px, 4vw, 40px)" }}>
            <div style={{ maxWidth: 600 }}>
              <span style={{ color: "#cda44e", fontSize: "0.62rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Operational Environment Blueprint</span>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.3rem, 3.5vw, 2.5rem)", fontWeight: 400, color: "#fff", letterSpacing: "0.04em", marginBottom: 8 }}>HIGH-FIDELITY FACILITY LAYOUT</h3>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>From synchronized virtual production environments and multi-cam master control tracking grids to spatial sound design clusters, our physical infrastructure is purpose-engineered for zero-latency workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE 4 PILLARS ===== */}
      <section style={{ padding: "40px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div className="responsive-grid">
          {pillars.map((p) => (
            <div key={p.title} className="pillar-card" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
              <div className="laser-shimmer" />
              <div style={{ fontSize: "0.8rem", color: "rgba(205,164,78,0.4)", fontStyle: "italic", marginBottom: 12 }} className="serif">{p.num}</div>
              <div style={{ fontSize: "1.6rem", marginBottom: 12 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.05em", margin: "0 0 8px", color: "#f4f1e9", fontWeight: 400 }}>{p.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES MATRIX ===== */}
      <section style={{ background: "#05070a", padding: "80px 5%", borderTop: "1px solid rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ marginBottom: 44 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />CAPABILITIES PROFILE<span className="tick" /></div>
            <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "0.05em", margin: "12px 0 0", textAlign: "center", fontWeight: 400 }}>
              PRODUCTION ARCHITECTURE
            </h2>
          </div>

          <div className="service-layout-grid">
            {serviceGroups.map((g) => (
              <div key={g.title} style={{ background: "rgba(255,255,255,0.003)", border: "1px solid rgba(255,255,255,0.015)", padding: "24px 20px", borderRadius: 12 }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em", color: "#cda44e", marginBottom: 16, borderBottom: "1px solid rgba(205,164,78,0.1)", paddingBottom: 10, fontWeight: 400 }}>
                  {g.title.toUpperCase()}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {g.items.map(([t, d]) => (
                    <div key={t} className="svc-card">
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f4f1e9", marginBottom: 4 }}>{t}</div>
                      <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", fontWeight: 300, lineHeight: 1.4 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EQUIPMENT & GEAR MATRIX ===== */}
      <section style={{ padding: "60px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}><span className="tick" />Technical Pipeline</div>
        <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", fontWeight: 400, marginBottom: 32 }}>
          High-Fidelity Hardware Ecosystem
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
          {techStack.map((stack) => (
            <div key={stack.cat} style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.015), transparent)", padding: 24, borderRadius: 12, border: "1px solid rgba(255,255,255,0.02)" }}>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem", letterSpacing: "0.06em", color: "#f4f1e9", marginBottom: 14, fontWeight: 400 }}>{stack.cat.toUpperCase()}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {stack.items.map((item) => (
                  <li key={item} style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 10, lineHeight: 1.4 }}>
                    <span style={{ width: 4, height: 4, background: "#cda44e", borderRadius: "50%", flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VALUES & ETHICS ===== */}
      <section style={{ padding: "60px 5%", maxWidth: 900, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}><span className="tick" />FOUNDATIONAL SYSTEM</div>
        <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", fontWeight: 400, marginBottom: 32 }}>Core Anchors</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {values.map((v) => (
            <div key={v.num} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "1.8rem", minWidth: "35px", color: "#cda44e", fontFamily: "'Bebas Neue', sans-serif" }}>{v.num}</div>
              <div>
                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "0.06em", color: "#fff", marginBottom: 4, fontWeight: 400 }}>{v.title.toUpperCase()}</h4>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5, margin: 0, fontWeight: 300 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXECUTION MANIFESTO ===== */}
      <section style={{ background: "linear-gradient(180deg, #030406 0%, #0d0505 50%, #030406 100%)", padding: "80px 5%" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}><span className="tick" />CREATIVE CREED</div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", fontWeight: 400, marginBottom: 32, color: "#f4f1e9" }}>
            Operational Maxims
          </h2>
          {manifesto.map((m, i) => (
            <div key={m.ph} style={{ padding: "20px 0", borderBottom: i !== manifesto.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none" }}>
              <div style={{ fontSize: "0.62rem", letterSpacing: 2, color: "#bd2c2c", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>0{i + 1} · {m.ph}</div>
              <div className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1rem, 2.2vw, 1.4rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{m.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXECUTIVE LEADERSHIP ===== */}
      <section style={{ padding: "80px 5%", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />LEADERSHIP FLIGHT<span className="tick" /></div>
          <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "0.05em", margin: "12px 0 0", fontWeight: 400 }}>
            BOARD OF DIRECTORS
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 32 }}>
          {team.map((m) => (
            <div key={m.name} className="team-card" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
              <div className="laser-shimmer" />
              <div className="team-photo-wrap">
                <img src={m.img} alt={m.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(3,4,6,0.95) 100%)", zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, zIndex: 3 }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.04em", color: "#fff", fontWeight: 400 }}>{m.name}</h3>
                  <div className="serif" style={{ fontStyle: "italic", fontSize: "0.85rem", color: "#cda44e", marginTop: 2 }}>
                    "{m.alias}" &nbsp;·&nbsp; {m.role}
                  </div>
                </div>
              </div>
              <div style={{ padding: "24px 20px" }}>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", fontWeight: 300, marginBottom: 14 }}>{m.bio}</p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", fontWeight: 300, marginBottom: 20 }}>{m.bio2}</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                  {m.credentials.map((c) => (
                    <div key={c} style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: 4, lineHeight: 1.4 }}>— {c}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ PIPELINE ===== */}
      <section style={{ padding: "40px 5% 80px", maxWidth: 800, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}><span className="tick" />FAQ Matrix</div>
        <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", fontWeight: 400, marginBottom: 32 }}>Engagement Logistics</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqPipeline.map((faq, idx) => (
            <div key={idx} style={{ border: "1px solid rgba(255,255,255,0.03)", borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.002)" }}>
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{ width: "100%", padding: "18px 20px", background: "transparent", border: "none", color: "#f4f1e9", textAlign: "left", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
              >
                <span>{faq.q}</span>
                <span style={{ color: "#cda44e", transition: "transform 0.3s", transform: activeFaq === idx ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</span>
              </button>
              <div style={{ maxHeight: activeFaq === idx ? "200px" : "0px", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <p style={{ padding: "0 20px 18px", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STRUCTURAL FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.02)", padding: "32px 5%", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between", background: "#010204" }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", lineHeight: 1.4 }}>
          FOCAL LENGTH MEDIA COMPANY PROFILE · RC 9528632
        </span>
        <a href="/" style={{ color: "#cda44e", fontSize: "0.65rem", letterSpacing: 2, textTransform: "uppercase", textDecoration: "none" }}>Top ↑</a>
      </footer>
    </div>
  );
}