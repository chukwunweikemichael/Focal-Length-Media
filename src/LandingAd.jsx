import { useState } from "react";
import API_URL from "./config.js";

const WEBSITE_URL = "https://focal-length-media.vercel.app";
const WA1 = "2347067349942";
const WA2 = "2348161880830";
const PHONE_1 = "07067349942";
const PHONE_2 = "08161880830";
const EMAIL = "focallengthmedia26@gmail.com";
const ADDRESS = "2 Bolaji Street, off Kudirat Abiola Way, Ikeja, Lagos";
const LOGO = "/length.jpeg";

const WA_MSG = encodeURIComponent("Hi Focal Length Media! I'd like to discuss a premium project concept with you.");
const WA_LINK_1 = `https://wa.me/${WA1}?text=${WA_MSG}`;
const WA_LINK_2 = `https://wa.me/${WA2}?text=${WA_MSG}`;

const services = [
  { num: "01", name: "Music Video Production", detail: "Concept to final cut — we shoot cinematic videos that break the internet and scale music charts.", naija: "Your sound deserves a visual asset that dominates global screens." },
  { num: "02", name: "Artist Management & PR", detail: "Elite career branding, international bookings, legal structures, and rollout strategies.", naija: "From the underground studio to the global mainstage — we engineer the movement." },
  { num: "03", name: "Event & Concert Production", detail: "Full structural stage design, immersive lighting systems, premium sound architecture, and multi-cam broadcasting.", naija: "We build high-octane experiential arenas while you command the audience energy." },
  { num: "04", name: "TV Commercials & Corporate Campaigns", detail: "Premium TVCs, disruptive social media ads, high-converting product rollouts, and experiential activations.", naija: "Make your brand the absolute undisputed cultural statement everyone talks about." },
  { num: "05", name: "High-End Editorial Photography", detail: "Artist cover art, high-fashion brand looks, global press kits, and premium lifestyle captures.", naija: "Timeless, high-definition frames infused with unmatched cinematic motion energy." },
  { num: "06", name: "General Entertainment & Cinema", detail: "Feature films, premium web series, reality TV formatting, and high-level talent sourcing.", naija: "If it belongs to the lifestyle, culture, and luxury screen space — we master it." },
];

const marqueeItems = [
  "Music Videos", "Afrobeats Elite", "Amapiano Evolution", "Artist Management",
  "Afropop Global", "TV Commercials", "Lagos Signature", "Event Production",
  "Premium Editorial Photoshoots", "Nollywood Cinema", "Afrofusion Culture", "High-End Brand Campaigns",
  "Entertainment Architects", "Nigeria To The World", "Highlife Classics", "Concert Coverage Pro",
];

const captions = [
  { icon: "🎵", text: "From local rhythm to global streams — we structure and translate your musical vibe visually" },
  { icon: "🎬", text: "High-concept music video sets designed specifically to break international broadcast standards" },
  { icon: "🔥", text: "The elite production house trusted by key stakeholders in the entertainment industry" },
  { icon: "🎤", text: "Your next project rollout deserves a flawless visual asset that converts views to dedicated fans" },
  { icon: "📺", text: "Disruptive commercial marketing assets that compel target audiences to halt their scroll" },
  { icon: "🚀", text: "We craft the strategic visual architecture that scales Nigerian creative talent globally" },
];

// Unpredictable dynamic mood matrix maps
const moodMetadata = {
  "Cinematic Luxury (Moody, High Contrast)": { aspect: "2.39:1 Anamorphic Cinema Scope", temp: "3200K - 4500K Low-Key Tungsten", lens: "Arri Signature Primes / Cooke Optics" },
  "Vibrant Afro-Futurism (High Color, Punchy)": { aspect: "16:9 Expanded Full Frame IMAX", temp: "5600K - 6500K High Saturation Neon", lens: "Angenieux Optimo Ultra Zooms" },
  "Minimalist Clean (High-End Corporate, Crisp)": { aspect: "1.85:1 Modern Flat Screen", temp: "5000K Natural Soft Day Diffusion", lens: "RED Monstro / Zeiss Supreme Radiance" }
};

