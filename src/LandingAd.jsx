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

const WA_MSG = encodeURIComponent("Hi Focal Length Media! I'd like to discuss a project with you.");
const WA_LINK_1 = `https://wa.me/${WA1}?text=${WA_MSG}`;
const WA_LINK_2 = `https://wa.me/${WA2}?text=${WA_MSG}`;

const services = [
  { num: "01", name: "Music Video Production", detail: "Concept to final cut — we shoot videos that break the internet", naija: "Your sound deserves a visual that slaps", basePrice: 1500000 },
  { num: "02", name: "Artist Management", detail: "Bookings, branding, deals, and career strategy", naija: "From the studio to the stage — we move with you", basePrice: 500000 },
  { num: "03", name: "Event & Concert Production", detail: "Full stage setup, lighting, sound, multi-cam coverage", naija: "We handle the show so you can enjoy the energy", basePrice: 2500000 },
  { num: "04", name: "TV Commercials & Ads", detail: "TVC, online ads, brand activations, product campaigns", naija: "Make your brand the one everybody knows", basePrice: 2000000 },
  { num: "05", name: "Photography", detail: "Artist shoots, brand campaigns, event photography", naija: "Still frames with motion energy", basePrice: 350000 },
  { num: "06", name: "General Entertainment", detail: "Film, TV, digital content, talent sourcing", naija: "If it's entertainment — we've done it", basePrice: 1200000 },
];

const marqueeItems = [
  "Music Videos", "Afrobeats", "Amapiano", "Artist Management",
  "Afropop", "TV Commercials", "Lagos", "Event Production",
  "Photography", "Nollywood", "Afrofusion", "Brand Campaigns",
  "Entertainment", "Nigeria", "Highlife", "Concert Production",
];

const captions = [
  { icon: "🎵", text: "From Afrobeats to Amapiano — we shoot the vibe" },
  { icon: "🎬", text: "Naija music videos that travel worldwide" },
  { icon: "🔥", text: "The studio that Nollywood trusts" },
  { icon: "🎤", text: "Your next hit single needs the right visual" },
  { icon: "📺", text: "TVC that makes Lagos stop and look twice" },
  { icon: "🚀", text: "We take Nigerian talent global" },
];

