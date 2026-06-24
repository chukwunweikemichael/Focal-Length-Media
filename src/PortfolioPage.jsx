import { useState, useEffect } from "react";

const LOGO_URL = "/length.jpeg";

/* Studio behind-the-scenes gallery */
const studioImages = [
  { src: "/portfolio/studio-01.jpg", caption: "On set — green screen studio, multi-cam setup" },
  { src: "/portfolio/studio-02.jpg", caption: "Vehicle shoot — controlled lighting rig" },
  { src: "/portfolio/studio-03.jpg", caption: "Living room set — interview production" },
  { src: "/portfolio/studio-04.jpg", caption: "Sitcom set — multi-camera coverage" },
  { src: "/portfolio/studio-05.jpg", caption: "Costume drama — full crew on set" },
  { src: "/portfolio/studio-06.jpg", caption: "Dance stage — live broadcast setup" },
  { src: "/portfolio/studio-07.jpg", caption: "Full studio floor — built sitcom sets" },
  { src: "/portfolio/studio-08.jpg", caption: "Fashion shoot — cast in costume" },
  { src: "/portfolio/studio-09.jpg", caption: "Automotive commercial — studio lighting" },
  { src: "/portfolio/studio-10.jpg", caption: "Dual vehicle shoot — cyclorama studio" },
];

/* YouTube showreel, grouped by category */
const showreel = [
  {
    category: "Feature Film",
    icon: "🎬",
    videos: [
      "https://youtu.be/c1ixjhem48w",
      "https://youtu.be/ik6fib8DV1k",
      "https://youtu.be/9D__LJIK_ao",
      "https://youtu.be/WoiVcFxcpak",
    ],
  },
  {
    category: "TV Commercials",
    icon: "📺",
    videos: [
      "https://youtu.be/sZWHjs_cs0w",
      "https://youtu.be/lysLnpy7kGY",
      "https://youtu.be/_A8pN3CnZ9g",
      "https://youtube.com/shorts/nP8AcalPalk",
    ],
  },
  {
    category: "Music Videos",
    icon: "🎵",
    videos: [
      "https://youtu.be/x_vTxQW8k-I",
      "https://youtu.be/ttdU19Kwce8",
      "https://youtu.be/hElHDjqXGLI",
      "https://youtu.be/bWxyVF1LJAo",
      "https://youtu.be/uzvlQWBRBWQ",
      "https://youtu.be/zzhKmRovdMY",
    ],
  },
];