export default function LandingAd() {
  const [form, setForm] = useState({ name: "", contact: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState("");
  
  // Immersive Psychological Configuration Engine (No Prices)
  const [calcService, setCalcService] = useState(services[0].name);
  const [visualMood, setVisualMood] = useState("Cinematic Luxury (Moody, High Contrast)");
  const [addons, setAddons] = useState({ drone: false, grading: false, choreography: false });

  // Unpredictable Accordion System State
  const [activeFaq, setActiveFaq] = useState(null);

  // Auto-fill trigger to smash form friction
  const applyQuickBrief = (serviceName, initialMsg) => {
    setForm({
      ...form,
      service: serviceName,
      message: initialMsg
    });
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const submit = async () => {
    if (!form.name || !form.contact) { alert("Please input your name and preferred contact info."); return; }
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...form, 
          customConfigurationStyle: visualMood,
          selectedServiceSegment: calcService,
          premiumUpgradesRequired: Object.keys(addons).filter(k => addons[k]).join(", ") || "Base Luxury Setup Only"
        }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else alert("Processing issue occurred. Please reach out to our WhatsApp line directly.");
    } catch { alert("Connection slow. Please connect with our team directly via WhatsApp for an immediate response."); }
    setSending(false);
  };

  return (
    <div style={{ background: "#fcfbfa", fontFamily: "'Inter', sans-serif", color: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; background: #fcfbfa; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 10px; }

        /* ── LUXURY THEATRICAL HERO UNIT ── */
        .hero {
          background: radial-gradient(circle at 75% 25%, #1c1c1c 0%, #050505 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .hero-glow-1 { position: absolute; top: -150px; right: -50px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(197,160,89,0.18) 0%, transparent 70%); pointer-events: none; }
        .hero-glow-2 { position: absolute; bottom: -100px; left: -100px; width: 450px; height: 450px; border-radius: 50%; background: radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%); pointer-events: none; }

        .hero-topline { background: linear-gradient(90deg, #c5a059, #a37f3d); padding: 16px clamp(24px, 6vw, 56px); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; position: relative; z-index: 3; }
        .hero-topline span { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; color: #fff; }

        .hero-main { flex: 1; padding: clamp(50px, 7vw, 85px) clamp(24px, 6vw, 56px); display: flex; flex-direction: column; position: relative; z-index: 2; }

        .hero-identity { display: flex; align-items: center; gap: 20px; margin-bottom: clamp(45px, 6vw, 65px); }
        .hero-logo { width: clamp(65px, 9vw, 90px); height: clamp(65px, 9vw, 90px); border-radius: 20px; object-fit: cover; border: 2px solid rgba(197,160,89,0.5); box-shadow: 0 10px 30px rgba(0,0,0,0.6); flex-shrink: 0; }
        .hero-title { font-family: 'Inter', sans-serif; font-size: clamp(1rem, 2.5vw, 1.35rem); font-weight: 900; letter-spacing: 5px; text-transform: uppercase; color: #fff; line-height: 1; margin-bottom: 6px; background: linear-gradient(to right, #fff, #f6eedb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase; color: #c5a059; }

        .hero-display { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(3.5rem, 11vw, 8.5rem); line-height: 0.88; letter-spacing: -0.03em; color: #fff; margin-bottom: clamp(24px, 3.5vw, 32px); }
        .hero-display em { font-style: italic; color: #c5a059; display: block; background: linear-gradient(60deg, #c5a059, #fffbf2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-display .stroke { -webkit-text-stroke: 1.5px rgba(255,255,255,0.3); -webkit-text-fill-color: transparent; display: block; }

        .hero-manifesto { font-family: 'Inter', sans-serif; font-size: clamp(0.95rem, 2.5vw, 1.2rem); font-weight: 300; color: rgba(255,255,255,0.7); line-height: 1.9; max-width: 700px; margin-bottom: clamp(32px, 4vw, 44px); border-left: 3px solid #c5a059; padding-left: 28px; }
        .hero-manifesto strong { color: #fff; font-weight: 700; }

        .hero-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: clamp(32px, 4vw, 48px); }
        .pill-item { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 12px 24px; border-radius: 50px; transition: all 0.25s ease; cursor: pointer; }
        .pill-item:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(197,160,89,0.25); }
        .pill-premium { background: rgba(197,160,89,0.15); border: 1px solid #c5a059; color: #c5a059; }
        .pill-neutral { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.65); }
        .pill-culture { background: rgba(26,173,84,0.1); border: 1px solid #1aad54; color: #1aad54; }

        .hero-comms { display: flex; flex-direction: column; gap: 18px; margin-bottom: clamp(36px, 4.5vw, 52px); }
        .comm-block { display: flex; align-items: center; gap: 18px; }
        .comm-circle { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 1.05rem; }
        .comm-tag { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #c5a059; margin-bottom: 2px; }
        .comm-data { font-family: 'Inter', sans-serif; font-size: clamp(0.9rem, 2vw, 1.05rem); font-weight: 500; color: rgba(255,255,255,0.95); }
        .comm-wa { color: #1aad54 !important; font-weight: 800; text-decoration: none; transition: opacity 0.2s; }
        .comm-wa:hover { opacity: 0.85; text-decoration: underline; }

        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: clamp(40px, 5vw, 60px); }
        .actionBtn { display: inline-flex; align-items: center; justify-content: center; gap: 14px; font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 900; letter-spacing: 2.5px; text-transform: uppercase; border: none; border-radius: 12px; padding: 20px 36px; cursor: pointer; text-decoration: none; transition: all 0.25s ease; }
        .actionBtn:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.5); }
        .actionBtn-green { background: #1aad54; color: #fff; }
        .actionBtn-gold { background: #c5a059; color: #fff; }
        .actionBtn-outline { background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2); }
        .actionBtn-outline:hover { color: #fff; border-color: #fff; background: rgba(255,255,255,0.03); }

        .hero-meta { margin-top: auto; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .meta-registered { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.25); }
        .meta-location { font-family: 'Inter', sans-serif; font-size: 0.68rem; color: rgba(255,255,255,0.5); text-align: right; line-height: 1.6; }

        /* ── SCROLLING CINEMA MARQUEE ── */
        .marquee-container { background: #c5a059; overflow: hidden; padding: 20px 0; box-shadow: 0 6px 25px rgba(197,160,89,0.3); }
        .marquee-inner { display: flex; animation: marqueeContinuous 25s linear infinite; width: max-content; }
        .marquee-element { font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; color: #fff; padding: 0 45px; white-space: nowrap; display: flex; align-items: center; gap: 16px; }
        .marquee-dot { color: rgba(255,255,255,0.5); }
        @keyframes marqueeContinuous { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* ── INTERACTIVE EXPERIENTIAL CHANNELS (ONE-TAP ACTIONS) ── */
        .interactive-assist { background: #fff; padding: 40px clamp(24px, 6%, 56px); border-bottom: 1px solid #e9e5dc; text-align: center; }
        .assist-heading { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 3.5px; text-transform: uppercase; color: #c5a059; margin-bottom: 16px; }
        .assist-grid { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; max-width: 950px; margin: 0 auto; }
        .assist-trigger { background: #fdfdfc; border: 1px solid #e0dbcf; border-radius: 10px; padding: 14px 22px; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 700; color: #1f1f1f; cursor: pointer; transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 10px; }
        .assist-trigger:hover { background: #050505; color: #fff; border-color: #050505; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }

        /* ── BRAND VALUE PROPOSITIONS ── */
        .value-sec { background: #fff; padding: clamp(65px, 8vw, 100px) clamp(24px, 6%, 56px); }
        .value-wrapper { max-width: 1200px; margin: 0 auto; }
        .value-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; margin-top: 48px; }
        .value-card { background: #fdfdfb; border: 1px solid #eae6dd; border-radius: 16px; padding: 32px 28px; display: flex; align-items: flex-start; gap: 20px; transition: all 0.3s ease; }
        .value-card:hover { border-color: #c5a059; background: #fffcf5; transform: translateY(-4px); box-shadow: 0 12px 35px rgba(197,160,89,0.08); }
        .value-icon { font-size: 2rem; flex-shrink: 0; line-height: 1; }
        .value-text { font-family: 'Inter', sans-serif; font-size: 0.92rem; font-weight: 600; color: #1a1a1a; line-height: 1.7; }

        /* ── CONCEPT CONFIGURATOR SYSTEM (PSYCHOLOGICAL HOOK WIDGET) ── */
        .config-sec { background: #fff; padding: 60px clamp(24px, 6%, 56px); border-top: 1px solid #e9e5dc; }
        .config-box { max-width: 820px; margin: 0 auto; background: #fdfdfb; border: 2px solid #c5a059; border-radius: 24px; padding: 45px 40px; box-shadow: 0 20px 60px rgba(197,160,89,0.07); position: relative; }
        .config-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #c5a059; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; padding: 6px 20px; border-radius: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .config-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; text-align: center; margin-bottom: 12px; color: #050505; }
        .config-subtitle { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #666; text-align: center; margin-bottom: 36px; line-height: 1.6; }
        .config-form { display: flex; flex-direction: column; gap: 28px; }
        
        .addon-flex { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 6px; }
        .addon-pill { background: #fff; border: 1px solid #e0dbcf; border-radius: 10px; padding: 16px 14px; text-align: center; cursor: pointer; transition: all 0.2s ease; user-select: none; }
        .addon-pill.selected { border-color: #1aad54; background: rgba(26,173,84,0.03); box-shadow: 0 0 0 2px #1aad54; }
        .addon-name { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 800; color: #050505; }
        .addon-meta { font-family: 'Inter', sans-serif; font-size: 0.65rem; color: #c5a059; font-weight: 700; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }

        .config-summary { background: linear-gradient(135deg, #050505 0%, #171717 100%); color: #fff; padding: 32px; border-radius: 16px; margin-top: 16px; border: 1px solid rgba(197,160,89,0.25); text-align: center; }
        .config-summary h4 { font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase; color: #c5a059; margin-bottom: 10px; }
        .config-summary .status-text { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; color: #fff; line-height: 1.3; margin-bottom: 16px; }

        /* ── DYNAMIC LIVE SPEC PREVIEW MODULE ── */
        .live-preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 16px; background: rgba(255,255,255,0.05); padding: 14px; border-radius: 8px; border: 1px dashed rgba(197,160,89,0.3); text-align: left; }
        .spec-item { font-family: 'Inter', sans-serif; font-size: 0.68rem; color: rgba(255,255,255,0.8); }
        .spec-label { font-size: 0.55rem; text-transform: uppercase; color: #c5a059; font-weight: 800; letter-spacing: 1px; margin-bottom: 2px; }
        
        /* ── THE BLUEPRINT PROTOCOLS (UNPREDICTABLE FAQ ENGINE) ── */
        .faq-sec { background: #fdfdfb; padding: clamp(70px, 9vw, 110px) clamp(24px, 6%, 56px); border-top: 1px solid #e9e5dc; }
        .faq-wrapper { max-width: 820px; margin: 0 auto; }
        .faq-item { background: #fff; border: 1px solid #e9e5dc; border-radius: 12px; margin-bottom: 14px; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .faq-trigger { width: 100%; text-align: left; background: none; border: none; padding: 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 800; color: #050505; }
        .faq-icon { font-size: 1.1rem; color: #c5a059; transition: transform 0.3s ease; }
        .faq-content { padding: 0 24px 24px; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #4a4a4a; line-height: 1.8; border-top: 1px solid transparent; }
        .faq-item.active { border-color: #c5a059; box-shadow: 0 10px 30px rgba(197,160,89,0.05); }
        .faq-item.active .faq-icon { transform: rotate(45deg); }
        
        /* ── INTENSE HIGH-END BRAND IDENTITY HOOK ── */
        .identity-hook { background: #050505; padding: clamp(80px, 10vw, 120px) clamp(24px, 6%, 56px); position: relative; }
        .identity-inner { max-width: 1200px; margin: 0 auto; }
        .identity-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 5px; text-transform: uppercase; color: #c5a059; margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
        .identity-label::before { content:''; display:block; width:30px; height:1px; background:#c5a059; }
        .identity-headline { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(2.8rem, 6.5vw, 5.5rem); line-height: 1.05; letter-spacing: -0.025em; color: #fff; margin-bottom: 36px; }
        .identity-headline em { font-style: italic; color: #c5a059; }
        .identity-desc { font-family: 'Inter', sans-serif; font-size: clamp(1rem, 2vw, 1.2rem); font-weight: 300; color: rgba(255,255,255,0.65); line-height: 1.95; max-width: 820px; margin-bottom: 48px; }
        .identity-desc strong { color: #fff; font-weight: 700; }
        
        .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 28px; margin-top: 60px; }
        .t-card { background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 32px 26px; border-left: 4px solid #c5a059; transition: all 0.25s ease; }
        .t-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.03); border-color: rgba(197,160,89,0.45); }
        .t-quote { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.1rem; color: rgba(255,255,255,0.95); line-height: 1.75; margin-bottom: 16px; }
        .t-author { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #c5a059; }

        /* ── SERVICE MATRIX SHOWCASE ── */
        .matrix-sec { background: #fff; padding: clamp(80px, 10vw, 120px) clamp(24px, 6%, 56px); }
        .matrix-head { max-width: 1200px; margin: 0 auto; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 24px; margin-bottom: 16px; }
        .section-tag { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 5px; text-transform: uppercase; color: #c5a059; margin-bottom: 16px; display: flex; align-items: center; gap: 14px; }
        .section-tag::before { content:''; display:block; width:30px; height:1px; background:#c5a059; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5.5vw, 4.2rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.02em; }
        
        .matrix-grid { max-width: 1200px; margin: 55px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #e9e5dc; border-left: 1px solid #e9e5dc; }
        .matrix-cell { padding: 45px 36px; border-right: 1px solid #e9e5dc; border-bottom: 1px solid #e9e5dc; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .matrix-cell:hover { background: #fdfdfa; transform: scale(1.002); z-index: 2; box-shadow: 0 15px 40px rgba(0,0,0,0.03); }
        .matrix-cell::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: #c5a059; transform: scaleX(0); transition: transform 0.25s ease; transform-origin: left; }
        .matrix-cell:hover::after { transform: scaleX(1); }
        .matrix-num { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.95rem; font-weight: 700; color: #c5a059; margin-bottom: 16px; }
        .matrix-name { font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 800; color: #050505; margin-bottom: 12px; letter-spacing: -0.01em; }
        .matrix-detail { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #4a4a4a; line-height: 1.8; margin-bottom: 14px; font-weight: 400; }
        .matrix-naija { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.88rem; color: #c5a059; font-weight: 700; line-height: 1.5; }

        /* ── CENTRALIZED ENGAGEMENT & CONVERSION FORM ── */
        .hub-sec { background: #fcfbfa; padding: clamp(80px, 10vw, 120px) clamp(24px, 6%, 56px); }
        .hub-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 85px; align-items: start; }
        
        .channel-strip { display: flex; align-items: center; gap: 18px; padding: 20px 24px; border: 1px solid #e9e5dc; border-radius: 14px; text-decoration: none; background: #fff; transition: all 0.25s ease; margin-bottom: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.01); }
        .channel-strip:hover { border-color: #c5a059; transform: translateX(8px); box-shadow: 0 10px 25px rgba(197,160,89,0.08); }
        .channel-icon { width: 46px; height: 46px; background: #fcf6e8; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; }
        .channel-lbl { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #c5a059; margin-bottom: 4px; }
        .channel-val { font-family: 'Inter', sans-serif; font-size: 0.95rem; font-weight: 700; color: #050505; }
        
        .address-container { background: #fff; border: 1px solid #e9e5dc; border-radius: 14px; padding: 28px; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.01); }
        .address-lbl { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #c5a059; display: block; margin-bottom: 12px; }
        .address-val { font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #333; line-height: 1.8; font-weight: 400; }

        .input-wrapper { background: #fff; border: 1px solid #e9e5dc; border-radius: 12px; margin-bottom: 18px; transition: all 0.25s ease; box-shadow: inset 0 1px 4px rgba(0,0,0,0.01); }
        .input-wrapper.active { border-color: #c5a059; box-shadow: 0 0 0 4px rgba(197,160,89,0.15); }
        .input-wrapper input, .input-wrapper select, .input-wrapper textarea { width: 100%; background: transparent; border: none; outline: none; padding: 22px 24px; font-family: 'Inter', sans-serif; font-size: 0.95rem; font-weight: 400; color: #050505; }
        .input-wrapper input::placeholder, .input-wrapper textarea::placeholder { color: #aaaaaa; }
        .input-wrapper select { cursor: pointer; appearance: none; color: #222; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%23c5a059' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>"); background-repeat: no-repeat; background-position: right 24px center; padding-right: 48px; }
        .input-wrapper textarea { resize: none; }
        
        .or-divider { display: flex; align-items: center; gap: 16px; margin: 22px 0; }
        .or-divider::before, .or-divider::after { content:''; flex:1; height:1px; background:#e9e5dc; }
        .or-divider span { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #b5b0a5; }

        /* ── SYSTEM UI BUTTONS ── */
        .btnBase { display:inline-flex; align-items:center; justify-content:center; gap:14px; font-family:'Inter',sans-serif; font-weight:900; font-size:0.8rem; letter-spacing:2.5px; text-transform:uppercase; border:none; cursor:pointer; text-decoration:none; border-radius:12px; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); padding: 22px 40px; }
        .btnBase:hover { transform:translateY(-4px); }
        .btnBase-dark { background:#050505; color:#fff; box-shadow:0 10px 30px rgba(0,0,0,0.15); }
        .btnBase-dark:hover { background: #151515; box-shadow:0 16px 45px rgba(0,0,0,0.25); }
        .btnBase-gold { background:#c5a059; color:#fff; box-shadow:0 10px 30px rgba(197,160,89,0.25); }
        .btnBase-gold:hover { filter:brightness(1.08); box-shadow:0 16px 40px rgba(197,160,89,0.35); }
        .btnBase-green { background:#1aad54; color:#fff; box-shadow:0 10px 30px rgba(26,173,84,0.2); }
        .btnBase-green:hover { filter:brightness(1.08); box-shadow:0 16px 40px rgba(26,173,84,0.3); }

        .success-wrapper { background:#fbf9f4; border:2px dashed #c5a059; border-radius:18px; padding:60px 40px; text-align:center; }
        .success-wrapper h3 { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:900; color:#c5a059; margin-bottom:18px; }
        .success-wrapper p { font-family:'Inter',sans-serif; font-size:1rem; color: #333; line-height:1.8; }
        .success-wrapper a { color:#c5a059; font-weight: 800; text-decoration: none; }
        .success-wrapper a:hover { text-decoration: underline; }

        /* ── CENTRALIZED PREMIUM DIRECT SYSTEM PORTAL LINK ── */
        .portal-sec { background: linear-gradient(135deg, #050505 0%, #121212 100%); padding:clamp(95px,12vw,150px) clamp(24px,6%,56px); text-align:center; position: relative; }
        .portal-eyebrow { font-family:'Inter',sans-serif; font-size:0.62rem; font-weight:800; letter-spacing:5px; text-transform:uppercase; color:#c5a059; margin-bottom:26px; display:flex; align-items:center; justify-content:center; gap:14px; }
        .portal-eyebrow::before, .portal-eyebrow::after { content:''; display:block; width:35px; height:1px; background:#c5a059; }
        .portal-h2 { font-family:'Playfair Display',serif; font-size:clamp(3rem,6.5vw,6rem); font-weight:900; line-height:1.02; letter-spacing:-0.025em; color:#fff; margin-bottom:24px; }
        .portal-h2 em { font-style:italic; color:#c5a059; background: linear-gradient(to right, #c5a059, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .portal-sub { font-family:'Inter',sans-serif; font-size:1rem; color:rgba(255,255,255,0.45); font-weight:300; margin-bottom:52px; max-width:560px; margin-left:auto; margin-right:auto; line-height:1.9; }
        .portal-link { display:inline-flex; align-items:center; gap:18px; background:#c5a059; color:#fff; font-family:'Inter',sans-serif; font-size:0.9rem; font-weight:900; letter-spacing:2px; text-transform:uppercase; padding:26px 70px; border-radius:12px; text-decoration:none; transition:all 0.25s ease; box-shadow:0 15px 45px rgba(197,160,89,0.35); }
        .portal-link:hover { filter:brightness(1.15); transform:translateY(-6px); box-shadow:0 22px 60px rgba(197,160,89,0.5); }
        .portal-url { font-family:'Inter',sans-serif; font-size:0.7rem; color:rgba(255,255,255,0.18); letter-spacing:2.5px; margin-top:24px; text-transform: uppercase; }

        /* ── LOWER FOOTER BAR ── */
        .footer-frame { background:#030303; padding:40px clamp(24px,6%,56px); display:flex; flex-wrap:wrap; gap:16px; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.03); }
        .footer-frame span { font-family:'Inter',sans-serif; font-size:0.62rem; letter-spacing:2.5px; text-transform:uppercase; color:rgba(255,255,255,0.3); font-weight: 600; }

        .line-break { width:100%; height:1px; background:#e9e5dc; }

        /* ── ADAPTIVE RESPONSIVE RULES ── */
        @media (max-width: 950px) {
          .hub-container { grid-template-columns: 1fr; gap: 65px; }
          .matrix-grid { grid-template-columns: 1fr 1fr; }
          .matrix-cell:nth-child(3n) { border-right: 1px solid #e9e5dc; }
          .matrix-cell:nth-child(2n) { border-right: none; }
          .testimonial-grid { grid-template-columns: 1fr 1fr; }
          .addon-flex { grid-template-columns: 1fr; gap: 10px; }
        }
        @media (max-width: 600px) {
          .matrix-grid { grid-template-columns: 1fr; }
          .matrix-cell { border-right: none !important; padding: 36px 20px; }
          .testimonial-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .hero-actions a { width: 100%; }
          .portal-link { width: 100%; justify-content: center; padding: 24px 24px; }
          .meta-location { text-align: left; }
          .value-grid { grid-template-columns: 1fr; }
          .config-box { padding: 35px 20px; }
        }
      `}</style>

      {/* ══════════════
          THEATRICAL HERO STAGE
      ══════════════ */}
      <div className="hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />

        <div className="hero-topline">
          <span>🎬 Nigeria's Authoritative Creative Production House</span>
          <span>RC: 9528632 · Corporate Head Office, Lagos</span>
        </div>

        <div className="hero-main">
          {/* Brand Identity */}
          <div className="hero-identity">
            <img src={LOGO} alt="Focal Length Media Logo" className="hero-logo" />
            <div>
              <div className="hero-title">Focal Length Media</div>
              <div className="hero-subtitle">The Complete Production House</div>
            </div>
          </div>

          {/* Core Hook Headline */}
          <div className="hero-display">
            We Frame
            <em>Your Story.</em>
            <span className="stroke">We Project Your Sound.</span>
          </div>

          {/* Strategic Culture Intro */}
          <p className="hero-manifesto">
            From premier <strong>Afrobeats rollouts to Amapiano classics</strong>, and high-impact <strong>cinema to strategic brand campaigns</strong> —
            we construct luxury visual solutions that lock down consumer attention, disrupt industry noise, and cross global borders. 
            When your creative project demands absolute top-tier cinematic positioning — <strong>this is the standard you build with.</strong>
          </p>

          {/* Instant Context Tags */}
          <div className="hero-pills">
            <span className="pill-item pill-premium" onClick={() => applyQuickBrief("Music Video Production", "I want to arrange an elite global concept review for an upcoming high-budget music video.")}>🎵 Afrobeats Global</span>
            <span className="pill-item pill-premium" onClick={() => applyQuickBrief("Music Video Production", "Let's align a high-concept visual asset structure for our Amapiano project.")}>🎶 Amapiano Culture</span>
            <span className="pill-item pill-premium" onClick={() => applyQuickBrief("Artist Management & PR", "Requesting a private corporate consultation regarding premium artist management services.")}>🎤 Executive Management</span>
            <span className="pill-item pill-culture" onClick={() => applyQuickBrief("General Entertainment & Cinema", "I am looking to contract our upcoming cinematic film project/digital reality format to your production team.")}>🎬 Nollywood Cinema</span>
            <span className="pill-item pill-neutral">📺 High-Impact TVC</span>
            <span className="pill-item pill-neutral">🏟️ Arena Concert Production</span>
          </div>

          {/* Quick Connection Metrics */}
          <div className="hero-comms">
            <div className="comm-block">
              <div className="comm-circle">💬</div>
              <div>
                <div className="comm-tag">Direct WhatsApp Hub (Tap to Connect)</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="comm-wa">{PHONE_1}</a>
                  <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                  <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="comm-wa">{PHONE_2}</a>
                </div>
              </div>
            </div>
            <div className="comm-block">
              <div className="comm-circle">✉️</div>
              <div>
                <div className="comm-tag">Corporate Email Address</div>
                <div className="comm-data">{EMAIL}</div>
              </div>
            </div>
            <div className="comm-block">
              <div className="comm-circle">📍</div>
              <div>
                <div className="comm-tag">Creative Studio Location</div>
                <div className="comm-data">{ADDRESS}</div>
              </div>
            </div>
          </div>

          {/* Core Navigation Hooks */}
          <div className="hero-actions">
            <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="actionBtn actionBtn-green">💬 Connect — {PHONE_1}</a>
            <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="actionBtn actionBtn-green">💬 Connect — {PHONE_2}</a>
            <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="actionBtn actionBtn-outline">🌐 View Main Portfolio Portal</a>
          </div>

          {/* Layout Footer Baseline */}
          <div className="hero-meta">
            <div className="meta-registered">RC: 9528632 · CAC Accredited Enterprise · Federal Republic of Nigeria</div>
            <div className="meta-location">{ADDRESS}</div>
          </div>
        </div>
      </div>

      {/* ── BROADCAST MARQUEE BAND ── */}
      <div className="marquee-container">
        <div className="marquee-inner">
          {[...Array(3)].map((_, loopIdx) =>
            marqueeItems.map((textVal, itemIdx) => (
              <span key={`${loopIdx}-${itemIdx}`} className="marquee-element">{textVal} <span className="marquee-dot">◆</span></span>
            ))
          )}
        </div>
      </div>

      {/* ── AUTO-BUILD CONFIGURATION SHORTCUTS ── */}
      <div className="interactive-assist">
        <div className="assist-heading">Select a preset framework to instantly populate your creative brief form layout below</div>
        <div className="assist-grid">
          <button className="assist-trigger" onClick={() => applyQuickBrief("Music Video Production", "We are aiming to schedule production for a top-tier music video visual. Let's arrange a concept consultation.")}>🎥 Request Music Video Blueprint</button>
          <button className="assist-trigger" onClick={() => applyQuickBrief("TV Commercials & Corporate Campaigns", "We require a premium ad campaign rollout structure to expand our market reach.")}>📺 Arrange Brand Campaign Sync</button>
          <button className="assist-trigger" onClick={() => applyQuickBrief("Event & Concert Production", "Requesting a robust full-scale live event technical stage setup and production crew outline.")}>🏟️ Plan Concert Stage Setup</button>
          <button className="assist-trigger" onClick={() => applyQuickBrief("High-End Editorial Photography", "We want to book a high-fashion editorial portfolio studio or lookbook shoot space.")}>📸 Book Premium Editorial Session</button>
        </div>
      </div>

      {/* ── HIGH-LEVEL VALUE METRICS STRIP ── */}
      <div className="value-sec">
        <div className="value-wrapper">
          <div className="section-tag" style={{ marginBottom: 12 }}>Uncompromising Parameters</div>
          <div className="section-title" style={{ marginBottom: 40 }}>Built For High-Profile <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#c5a059" }}>Entertainment Assets</em></div>
          <div className="value-grid">
            {captions.map((item, idx) => (
              <div key={idx} className="value-card">
                <span className="value-icon">{item.icon}</span>
                <span className="value-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="line-break" />

      {/* ── THE CREATIVE CONCEPT CONFIGURATOR (HIGHLY CURIOSITY TRIGGERING) ── */}
      <div className="config-sec">
        <div className="config-box">
          <div className="config-badge">Premium Concept Builder</div>
          <div className="config-title">Configure Your Visual Project Model</div>
          <div className="config-subtitle">Align your custom criteria variables below to instantly structure an analytical blueprint outline for our executive producers to review.</div>
          
          <div className="config-form">
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c5a059', display: 'block', marginBottom: '10px' }}>1. Primary Service Target</label>
              <div className="input-wrapper" style={{ marginBottom: 0 }}>
                <select value={calcService} onChange={(e) => setCalcService(e.target.value)}>
                  {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
            
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c5a059', display: 'block', marginBottom: '10px' }}>2. Visual Direction & Color Atmosphere</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  "Cinematic Luxury (Moody, High Contrast)",
                  "Vibrant Afro-Futurism (High Color, Punchy)",
                  "Minimalist Clean (High-End Corporate, Crisp)"
                ].map(direction => (
                  <button 
                    key={direction}
                    type="button"
                    onClick={() => setVisualMood(direction)}
                    style={{ 
                      flex: 1, 
                      padding: '16px 12px', 
                      borderRadius: '10px', 
                      border: visualMood === direction ? '2px solid #c5a059' : '1px solid #e0dbcf',
                      background: visualMood === direction ? '#050505' : '#fff',
                      color: visualMood === direction ? '#fff' : '#050505',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {direction.split(" ")[0]} Framework
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#c5a059', display: 'block', marginBottom: '8px' }}>3. Advanced Technological Modules</label>
              <div className="addon-flex">
                <div className={`addon-pill ${addons.drone ? 'selected' : ''}`} onClick={() => toggleAddon('drone')}>
                  <div className="addon-name">🚁 4K Aerial Anamorphic Drone</div>
                  <div className="addon-meta">Elite Module Available</div>
                </div>
                <div className={`addon-pill ${addons.grading ? 'selected' : ''}`} onClick={() => toggleAddon('grading')}>
                  <div className="addon-name">🎨 Hollywood Grade Grading & VFX</div>
                  <div className="addon-meta">Premium Post Setup</div>
                </div>
                <div className={`addon-pill ${addons.choreography ? 'selected' : ''}`} onClick={() => toggleAddon('choreography')}>
                  <div className="addon-name">🎭 Complex Casting & Direction</div>
                  <div className="addon-meta">Industry Sourced</div>
                </div>
              </div>
            </div>

            <div className="config-summary">
              <h4>Project Framework Matrix</h4>
              <div className="status-text">{calcService} Ready For Concept Allocation</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', maxWidth: '580px', margin: '0 auto' }}>
                "Atmosphere configured for {visualMood}. Complete the submission segment below to receive calendar availability options and premium budget frameworks."
              </p>

              {/* Dynamic Live Specification Blueprint Matrix */}
              <div className="live-preview-grid">
                <div className="spec-item">
                  <div className="spec-label">Aspect Framework</div>
                  <strong>{moodMetadata[visualMood]?.aspect || "Standard Scope"}</strong>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Color Space Temp</div>
                  <strong>{moodMetadata[visualMood]?.temp || "Variable Kelvins"}</strong>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Suggested Glass Optic</div>
                  <strong>{moodMetadata[visualMood]?.lens || "Master Prime Grade"}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="line-break" />

      {/* ── THE BLUEPRINT PROTOCOLS (EXECUTIVE FAQ CHANNEL) ── */}
      <div className="faq-sec">
        <div className="faq-wrapper">
          <div className="section-tag" style={{ justifyContent: "center", marginBottom: 12 }}>Pre-Consultation Briefing</div>
          <div className="section-title" style={{ textAlign: "center", fontSize: "2.4rem", marginBottom: 45 }}>The Blueprint <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#c5a059" }}>Protocols</em></div>
          
          {[
            { q: "What is your typical turnaround window from concept kickoff to final delivery?", a: "Because we prioritize absolute premium calibration, standard music assets or high-end TVC campaigns conclude post-production formatting within 14 to 21 bank working days. Expedited global rollouts can be structurally fast-tracked during our initial consultation sync." },
            { q: "Do you facilitate inter-state and international destination film sets?", a: "Completely. While our flagship creative suites are anchored in Lagos, Nigeria, our technical configurations, drone arrays, and master directors regularly deploy globally to capture high-concept lifestyle, fashion, and cinematic entertainment assets anywhere culture calls." },
            { q: "How are project intellectual property rights distributed?", a: "Full commercial broadcasting allocation rights transfer entirely to the client upon final production settlement execution. Focal Length Media retains archival catalog rights for historical studio lookbooks and master industry showreel showcases." }
          ].map((item, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? "active" : ""}`}>
              <button className="faq-trigger" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span>{item.q}</span>
                <span className="faq-icon">＋</span>
              </button>
              {activeFaq === idx && (
                <div className="faq-content">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="line-break" />

      {/* ── STATEMENT INDUSTRY PHILOSOPHY HOOK ── */}
      <div className="identity-hook">
        <div className="identity-inner">
          <div className="identity-label">Engineered For Dynamic Creators</div>
          <div className="identity-headline">
            Your Creative Vibe Is <em>Worldwide.</em><br />
            Your Presentation Layout Must Command Respect.
          </div>
          <p className="identity-desc">
            Whether preparing to anchor a <strong>massive music video asset</strong>, execute a <strong>groundbreaking branding framework</strong>, 
            or coordinate an <strong>uncompromising arena entertainment rollout</strong> — Focal Length Media houses the technical gear, 
            the industrial intelligence, and the creative pedigree necessary to scale concepts into cultural legends. 
            <strong> We eliminate compromise. We deliver perfection.</strong>
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btnBase btnBase-gold"> Let's Lock In Plans — {PHONE_1}</a>
            <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btnBase btnBase-green"> Quick Chat — {PHONE_2}</a>
          </div>
          <div className="testimonial-grid">
            {[
              { t: "\"The most uncompromising, visually articulate production framework operating out of Lagos right now.\"", l: "Music Video Production Client" },
              { t: "\"They don't just place a camera on a tripod; they construct an immersive cultural statement.\"", l: "Brand Campaign Director" },
              { t: "\"Flawless structural coordination. The stage and broadcast setup completely dominated the space.\"", l: "Experiential Concert Promoter" },
              { t: "\"Elite corporate asset protection and absolute industry intelligence for serious modern artists.\"", l: "Entertainment Management Client" },
            ].map((item, idx) => (
              <div key={idx} className="t-card">
                <div className="t-quote">{item.t}</div>
                <div className="t-author">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SYSTEM SERVICE MATRIX GRID ── */}
      <div className="matrix-sec">
        <div className="matrix-head">
          <div>
            <div className="section-tag">Capabilities Spectrum</div>
            <div className="section-title">End-To-End Luxury<br />Execution Matrices</div>
          </div>
          <a href="#enquiry-form" className="btnBase btnBase-dark" style={{ alignSelf: "flex-end" }}>Initialize Consultation Matrix</a>
        </div>
        <div className="matrix-grid">
          {services.map((item) => (
            <div key={item.num} className="matrix-cell">
              <div className="matrix-num">{item.num}</div>
              <div className="matrix-name">{item.name}</div>
              <div className="matrix-detail">{item.detail}</div>
              <div className="matrix-naija">{item.naija}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="line-break" />

      {/* ── SECURE INTAKE HUB HUB FORM ── */}
      <div className="hub-sec" id="enquiry-form">
        <div className="hub-container">
          <div>
            <div className="section-tag">Secure Channels</div>
            <div className="section-title" style={{ marginBottom: 24 }}>Initiate Your Elite<br />Project Blueprint</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "#555", lineHorizontal: 1.9, marginBottom: 32 }}>
              Have an explicit vision or looking to explore creative options? Input details below or access our live desk for immediate priority routing.
            </p>
            <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="channel-strip">
              <div className="channel-icon">💬</div>
              <div><div className="channel-lbl">Secure Desk Line 1</div><div className="channel-val">{PHONE_1}</div></div>
            </a>
            <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="channel-strip">
              <div className="channel-icon">💬</div>
              <div><div className="channel-lbl">Secure Desk Line 2</div><div className="channel-val">{PHONE_2}</div></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="channel-strip">
              <div className="channel-icon">✉️</div>
              <div><div className="channel-lbl">Corporate Intake Inbox</div><div className="channel-val">{EMAIL}</div></div>
            </a>
            <div className="address-container">
              <span className="address-lbl">Corporate Headquarters Address</span>
              <p className="address-val">{ADDRESS}</p>
            </div>
          </div>

          <div>
            <div className="section-tag">Secure Intake Grid</div>
            <div className="section-title" style={{ marginBottom: 32 }}>Submit Project<br />Parameters</div>
            {sent ? (
              <div className="success-wrapper">
                <h3>Transmission Logged ✓</h3>
                <p>Our creative directors are compiling your requested data.<br />For instant sync, <a href={WA_LINK_1}>ping the live WhatsApp desk directly</a>.</p>
              </div>
            ) : (
              <div>
                {[{ k: "name", ph: "Full Legal Name / Corporate Entity *" }, { k: "contact", ph: "Direct Contact Coordinates (WhatsApp / Email) *" }].map((field) => (
                  <div key={field.k} className={`input-wrapper ${focused === field.k ? "active" : ""}`}>
                    <input placeholder={field.ph} value={form[field.k]} onChange={(e) => setForm({ ...form, [field.k]: e.target.value })} onFocus={() => setFocused(field.k)} onBlur={() => setFocused("")} />
                  </div>
                ))}
                <div className={`input-wrapper ${focused === "svc" ? "active" : ""}`}>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} onFocus={() => setFocused("svc")} onBlur={() => setFocused("")}>
                    <option value="">Select Target Capability Area</option>
                    {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className={`input-wrapper ${focused === "msg" ? "active" : ""}`}>
                  <textarea placeholder="Outline your overarching concept narrative and production goals..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("msg")} onBlur={() => setFocused("")} />
                </div>
                <button className="btnBase btnBase-dark" onClick={submit} disabled={sending} style={{ width: "100%", padding: "20px", marginBottom: 14, opacity: sending ? 0.6 : 1 }}>
                  {sending ? "Transmitting Data..." : "Transmit Project Brief →"}
                </button>
                <div className="or-divider"><span>or connect via immediate live link</span></div>
                <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
                  <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btnBase btnBase-green" style={{ flex: 1, padding: "16px 10px", fontSize: "0.68rem" }}>💬 Line {PHONE_1}</a>
                  <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btnBase btnBase-green" style={{ flex: 1, padding: "16px 10px", fontSize: "0.68rem" }}>💬 Line {PHONE_2}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MASTER SYSTEM PORTAL ESCALATION LINK ── */}
      <div className="portal-sec">
        <div className="portal-eyebrow">Explore the flagship archives</div>
        <div className="portal-h2">Review Our Master Showreels.<br /><em>Explore The Profile.</em></div>
        <p className="portal-sub">Access historical global video releases, cinematic features, lookbooks, and current production sets live via our main online platform.</p>
        <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="portal-link">Enter Focal Length Media Portal →</a>
        <div className="portal-url">{WEBSITE_URL.replace("https://", "")}</div>
      </div>

      {/* ── FOOTER FRAME LINES ── */}
      <div className="footer-frame">
        <span>© 2026 Focal Length Media Hub · Corporate Registration Number: 9528632</span>
        <span>Lagos, Nigeria</span>
      </div>

    </div>
  );
}