export default function LandingAd() {
  const [form, setForm] = useState({ name: "", contact: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState("");
  
  // Interactive Live Calculator Bundle States
  const [calcService, setCalcService] = useState(services[0].name);
  const [calcScale, setCalcScale] = useState(1.2); 
  const [addons, setAddons] = useState({ drone: false, vfx: false, casting: false });

  const selectedServiceObj = services.find(s => s.name === calcService) || services[0];
  
  // Calculate dynamic bundle total cost
  let addonCost = 0;
  if (addons.drone) addonCost += 350000;
  if (addons.vfx) addonCost += 450000;
  if (addons.casting) addonCost += 300000;
  const estimatedCost = Math.round((selectedServiceObj.basePrice * calcScale) + addonCost);

  // Auto-fill prompt helper for lazy/busy ad leads
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
    if (!form.name || !form.contact) { alert("Please enter your name and contact."); return; }
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...form, 
          estimatedBudgetCalculated: `₦${estimatedCost.toLocaleString()}`,
          scaleChosen: calcScale === 1.0 ? "Standard" : calcScale === 1.4 ? "Premium Pro" : "Cinematic International",
          addonsSelected: Object.keys(addons).filter(k => addons[k]).join(", ") || "None"
        }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else alert("Something went wrong. Please WhatsApp us directly.");
    } catch { alert("Cannot reach server. Please contact us on WhatsApp."); }
    setSending(false);
  };

  return (
    <div style={{ background: "#f7f5f0", fontFamily: "'Inter', sans-serif", color: "#0d0d0d", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; background: #f7f5f0; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #b8944a; border-radius: 10px; }

        /* ── FLYER LUXURY CONTAINER ── */
        .flyer {
          background: radial-gradient(circle at 80% 20%, #171717 0%, #0a0a0a 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .flyer-orb1 { position: absolute; top: -120px; right: -100px; width: 550px; height: 550px; border-radius: 50%; background: radial-gradient(circle, rgba(184,148,74,0.22) 0%, transparent 70%); pointer-events: none; }
        .flyer-orb2 { position: absolute; bottom: -80px; left: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(26,173,84,0.12) 0%, transparent 70%); pointer-events: none; }
        .flyer-orb3 { position: absolute; top: 35%; left: 25%; width: 650px; height: 650px; border-radius: 50%; background: radial-gradient(circle, rgba(184,148,74,0.06) 0%, transparent 70%); pointer-events: none; }

        .flyer-topstrip { background: linear-gradient(90deg, #b8944a, #967433); padding: 14px clamp(24px, 6vw, 56px); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; flex-shrink: 0; position: relative; z-index: 3; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        .flyer-topstrip span { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; color: #fff; }

        .flyer-body { flex: 1; padding: clamp(40px, 6vw, 70px) clamp(24px, 6vw, 56px); display: flex; flex-direction: column; position: relative; z-index: 2; }

        .flyer-brand { display: flex; align-items: center; gap: 18px; margin-bottom: clamp(40px, 6vw, 60px); }
        .flyer-logo { width: clamp(60px, 9vw, 84px); height: clamp(60px, 9vw, 84px); border-radius: 16px; object-fit: cover; border: 2px solid rgba(184,148,74,0.6); box-shadow: 0 8px 25px rgba(0,0,0,0.5); flex-shrink: 0; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .flyer-brand:hover .flyer-logo { transform: rotate(8deg) scale(1.08); border-color: #fff; }
        .flyer-name { font-family: 'Inter', sans-serif; font-size: clamp(0.95rem, 2.2vw, 1.2rem); font-weight: 900; letter-spacing: 4px; text-transform: uppercase; color: #fff; line-height: 1; margin-bottom: 6px; background: linear-gradient(to right, #fff, #f3e7c4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .flyer-tagline { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgba(184,148,74,1); }

        .flyer-headline { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(3.4rem, 11vw, 9rem); line-height: 0.88; letter-spacing: -0.03em; color: #fff; margin-bottom: clamp(20px, 3vw, 28px); }
        .flyer-headline em { font-style: italic; color: #b8944a; display: block; background: linear-gradient(45deg, #b8944a, #fffdf9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .flyer-headline .outline { -webkit-text-stroke: 1.5px rgba(255,255,255,0.35); -webkit-text-fill-color: transparent; display: block; }

        .flyer-hook { font-family: 'Inter', sans-serif; font-size: clamp(0.9rem, 2.4vw, 1.15rem); font-weight: 300; color: rgba(255,255,255,0.65); line-height: 1.85; max-width: 650px; margin-bottom: clamp(28px, 4vw, 40px); border-left: 4px solid #b8944a; padding-left: 24px; }
        .flyer-hook strong { color: #fff; font-weight: 700; }

        .flyer-genres { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: clamp(28px, 4vw, 40px); }
        .genre-tag { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; border-radius: 50px; transition: all 0.25s ease; cursor: pointer; }
        .genre-tag:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 6px 15px rgba(184,148,74,0.2); }
        .genre-gold { background: rgba(184,148,74,0.15); border: 1px solid #b8944a; color: #b8944a; }
        .genre-white { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.62); }
        .genre-green { background: rgba(26,173,84,0.12); border: 1px solid #1aad54; color: #1aad54; }

        .flyer-contacts { display: flex; flex-direction: column; gap: 16px; margin-bottom: clamp(32px, 4.5vw, 48px); }
        .fc-row { display: flex; align-items: center; gap: 16px; }
        .fc-icon { width: 42px; height: 42px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
        .fc-lbl { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; margin-bottom: 3px; }
        .fc-val { font-family: 'Inter', sans-serif; font-size: clamp(0.85rem, 2vw, 1rem); font-weight: 500; color: rgba(255,255,255,0.9); }
        .fc-wa-link { color: #1aad54 !important; font-weight: 800; text-decoration: none; font-size: clamp(0.85rem, 2vw, 1rem); font-family: 'Inter', sans-serif; transition: opacity 0.2s; }
        .fc-wa-link:hover { opacity: 0.85; text-decoration: underline; }

        .flyer-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: clamp(32px, 4.5vw, 50px); }
        .fBtn { display: inline-flex; align-items: center; justify-content: center; gap: 12px; font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; border: none; border-radius: 10px; padding: 18px 30px; cursor: pointer; text-decoration: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .fBtn:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,0.4); filter: brightness(1.2); }
        .fBtn-green { background: #1aad54; color: #fff; }
        .fBtn-gold { background: #b8944a; color: #fff; }
        .fBtn-ghost { background: transparent; color: rgba(255,255,255,0.65); border: 1px solid rgba(255,255,255,0.25); }
        .fBtn-ghost:hover { color: #fff; border-color: #fff; background: rgba(255,255,255,0.05); }

        .flyer-bot { margin-top: auto; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .flyer-rc { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.22); }
        .flyer-addr { font-family: 'Inter', sans-serif; font-size: 0.65rem; color: rgba(255,255,255,0.45); text-align: right; line-height: 1.6; }

        /* ── MARQUEE CONTINUOUS SYSTEM ── */
        .marquee-wrap { background: #b8944a; overflow: hidden; padding: 18px 0; box-shadow: 0 4px 20px rgba(184,148,74,0.25); }
        .marquee-track { display: flex; animation: marquee 22s linear infinite; width: max-content; }
        .mi { font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; color: #fff; padding: 0 40px; white-space: nowrap; display: flex; align-items: center; gap: 14px; }
        .md { color: rgba(255,255,255,0.55); }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* ── INTERACTIVE QUICK ASSIST PUSH BUTTONS ── */
        .quick-assist-sec { background: #fff; padding: 36px clamp(24px, 6%, 56px); border-bottom: 1px solid #e0dbd0; text-align: center; }
        .quick-label { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; margin-bottom: 14px; }
        .quick-flex { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; max-width: 900px; margin: 0 auto; }
        .quick-tag-btn { background: #fafaf8; border: 1px solid #dcd8cf; border-radius: 8px; padding: 12px 18px; font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 700; color: #2d2d2d; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 8px; }
        .quick-tag-btn:hover { background: #0d0d0d; color: #fff; border-color: #0d0d0d; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.08); }

        /* ── CAPTIONS STRIP ── */
        .captions-sec { background: #fff; padding: clamp(60px, 7vw, 90px) clamp(24px, 6%, 56px); }
        .captions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; max-width: 1180px; margin: 0 auto; }
        .caption-card { background: #fafaf8; border: 1px solid #e5e2da; border-radius: 14px; padding: 26px 24px; display: flex; align-items: flex-start; gap: 18px; transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .caption-card:hover { border-color: #b8944a; background: #fffdf9; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(184,148,74,0.08); }
        .caption-icon { font-size: 1.8rem; flex-shrink: 0; line-height: 1; }
        .caption-text { font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 600; color: #232323; line-height: 1.65; }

        /* ── INTERACTIVE ADVANCED BUNDLE ESTIMATOR WIDGET ── */
        .estimator-sec { background: #fff; padding: 50px clamp(24px, 6%, 56px); border-top: 1px solid #e0dbd0; }
        .est-box { max-width: 780px; margin: 0 auto; background: #fafaf8; border: 2px solid #b8944a; border-radius: 20px; padding: 40px 36px; box-shadow: 0 16px 50px rgba(184,148,74,0.06); position: relative; }
        .est-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #b8944a; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; padding: 6px 18px; border-radius: 50px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .est-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 900; text-align: center; margin-bottom: 28px; color: #0d0d0d; }
        .est-flex { display: flex; flex-direction: column; gap: 24px; }
        
        .addon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 4px; }
        .addon-card { background: #fff; border: 1px solid #e0dbd0; border-radius: 8px; padding: 14px; text-align: center; cursor: pointer; transition: all 0.2s; user-select: none; }
        .addon-card.active { border-color: #1aad54; background: rgba(26,173,84,0.04); box-shadow: 0 0 0 2px #1aad54; }
        .addon-title { font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 800; color: #0d0d0d; margin-bottom: 3px; }
        .addon-price { font-family: 'Inter', sans-serif; font-size: 0.68rem; color: #b8944a; font-weight: 700; }

        .est-output { text-align: center; background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%); color: #fff; padding: 26px; border-radius: 12px; margin-top: 14px; position: relative; border: 1px solid rgba(184,148,74,0.2); }
        .est-output h4 { font-family: 'Inter', sans-serif; font-size: 0.68rem; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; margin-bottom: 6px; }
        .est-output .price { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 900; color: #fff; letter-spacing: -0.01em; background: linear-gradient(to right, #fff, #f5f0e6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        /* ── NAIJA HOOK SECTION ── */
        .naija-sec { background: #0d0d0d; padding: clamp(70px, 9vw, 110px) clamp(24px, 6%, 56px); position: relative; }
        .naija-inner { max-width: 1180px; margin: 0 auto; }
        .naija-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 5px; text-transform: uppercase; color: #b8944a; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .naija-label::before { content:''; display:block; width:24px; height:1px; background:#b8944a; }
        .naija-headline { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(2.6rem, 6.5vw, 5.6rem); line-height: 1.05; letter-spacing: -0.02em; color: #fff; margin-bottom: 32px; }
        .naija-headline em { font-style: italic; color: #b8944a; }
        .naija-body { font-family: 'Inter', sans-serif; font-size: clamp(0.95rem, 2vw, 1.15rem); font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.95; max-width: 780px; margin-bottom: 44px; }
        .naija-body strong { color: #fff; font-weight: 700; }
        .naija-quotes { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; margin-top: 54px; }
        .nq { background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px 24px; border-left: 4px solid #b8944a; transition: all 0.2s ease; }
        .nq:hover { transform: translateY(-5px); background: rgba(255,255,255,0.035); border-color: rgba(184,148,74,0.4); }
        .nq-text { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.05rem; color: rgba(255,255,255,0.9); line-height: 1.75; margin-bottom: 14px; }
        .nq-label { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; }

        /* ── SERVICES ── */
        .svc-sec { background: #fff; padding: clamp(70px, 9vw, 110px) clamp(24px, 6%, 56px); }
        .svc-head { max-width: 1180px; margin: 0 auto; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 20px; margin-bottom: 12px; }
        .sec-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 5px; text-transform: uppercase; color: #b8944a; margin-bottom: 14px; display: flex; align-items: center; gap: 12px; }
        .sec-label::before { content:''; display:block; width:24px; height:1px; background:#b8944a; }
        .sec-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.02em; }
        .svc-grid { max-width: 1180px; margin: 52px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #e0dbd0; border-left: 1px solid #e0dbd0; }
        .svc-cell { padding: 40px 34px; border-right: 1px solid #e0dbd0; border-bottom: 1px solid #e0dbd0; transition: all 0.28s ease; position: relative; overflow: hidden; }
        .svc-cell:hover { background: #fafaf8; transform: scale(1.005); z-index: 2; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        .svc-cell::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: #b8944a; transform: scaleX(0); transition: transform 0.25s ease; transform-origin: left; }
        .svc-cell:hover::after { transform: scaleX(1); }
        .svc-n { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.9rem; font-weight: 700; color: #b8944a; margin-bottom: 14px; }
        .svc-name { font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 800; color: #0d0d0d; margin-bottom: 10px; }
        .svc-detail { font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #555; line-height: 1.75; margin-bottom: 12px; }
        .svc-naija { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.85rem; color: #b8944a; font-weight: 700; }

        /* ── CONTACT + FORM ── */
        .cf-sec { background: #f7f5f0; padding: clamp(70px, 9vw, 110px) clamp(24px, 6%, 56px); }
        .cf-inner { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .cpill { display: flex; align-items: center; gap: 16px; padding: 18px 22px; border: 1px solid #e0dbd0; border-radius: 12px; text-decoration: none; background: #fff; transition: all 0.2s; margin-bottom: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .cpill:hover { border-color: #b8944a; transform: translateX(6px); box-shadow: 0 8px 20px rgba(184,148,74,0.1); }
        .cpill-icon { width: 44px; height: 44px; background: #f5f0e6; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
        .cpill-lbl { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; margin-bottom: 3px; }
        .cpill-val { font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 700; color: #0d0d0d; }
        .addr-box { background: #fff; border: 1px solid #e0dbd0; border-radius: 12px; padding: 24px; margin-top: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .addr-lbl { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; display: block; margin-bottom: 10px; }
        .addr-val { font-family: 'Inter', sans-serif; font-size: 0.88rem; color: #3d3d3d; line-height: 1.8; }

        .f-field { background: #fff; border: 1px solid #e0dbd0; border-radius: 10px; margin-bottom: 16px; transition: all 0.2s; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02); }
        .f-field.foc { border-color: #b8944a; box-shadow: 0 0 0 3px rgba(184,148,74,0.18); }
        .f-field input, .f-field select, .f-field textarea { width: 100%; background: transparent; border: none; outline: none; padding: 20px 22px; font-family: 'Inter', sans-serif; font-size: 0.92rem; font-weight: 400; color: #0d0d0d; }
        .f-field input::placeholder, .f-field textarea::placeholder { color: #b0b0b0; }
        .f-field select { cursor: pointer; appearance: none; color: #3d3d3d; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%23b8944a' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>"); background-repeat: no-repeat; background-position: right 22px center; padding-right: 44px; }
        .f-field select option { background: #fff; padding: 12px; }
        .f-field textarea { resize: none; }
        .f-or { display: flex; align-items: center; gap: 14px; margin: 18px 0; }
        .f-or::before, .f-or::after { content:''; flex:1; height:1px; background:#e0dbd0; }
        .f-or span { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #b8b8b8; }

        /* ── ACTION BUTTONS SYSTEM ── */
        .btn { display:inline-flex; align-items:center; justify-content:center; gap:12px; font-family:'Inter',sans-serif; font-weight:900; font-size:0.8rem; letter-spacing:2.5px; text-transform:uppercase; border:none; cursor:pointer; text-decoration:none; border-radius:10px; transition:all 0.25s cubic-bezier(0.4, 0, 0.2, 1); padding: 20px 36px; }
        .btn:hover { transform:translateY(-4px); }
        .btn-dark { background:#0d0d0d; color:#fff; box-shadow:0 8px 25px rgba(0,0,0,0.18); }
        .btn-dark:hover { box-shadow:0 16px 40px rgba(0,0,0,0.28); background: #1e1e1e; }
        .btn-gold { background:#b8944a; color:#fff; box-shadow:0 8px 25px rgba(184,148,74,0.3); }
        .btn-gold:hover { filter:brightness(1.1); box-shadow:0 14px 35px rgba(184,148,74,0.4); }
        .btn-green { background:#1aad54; color:#fff; box-shadow:0 8px 25px rgba(26,173,84,0.25); }
        .btn-green:hover { filter:brightness(1.1); box-shadow:0 14px 35px rgba(26,173,84,0.35); }

        .success-box { background:#f5f0e6; border:2px dashed #b8944a; border-radius:14px; padding:55px 36px; text-align:center; }
        .success-box h3 { font-family:'Playfair Display',serif; font-size:2rem; font-weight:900; color:#b8944a; margin-bottom:16px; }
        .success-box p { font-family:'Inter',sans-serif; font-size:0.95rem; color:#3d3d3d; line-height:1.85; }
        .success-box a { color:#b8944a; font-weight: 800; text-decoration: none; }
        .success-box a:hover { text-decoration: underline; }

        /* ── SITE LINK EXTRA GRADIENT ── */
        .site-sec { background: linear-gradient(135deg, #0a0a0a 0%, #171717 100%); padding:clamp(90px,11vw,140px) clamp(24px,6%,56px); text-align:center; position: relative; }
        .site-eyebrow { font-family:'Inter',sans-serif; font-size:0.62rem; font-weight:800; letter-spacing:5px; text-transform:uppercase; color:#b8944a; margin-bottom:24px; display:flex; align-items:center; justify-content:center; gap:14px; }
        .site-eyebrow::before, .site-eyebrow::after { content:''; display:block; width:32px; height:1px; background:#b8944a; }
        .site-h2 { font-family:'Playfair Display',serif; font-size:clamp(2.8rem,6vw,5.8rem); font-weight:900; line-height:1; letter-spacing:-0.025em; color:#fff; margin-bottom:20px; }
        .site-h2 em { font-style:italic; color:#b8944a; background: linear-gradient(to right, #b8944a, #fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .site-sub { font-family:'Inter',sans-serif; font-size:0.95rem; color:rgba(255,255,255,0.45); font-weight:300; margin-bottom:48px; max-width:530px; margin-left:auto; margin-right:auto; line-height:1.85; }
        .site-btn { display:inline-flex; align-items:center; gap:16px; background:#b8944a; color:#fff; font-family:'Inter',sans-serif; font-size:0.88rem; font-weight:900; letter-spacing:2px; text-transform:uppercase; padding:24px 64px; border-radius:10px; text-decoration:none; transition:all 0.25s ease; box-shadow:0 12px 40px rgba(184,148,74,0.4); }
        .site-btn:hover { filter:brightness(1.18); transform:translateY(-5px); box-shadow:0 20px 55px rgba(184,148,74,0.55); }
        .site-url { font-family:'Inter',sans-serif; font-size:0.68rem; color:rgba(255,255,255,0.2); letter-spacing:2px; margin-top:22px; text-transform: uppercase; }

        /* ── FOOTER ── */
        .footer { background:#070707; padding:36px clamp(24px,6%,56px); display:flex; flex-wrap:wrap; gap:14px; align-items:center; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.04); }
        .footer span { font-family:'Inter',sans-serif; font-size:0.6rem; letter-spacing:2.5px; text-transform:uppercase; color:rgba(255,255,255,0.3); font-weight: 600; }

        .divider { width:100%; height:1px; background:#e0dbd0; }

        /* ── RESPONSIVE ADAPTATIONS ── */
        @media (max-width: 900px) {
          .cf-inner { grid-template-columns: 1fr; gap: 60px; }
          .svc-grid { grid-template-columns: 1fr 1fr; }
          .svc-cell:nth-child(3n) { border-right: 1px solid #e0dbd0; }
          .svc-cell:nth-child(2n) { border-right: none; }
          .naija-quotes { grid-template-columns: 1fr 1fr; }
          .addon-grid { grid-template-columns: 1fr; gap: 8px; }
        }
        @media (max-width: 580px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-cell { border-right: none !important; padding: 32px 20px; }
          .naija-quotes { grid-template-columns: 1fr; }
          .flyer-ctas { flex-direction: column; }
          .flyer-ctas a { width: 100%; }
          .site-btn { width: 100%; justify-content: center; padding: 22px 24px; }
          .flyer-addr { text-align: left; }
          .captions-grid { grid-template-columns: 1fr; }
          .est-box { padding: 30px 18px; }
        }
      `}</style>

      {/* ══════════════
          FLYER / POSTER SECTION
      ══════════════ */}
      <div className="flyer">
        <div className="flyer-orb1" /><div className="flyer-orb2" /><div className="flyer-orb3" />

        <div className="flyer-topstrip">
          <span>🎬 Nigeria's Premier Creative Production House</span>
          <span>RC: 9528632 · Ikeja, Lagos</span>
        </div>

        <div className="flyer-body">
          {/* brand identifier */}
          <div className="flyer-brand">
            <img src={LOGO} alt="FLM" className="flyer-logo" />
            <div>
              <div className="flyer-name">Focal Length Media</div>
              <div className="flyer-tagline">Your One-Stop Production Place</div>
            </div>
          </div>

          {/* elite screen headline */}
          <div className="flyer-headline">
            We Frame
            <em>Your Story.</em>
            <span className="outline">We Sell Your Sound.</span>
          </div>

          {/* localized hook copy */}
          <p className="flyer-hook">
            From <strong>Afrobeats to Amapiano</strong>, from <strong>Nollywood to brand campaigns</strong> —
            we produce visuals that stop the scroll, move the crowd and travel worldwide.
            If you're a Nigerian artist, brand or entertainer — <strong>this is the studio for you.</strong>
          </p>

          {/* culture filter tags */}
          <div className="flyer-genres">
            <span className="genre-tag genre-gold" onClick={() => applyQuickBrief("Music Video Production", "Yo! I've got a fresh Afrobeat track dropping soon and want a world-class music video brief.")}>🎵 Afrobeats</span>
            <span className="genre-tag genre-gold" onClick={() => applyQuickBrief("Music Video Production", "I want an ultra-modern Amapiano visual production setup.")}>🎶 Amapiano</span>
            <span className="genre-tag genre-gold" onClick={() => applyQuickBrief("Artist Management", "Let's discuss professional management strategy for my music career.")}>🎤 Artist Management</span>
            <span className="genre-tag genre-green" onClick={() => applyQuickBrief("General Entertainment", "Looking to book high-end Nollywood film / digital content production crew.")}>🎬 Nollywood</span>
            <span className="genre-tag genre-white">📺 TVC Commercials</span>
            <span className="genre-tag genre-white">🏟️ Live Concert Coverage</span>
          </div>

          {/* direct communication hubs */}
          <div className="flyer-contacts">
            <div className="fc-row">
              <div className="fc-icon">💬</div>
              <div>
                <div className="fc-lbl">WhatsApp — Tap to Chat</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="fc-wa-link">{PHONE_1}</a>
                  <span style={{ color: "rgba(255,255,255,0.18)" }}>·</span>
                  <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="fc-wa-link">{PHONE_2}</a>
                </div>
              </div>
            </div>
            <div className="fc-row">
              <div className="fc-icon">✉️</div>
              <div>
                <div className="fc-lbl">Email</div>
                <div className="fc-val">{EMAIL}</div>
              </div>
            </div>
            <div className="fc-row">
              <div className="fc-icon">📍</div>
              <div>
                <div className="fc-lbl">Office Location</div>
                <div className="fc-val">{ADDRESS}</div>
              </div>
            </div>
          </div>

          {/* high priority CTAs */}
          <div className="flyer-ctas">
            <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="fBtn fBtn-green">💬 Chat — {PHONE_1}</a>
            <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="fBtn fBtn-green">💬 Chat — {PHONE_2}</a>
            <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="fBtn fBtn-ghost">🌐 Full Portfolio Website</a>
          </div>

          {/* foundational layout split footer */}
          <div className="flyer-bot">
            <div className="flyer-rc">RC: 9528632 · CAC Registered · Nigeria</div>
            <div className="flyer-addr">{ADDRESS}</div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE CONTINUOUS BROADCAST STRIP ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(3)].map((_, gi) =>
            marqueeItems.map((t, i) => (
              <span key={`${gi}-${i}`} className="mi">{t} <span className="md">◆</span></span>
            ))
          )}
        </div>
      </div>

      {/* ── INTERACTIVE "ONE-TAP BRIEF" AUTO-FILL ASSISTANT ── */}
      <div className="quick-assist-sec">
        <div className="quick-label">Tap to instantly auto-build your enquiry brief below</div>
        <div className="quick-flex">
          <button className="quick-tag-btn" onClick={() => applyQuickBrief("Music Video Production", "I want to shoot a professional high-concept music video for my next single track.")}>🎥 Music Video Brief</button>
          <button className="quick-tag-btn" onClick={() => applyQuickBrief("TV Commercials & Ads", "I want a high-converting social media/TV commercial ad campaign for my brand.")}>📺 Brand Commercial Ad</button>
          <button className="quick-tag-btn" onClick={() => applyQuickBrief("Event & Concert Production", "We need multi-cam setups, heavy sound and stage production for an upcoming live event.")}>🏟️ Concert Production</button>
          <button className="quick-tag-btn" onClick={() => applyQuickBrief("Photography", "Looking to book an artist portrait studio session / brand promo photoshoot.")}>📸 Professional Photoshoot Brief</button>
        </div>
      </div>

      {/* ── BRAND CAPTIONS PROPOSITION STRIP ── */}
      <div className="captions-sec">
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="sec-label" style={{ marginBottom: 10 }}>Why FLM</div>
          <div className="sec-h2" style={{ marginBottom: 38 }}>Made for the <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#b8944a" }}>Naija</em> Entertainment Space</div>
          <div className="captions-grid">
            {captions.map((c, i) => (
              <div key={i} className="caption-card">
                <span className="caption-icon">{c.icon}</span>
                <span className="caption-text">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── INTERACTIVE PREMIUM CUSTOM BUNDLE ESTIMATOR ── */}
      <div className="estimator-sec">
        <div className="est-box">
          <div className="est-badge">Live Interactive Toolkit</div>
          <div className="est-title">Build Your Custom Project Estimate</div>
          <div className="est-flex">
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#b8944a', display: 'block', marginBottom: '8px' }}>1. Select core service segment</label>
              <div className="f-field" style={{ marginBottom: 0 }}>
                <select value={calcService} onChange={(e) => setCalcService(e.target.value)}>
                  {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>
            
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#b8944a', display: 'block', marginBottom: '8px' }}>2. Choose production tier</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Standard Tier', val: 1.0 },
                  { label: 'Premium Tier (Lagos Pro)', val: 1.4 },
                  { label: 'Elite International Cinematic', val: 2.1 }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => setCalcScale(opt.val)}
                    style={{ 
                      flex: 1, 
                      padding: '14px 10px', 
                      borderRadius: '8px', 
                      border: calcScale === opt.val ? '2px solid #b8944a' : '1px solid #e0dbd0',
                      background: calcScale === opt.val ? '#0d0d0d' : '#fff',
                      color: calcScale === opt.val ? '#fff' : '#0d0d0d',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#b8944a', display: 'block', marginBottom: '6px' }}>3. Optional Project Add-ons (Multi-Bundle)</label>
              <div className="addon-grid">
                <div className={`addon-card ${addons.drone ? 'active' : ''}`} onClick={() => toggleAddon('drone')}>
                  <div className="addon-title">🚁 4K Pro Drone Footage</div>
                  <div className="addon-price">+₦350,000</div>
                </div>
                <div className={`addon-card ${addons.vfx ? 'active' : ''}`} onClick={() => toggleAddon('vfx')}>
                  <div className="addon-title">🎨 Advanced VFX & Grading</div>
                  <div className="addon-price">+₦450,000</div>
                </div>
                <div className={`addon-card ${addons.casting ? 'active' : ''}`} onClick={() => toggleAddon('casting')}>
                  <div className="addon-title">🎭 Model & Casting Sourcing</div>
                  <div className="addon-price">+₦300,000</div>
                </div>
              </div>
            </div>

            <div className="est-output">
              <h4>Estimated Project Bundle Range</h4>
              <div className="price">₦{estimatedCost.toLocaleString()}</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', marginTop: '6px' }}>*Custom dynamic quote updates live. Submit form layout below to reserve booking calendar dates.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── NAIJA CULTURE HOOK STRIP ── */}
      <div className="naija-sec">
        <div className="naija-inner">
          <div className="naija-label">For Nigerian Artists & Brands</div>
          <div className="naija-headline">
            Your Sound Is <em>Global.</em><br />
            Your Visual Should Match.
          </div>
          <p className="naija-body">
            Whether you're dropping a <strong>new single</strong>, shooting your <strong>debut music video</strong>,
            promoting your <strong>brand campaign</strong> or planning a <strong>major concert</strong> —
            Focal Length Media has the team, the studio, the equipment and the creative vision to make
            your project look like it was shot anywhere in the world. <strong>Because we're right here in Lagos.</strong>
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btn btn-gold">💬 Let's Talk — {PHONE_1}</a>
            <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btn btn-green">💬 Let's Talk — {PHONE_2}</a>
          </div>
          <div className="naija-quotes">
            {[
              { t: "\"We shoot Afrobeats music videos that travel far beyond Lagos.\"", l: "Music Video Production" },
              { t: "\"Your concert deserves a full production team, not a phone camera.\"", l: "Event & Concert Production" },
              { t: "\"From TVC to digital ads — we make brands impossible to ignore.\"", l: "TV Commercials & Campaigns" },
              { t: "\"Artist management that actually understands the Nigerian industry.\"", l: "Artist Management" },
            ].map((q, i) => (
              <div key={i} className="nq">
                <div className="nq-text">{q.t}</div>
                <div className="nq-label">{q.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PREMIUM SERVICES GRID SYSTEM ── */}
      <div className="svc-sec">
        <div className="svc-head">
          <div>
            <div className="sec-label">What We Offer</div>
            <div className="sec-h2">Everything Your<br />Project Needs</div>
          </div>
          <a href="#enquiry-form" className="btn btn-dark" style={{ alignSelf: "flex-end" }}>Book a Consultation</a>
        </div>
        <div className="svc-grid">
          {services.map((s) => (
            <div key={s.num} className="svc-cell">
              <div className="svc-n">{s.num}</div>
              <div className="svc-name">{s.name}</div>
              <div className="svc-detail">{s.detail}</div>
              <div className="svc-naija">{s.naija}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── HUB ENQUIRY FORM + DIRECT COMMS ── */}
      <div className="cf-sec" id="enquiry-form">
        <div className="cf-inner">
          <div>
            <div className="sec-label">Contact Us</div>
            <div className="sec-h2" style={{ marginBottom: 20 }}>Let's Make<br />Something Great</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#666", lineHeight: 1.85, marginBottom: 28 }}>
              Got a music video idea? A brand to build? An event to produce?
              Tap below — we respond same day.
            </p>
            <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="cpill">
              <div className="cpill-icon">💬</div>
              <div><div className="cpill-lbl">WhatsApp Hub 1</div><div className="cpill-val">{PHONE_1}</div></div>
            </a>
            <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="cpill">
              <div className="cpill-icon">💬</div>
              <div><div className="cpill-lbl">WhatsApp Hub 2</div><div className="cpill-val">{PHONE_2}</div></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="cpill">
              <div className="cpill-icon">✉️</div>
              <div><div className="cpill-lbl">Email Inquiries</div><div className="cpill-val">{EMAIL}</div></div>
            </a>
            <div className="addr-box">
              <span className="addr-lbl">Our Lagos HQ Office</span>
              <p className="addr-val">{ADDRESS}</p>
            </div>
          </div>

          <div>
            <div className="sec-label">Send an Enquiry</div>
            <div className="sec-h2" style={{ marginBottom: 28 }}>We Reply<br />Within Hours</div>
            {sent ? (
              <div className="success-box">
                <h3>Message Received ✓</h3>
                <p>We'll be in touch shortly.<br />For faster response, <a href={WA_LINK_1}>chat us on WhatsApp</a>.</p>
              </div>
            ) : (
              <div>
                {[{ k: "name", ph: "Your Full Name *" }, { k: "contact", ph: "Phone Number or Email *" }].map((f) => (
                  <div key={f.k} className={`f-field ${focused === f.k ? "foc" : ""}`}>
                    <input placeholder={f.ph} value={form[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} onFocus={() => setFocused(f.k)} onBlur={() => setFocused("")} />
                  </div>
                ))}
                <div className={`f-field ${focused === "svc" ? "foc" : ""}`}>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} onFocus={() => setFocused("svc")} onBlur={() => setFocused("")}>
                    <option value="">Select a Service</option>
                    {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className={`f-field ${focused === "msg" ? "foc" : ""}`}>
                  <textarea placeholder="Tell us about your project..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("msg")} onBlur={() => setFocused("")} />
                </div>
                <button className="btn btn-dark" onClick={submit} disabled={sending} style={{ width: "100%", padding: "18px", marginBottom: 12, opacity: sending ? 0.6 : 1 }}>
                  {sending ? "Sending..." : "Send Enquiry →"}
                </button>
                <div className="f-or"><span>or reach us directly</span></div>
                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                  <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btn btn-green" style={{ flex: 1, padding: "15px 10px", fontSize: "0.66rem" }}>💬 {PHONE_1}</a>
                  <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btn btn-green" style={{ flex: 1, padding: "15px 10px", fontSize: "0.66rem" }}>💬 {PHONE_2}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CENTRALIZED HUB PROFILE SYSTEM DIRECT LINK ── */}
      <div className="site-sec">
        <div className="site-eyebrow">See the full picture</div>
        <div className="site-h2">Portfolio. Showreel.<br /><em>Company Profile.</em></div>
        <p className="site-sub">Explore our full body of work — music videos, feature films, TV commercials, studio gallery and everything in between.</p>
        <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="site-btn">Visit Focal Length Media →</a>
        <div className="site-url">{WEBSITE_URL.replace("https://", "")}</div>
      </div>

      {/* ── FOOTER FRAME SYSTEM ── */}
      <div className="footer">
        <span>© 2026 Focal Length Media · RC 9528632</span>
        <span>Ikeja, Lagos, Nigeria</span>
      </div>

    </div>
  );
}