/* Extract YouTube video ID from any youtu.be / youtube.com / shorts URL */
function getYouTubeId(url) {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightboxImg(null);
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{ background: "#06070a", color: "#f3f4f6", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        html, body { overflow-x: hidden; max-width: 100vw; background: #06070a; scroll-behavior: smooth; }

        /* Custom luxury scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06070a; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.5); }

        /* Floating multi-layered ambient space vibes */
        .ambient-glow {
          position: fixed; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%);
          z-index: 1; pointer-events: none; mix-blend-mode: screen;
          animation: floatGlow 28s infinite alternate ease-in-out;
        }
        .glow-2 {
          background: radial-gradient(circle, rgba(147,197,253,0.06) 0%, transparent 70%);
          animation-duration: 38s; animation-delay: -7s; right: -15%; top: 15%;
        }
        .glow-3 {
          background: radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 60%);
          animation-duration: 45s; animation-delay: -12s; left: 25%; bottom: -10%;
        }
        @keyframes floatGlow {
          0% { transform: translate(-10%, -15%) rotate(0deg) scale(1); }
          50% { transform: translate(15%, 10%) rotate(180deg) scale(1.15); }
          100% { transform: translate(-5%, 25%) rotate(360deg) scale(0.95); }
        }

        /* Particles / Film Grain Dust Effect */
        .film-grain {
          position: fixed; top: -50%; left: -50%; right: -50%; bottom: -50%;
          width: 200%; height: 200%; background: transparent url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.015"/%3E%3C/svg%3E') repeat;
          z-index: 2; pointer-events: none; animation: grain 1s steps(4) infinite;
        }
        @keyframes grain { 0%, 100% { transform:translate(0, 0); } 10% { transform:translate(-1%, -1%); } 30% { transform:translate(1%, -2%); } 50% { transform:translate(-2%, 1%); } 70% { transform:translate(1%, 2%); } }

        /* Dynamic Reveal Entrances */
        .fu{opacity:0;transform:translateY(50px) scale(0.98);transition:opacity 1.6s cubic-bezier(.16,1,.3,1),transform 1.6s cubic-bezier(.16,1,.3,1);}
        .fu.show{opacity:1;transform:translateY(0) scale(1);}
        .d1{transition-delay:.2s!important;} .d2{transition-delay:.4s!important;} .d3{transition-delay:.6s!important;}

        .serif { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #d4af37; text-shadow: 0 0 20px rgba(212,175,55,0.3); }
        
        .gold-grad {
          background: linear-gradient(90deg, #ffffff 0%, #ffe9b3 25%, #d4af37 50%, #ffe9b3 75%, #ffffff 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto; animation: textShine 7s linear infinite;
        }
        @keyframes textShine { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }

        .eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 7px;
          color: #d4af37; text-transform: uppercase;
          display: flex; align-items: center; gap: 18px;
        }
        .eyebrow .tick { width: 50px; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.8)); position: relative; overflow: hidden; }
        .eyebrow .tick::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, #fff, transparent); animation: lineShine 2.5s infinite linear;
        }
        @keyframes lineShine { 0% { left: -100%; } 100% { left: 100%; } }

        /* Decorative Ornaments */
        .ornament { display: flex; align-items: center; justify-content: center; gap: 24px; padding: 40px 0; }
        .ornament .line { height: 1px; width: 160px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4)); position: relative; }
        .ornament .line::after { content: ''; position: absolute; inset: 0; background: inherit; filter: blur(2px); }
        .ornament .line.right { background: linear-gradient(90deg, rgba(212,175,55,0.4), transparent); }
        .ornament .diamond { width: 7px; height: 7px; background: #d4af37; transform: rotate(45deg); box-shadow: 0 0 15px rgba(212,175,55,1); animation: pulseDiamond 2.5s infinite ease-in-out; }
        @keyframes pulseDiamond { 0%, 100% { transform: rotate(45deg) scale(1); box-shadow: 0 0 12px rgba(212,175,55,0.5); } 50% { transform: rotate(45deg) scale(1.4); box-shadow: 0 0 25px rgba(212,175,55,1); } }

        .back-link { color: rgba(255,255,255,0.4); font-size: 0.72rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; transition: all .5s cubic-bezier(.16,1,.3,1); position: relative; display: inline-flex; align-items: center; }
        .back-link::after { content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 1px; background: #d4af37; transition: width 0.4s ease; }
        .back-link:hover { color: #d4af37; transform: translateY(-2px); }
        .back-link:hover::after { width: 100%; }

        /* Premium Gallery Framework */
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; }
        .gallery-item {
          position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4/3; cursor: pointer; background: #0b0e14;
          border: 1px solid rgba(255,255,255,0.02); box-shadow: 0 15px 45px rgba(0,0,0,0.4);
          transition: all .7s cubic-bezier(.16,1,.3,1); transform-style: preserve-3d; transform: perspective(1000px);
        }
        /* Double framing outer glow lines on hover */
        .gallery-item::before {
          content: ''; position: absolute; inset: 0; border: 1px solid transparent; border-radius: 16px;
          background: linear-gradient(135deg, rgba(212,175,55,0.5), transparent 30%, transparent 70%, rgba(212,175,55,0.3)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.6s ease; z-index: 5;
        }
        .gallery-item:hover { transform: translateY(-14px) scale(1.03) rotateX(2deg); box-shadow: 0 45px 90px rgba(0,0,0,0.85), 0 0 30px rgba(212,175,55,0.05); }
        .gallery-item:hover::before { opacity: 1; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.75) contrast(1.02); transition: all .8s cubic-bezier(.16,1,.3,1); }
        .gallery-item:hover img { filter: brightness(1.02) contrast(1.06); transform: scale(1.1); }
        
        .gallery-caption {
          position: absolute; inset: 0; background: linear-gradient(180deg, transparent 20%, rgba(5,6,10,0.95) 100%);
          display: flex; align-items: flex-end; padding: 32px; opacity: 0; transform: translateY(20px); transition: all .5s cubic-bezier(.16,1,.3,1); z-index: 3;
        }
        .gallery-item:hover .gallery-caption { opacity: 1; transform: translateY(0); }
        .gallery-caption span { font-size: 0.88rem; color: #fff; font-weight: 500; line-height: 1.6; letter-spacing: 0.4px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        
        .gallery-zoom-icon {
          position: absolute; top: 24px; right: 24px; width: 44px; height: 44px; border-radius: 50%;
          background: rgba(5,6,10,0.85); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.1rem;
          opacity: 0; backdrop-filter: blur(8px); transform: scale(0.6); transition: all .45s cubic-bezier(.16,1,.3,1); z-index: 4;
        }
        .gallery-item:hover .gallery-zoom-icon { opacity: 1; transform: scale(1) rotate(90deg); border-color: rgba(212,175,55,0.7); color: #d4af37; box-shadow: 0 0 15px rgba(212,175,55,0.3); }

        /* Production Videos Elements */
        .reel-category { margin-bottom: 100px; }
        .reel-category:last-child { margin-bottom: 0; }
        .reel-head { display: flex; align-items: center; gap: 20px; margin-bottom: 40px; padding-bottom: 22px; border-bottom: 1px solid rgba(212,175,55,0.18); }
        .reel-icon { font-size: 2rem; filter: drop-shadow(0 0 12px rgba(212,175,55,0.4)); animation: iconWobble 4.5s infinite ease-in-out; }
        @keyframes iconWobble { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-5px) scale(1.05); } }
        
        .reel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 36px; }
        .video-card {
          position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 16/9; cursor: pointer; background: #0b0e14;
          border: 1px solid rgba(255,255,255,0.02); box-shadow: 0 20px 50px rgba(0,0,0,0.45); transition: all .7s cubic-bezier(.16,1,.3,1);
        }
        /* Glossy hyper-shine sweep */
        .video-card::after {
          content: ''; position: absolute; top: 0; left: -150%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: skewX(-25deg); transition: none; z-index: 2;
        }
        .video-card:hover::after { left: 250%; transition: all 1s cubic-bezier(0.3, 1, 0.2, 1); }
        .video-card:hover { border-color: rgba(212,175,55,0.6); transform: translateY(-10px) scale(1.02); box-shadow: 0 40px 80px rgba(0,0,0,0.75), 0 0 25px rgba(212,175,55,0.1); }
        .video-card img { width: 100%; height: 100%; object-fit: cover; transition: all .8s cubic-bezier(.16,1,.3,1); filter: brightness(0.65) contrast(1.05); }
        .video-card:hover img { transform: scale(1.06); filter: brightness(0.82); }
        
        .play-button {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.85);
          width: 76px; height: 76px; border-radius: 50%; background: rgba(212,175,55,0.95);
          display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 35px rgba(212,175,55,0.4);
          transition: all .45s cubic-bezier(.16,1,.3,1); z-index: 3;
        }
        .video-card:hover .play-button { background: #f0d57b; transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 25px 50px rgba(212,175,55,0.7); }
        .play-button::after { content: ''; border-style: solid; border-width: 12px 0 12px 22px; border-color: transparent transparent transparent #06070a; margin-left: 6px; }

        /* Lightbox overlays animations */
        .lightbox-overlay {
          position: fixed; inset: 0; z-index: 3000; background: rgba(3,4,6,0.98);
          display: flex; align-items: center; justify-content: center; padding: 40px 20px;
          backdrop-filter: blur(16px); animation: fadeInLb .4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes fadeInLb { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(16px); } }
        
        .lightbox-img {
          max-width: 92vw; max-height: 84vh; border-radius: 14px; border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 60px 130px rgba(0,0,0,0.95); transform: scale(0.93); animation: zoomIn .45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes zoomIn { to { transform: scale(1); } }
        
        .lightbox-close {
          position: absolute; top: 32px; right: 32px; width: 54px; height: 54px; border-radius: 50%;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.18);
          color: #fff; font-size: 1.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(5px); transition: all .35s ease;
        }
        .lightbox-close:hover { background: rgba(212,175,55,0.3); border-color: #d4af37; color: #d4af37; transform: rotate(90deg) scale(1.08); box-shadow: 0 0 15px rgba(212,175,55,0.4); }

        .video-lightbox-frame {
          width: min(94vw, 1200px); aspect-ratio: 16/9; border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 60px 130px rgba(0,0,0,0.98);
          transform: scale(0.93); animation: zoomIn .45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .video-lightbox-frame iframe { width: 100%; height: 100%; border: none; }

        @media (max-width: 768px) {
          .nav-bar-pf { padding: 18px 6% !important; }
          .hero-sec-pf { padding: 160px 6% 60px !important; min-height: 48vh !important; }
          .gallery-sec-pf, .reel-sec-pf { padding: 70px 6% !important; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important; gap: 24px !important; }
          .reel-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .reel-category { margin-bottom: 60px !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .play-button { width: 60px !important; height: 60px !important; }
          .play-button::after { border-width: 10px 0 10px 18px; margin-left: 5px; }
        }
      `}</style>

      {/* Film Grain & Multi-Atmosphere Space Vibes */}
      <div className="film-grain" />
      <div className="ambient-glow" />
      <div className="ambient-glow glow-2" />
      <div className="ambient-glow glow-3" />

      {/* ===== NAV ===== */}
      <nav className="nav-bar-pf" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "22px 6%", display: "flex", alignItems: "center", justifyBetween: "space-between", background: "rgba(6,7,10,0.85)", backdropFilter: "blur(30px)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 40, width: 40, objectFit: "cover", borderRadius: 9, border: "1px solid rgba(255,255,255,0.12)", transition: "transform 0.6s cubic-bezier(.16,1,.3,1)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg) scale(1.08)"} onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1)"} />
          <span style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 800, letterSpacing: 7, transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#d4af37"} onMouseLeave={(e) => e.currentTarget.style.color = "#fff"}>FOCAL LENGTH</span>
        </a>
        <a href="/" className="back-link">← Back Home</a>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-sec-pf" style={{ minHeight: "58vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "180px 6% 80px", position: "relative", background: "radial-gradient(circle at 50% 35%, #10141f 0%, #06070a 80%)", zIndex: 3 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,175,55,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.01) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className={`fu ${loaded ? "show" : ""}`} style={{ position: "relative", zIndex: 4 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}><span className="tick" />Our Work<span className="tick" /></div>
          <h1 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.2rem,9vw,7rem)", letterSpacing: "0.08em", lineHeight: 1.05, margin: 0, fontWeight: 400 }}>
            PORTFOLIO
          </h1>
          <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.1rem,2.3vw,1.45rem)", letterSpacing: "0.01em", color: "rgba(255,255,255,0.55)", marginTop: 24, fontWeight: 400, maxWidth: 680, lineHeight: 1.7 }}>
            From the studio floor to the final cut — a curated view inside our cinematic productions.
          </p>
        </div>
      </section>

      <div className="ornament"><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== STUDIO GALLERY ===== */}
      <section className={`gallery-sec-pf fu d1 ${loaded ? "show" : ""}`} style={{ padding: "100px 6%", maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 3 }}>
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Behind The Scenes<span className="tick" /></div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, margin: "20px 0 0", color: "#f4f1e9" }}>
            Inside the <span className="gold">studio floor</span>
          </h2>
        </div>

        <div className="gallery-grid">
          {studioImages.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => setLightboxImg(img)}>
              <img src={img.src} alt={img.caption} loading="lazy" />
              <div className="gallery-zoom-icon">⤢</div>
              <div className="gallery-caption"><span>{img.caption}</span></div>
            </div>
          ))}
        </div>
      </section>

      <div className="ornament"><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== SHOWREEL ===== */}
      <section className="reel-sec-pf" style={{ background: "linear-gradient(180deg, #0b0e14 0%, #06070a 100%)", padding: "110px 6%", position: "relative", zIndex: 3 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className={`fu ${loaded ? "show" : ""}`} style={{ textAlign: "center", marginBottom: 75 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Showreel<span className="tick" /></div>
            <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.6rem,5vw,4.2rem)", letterSpacing: "0.06em", margin: "22px 0 0", fontWeight: 400 }}>
              SELECTED WORK
            </h2>
          </div>

          {showreel.map((cat, ci) => (
            <div key={cat.category} className={`reel-category fu d${Math.min(ci + 1, 3)} ${loaded ? "show" : ""}`}>
              <div className="reel-head">
                <span className="reel-icon">{cat.icon}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.1em", margin: 0, color: "#f4f1e9", fontWeight: 400 }}>
                  {cat.category.toUpperCase()}
                </h3>
              </div>
              <div className="reel-grid">
                {cat.videos.map((url, vi) => {
                  const id = getYouTubeId(url);
                  if (!id) return null;
                  return (
                    <div key={vi} className="video-card" onClick={() => setActiveVideo(id)}>
                      <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={`${cat.category} ${vi + 1}`} loading="lazy" />
                      <div className="play-button" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ornament" style={{ paddingBottom: 70 }}><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.02)", padding: "50px 6%", display: "flex", flexWrap: "wrap", gap: 26, alignItems: "center", justifyContent: "space-between", background: "#030406", position: "relative", zIndex: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 34, width: 34, objectFit: "cover", borderRadius: 7, opacity: 0.8 }} />
          <span style={{ fontSize: "0.68rem", letterSpacing: 5, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontWeight: 600 }}>
            RC: 9528632 · Lagos, Nigeria
          </span>
        </div>
        <a href="/" className="back-link" style={{ fontSize: "0.7rem" }}>← Back to Home</a>
      </footer>

      {/* ===== IMAGE LIGHTBOX ===== */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
          <img src={lightboxImg.src} alt={lightboxImg.caption} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* ===== VIDEO LIGHTBOX ===== */}
      {activeVideo && (
        <div className="lightbox-overlay" onClick={() => setActiveVideo(null)}>
          <button className="lightbox-close" onClick={() => setActiveVideo(null)}>✕</button>
          <div className="video-lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="FLM Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}