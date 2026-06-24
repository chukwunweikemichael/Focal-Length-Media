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
    <div style={{ background: "#0a0c10", color: "#f3f4f6", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        html, body { overflow-x: hidden; max-width: 100vw; background: #0a0c10; }

        .fu{opacity:0;transform:translateY(30px);transition:opacity 1.2s cubic-bezier(.16,1,.3,1),transform 1.2s cubic-bezier(.16,1,.3,1);}
        .fu.show{opacity:1;transform:translateY(0);}
        .d1{transition-delay:.1s!important;} .d2{transition-delay:.2s!important;} .d3{transition-delay:.3s!important;}

        .serif { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #d4af37; }
        .gold-grad {
          background: linear-gradient(180deg, #ffffff 10%, #f3e5ab 50%, #d4af37 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }

        .eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 5px;
          color: #d4af37; text-transform: uppercase;
          display: flex; align-items: center; gap: 16px;
        }
        .eyebrow .tick { width: 30px; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.6)); }
        .eyebrow .tick:last-child { background: linear-gradient(90deg, rgba(212,175,55,0.6), transparent); }

        .ornament { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 20px 0; }
        .ornament .line { height: 1px; width: 100px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3)); }
        .ornament .line.right { background: linear-gradient(90deg, rgba(212,175,55,0.3), transparent); }
        .ornament .diamond { width: 6px; height: 6px; background: #d4af37; transform: rotate(45deg); box-shadow: 0 0 12px rgba(212,175,55,0.8); }

        .back-link { color: rgba(255,255,255,0.45); font-size: 0.72rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: all .3s ease; display: inline-flex; align-items: center; }
        .back-link:hover { color: #d4af37; transform: translateX(-3px); }

        /* Gallery */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .gallery-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          background: #11141a;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          transition: all .5s cubic-bezier(.16,1,.3,1);
        }
        .gallery-item:hover { 
          border-color: rgba(212,175,55,0.4); 
          transform: translateY(-8px); 
          box-shadow: 0 30px 60px rgba(0,0,0,0.65); 
        }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85) contrast(1.02); transition: all .6s cubic-bezier(.16,1,.3,1); }
        .gallery-item:hover img { filter: brightness(1) contrast(1.05); transform: scale(1.06); }
        
        .gallery-caption {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10,12,16,0.95) 100%);
          display: flex; align-items: flex-end; padding: 24px;
          opacity: 0; transform: translateY(10px); transition: all .4s ease;
        }
        .gallery-item:hover .gallery-caption { opacity: 1; transform: translateY(0); }
        .gallery-caption span { font-size: 0.82rem; color: #f3f4f6; font-weight: 500; line-height: 1.5; letter-spacing: 0.3px; }
        
        .gallery-zoom-icon {
          position: absolute; top: 16px; right: 16px;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(10,12,16,0.75); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 0.95rem; opacity: 0; backdrop-filter: blur(4px); transition: all .3s ease;
        }
        .gallery-item:hover .gallery-zoom-icon { opacity: 1; transform: rotate(90deg); border-color: rgba(212,175,55,0.5); color: #d4af37; }

        /* Showreel category */
        .reel-category { margin-bottom: 80px; }
        .reel-category:last-child { margin-bottom: 0; }
        .reel-head {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 32px; padding-bottom: 18px;
          border-bottom: 1px solid rgba(212,175,55,0.15);
        }
        .reel-icon { font-size: 1.6rem; filter: drop-shadow(0 0 8px rgba(212,175,55,0.3)); }
        
        .reel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        .video-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16/9;
          cursor: pointer;
          background: #11141a;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
          transition: all .5s cubic-bezier(.16,1,.3,1);
        }
        .video-card:hover { 
          border-color: rgba(212,175,55,0.4); 
          transform: translateY(-6px); 
          box-shadow: 0 32px 64px rgba(0,0,0,0.6); 
        }
        .video-card img { width: 100%; height: 100%; object-fit: cover; transition: all .6s cubic-bezier(.16,1,.3,1); filter: brightness(0.75) contrast(1.05); }
        .video-card:hover img { transform: scale(1.04); filter: brightness(0.9); }
        
        .play-button {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(212,175,55,0.9);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 28px rgba(212,175,55,0.3);
          transition: all .35s cubic-bezier(.16,1,.3,1);
        }
        .video-card:hover .play-button { background: #e5c158; transform: translate(-50%, -50%) scale(1.12); box-shadow: 0 15px 32px rgba(212,175,55,0.5); }
        .play-button::after {
          content: ''; border-style: solid; border-width: 10px 0 10px 18px;
          border-color: transparent transparent transparent #0a0c10;
          margin-left: 4px;
        }

        /* Lightbox overlays */
        .lightbox-overlay {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(6,8,12,0.96);
          display: flex; align-items: center; justify-content: center;
          padding: 40px 20px;
          backdrop-filter: blur(8px);
          animation: fadeInLb .3s ease forwards;
        }
        @keyframes fadeInLb { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-img { max-width: 90vw; max-height: 84vh; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 50px 100px rgba(0,0,0,0.85); }
        
        .lightbox-close {
          position: absolute; top: 32px; right: 32px;
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15);
          color: #fff; font-size: 1.2rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px); transition: all .25s ease;
        }
        .lightbox-close:hover { background: rgba(212,175,55,0.2); border-color: #d4af37; color: #d4af37; transform: rotate(90deg); }

        .video-lightbox-frame {
          width: min(92vw, 1080px);
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 50px 100px rgba(0,0,0,0.9);
        }
        .video-lightbox-frame iframe { width: 100%; height: 100%; border: none; }

        @media (max-width: 768px) {
          .nav-bar-pf { padding: 16px 5% !important; }
          .hero-sec-pf { padding: 140px 5% 60px !important; min-height: 45vh !important; }
          .gallery-sec-pf, .reel-sec-pf { padding: 60px 5% !important; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important; gap: 16px !important; }
          .reel-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .reel-category { margin-bottom: 45px !important; }
        }

        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .play-button { width: 52px !important; height: 52px !important; }
          .play-button::after { border-width: 8px 0 8px 14px; margin-left: 3px; }
        }
      `}</style>

      {/* ===== NAV ===== */}
      <nav className="nav-bar-pf" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "20px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,12,16,0.82)", backdropFilter: "blur(30px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 36, width: 36, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }} />
          <span style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 800, letterSpacing: 6 }}>FOCAL LENGTH</span>
        </a>
        <a href="/" className="back-link">← Back Home</a>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-sec-pf" style={{ minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "160px 6% 70px", position: "relative", background: "radial-gradient(circle at 50% 30%, #131822 0%, #0a0c10 70%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,175,55,0.008) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.008) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className={`fu ${loaded ? "show" : ""}`} style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}><span className="tick" />Our Work<span className="tick" /></div>
          <h1 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem,8vw,6rem)", letterSpacing: "0.08em", lineHeight: 1.05, margin: 0, fontWeight: 400 }}>
            PORTFOLIO
          </h1>
          <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.05rem,2.2vw,1.35rem)", letterSpacing: "0.01em", color: "rgba(255,255,255,0.55)", marginTop: 20, fontWeight: 400, maxWidth: 640, lineHeight: 1.6 }}>
            From the studio floor to the final cut — a curated view inside our cinematic productions.
          </p>
        </div>
      </section>

      <div className="ornament"><span className="line" /><span className="diamond" /><span className="line right" /></div>

      {/* ===== STUDIO GALLERY ===== */}
      <section className={`gallery-sec-pf fu d1 ${loaded ? "show" : ""}`} style={{ padding: "90px 6%", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Behind The Scenes<span className="tick" /></div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.8rem,3.8vw,2.8rem)", fontWeight: 400, margin: "18px 0 0", color: "#f4f1e9" }}>
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
      <section className="reel-sec-pf" style={{ background: "linear-gradient(180deg, #0e1117 0%, #0a0c10 100%)", padding: "100px 6%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className={`fu ${loaded ? "show" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />Showreel<span className="tick" /></div>
            <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem,4.5vw,3.6rem)", letterSpacing: "0.06em", margin: "20px 0 0", fontWeight: 400 }}>
              SELECTED WORK
            </h2>
          </div>

          {showreel.map((cat, ci) => (
            <div key={cat.category} className={`reel-category fu d${Math.min(ci + 1, 3)} ${loaded ? "show" : ""}`}>
              <div className="reel-head">
                <span className="reel-icon">{cat.icon}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.09em", margin: 0, color: "#f4f1e9", fontWeight: 400 }}>
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
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.03)", padding: "44px 6%", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between", background: "#06080b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 32, width: 32, objectFit: "cover", borderRadius: 6, opacity: 0.8 }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: 4, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontWeight: 600 }}>
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