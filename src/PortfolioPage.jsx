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
    <div style={{ background: "#050607", color: "#fff", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        html, body { overflow-x: hidden; max-width: 100vw; }

        .fu{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);}
        .fu.show{opacity:1;transform:translateY(0);}
        .d1{transition-delay:.05s!important;} .d2{transition-delay:.14s!important;} .d3{transition-delay:.23s!important;}

        .serif { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #cda44e; }
        .gold-grad {
          background: linear-gradient(180deg,#fff 30%,#e9dfc4 60%,#cda44e 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }

        .eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 4px;
          color: #cda44e; text-transform: uppercase;
          display: flex; align-items: center; gap: 14px;
        }
        .eyebrow .tick { width: 22px; height: 1px; background: rgba(205,164,78,0.5); }

        .ornament { display: flex; align-items: center; justify-content: center; gap: 16px; }
        .ornament .line { height: 1px; width: 60px; background: linear-gradient(90deg, transparent, rgba(205,164,78,0.45)); }
        .ornament .line.right { background: linear-gradient(90deg, rgba(205,164,78,0.45), transparent); }
        .ornament .diamond { width: 6px; height: 6px; background: #cda44e; transform: rotate(45deg); box-shadow: 0 0 10px rgba(205,164,78,0.5); }

        .back-link { color: rgba(255,255,255,0.5); font-size: 0.75rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: color .25s; }
        .back-link:hover { color: #cda44e; }

        /* Gallery */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }
        .gallery-item {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.06);
          transition: all .4s cubic-bezier(.16,1,.3,1);
        }
        .gallery-item:hover { border-color: rgba(205,164,78,0.35); transform: translateY(-4px); box-shadow: 0 24px 50px rgba(0,0,0,0.5); }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.92) contrast(1.04); transition: filter .4s ease, transform .5s ease; }
        .gallery-item:hover img { filter: brightness(1) contrast(1.08); transform: scale(1.05); }
        .gallery-caption {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(5,6,7,0.92) 100%);
          display: flex; align-items: flex-end; padding: 16px;
          opacity: 0; transition: opacity .3s ease;
        }
        .gallery-item:hover .gallery-caption { opacity: 1; }
        .gallery-caption span { font-size: 0.78rem; color: rgba(255,255,255,0.85); font-weight: 500; line-height: 1.4; }
        .gallery-zoom-icon {
          position: absolute; top: 12px; right: 12px;
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 0.85rem; opacity: 0; transition: opacity .3s ease;
        }
        .gallery-item:hover .gallery-zoom-icon { opacity: 1; }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(0,0,0,0.94);
          display: flex; align-items: center; justify-content: center;
          padding: 40px 20px;
          animation: fadeInLb .25s ease;
        }
        @keyframes fadeInLb { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-img { max-width: 92vw; max-height: 86vh; border-radius: 4px; box-shadow: 0 40px 100px rgba(0,0,0,0.7); }
        .lightbox-close {
          position: absolute; top: 24px; right: 28px;
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          color: #fff; font-size: 1.3rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .lightbox-close:hover { background: rgba(205,164,78,0.2); border-color: rgba(205,164,78,0.4); }

        /* Showreel category */
        .reel-category { margin-bottom: 70px; }
        .reel-category:last-child { margin-bottom: 0; }
        .reel-head {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 28px; padding-bottom: 16px;
          border-bottom: 1px solid rgba(205,164,78,0.18);
        }
        .reel-icon { font-size: 1.4rem; }
        .reel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 22px;
        }
        .video-card {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 16/9;
          cursor: pointer;
          background: #0a0d14;
          border: 1px solid rgba(255,255,255,0.07);
          transition: all .35s cubic-bezier(.16,1,.3,1);
        }
        .video-card:hover { border-color: rgba(205,164,78,0.35); transform: translateY(-4px); box-shadow: 0 24px 50px rgba(0,0,0,0.5); }
        .video-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease, filter .4s ease; filter: brightness(0.82); }
        .video-card:hover img { transform: scale(1.06); filter: brightness(0.95); }
        .play-button {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(205,164,78,0.92);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          transition: all .3s ease;
        }
        .video-card:hover .play-button { background: #cda44e; transform: translate(-50%, -50%) scale(1.1); }
        .play-button::after {
          content: ''; border-style: solid; border-width: 9px 0 9px 15px;
          border-color: transparent transparent transparent #050607;
          margin-left: 3px;
        }

        /* Video lightbox */
        .video-lightbox-frame {
          width: min(90vw, 960px);
          aspect-ratio: 16/9;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7);
        }
        .video-lightbox-frame iframe { width: 100%; height: 100%; border: none; }

        @media (max-width: 768px) {
          .nav-bar-pf { padding: 18px 6% !important; }
          .hero-sec-pf { padding: 120px 6% 50px !important; min-height: 50vh !important; }
          .gallery-sec-pf, .reel-sec-pf { padding: 70px 6% !important; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(45vw, 1fr)) !important; gap: 12px !important; }
          .reel-grid { grid-template-columns: 1fr !important; }
          .reel-category { margin-bottom: 50px !important; }
        }

        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .play-button { width: 46px !important; height: 46px !important; }
        }
      `}</style>

      {/* ===== NAV ===== */}
      <nav className="nav-bar-pf" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "22px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(5,6,7,0.88)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 34, width: 34, objectFit: "cover", borderRadius: 6 }} />
          <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 800, letterSpacing: 5 }}>FOCAL LENGTH</span>
        </a>
        <a href="/" className="back-link">← Back Home</a>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-sec-pf" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "150px 6% 60px", position: "relative", background: "radial-gradient(ellipse at 50% 25%, #0c0f14 0%, #050607 72%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(205,164,78,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(205,164,78,0.012) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className={`fu ${loaded ? "show" : ""}`} style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}><span className="tick" />Our Work<span className="tick" /></div>
          <h1 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.4rem,7vw,5.4rem)", letterSpacing: "0.09em", lineHeight: 1, margin: 0 }}>
            PORTFOLIO
          </h1>
          <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1rem,2.4vw,1.4rem)", letterSpacing: "0.02em", color: "rgba(255,255,255,0.5)", marginTop: 22, fontWeight: 400, maxWidth: 600 }}>
            From the studio floor to the final cut — a look inside our productions.
          </p>
        </div>
      </section>

      <div className="ornament"><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== STUDIO GALLERY ===== */}
      <section className={`gallery-sec-pf fu d1 ${loaded ? "show" : ""}`} style={{ padding: "100px 6%", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Behind The Scenes<span className="tick" /></div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, margin: "22px 0 0", color: "#f4f1e9" }}>
            Inside the <span className="gold">studio</span>
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
      <section className="reel-sec-pf" style={{ background: "linear-gradient(135deg,#0a0d12 0%,#06070a 60%,#050607 100%)", padding: "110px 6%" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div className={`fu ${loaded ? "show" : ""}`} style={{ textAlign: "center", marginBottom: 68 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Showreel<span className="tick" /></div>
            <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,4.6vw,3.4rem)", letterSpacing: "0.05em", margin: "24px 0 0" }}>
              SELECTED WORK
            </h2>
          </div>

          {showreel.map((cat, ci) => (
            <div key={cat.category} className={`reel-category fu d${Math.min(ci + 1, 3)} ${loaded ? "show" : ""}`}>
              <div className="reel-head">
                <span className="reel-icon">{cat.icon}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.08em", margin: 0, color: "#f4f1e9" }}>
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

      <div className="ornament" style={{ paddingBottom: 60 }}><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "50px 6%", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between", background: "#020304" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 30, borderRadius: 4, opacity: 0.85 }} />
          <span style={{ fontSize: "0.62rem", letterSpacing: 4, color: "rgba(255,255,255,0.22)", textTransform: "uppercase", fontWeight: 600 }}>
            RC: 9528632 · Lagos, Nigeria
          </span>
        </div>
        <a href="/" className="back-link" style={{ fontSize: "0.68rem" }}>← Back to Home</a>
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