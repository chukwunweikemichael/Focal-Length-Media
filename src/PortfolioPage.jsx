import { useState, useEffect, useRef } from "react";

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
  { src: "/portfolio/studio-11.jpg", caption: "Dance Nation Dance — contestants on stage" },
  { src: "/portfolio/studio-12.jpg", caption: "Studio floor — multi-zone game show layout" },
  { src: "/portfolio/studio-13.jpg", caption: "Street Food Sense 4 — game show set build" },
  { src: "/portfolio/studio-14.jpg", caption: "Market-themed set — full prop dressing" },
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

/* Reveal-on-scroll: fires the INSTANT a section enters the viewport.
   No hover/touch needed. Uses IntersectionObserver (cheap, event-driven,
   not a scroll listener) so it never causes scroll jank. */
function Reveal({ children, delay = 0, className = "", style = {}, as = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`fu ${visible ? "show" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

export default function PortfolioPage() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const cursorGlowRef = useRef(null);
  const scrollBarRef = useRef(null);

  /* Cursor glow + scroll progress bar are driven via refs + rAF,
     bypassing React state entirely — zero re-renders on mousemove/scroll. */
  useEffect(() => {
    let ticking = false;
    let lastX = 0, lastY = 0;

    const applyCursor = () => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%)`;
      }
      ticking = false;
    };

    const onMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyCursor);
      }
    };

    let scrollTicking = false;
    const applyScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      if (scrollBarRef.current) scrollBarRef.current.style.width = `${pct}%`;
      scrollTicking = false;
    };
    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(applyScroll);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightboxImg(null);
        setActiveVideo(null);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxImg || activeVideo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxImg, activeVideo]);

  // 3D tilt on hover — imperative DOM only, runs outside React's render cycle
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
    if (shine) shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,175,55,0.2) 0%, transparent 60%)`;
  };
  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    const shine = card.querySelector(".laser-shimmer");
    if (shine) shine.style.background = "transparent";
  };

  return (
    <div style={{ background: "#030406", color: "#f3f4f6", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Bebas+Neue&family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        html, body { overflow-x: hidden; max-width: 100vw; background: #030406; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #030406; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #d4af37, #b89025, transparent); border-radius: 20px; }

        .custom-cursor-glow {
          position: fixed; top: 0; left: 0; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.065) 0%, transparent 75%);
          pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
          mix-blend-mode: screen; will-change: transform;
        }

        .ambient-glow {
          position: fixed; width: 1000px; height: 1000px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%);
          z-index: 1; pointer-events: none; mix-blend-mode: plus-lighter;
          animation: atmosphericMovement 45s infinite alternate ease-in-out;
          will-change: transform;
        }
        .glow-2 { background: radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%); animation-duration: 55s; animation-delay: -12s; right: -15%; top: 15%; }
        .glow-3 { background: radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 60%); animation-duration: 65s; animation-delay: -25s; left: 15%; bottom: -10%; }
        @keyframes atmosphericMovement {
          0% { transform: translate(-20%, -30%) rotate(0deg) scale(1); }
          50% { transform: translate(25%, 20%) rotate(180deg) scale(1.25); }
          100% { transform: translate(-5%, 35%) rotate(360deg) scale(0.95); }
        }

        .film-grain {
          position: fixed; top: -100%; left: -100%; right: -100%; bottom: -100%;
          width: 300%; height: 300%; background: transparent url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.03"/%3E%3C/svg%3E') repeat;
          z-index: 2; pointer-events: none; animation: kineticGrain .7s steps(6) infinite; will-change: transform;
        }
        @keyframes kineticGrain { 0%, 100% { transform:translate(0, 0); } 20% { transform:translate(-1%, -2%); } 60% { transform:translate(2%, -1%); } 80% { transform:translate(-2%, 1%); } }

        /* Reveal-on-scroll — only opacity + transform are animated (GPU-cheap) */
        .fu {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1);
          will-change: opacity, transform;
        }
        .fu.show { opacity: 1; transform: translateY(0); }

        .serif { font-family: 'Cormorant Garamond', serif; }
        .gold { color: #d4af37; text-shadow: 0 0 30px rgba(212,175,55,0.4); }

        .gold-grad {
          background: linear-gradient(90deg, #ffffff 0%, #fff7dc 15%, #d4af37 42%, #fff7dc 55%, #d4af37 68%, #ffffff 100%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto; animation: premiumTextShine 7s linear infinite;
        }
        @keyframes premiumTextShine { 0% { background-position: 0% center; } 100% { background-position: -200% center; } }

        .eyebrow {
          font-family: 'Montserrat', sans-serif; font-size: 0.72rem; font-weight: 800; letter-spacing: 11px;
          color: #d4af37; text-transform: uppercase; display: flex; align-items: center; gap: 20px;
        }
        .eyebrow .tick { width: 75px; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.85)); position: relative; overflow: hidden; }
        .eyebrow .tick::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, #fff, transparent); animation: linearLaserScan 2.5s infinite linear;
        }
        @keyframes linearLaserScan { 0% { left: -100%; } 100% { left: 100%; } }

        .filter-btn {
          background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.55); font-family: 'Montserrat', sans-serif; font-size: 0.72rem;
          font-weight: 700; letter-spacing: 4px; padding: 14px 34px; border-radius: 50px;
          cursor: pointer; transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          text-transform: uppercase; position: relative; overflow: hidden; backdrop-filter: blur(15px);
        }
        .filter-btn::after {
          content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent);
          transform: translateX(-100%); transition: transform 0.75s ease;
        }
        .filter-btn:hover::after { transform: translateX(100%); }
        .filter-btn:hover, .filter-btn.active { color: #d4af37; border-color: #d4af37; background: rgba(212,175,55,0.05); box-shadow: 0 0 30px rgba(212,175,55,0.15); transform: translateY(-2px); }

        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 40px; }

        .gallery-item {
          position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 4/3; cursor: pointer; background: #070a11;
          border: 1px solid rgba(255,255,255,0.02); box-shadow: 0 30px 70px rgba(0,0,0,0.6);
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, border-color 0.5s ease;
          transform-style: preserve-3d; will-change: transform;
        }
        .gallery-item::before {
          content: ''; position: absolute; inset: 0; border: 1px solid transparent; border-radius: 24px;
          background: linear-gradient(135deg, rgba(212,175,55,0.75), transparent 40%, transparent 60%, rgba(212,175,55,0.4)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity 0.4s ease; z-index: 5; pointer-events: none;
        }
        .gallery-item:hover { border-color: transparent; box-shadow: 0 60px 120px rgba(0,0,0,0.9), 0 0 50px rgba(212,175,55,0.12); }
        .gallery-item:hover::before { opacity: 1; }

        .gallery-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.65) contrast(1.05) grayscale(15%); transition: transform 0.6s cubic-bezier(.16,1,.3,1), filter 0.6s ease; }
        .gallery-item:hover img { filter: brightness(1.08) contrast(1.1) grayscale(0%); transform: scale(1.15) translateZ(20px); }

        .laser-shimmer { position: absolute; inset: 0; mix-blend-mode: screen; pointer-events: none; z-index: 4; }

        .gallery-caption {
          position: absolute; inset: 0; background: linear-gradient(180deg, transparent 20%, rgba(3,4,6,0.98) 100%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 40px; opacity: 0; transform: translateY(20px) translateZ(30px); transition: opacity 0.4s ease, transform 0.4s ease; z-index: 3;
        }
        .gallery-item:hover .gallery-caption { opacity: 1; transform: translateY(0) translateZ(30px); }
        .gallery-caption span { font-size: 0.92rem; color: #fff; font-weight: 500; line-height: 1.6; letter-spacing: 0.6px; text-shadow: 0 3px 8px rgba(0,0,0,0.7); }

        .gallery-zoom-icon {
          position: absolute; top: 32px; right: 32px; width: 50px; height: 50px; border-radius: 50%;
          background: rgba(3,4,6,0.92); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); font-size: 1.2rem;
          opacity: 0; backdrop-filter: blur(10px); transform: scale(0.6) translateZ(40px); transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease; z-index: 4;
        }
        .gallery-item:hover .gallery-zoom-icon { opacity: 1; transform: scale(1) rotate(90deg) translateZ(40px); border-color: rgba(212,175,55,0.9); color: #d4af37; box-shadow: 0 0 25px rgba(212,175,55,0.45); }

        .reel-category { margin-bottom: 140px; }
        .reel-category:last-child { margin-bottom: 0; }
        .reel-head { display: flex; align-items: center; gap: 26px; margin-bottom: 50px; padding-bottom: 26px; border-bottom: 1px solid rgba(212,175,55,0.15); position: relative; }
        .reel-head::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 120px; height: 2px; background: linear-gradient(90deg, #d4af37, transparent); }

        .reel-icon { font-size: 2.4rem; filter: drop-shadow(0 0 20px rgba(212,175,55,0.5)); animation: theaterIconWobble 5s infinite ease-in-out; display: inline-block; }
        @keyframes theaterIconWobble { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); } 50% { transform: translateY(-8px) scale(1.1) rotate(4deg); } }

        .reel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 45px; }

        .video-card {
          position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 16/9; cursor: pointer; background: #070a11;
          border: 1px solid rgba(255,255,255,0.015); box-shadow: 0 30px 70px rgba(0,0,0,0.6);
          transition: border-color 0.4s ease, box-shadow 0.4s ease; transform-style: preserve-3d;
        }
        .video-card::after {
          content: ''; position: absolute; top: 0; left: -160%; width: 70%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-30deg); z-index: 2;
        }
        .video-card:hover::after { left: 260%; transition: left 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .video-card:hover { border-color: rgba(212,175,55,0.75); box-shadow: 0 60px 110px rgba(0,0,0,0.9), 0 0 40px rgba(212,175,55,0.2); }

        .video-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(.16,1,.3,1), filter 0.6s ease; filter: brightness(0.55) contrast(1.08); }
        .video-card:hover img { transform: scale(1.08); filter: brightness(0.88); }

        .play-button {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.85);
          width: 88px; height: 88px; border-radius: 50%; background: linear-gradient(135deg, #d4af37, #f5d169);
          display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 45px rgba(212,175,55,0.45);
          transition: transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease, background 0.35s ease;
        }
        .video-card:hover .play-button { transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 30px 70px rgba(212,175,55,0.8); background: linear-gradient(135deg, #ffe28a, #d4af37); }
        .play-button::after { content: ''; border-style: solid; border-width: 14px 0 14px 26px; border-color: transparent transparent transparent #030406; margin-left: 8px; }

        .ornament { display: flex; align-items: center; justify-content: center; gap: 32px; padding: 60px 0; }
        .ornament .line { height: 1px; width: 250px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.5)); position: relative; }
        .ornament .line.right { background: linear-gradient(90deg, rgba(212,175,55,0.5), transparent); }
        .ornament .diamond-composite { display: flex; align-items: center; gap: 8px; }
        .ornament .diamond { width: 9px; height: 9px; background: #d4af37; transform: rotate(45deg); box-shadow: 0 0 15px rgba(212,175,55,0.8); animation: luxuryPulse 3s infinite ease-in-out; }
        .ornament .diamond.small { width: 5px; height: 5px; background: rgba(212,175,55,0.5); animation-delay: 0.5s; }
        @keyframes luxuryPulse { 0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.6; } 50% { transform: rotate(45deg) scale(1.4); opacity: 1; box-shadow: 0 0 25px rgba(212,175,55,1); } }

        .back-link { color: rgba(255,255,255,0.38); font-size: 0.72rem; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; text-decoration: none; transition: color 0.35s ease, transform 0.35s ease, letter-spacing 0.35s ease; position: relative; display: inline-flex; align-items: center; }
        .back-link::after { content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 1px; background: #d4af37; transition: width 0.45s ease; }
        .back-link:hover { color: #d4af37; transform: translateY(-4px); letter-spacing: 6px; }
        .back-link:hover::after { width: 100%; }

        .lightbox-overlay {
          position: fixed; inset: 0; z-index: 3000; background: rgba(1,2,3,0.97);
          display: flex; align-items: center; justify-content: center; padding: 40px 20px;
          backdrop-filter: blur(20px); animation: overlayBlurFadeIn .35s ease forwards;
        }
        @keyframes overlayBlurFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .lightbox-img {
          max-width: 95vw; max-height: 86vh; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 70px 150px rgba(0,0,0,1); transform: scale(0.94); animation: modalZoomIn .35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes modalZoomIn { to { transform: scale(1); } }

        .lightbox-close {
          position: absolute; top: 40px; right: 40px; width: 64px; height: 64px; border-radius: 50%;
          background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.15);
          color: #fff; font-size: 1.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(10px); transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .lightbox-close:hover { background: rgba(212,175,55,0.25); border-color: #d4af37; color: #d4af37; transform: rotate(90deg) scale(1.1); box-shadow: 0 0 25px rgba(212,175,55,0.6); }

        .video-lightbox-frame {
          width: min(95vw, 1320px); aspect-ratio: 16/9; border-radius: 24px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.14); box-shadow: 0 70px 150px rgba(0,0,0,1);
          transform: scale(0.94); animation: modalZoomIn .35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .video-lightbox-frame iframe { width: 100%; height: 100%; border: none; }

        @media (max-width: 768px) {
          .nav-bar-pf { padding: 22px 6% !important; }
          .hero-sec-pf { padding: 190px 6% 80px !important; min-height: 55vh !important; }
          .gallery-sec-pf, .reel-sec-pf { padding: 90px 6% !important; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)) !important; gap: 30px !important; }
          .reel-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .custom-cursor-glow { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fu { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div ref={cursorGlowRef} className="custom-cursor-glow" />
      <div className="film-grain" />
      <div className="ambient-glow" />
      <div className="ambient-glow glow-2" />
      <div className="ambient-glow glow-3" />

      <div style={{ position: "fixed", top: 0, left: 0, height: 2, background: "linear-gradient(90deg, #8e6f23, #d4af37, #ffe28a)", zIndex: 9999 }}>
        <div ref={scrollBarRef} style={{ height: "100%", width: "0%", background: "inherit" }} />
      </div>

      {/* ===== NAV ===== */}
      <nav className="nav-bar-pf" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "26px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(3,4,6,0.8)", backdropFilter: "blur(50px)", borderBottom: "1px solid rgba(255,255,255,0.015)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 12, height: 44, width: 44 }}>
            <img src={LOGO_URL} alt="FLM" style={{ height: "100%", width: "100%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.12)", transition: "transform 0.6s cubic-bezier(.16,1,.3,1)" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(360deg) scale(1.15)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1)")} />
          </div>
          <span style={{ color: "#fff", fontSize: "0.92rem", fontWeight: 900, letterSpacing: 9, transition: "color 0.3s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#d4af37")} onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}>FOCAL LENGTH</span>
        </a>
        <a href="/" className="back-link">← Back Home</a>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-sec-pf" style={{ minHeight: "68vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "220px 6% 100px", position: "relative", background: "radial-gradient(circle at 50% 40%, #0d121c 0%, #030406 80%)", zIndex: 3 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,175,55,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.015) 1px,transparent 1px)", backgroundSize: "100px 100px", maskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)", WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)" }} />
        <Reveal style={{ position: "relative", zIndex: 4 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 28 }}><span className="tick" />Our Work & Media Space<span className="tick" /></div>
          <h1 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.8rem,11vw,8rem)", letterSpacing: "0.1em", lineHeight: 0.98, margin: 0, fontWeight: 400 }}>
            THE GALLERY
          </h1>
          <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(1.2rem,2.5vw,1.55rem)", letterSpacing: "0.01em", color: "rgba(255,255,255,0.55)", marginTop: 28, fontWeight: 300, maxWidth: 760, lineHeight: 1.8 }}>
            An architectural perspective of modern media spaces, premium sets, and our high-definition cinema reels.
          </p>
        </Reveal>
      </section>

      <div className="ornament"><span className="line" /><div className="diamond-composite"><span className="diamond small" /><span className="diamond" /><span className="diamond small" /></div><span className="line right" /></div>

      {/* ===== FILTER ===== */}
      <Reveal style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap", padding: "20px 6%", position: "relative", zIndex: 4 }}>
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Show All Work</button>
        <button className={`filter-btn ${filter === "studio" ? "active" : ""}`} onClick={() => setFilter("studio")}>Studio Environments</button>
        <button className={`filter-btn ${filter === "film" ? "active" : ""}`} onClick={() => setFilter("film")}>Cinema Showreels</button>
      </Reveal>

      {/* ===== STUDIO GALLERY ===== */}
      {(filter === "all" || filter === "studio") && (
        <section className="gallery-sec-pf" style={{ padding: "110px 6%", maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 3 }}>
          <Reveal as="div" style={{ textAlign: "center", marginBottom: 85 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />BEHIND THE SCENES<span className="tick" /></div>
            <h2 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(2.2rem,4.5vw,3.4rem)", fontWeight: 400, margin: "24px 0 0", color: "#f4f1e9" }}>
              Inside the <span className="gold">Production Floors</span>
            </h2>
          </Reveal>

          <div className="gallery-grid">
            {studioImages.map((img, i) => (
              <Reveal key={i} delay={Math.min(i, 8) * 50}>
                <div
                  className="gallery-item"
                  onClick={() => setLightboxImg(img)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onMouseEnter={() => setHoveredCard(`st-${i}`)}
                >
                  <div className="laser-shimmer" />
                  <img src={img.src} alt={img.caption} loading="lazy" />
                  <div className="gallery-zoom-icon">⤜</div>
                  <div className="gallery-caption">
                    <div style={{ width: 30, height: 1, background: "#d4af37", marginBottom: 16, transform: hoveredCard === `st-${i}` ? "scaleX(1.8)" : "scaleX(1)", transformOrigin: "left", transition: "transform 0.4s ease" }} />
                    <span>{img.caption}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {filter === "all" && <div className="ornament"><span className="line" /><div className="diamond-composite"><span className="diamond small" /><span className="diamond" /><span className="diamond small" /></div><span className="line right" /></div>}

      {/* ===== SHOWREEL ===== */}
      {(filter === "all" || filter === "film") && (
        <section className="reel-sec-pf" style={{ background: "linear-gradient(180deg, #05070a 0%, #030406 100%)", padding: "130px 6%", position: "relative", zIndex: 3 }}>
          <div style={{ maxWidth: 1440, margin: "0 auto" }}>
            <Reveal style={{ textAlign: "center", marginBottom: 90 }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}><span className="tick" />FILM ARCHIVES<span className="tick" /></div>
              <h2 className="gold-grad" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,5.5vw,4.8rem)", letterSpacing: "0.08em", margin: "26px 0 0", fontWeight: 400 }}>
                BROADCAST REELS
              </h2>
            </Reveal>

            {showreel.map((cat) => (
              <div key={cat.category} className="reel-category">
                <Reveal>
                  <div className="reel-head">
                    <span className="reel-icon">{cat.icon}</span>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.14em", margin: 0, color: "#f4f1e9", fontWeight: 400 }}>
                      {cat.category.toUpperCase()}
                    </h3>
                  </div>
                </Reveal>
                <div className="reel-grid">
                  {cat.videos.map((url, vi) => {
                    const id = getYouTubeId(url);
                    if (!id) return null;
                    return (
                      <Reveal key={vi} delay={Math.min(vi, 8) * 50}>
                        <div
                          className="video-card"
                          onClick={() => setActiveVideo(id)}
                          onMouseMove={handleCardMouseMove}
                          onMouseLeave={handleCardMouseLeave}
                        >
                          <div className="laser-shimmer" />
                          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={`${cat.category} ${vi + 1}`} loading="lazy" />
                          <div className="play-button" />
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="ornament" style={{ paddingBottom: 90 }}><span className="line" /><div className="diamond-composite"><span className="diamond small" /><span className="diamond" /><span className="diamond small" /></div><span className="line right" /></div>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.015)", padding: "70px 6%", display: "flex", flexWrap: "wrap", gap: 35, alignItems: "center", justifyContent: "space-between", background: "#010204", position: "relative", zIndex: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={LOGO_URL} alt="FLM" style={{ height: 38, width: 38, objectFit: "cover", borderRadius: 8, opacity: 0.75, border: "1px solid rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: "0.72rem", letterSpacing: 7, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontWeight: 600 }}>
            RC: 9528632 · Lagos, Nigeria
          </span>
        </div>
        <a href="/" className="back-link" style={{ fontSize: "0.72rem" }}>← Back to Home</a>
      </footer>

      {/* ===== IMAGE LIGHTBOX ===== */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
          <img src={lightboxImg.src} alt={lightboxImg.caption} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", letterSpacing: "1px", textShadow: "0 2px 10px rgba(0,0,0,0.8)", pointerEvents: "none", textAlign: "center" }}>
            {lightboxImg.caption}
          </div>
        </div>
      )}

      {/* ===== VIDEO LIGHTBOX ===== */}
      {activeVideo && (
        <div className="lightbox-overlay" onClick={() => setActiveVideo(null)}>
          <button className="lightbox-close" onClick={() => setActiveVideo(null)}>✕</button>
          <div className="video-lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Focal Length Production Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
