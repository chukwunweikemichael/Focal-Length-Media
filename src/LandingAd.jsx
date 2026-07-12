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

const WA_LINK_1 = `https://wa.me/${WA1}?text=${encodeURIComponent("Hi Focal Length Media! I'd like to discuss a project with you.")}`;
const WA_LINK_2 = `https://wa.me/${WA2}?text=${encodeURIComponent("Hi Focal Length Media! I'd like to discuss a project with you.")}`;

const services = [
  { num: "01", name: "Media Production", detail: "Feature films, documentaries, branded content" },
  { num: "02", name: "Artist Management", detail: "Studio to spotlight, career development" },
  { num: "03", name: "Event & Project Mgt", detail: "Concerts, activations, corporate events" },
  { num: "04", name: "TV Commercials", detail: "TVC, online ads, product campaigns" },
  { num: "05", name: "Photography", detail: "Commercial, editorial, event photography" },
  { num: "06", name: "General Entertainment", detail: "Full-spectrum entertainment solutions" },
];

export default function LandingAd() {
  const [form, setForm] = useState({ name: "", contact: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({ name: false, contact: false });

  // Smooth scroll helper for ad conversion
  const scrollToForm = (selectedService = "") => {
    if (selectedService) {
      setForm(prev => ({ ...prev, service: selectedService }));
    }
    document.getElementById("enquiry-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const submit = async () => {
    const hasName = form.name.trim() !== "";
    const hasContact = form.contact.trim() !== "";
    
    if (!hasName || !hasContact) {
      setErrors({ name: !hasName, contact: !hasContact });
      alert("Please fill in the required fields marked with an asterisk (*).");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else alert("Something went wrong. Please WhatsApp us directly.");
    } catch {
      alert("Cannot reach server. Please contact us on WhatsApp.");
    }
    setSending(false);
  };

  return (
    <div style={{ background: "#fcfbfa", fontFamily: "'Inter', sans-serif", color: "#0d0d0d", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400;1,700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; background: #fcfbfa; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #b8944a; border-radius: 3px; }

        /* ── LUXURY HERO POSTER CARD ── */
        .flyer-wrap {
          background: #0d0d0d;
          padding: 0;
          display: flex;
          align-items: stretch;
          min-height: 100vh;
          position: relative;
        }
        .flyer {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Ambient Lighting effects for cinematic depth */
        .flyer-slash {
          position: absolute;
          top: -150px; right: -100px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(184,148,74,0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(40px);
        }
        .flyer-slash2 {
          position: absolute;
          bottom: -100px; left: -60px;
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(184,148,74,0.1) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(30px);
        }
        
        /* Subtle geometric lines reflecting film guides & camera focal markers */
        .flyer::before {
          content: ''; position: absolute; top: 40px; left: 40px; right: 40px; bottom: 40px;
          border: 1px solid rgba(255, 255, 255, 0.03); pointer-events: none; z-index: 1;
        }

        .flyer-topstrip {
          background: linear-gradient(90deg, #8a6d35 0%, #b8944a 50%, #8a6d35 100%);
          padding: 12px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          z-index: 2;
        }
        .flyer-topstrip span {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .flyer-body {
          flex: 1;
          padding: clamp(44px, 7vw, 76px) clamp(32px, 7vw, 68px);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        .flyer-brand {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: clamp(44px, 7vw, 72px);
        }
        .flyer-logo {
          width: clamp(56px, 9vw, 80px);
          height: clamp(56px, 9vw, 80px);
          border-radius: 12px;
          object-fit: cover;
          border: 2px solid rgba(184,148,74,0.4);
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          transition: transform 0.4s ease;
        }
        .flyer-brand:hover .flyer-logo {
          transform: rotate(5deg) scale(1.05);
        }
        .flyer-brand-text .flyer-name {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.9rem, 2.5vw, 1.25rem);
          font-weight: 800;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #fff;
          line-height: 1;
          margin-bottom: 6px;
          background: linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .flyer-brand-text .flyer-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8944a;
        }

        .flyer-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 9.5vw, 8rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: clamp(24px, 4vw, 36px);
        }
        .flyer-headline em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #e0c26a 0%, #b8944a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }

        .flyer-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: clamp(36px, 5vw, 52px);
        }
        .flyer-pill {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(184,148,74,0.25);
          border-radius: 50px;
          padding: 8px 18px;
          transition: all 0.3s ease;
        }
        .flyer-pill:hover {
          background: rgba(184,148,74,0.15);
          border-color: #b8944a;
          color: #fff;
          transform: translateY(-1px);
        }

        .flyer-contacts {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: clamp(36px, 5vw, 52px);
          background: rgba(255,255,255,0.01);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        .flyer-contact-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .flyer-contact-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(184,148,74,0.08);
          border: 1px solid rgba(184,148,74,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
        }
        .flyer-contact-val {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 2vw, 0.95rem);
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .flyer-contact-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8944a;
          margin-bottom: 3px;
        }

        .flyer-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: clamp(40px, 5vw, 60px);
        }
        .btn-flyer-wa {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #1ebe5d 0%, #1aad54 100%);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 8px;
          padding: 16px 28px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(26,173,84,0.3);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-flyer-wa:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 8px 20px rgba(26,173,84,0.5);
          filter: brightness(1.05);
        }
        
        .btn-flyer-call {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #d3ad59 0%, #b8944a 100%);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 8px;
          padding: 16px 28px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(184,148,74,0.3);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-flyer-call:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(184,148,74,0.5);
        }

        .btn-flyer-web {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 8px;
          padding: 15px 28px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-flyer-web:hover { 
          border-color: #b8944a; 
          background: rgba(184,148,74,0.1);
          transform: translateY(-2px);
        }

        .flyer-bottombar {
          margin-top: auto;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .flyer-rc {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .flyer-addr {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.45);
          text-align: right;
          line-height: 1.6;
        }

        /* ── MARQUEE SYSTEM ── */
        .marquee-wrap { background: #b8944a; overflow: hidden; padding: 14px 0; box-shadow: 0 4px 15px rgba(184,148,74,0.25); position: relative; z-index: 10; }
        .marquee-track { display: flex; animation: marquee 25s linear infinite; width: max-content; }
        .marquee-item { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #fff; padding: 0 40px; white-space: nowrap; display: flex; align-items: center; gap: 10px; }
        .marquee-dot { color: rgba(255,255,255,0.5); font-size: 0.8rem; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* ── MODERN GRID & SECTIONS ── */
        .section { padding: clamp(80px, 10vw, 130px) clamp(24px, 7%, 64px); position: relative; }
        .label-row { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: #b8944a; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .label-row::before { content: ''; display: block; width: 30px; height: 2px; background: #b8944a; flex-shrink: 0; }
        
        .big-heading { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; color: #0d0d0d; }
        .big-heading em { font-style: italic; font-weight: 400; color: #b8944a; }

        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 64px; border: 1px solid #e8e4da; background: #e8e4da; gap: 1px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.03); }
        .svc-cell { padding: 44px 36px; background: #fff; transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); position: relative; display: flex; flex-direction: column; cursor: pointer; }
        .svc-cell:hover { background: #0d0d0d; transform: scale(1.02); z-index: 2; box-shadow: 0 20px 45px rgba(0,0,0,0.2); }
        .svc-n { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.95rem; font-weight: 600; color: #b8944a; margin-bottom: 16px; }
        .svc-name { font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 700; color: #0d0d0d; margin-bottom: 10px; transition: color 0.3s; }
        .svc-detail { font-family: 'Inter', sans-serif; font-size: 0.82rem; color: #666; line-height: 1.65; margin-bottom: 20px; transition: color 0.3s; }
        .svc-cell:hover .svc-name { color: #fff; }
        .svc-cell:hover .svc-detail { color: #aaa; }
        
        /* Interactive dynamic action pill inside services */
        .svc-select-badge {
          margin-top: auto; font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #b8944a; opacity: 0; transform: translateY(5px); transition: all 0.3s ease;
        }
        .svc-cell:hover .svc-select-badge { opacity: 1; transform: translateY(0); }

        /* ── INTERACTIVE ENQUIRY HUB ── */
        .two-col { display: grid; grid-template-columns: 1fr 1.1fr; gap: 90px; align-items: start; }

        .cpill { display: flex; align-items: center; gap: 18px; padding: 18px 22px; border: 1px solid #e8e4da; border-radius: 8px; text-decoration: none; background: #fff; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.01); }
        .cpill:hover { border-color: #b8944a; transform: translateX(5px); box-shadow: 0 8px 20px rgba(184,148,74,0.08); }
        .cpill-icon { width: 42px; height: 42px; background: #fbf9f5; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; flex-shrink: 0; border: 1px solid #f0ede4; }
        .cpill-lbl { font-family: 'Inter', sans-serif; font-size: 0.55rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; margin-bottom: 3px; }
        .cpill-val { font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 600; color: #0d0d0d; }

        .addr-box { background: #fff; border: 1px solid #e8e4da; border-radius: 8px; padding: 22px; margin-top: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.01); }
        .addr-box .cpill-lbl { display: block; margin-bottom: 8px; }
        .addr-box p { font-family: 'Inter', sans-serif; font-size: 0.88rem; color: #444; line-height: 1.75; }

        /* Premium Form fields with status styling states */
        .f-field { background: #fff; border: 1px solid #e8e4da; border-radius: 8px; margin-bottom: 14px; transition: all 0.25s ease; position: relative; box-shadow: inset 0 1px 2px rgba(0,0,0,0.01); }
        .f-field.focused { border-color: #0d0d0d; box-shadow: 0 0 0 1px #0d0d0d; }
        .f-field.has-error { border-color: #ea4335; box-shadow: 0 0 0 1px #ea4335; }
        .f-field input, .f-field select, .f-field textarea { width: 100%; background: transparent; border: none; outline: none; padding: 18px 20px; font-family: 'Inter', sans-serif; font-size: 0.92rem; font-weight: 400; color: #0d0d0d; }
        .f-field input::placeholder, .f-field textarea::placeholder { color: #999; }
        .f-field select { cursor: pointer; appearance: none; color: #222; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b8944a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: calc(100% - 20px) center; }
        .f-field select option { background: #fff; padding: 10px; }
        .f-field textarea { resize: none; }
        
        .field-err-msg { font-family: 'Inter', sans-serif; font-size: 0.65rem; color: #ea4335; margin:-10px 0 12px 4px; font-weight: 500; display: block; }

        .f-or { display: flex; align-items: center; gap: 14px; margin: 16px 0; }
        .f-or::before, .f-or::after { content: ''; flex: 1; height: 1px; background: #e8e4da; }
        .f-or span { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #aaa; }

        /* ── BUTTON ARSENAL ── */
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.78rem; letter-spacing: 2.5px; text-transform: uppercase; border: none; cursor: pointer; text-decoration: none; border-radius: 6px; transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); padding: 18px 36px; }
        .btn:hover { transform: translateY(-2px); }
        .btn-dark { background: #0d0d0d; color: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
        .btn-dark:hover { background: #222; box-shadow: 0 15px 35px rgba(0,0,0,0.25); }
        .btn-green { background: #1aad54; color: #fff; box-shadow: 0 8px 24px rgba(26,173,84,0.2); }
        .btn-green:hover { filter: brightness(1.05); box-shadow: 0 12px 28px rgba(26,173,84,0.35); }

        .success-box { background: #fbf9f4; border: 2px dashed #d4c49a; border-radius: 12px; padding: 50px 36px; text-align: center; box-shadow: 0 15px 40px rgba(184,148,74,0.05); }
        .success-box h3 { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 800; color: #b8944a; margin-bottom: 14px; }
        .success-box p { font-family: 'Inter', sans-serif; font-size: 0.92rem; color: #555; line-height: 1.8; }
        .success-box a { color: #b8944a; font-weight: 600; text-decoration: underline; }

        /* ── INTERACTIVE FOOTER HUB ── */
        .site-link-sec { background: #0d0d0d; padding: clamp(100px, 12vw, 150px) clamp(24px, 7%, 64px); text-align: center; position: relative; overflow: hidden; }
        .site-link-sec::before { content: ''; position: absolute; top: 50%; left: 50%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(184,148,74,0.06) 0%, transparent 70%); transform: translate(-50%, -50%); pointer-events: none; }
        .site-link-sec .lbl { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: #b8944a; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; gap: 14px; }
        .site-link-sec .lbl::before, .site-link-sec .lbl::after { content: ''; display: block; width: 35px; height: 1px; background: #b8944a; flex-shrink: 0; }
        
        .site-link-sec h2 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6.5vw, 5.5rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.025em; color: #fff; margin-bottom: 20px; }
        .site-link-sec h2 em { font-style: italic; font-weight: 400; color: #b8944a; background: linear-gradient(180deg, #e0c26a 0%, #b8944a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .site-link-sec p { font-family: 'Inter', sans-serif; font-size: 0.95rem; color: rgba(255,255,255,0.45); font-weight: 300; margin-bottom: 48px; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.85; }
        
        .site-link-btn { display: inline-flex; align-items: center; gap: 16px; background: linear-gradient(135deg, #d3ad59 0%, #b8944a 100%); color: #fff; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 22px 64px; border-radius: 8px; text-decoration: none; box-shadow: 0 12px 40px rgba(184,148,74,0.35); transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .site-link-btn:hover { filter: brightness(1.1); transform: translateY(-4px); box-shadow: 0 20px 50px rgba(184,148,74,0.55); }
        .site-url { font-family: 'Inter', sans-serif; font-size: 0.68rem; color: rgba(255,255,255,0.25); letter-spacing: 2px; margin-top: 20px; text-transform: uppercase; }

        .footer { background: #060606; padding: 36px clamp(24px, 7%, 64px); display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.02); }
        .footer span { font-family: 'Inter', sans-serif; font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        .divider { width: 100%; height: 1px; background: #e8e4da; }

        /* ── RESPONSIVE ADAPTATIONS ── */
        @media (max-width: 1024px) {
          .two-col { grid-template-columns: 1fr; gap: 64px; }
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .svc-grid { grid-template-columns: 1fr; }
          .flyer-ctas { flex-direction: column; gap: 10px; }
          .flyer-ctas a, .flyer-ctas button { width: 100%; justify-content: center; }
          .site-link-btn { width: 100%; justify-content: center; padding: 20px 24px; }
          .flyer-addr { text-align: left; }
          .flyer-body { padding: 40px 24px; }
          .flyer::before { top: 15px; left: 15px; right: 15px; bottom: 15px; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          FLYER — Premium Hero Poster Card Section
      ══════════════════════════════════════ */}
      <div className="flyer-wrap">
        <div className="flyer">
          <div className="flyer-slash" />
          <div className="flyer-slash2" />

          {/* top strip info element */}
          <div className="flyer-topstrip">
            <span>Your One-Stop Production Place</span>
            <span>Lagos · Nigeria · RC 9528632</span>
          </div>

          {/* main flyer body container */}
          <div className="flyer-body">

            {/* brand asset array */}
            <div className="flyer-brand">
              <img src={LOGO} alt="FLM Logo" className="flyer-logo" />
              <div className="flyer-brand-text">
                <div className="flyer-name">Focal Length Media</div>
                <div className="flyer-tagline">Creative Production House</div>
              </div>
            </div>

            {/* luxury title headline */}
            <div className="flyer-headline">
              We Make
              <em>Visuals</em>
              That Sell.
            </div>

            {/* luxury core visual badges */}
            <div className="flyer-pills">
              {["Media Production", "Artist Mgmt", "Commercials", "Photography", "Events", "Entertainment"].map((s) => (
                <span key={s} className="flyer-pill">{s}</span>
              ))}
            </div>

            {/* structured communications grid */}
            <div className="flyer-contacts">
              {/* WhatsApp Communications Architecture */}
              <div className="flyer-contact-row">
                <div className="flyer-contact-icon">💬</div>
                <div>
                  <div className="flyer-contact-label">WhatsApp</div>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                    <a href={WA_LINK_1} target="_blank" rel="noreferrer" style={{ color: "#1aad54", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.82rem, 2vw, 0.95rem)", fontWeight: 700, textDecoration: "none" }}>{PHONE_1}</a>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>·</span>
                    <a href={WA_LINK_2} target="_blank" rel="noreferrer" style={{ color: "#1aad54", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.82rem, 2vw, 0.95rem)", fontWeight: 700, textDecoration: "none" }}>{PHONE_2}</a>
                  </div>
                </div>
              </div>

              <div className="flyer-contact-row">
                <div className="flyer-contact-icon">✉️</div>
                <div>
                  <div className="flyer-contact-label">Email</div>
                  <div className="flyer-contact-val">{EMAIL}</div>
                </div>
              </div>

              <div className="flyer-contact-row">
                <div className="flyer-contact-icon">📍</div>
                <div>
                  <div className="flyer-contact-label">Address</div>
                  <div className="flyer-contact-val">{ADDRESS}</div>
                </div>
              </div>
            </div>

            {/* Direct CTA system targeted for high conversion optimization */}
            <div className="flyer-ctas">
              <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btn-flyer-wa">💬 WhatsApp {PHONE_1}</a>
              <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btn-flyer-wa">💬 WhatsApp {PHONE_2}</a>
              <button onClick={() => scrollToForm()} className="btn-flyer-call" style={{ cursor: "pointer" }}>⚡ Instant Enquiry</button>
              <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="btn-flyer-web">🌐 Visit Website</a>
            </div>

            {/* verified corporate footer bar */}
            <div className="flyer-bottombar">
              <div className="flyer-rc">RC: 9528632 · CAC Registered · Nigeria</div>
              <div className="flyer-addr">{ADDRESS}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CINEMATIC INFINITE MARQUEE TAPE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(3)].map((_, gi) =>
            ["Media Production", "Artist Management", "Event Production", "TV Commercials", "Photography", "Entertainment", "Lagos · Nigeria"].map((t, i) => (
              <span key={`${gi}-${i}`} className="marquee-item">{t} <span className="marquee-dot">◆</span></span>
            ))
          )}
        </div>
      </div>

      {/* ── HIGH PERFORMANCE SERVICES SHOWCASE ── */}
      <div style={{ background: "#ffffff" }} className="section">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 0 }}>
            <div>
              <div className="label-row">What We Offer</div>
              <div className="big-heading">Six Ways We<br />Build Your <em>Vision</em></div>
            </div>
            <button onClick={() => scrollToForm()} className="btn btn-dark" style={{ alignSelf: "flex-end" }}>Book a Consultation</button>
          </div>
          
          <div className="svc-grid">
            {services.map((s) => (
              <div key={s.num} className="svc-cell" onClick={() => scrollToForm(s.name)}>
                <div className="svc-n">{s.num}</div>
                <div className="svc-name">{s.name}</div>
                <div className="svc-detail">{s.detail}</div>
                <div className="svc-select-badge">Select Service →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── CONVERSION OPTIMIZED ENQUIRY HUB ── */}
      <div id="enquiry-section" style={{ background: "#fbf9f5" }} className="section">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="two-col">

            {/* Contact details cluster columns */}
            <div>
              <div className="label-row">Contact Us</div>
              <div className="big-heading" style={{ marginBottom: 32 }}>Let's Talk<br />About Your<br /><em>Project</em></div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 400, color: "#555", lineHeight: 1.85, marginBottom: 36 }}>
                Whether you have a full project production brief or just a raw creative concept — reach out to our team via any channel below. We respond within hours.
              </p>

              <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="cpill">
                <div className="cpill-icon">💬</div>
                <div>
                  <div className="cpill-lbl">WhatsApp Business Support</div>
                  <div className="cpill-val">{PHONE_1}</div>
                </div>
              </a>
              <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="cpill">
                <div className="cpill-icon">💬</div>
                <div>
                  <div className="cpill-lbl">WhatsApp Executive Management</div>
                  <div className="cpill-val">{PHONE_2}</div>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="cpill">
                <div className="cpill-icon">✉️</div>
                <div>
                  <div className="cpill-lbl">Direct Email Channels</div>
                  <div className="cpill-val">{EMAIL}</div>
                </div>
              </a>
              <div className="addr-box">
                <span className="cpill-lbl">Headquarters & Creative Office</span>
                <p>{ADDRESS}</p>
              </div>
            </div>

            {/* Highly engineered conversion entry panel */}
            <div>
              <div className="label-row">Send an Enquiry</div>
              <div className="big-heading" style={{ marginBottom: 32 }}>We Reply<br />Within Hours</div>

              {sent ? (
                <div className="success-box">
                  <h3>Message Received ✓</h3>
                  <p style={{ marginTop: 12 }}>Thank you for reaching out to Focal Length Media. One of our production specialists will review your details and get back to you shortly.</p>
                  <p style={{ marginTop: 16, fontSize: '0.85rem' }}>For instant priority booking, <a href={WA_LINK_1}>click here to chat directly via WhatsApp</a>.</p>
                </div>
              ) : (
                <div>
                  <div className={`f-field ${focused === "name" ? "focused" : ""} ${errors.name ? "has-error" : ""}`}>
                    <input 
                      placeholder="Your Full Name *" 
                      value={form.name} 
                      onChange={(e) => handleInputChange("name", e.target.value)} 
                      onFocus={() => setFocused("name")} 
                      onBlur={() => setFocused("")} 
                    />
                  </div>
                  {errors.name && <span className="field-err-msg">Name field is required.</span>}

                  <div className={`f-field ${focused === "contact" ? "focused" : ""} ${errors.contact ? "has-error" : ""}`}>
                    <input 
                      placeholder="Phone Number or Email Address *" 
                      value={form.contact} 
                      onChange={(e) => handleInputChange("contact", e.target.value)} 
                      onFocus={() => setFocused("contact")} 
                      onBlur={() => setFocused("")} 
                    />
                  </div>
                  {errors.contact && <span className="field-err-msg">Contact verification is required.</span>}

                  <div className={`f-field ${focused === "svc" ? "focused" : ""}`}>
                    <select 
                      value={form.service} 
                      onChange={(e) => handleInputChange("service", e.target.value)} 
                      onFocus={() => setFocused("svc")} 
                      onBlur={() => setFocused("")}
                    >
                      <option value="">Select a Service</option>
                      {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  
                  <div className={`f-field ${focused === "msg" ? "focused" : ""}`}>
                    <textarea 
                      placeholder="Tell us about your project scale, timelines, or requirements..." 
                      rows={5} 
                      value={form.message} 
                      onChange={(e) => handleInputChange("message", e.target.value)} 
                      onFocus={() => setFocused("msg")} 
                      onBlur={() => setFocused("")} 
                    />
                  </div>

                  <button className="btn btn-dark" onClick={submit} disabled={sending} style={{ width: "100%", padding: "20px", marginBottom: 14, opacity: sending ? 0.6 : 1 }}>
                    {sending ? "Processing Transmission..." : "Send Secure Enquiry →"}
                  </button>

                  <div className="f-or"><span>or instantly connect</span></div>
                  
                  <div style={{ display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
                    <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btn btn-green" style={{ flex: 1, padding: "18px 12px", fontSize: "0.72rem" }}>💬 Chat Support 1</a>
                    <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btn btn-green" style={{ flex: 1, padding: "18px 12px", fontSize: "0.72rem" }}>💬 Chat Support 2</a>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── HIGH PERFORMANCE PORTFOLIO GATEWAY SECTIONS ── */}
      <div className="site-link-sec">
        <div className="lbl">See the full picture</div>
        <h2>Portfolio. Showreel.<br /><em>Company Profile.</em></h2>
        <p>Explore our full premium ecosystem — view completed feature films, corporate broadcast commercials, high-fashion editorials, and premium brand experiences.</p>
        <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="site-link-btn">
          Explore Corporate Platform →
        </a>
        <div className="site-url">{WEBSITE_URL.replace("https://", "")}</div>
      </div>

      {/* ── HIGH-END SYSTEM FOOTER ── */}
      <div className="footer">
        <span>© 2026 Focal Length Media · RC 9528632 · All Rights Reserved</span>
        <span>Ikeja, Lagos, Nigeria</span>
      </div>

    </div>
  );
}