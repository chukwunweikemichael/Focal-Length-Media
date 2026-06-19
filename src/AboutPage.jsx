import { useState, useEffect } from "react";

const LOGO_URL = "/length.jpeg";
const DIRECTOR_1_IMG = "/team/olaniyan-olugbenga.jpg";
const DIRECTOR_2_IMG = "/team/alagbile-matthew.jpg";

const pillars = [
  { icon: "🎥", title: "Video Production", desc: "Commercials, brand films, documentaries, event coverage." },
  { icon: "✍️", title: "Creative Direction", desc: "Scripting, storyboarding, visual identity." },
  { icon: "🎞️", title: "Post Production", desc: "Editing, color grading, motion graphics, sound design." },
  { icon: "📱", title: "Digital Content", desc: "Short-form content for TikTok, Instagram & YouTube that actually gets watched." },
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
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: "#030406", color: "#fff", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        .fu{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
        .fu.show{opacity:1;transform:translateY(0);}
        .d1{transition-delay:.05s!important;} .d2{transition-delay:.15s!important;} .d3{transition-delay:.25s!important;}
        .d4{transition-delay:.35s!important;} .d5{transition-delay:.45s!important;}
        .pillar-card{background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.04);border-radius:14px;padding:32px 26px;transition:all .4s cubic-bezier(.16,1,.3,1);}
        .pillar-card:hover{background:rgba(212,175,55,0.025);border-color:rgba(212,175,55,0.18);transform:translateY(-4px);}
        .svc-card{background:rgba(255,255,255,0.012);border:1px solid rgba(255,255,255,0.035);border-radius:10px;padding:18px 20px;transition:all .3s ease;}
        .svc-card:hover{background:rgba(212,175,55,0.02);border-color:rgba(212,175,55,0.15);}
        .value-row{border-bottom:1px solid rgba(255,255,255,0.04);padding:30px 0;display:flex;gap:28px;align-items:flex-start;}
        .value-row:last-child{border-bottom:none;}
        .team-card{background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.04);border-radius:20px;overflow:hidden;transition:all .4s ease;}
        .team-card:hover{border-color:rgba(212,175,55,0.2);box-shadow:0 30px 60px rgba(0,0,0,0.5);}
        .team-photo-wrap{position:relative;width:100%;aspect-ratio:4/5;overflow:hidden;background:#0a0d14;}
        .team-photo-wrap img{width:100%;height:100%;object-fit:cover;filter:grayscale(15%) contrast(1.05);transition:filter .4s ease;}
        .team-card:hover .team-photo-wrap img{filter:grayscale(0%) contrast(1.1);}
        .team-photo-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(3,4,6,0.95) 100%);}
        .manifesto-line{border-bottom:1px solid rgba(255,255,255,0.04);padding:26px 0;}
        .manifesto-line:last-child{border-bottom:none;}
        .gold{color:#d4af37;}
        .section-label{font-size:0.72rem;font-weight:800;letter-spacing:4px;color:#d4af37;text-transform:uppercase;border-bottom:1px solid rgba(212,175,55,0.3);padding-bottom:6px;display:inline-block;}
      `}</style>

      {/* ===== NAV ===== */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "22px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(3,4,6,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 34, width: 34, objectFit: "cover", borderRadius: 6 }} />
          <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 800, letterSpacing: 5 }}>FOCAL LENGTH</span>
        </a>
        <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none" }}>
          ← Back Home
        </a>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{ minHeight: "78vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "140px 6% 60px", position: "relative", background: "radial-gradient(circle at 50% 30%, #0a0d14 0%, #030406 75%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,175,55,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.01) 1px,transparent 1px)", backgroundSize: "70px 70px" }} />
        <div className={`fu ${loaded ? "show" : ""}`} style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: 4, color: "rgba(255,255,255,0.35)", marginBottom: 24, fontWeight: 600 }}>
            RC: 9528632 &nbsp;·&nbsp; LAGOS, NIGERIA
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.6rem,7vw,5.5rem)", letterSpacing: "0.1em", lineHeight: 1, margin: 0, background: "linear-gradient(180deg,#fff 35%,#dfdacb 65%,#d4af37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            COMPANY PROFILE
          </h1>
          <p style={{ fontSize: "clamp(0.85rem,2vw,1.1rem)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: 22, fontWeight: 300 }}>
            The Future
          </p>
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className={`fu d1 ${loaded ? "show" : ""}`} style={{ padding: "100px 6% 90px", maxWidth: 980, margin: "0 auto" }}>
        <span className="section-label" style={{ marginBottom: 28, display: "block", width: "fit-content" }}>About Us</span>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,4.5vw,3.4rem)", letterSpacing: "0.04em", lineHeight: 1.15, margin: "0 0 32px" }}>
          A creative production company that turns ideas and stories into <span className="gold">magical visuals</span>.
        </h2>
        <p style={{ fontSize: "1.02rem", lineHeight: 2, color: "rgba(255,255,255,0.55)", fontWeight: 300, marginBottom: 24 }}>
          At Focal Length Media, we believe every brand, artist and idea has a story worth telling right. Our focus is on the in-between moments — the details, emotions and perspective that make content stick. From corporate campaigns and documentaries to music videos and social content, we handle concept to final cut with one goal: make it sharp, cinematic and unforgettable.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, auto)", gap: "14px 60px", marginTop: 36 }}>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 6 }}>Address</div>
            <div style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.7)" }}>2 Bolaji Street, off Kudirat Abiola Way, Ikeja, Lagos</div>
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 6 }}>Contact</div>
            <div style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.7)" }}>focallengthmedia26@gmail.com · 0706 734 9942</div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO — 4 PILLARS ===== */}
      <section className={`fu d2 ${loaded ? "show" : ""}`} style={{ padding: "0 6% 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
          {pillars.map((p) => (
            <div key={p.title} className="pillar-card">
              <div style={{ fontSize: "1.8rem", marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.06em", margin: "0 0 10px" }}>{p.title}</h3>
              <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 50, fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)" }}>
          Get the shot. Tell the story. <span className="gold">Make it matter.</span>
        </p>
      </section>

      {/* ===== SERVICES ===== */}
      <section style={{ background: "linear-gradient(135deg,#090d14 0%,#05070a 60%,#030406 100%)", padding: "100px 6%", borderTop: "1px solid rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`fu ${loaded ? "show" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-label">Services</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem,5vw,3.6rem)", letterSpacing: "0.06em", margin: "22px 0 0" }}>
              EVERYTHING UNDER <span className="gold">ONE LENS</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 40 }}>
            {serviceGroups.map((g, gi) => (
              <div key={g.title} className={`fu d${Math.min(gi + 1, 5)} ${loaded ? "show" : ""}`}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "0.1em", color: "#d4af37", margin: "0 0 18px", paddingBottom: 12, borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
                  {g.title.toUpperCase()}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {g.items.map(([t, d]) => (
                    <div key={t} className="svc-card">
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff", marginBottom: 4 }}>{t}</div>
                      <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className={`fu ${loaded ? "show" : ""}`} style={{ padding: "100px 6%", maxWidth: 900, margin: "0 auto" }}>
        <span className="section-label">Our Values</span>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: "0.05em", margin: "22px 0 50px" }}>
          WHAT WE STAND <span className="gold">FOR</span>
        </h2>
        {values.map((v) => (
          <div key={v.num} className="value-row">
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: "rgba(212,175,55,0.3)", flexShrink: 0, lineHeight: 1 }}>{v.num}</div>
            <div>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.08em", margin: "0 0 8px", color: "#fff" }}>{v.title.toUpperCase()}</h4>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0, fontWeight: 300, maxWidth: 600 }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ===== MANIFESTO ===== */}
      <section style={{ background: "linear-gradient(135deg,#1a0505 0%,#0f0f0f 55%,#030406 100%)", padding: "100px 6%", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,57,43,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className={`fu ${loaded ? "show" : ""}`} style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <span className="section-label">The Manifesto</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "0.04em", margin: "22px 0 46px" }}>
            HOW WE <span style={{ color: "#c0392b" }}>MOVE</span>
          </h2>
          {manifesto.map((m, i) => (
            <div key={m.ph} className="manifesto-line">
              <div style={{ fontSize: "0.68rem", letterSpacing: 3, color: "#c0392b", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>
                0{i + 1} — {m.ph}
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem,2.5vw,1.7rem)", letterSpacing: "0.02em", color: "rgba(255,255,255,0.9)" }}>
                {m.en}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LEADERSHIP TEAM ===== */}
      <section className={`fu ${loaded ? "show" : ""}`} style={{ padding: "110px 6% 130px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label">Leadership</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem,5vw,3.6rem)", letterSpacing: "0.06em", margin: "22px 0 0" }}>
            THE MANAGEMENT <span className="gold">TEAM</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 40 }}>
          {team.map((m) => (
            <div key={m.name} className="team-card">
              <div className="team-photo-wrap">
                <img src={m.img} alt={m.name} onError={(e) => { e.target.style.display = "none"; }} />
                <div className="team-photo-overlay" />
                <div style={{ position: "absolute", bottom: 24, left: 28, right: 28 }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.7rem", letterSpacing: "0.04em", margin: 0, color: "#fff" }}>
                    {m.name}
                  </h3>
                  <div style={{ fontSize: "0.8rem", color: "#d4af37", fontWeight: 600, letterSpacing: "0.05em", marginTop: 4 }}>
                    "{m.alias}" · {m.role}
                  </div>
                </div>
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <p style={{ fontSize: "0.86rem", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", fontWeight: 300, margin: "0 0 16px" }}>
                  {m.bio}
                </p>
                <p style={{ fontSize: "0.86rem", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", fontWeight: 300, margin: "0 0 20px" }}>
                  {m.bio2}
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18 }}>
                  {m.credentials.map((c) => (
                    <div key={c} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
                      <span style={{ color: "#d4af37", flexShrink: 0 }}>—</span>{c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.03)", padding: "50px 6%", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between", background: "#020304" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 30, borderRadius: 4, opacity: 0.85 }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: 4, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", fontWeight: 600 }}>
            RC: 9528632 · Lagos, Nigeria
          </span>
        </div>
        <a href="/" style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", letterSpacing: 2, textDecoration: "none" }}>← Back to Home</a>
      </footer>
    </div>
  );
}