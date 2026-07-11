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

  const submit = async () => {
    if (!form.name || !form.contact) { alert("Please enter your name and contact."); return; }
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
    } catch { alert("Cannot reach server. Please contact us on WhatsApp."); }
    setSending(false);
  };

  return (
    <div style={{ background: "#f7f5f0", fontFamily: "'Inter', sans-serif", color: "#0d0d0d", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; background: #f7f5f0; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #b8944a; }

        /* ── FLYER CARD ── */
        .flyer-wrap {
          background: #0d0d0d;
          padding: 0;
          display: flex;
          align-items: stretch;
          min-height: 100vh;
        }
        .flyer {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* diagonal gold slash behind logo */
        .flyer-slash {
          position: absolute;
          top: -120px; right: -80px;
          width: 460px; height: 460px;
          background: linear-gradient(135deg, #b8944a 0%, #e0c26a 50%, #b8944a 100%);
          border-radius: 50%;
          opacity: 0.08;
          pointer-events: none;
        }
        .flyer-slash2 {
          position: absolute;
          bottom: -100px; left: -60px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(184,148,74,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* top strip inside flyer */
        .flyer-topstrip {
          background: #b8944a;
          padding: 10px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
          flex-shrink: 0;
        }
        .flyer-topstrip span {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #fff;
        }

        /* main flyer body */
        .flyer-body {
          flex: 1;
          padding: clamp(36px, 6vw, 64px) clamp(28px, 6vw, 56px);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        /* logo + brand row */
        .flyer-brand {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: clamp(40px, 6vw, 64px);
        }
        .flyer-logo {
          width: clamp(52px, 8vw, 72px);
          height: clamp(52px, 8vw, 72px);
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.15);
          flex-shrink: 0;
        }
        .flyer-brand-text .flyer-name {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.8rem, 2vw, 1rem);
          font-weight: 800;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #fff;
          line-height: 1;
          margin-bottom: 5px;
        }
        .flyer-brand-text .flyer-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
        }

        /* main headline */
        .flyer-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.2rem, 9vw, 7.5rem);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: clamp(20px, 3vw, 30px);
        }
        .flyer-headline em {
          font-style: italic;
          color: #b8944a;
          display: block;
        }

        /* services pill row */
        .flyer-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: clamp(28px, 4vw, 44px);
        }
        .flyer-pill {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50px;
          padding: 7px 14px;
        }

        /* contact row inside flyer */
        .flyer-contacts {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: clamp(28px, 4vw, 42px);
        }
        .flyer-contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .flyer-contact-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
        .flyer-contact-val {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.78rem, 2vw, 0.9rem);
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.5px;
        }
        .flyer-contact-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(184,148,74,0.7);
          margin-bottom: 2px;
        }

        /* CTA buttons inside flyer */
        .flyer-ctas {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: clamp(28px, 4vw, 44px);
        }
        .btn-flyer-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1aad54;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 6px;
          padding: 14px 24px;
          cursor: pointer;
          text-decoration: none;
          transition: filter 0.2s, transform 0.15s;
        }
        .btn-flyer-wa:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .btn-flyer-call {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #b8944a;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 6px;
          padding: 14px 24px;
          cursor: pointer;
          text-decoration: none;
          transition: filter 0.2s, transform 0.15s;
        }
        .btn-flyer-call:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .btn-flyer-web {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(255,255,255,0.6);
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 6px;
          padding: 13px 24px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-flyer-web:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

        /* flyer bottom bar */
        .flyer-bottombar {
          margin-top: auto;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .flyer-rc {
          font-family: 'Inter', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }
        .flyer-addr {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          color: rgba(255,255,255,0.3);
          text-align: right;
          line-height: 1.6;
        }

        /* ── MARQUEE ── */
        .marquee-wrap { background: #b8944a; overflow: hidden; padding: 12px 0; }
        .marquee-track { display: flex; animation: marquee 20s linear infinite; width: max-content; }
        .marquee-item { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #fff; padding: 0 36px; white-space: nowrap; opacity: 0.9; }
        .marquee-dot { color: rgba(255,255,255,0.4); }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* ── SERVICES SECTION ── */
        .section { padding: clamp(60px, 8vw, 100px) clamp(24px, 6%, 60px); }
        .label-row { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: #b8944a; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
        .label-row::before { content: ''; display: block; width: 22px; height: 1px; background: #b8944a; flex-shrink: 0; }
        .big-heading { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.4rem); font-weight: 700; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 0; }

        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 48px; border-top: 1px solid #e0dbd0; border-left: 1px solid #e0dbd0; }
        .svc-cell { padding: 32px 28px; border-right: 1px solid #e0dbd0; border-bottom: 1px solid #e0dbd0; transition: background-color 0.2s; }
        .svc-cell:hover { background: #fff; }
        .svc-n { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.78rem; color: #b8944a; margin-bottom: 12px; }
        .svc-name { font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 700; color: #0d0d0d; margin-bottom: 6px; }
        .svc-detail { font-family: 'Inter', sans-serif; font-size: 0.76rem; color: #888; line-height: 1.6; }

        /* ── CONTACT + FORM ── */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: start; }

        .cpill { display: flex; align-items: center; gap: 14px; padding: 15px 18px; border: 1px solid #e0dbd0; border-radius: 6px; text-decoration: none; background: #fff; transition: border-color 0.2s; margin-bottom: 10px; }
        .cpill:hover { border-color: #b8944a; }
        .cpill-icon { width: 36px; height: 36px; background: #f5f0e6; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0; }
        .cpill-lbl { font-family: 'Inter', sans-serif; font-size: 0.52rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #b8944a; margin-bottom: 2px; }
        .cpill-val { font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 600; color: #0d0d0d; }

        .addr-box { background: #fff; border: 1px solid #e0dbd0; border-radius: 6px; padding: 16px 18px; margin-top: 12px; }
        .addr-box .cpill-lbl { display: block; margin-bottom: 6px; }
        .addr-box p { font-family: 'Inter', sans-serif; font-size: 0.82rem; color: #555; line-height: 1.7; }

        /* form in contact section */
        .f-field { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; margin-bottom: 12px; transition: border-color 0.2s; }
        .f-field.on-light { background: #fff; border-color: #e0dbd0; }
        .f-field.on-light.focused { border-color: #b8944a; }
        .f-field input, .f-field select, .f-field textarea { width: 100%; background: transparent; border: none; outline: none; padding: 16px 18px; font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 300; color: #0d0d0d; }
        .f-field input::placeholder, .f-field textarea::placeholder { color: #aaa; }
        .f-field select { cursor: pointer; appearance: none; color: #555; }
        .f-field select option { background: #fff; }
        .f-field textarea { resize: none; color: #0d0d0d; }

        .f-or { display: flex; align-items: center; gap: 12px; margin: 8px 0; }
        .f-or::before, .f-or::after { content: ''; flex: 1; height: 1px; background: #e0dbd0; }
        .f-or span { font-family: 'Inter', sans-serif; font-size: 0.56rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #bbb; }

        /* ── BUTTONS ── */
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.76rem; letter-spacing: 2.5px; text-transform: uppercase; border: none; cursor: pointer; text-decoration: none; border-radius: 5px; transition: transform 0.18s, box-shadow 0.18s, filter 0.18s; padding: 16px 30px; }
        .btn:hover { transform: translateY(-2px); }
        .btn-dark { background: #0d0d0d; color: #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
        .btn-dark:hover { box-shadow: 0 14px 36px rgba(0,0,0,0.26); }
        .btn-gold { background: #b8944a; color: #fff; box-shadow: 0 8px 24px rgba(184,148,74,0.28); }
        .btn-gold:hover { filter: brightness(1.1); }
        .btn-green { background: #1aad54; color: #fff; box-shadow: 0 8px 24px rgba(26,173,84,0.24); }
        .btn-green:hover { filter: brightness(1.08); }

        .success-box { background: #f5f0e6; border: 1px solid #d4c49a; border-radius: 8px; padding: 44px 28px; text-align: center; }
        .success-box h3 { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 700; color: #b8944a; margin-bottom: 12px; }
        .success-box p { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #666; line-height: 1.8; }
        .success-box a { color: #b8944a; }

        /* ── SITE LINK ── */
        .site-link-sec { background: #0d0d0d; padding: clamp(80px, 10vw, 120px) clamp(24px, 6%, 60px); text-align: center; }
        .site-link-sec .lbl { font-family: 'Inter', sans-serif; font-size: 0.58rem; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: #b8944a; margin-bottom: 22px; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .site-link-sec .lbl::before, .site-link-sec .lbl::after { content: ''; display: block; width: 28px; height: 1px; background: #b8944a; flex-shrink: 0; }
        .site-link-sec h2 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 6vw, 5rem); font-weight: 900; line-height: 1; letter-spacing: -0.025em; color: #fff; margin-bottom: 16px; }
        .site-link-sec h2 em { font-style: italic; color: #b8944a; }
        .site-link-sec p { font-family: 'Inter', sans-serif; font-size: 0.88rem; color: rgba(255,255,255,0.4); font-weight: 300; margin-bottom: 44px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.8; }
        .site-link-btn { display: inline-flex; align-items: center; gap: 14px; background: #b8944a; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 20px 56px; border-radius: 5px; text-decoration: none; transition: filter 0.2s, transform 0.2s, box-shadow 0.2s; box-shadow: 0 10px 36px rgba(184,148,74,0.3); }
        .site-link-btn:hover { filter: brightness(1.1); transform: translateY(-3px); box-shadow: 0 18px 50px rgba(184,148,74,0.45); }
        .site-url { font-family: 'Inter', sans-serif; font-size: 0.65rem; color: rgba(255,255,255,0.2); letter-spacing: 1.5px; margin-top: 16px; }

        /* ── FOOTER ── */
        .footer { background: #0a0a0a; padding: 28px clamp(24px, 6%, 60px); display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.04); }
        .footer span { font-family: 'Inter', sans-serif; font-size: 0.57rem; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.2); }

        /* ── DIVIDERS ── */
        .divider { width: 100%; height: 1px; background: #e0dbd0; }
        .divider-dark { width: 100%; height: 1px; background: rgba(255,255,255,0.06); }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .two-col { grid-template-columns: 1fr; gap: 48px; }
          .svc-grid { grid-template-columns: 1fr 1fr; }
          .svc-cell:nth-child(2n) { border-right: none; }
        }
        @media (max-width: 560px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-cell { border-right: none !important; }
          .flyer-ctas { flex-direction: column; }
          .flyer-ctas a { width: 100%; justify-content: center; }
          .site-link-btn { width: 100%; justify-content: center; padding: 18px 24px; }
          .flyer-addr { text-align: left; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          FLYER — the hero poster card
      ══════════════════════════════════════ */}
      <div className="flyer-wrap">
        <div className="flyer">
          <div className="flyer-slash" />
          <div className="flyer-slash2" />

          {/* top strip */}
          <div className="flyer-topstrip">
            <span>Your One-Stop Production Place</span>
            <span>Lagos · Nigeria · RC 9528632</span>
          </div>

          {/* main flyer body */}
          <div className="flyer-body">

            {/* brand */}
            <div className="flyer-brand">
              <img src={LOGO} alt="FLM" className="flyer-logo" />
              <div className="flyer-brand-text">
                <div className="flyer-name">Focal Length Media</div>
                <div className="flyer-tagline">Creative Production House</div>
              </div>
            </div>

            {/* headline */}
            <div className="flyer-headline">
              We Make
              <em>Visuals</em>
              That Sell.
            </div>

            {/* service pills */}
            <div className="flyer-pills">
              {["Media Production", "Artist Mgmt", "Commercials", "Photography", "Events", "Entertainment"].map((s) => (
                <span key={s} className="flyer-pill">{s}</span>
              ))}
            </div>

            {/* contact info */}
            <div className="flyer-contacts">
              {/* WhatsApp — both numbers */}
              <div className="flyer-contact-row">
                <div className="flyer-contact-icon">💬</div>
                <div>
                  <div className="flyer-contact-label">WhatsApp</div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <a href={WA_LINK_1} target="_blank" rel="noreferrer" style={{ color: "#1aad54", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.78rem, 2vw, 0.9rem)", fontWeight: 600, textDecoration: "none" }}>{PHONE_1}</a>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>·</span>
                    <a href={WA_LINK_2} target="_blank" rel="noreferrer" style={{ color: "#1aad54", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.78rem, 2vw, 0.9rem)", fontWeight: 600, textDecoration: "none" }}>{PHONE_2}</a>
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

            {/* CTA buttons */}
            <div className="flyer-ctas">
              <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btn-flyer-wa">💬 WhatsApp {PHONE_1}</a>
              <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btn-flyer-wa">💬 WhatsApp {PHONE_2}</a>
              <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="btn-flyer-web">🌐 Visit Website</a>
            </div>

            {/* bottom bar */}
            <div className="flyer-bottombar">
              <div className="flyer-rc">RC: 9528632 · CAC Registered · Nigeria</div>
              <div className="flyer-addr">{ADDRESS}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(3)].map((_, gi) =>
            ["Media Production", "Artist Management", "Event Production", "TV Commercials", "Photography", "Entertainment", "Lagos · Nigeria"].map((t, i) => (
              <span key={`${gi}-${i}`} className="marquee-item">{t} <span className="marquee-dot">◆</span></span>
            ))
          )}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div style={{ background: "#fff" }} className="section">
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 0 }}>
            <div>
              <div className="label-row">What We Offer</div>
              <div className="big-heading">Six Ways We<br />Build Your Vision</div>
            </div>
            <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btn btn-dark" style={{ alignSelf: "flex-end" }}>Book a Consultation</a>
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <div key={s.num} className="svc-cell">
                <div className="svc-n">{s.num}</div>
                <div className="svc-name">{s.name}</div>
                <div className="svc-detail">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── CONTACT + FORM ── */}
      <div style={{ background: "#f7f5f0" }} className="section">
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="two-col">

            {/* contact left */}
            <div>
              <div className="label-row">Contact Us</div>
              <div className="big-heading" style={{ marginBottom: 28 }}>Let's Talk<br />About Your<br />Project</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "#666", lineHeight: 1.85, marginBottom: 28 }}>
                Whether you have a full brief or just an idea — reach us on any channel below. We respond fast.
              </p>

              <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="cpill">
                <div className="cpill-icon">💬</div>
                <div>
                  <div className="cpill-lbl">WhatsApp</div>
                  <div className="cpill-val">{PHONE_1}</div>
                </div>
              </a>
              <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="cpill">
                <div className="cpill-icon">💬</div>
                <div>
                  <div className="cpill-lbl">WhatsApp</div>
                  <div className="cpill-val">{PHONE_2}</div>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="cpill">
                <div className="cpill-icon">✉️</div>
                <div>
                  <div className="cpill-lbl">Email</div>
                  <div className="cpill-val">{EMAIL}</div>
                </div>
              </a>
              <div className="addr-box">
                <span className="cpill-lbl">Our Office</span>
                <p>{ADDRESS}</p>
              </div>
            </div>

            {/* form right */}
            <div>
              <div className="label-row">Send an Enquiry</div>
              <div className="big-heading" style={{ marginBottom: 28 }}>We Reply<br />Within Hours</div>

              {sent ? (
                <div className="success-box">
                  <h3>Message Received ✓</h3>
                  <p>We'll be in touch shortly.<br />For faster response, <a href={WA_LINK_1}>chat us on WhatsApp</a>.</p>
                </div>
              ) : (
                <div>
                  {[
                    { k: "name", ph: "Your Full Name *" },
                    { k: "contact", ph: "Phone Number or Email *" },
                  ].map((f) => (
                    <div key={f.k} className={`f-field on-light ${focused === f.k ? "focused" : ""}`}>
                      <input placeholder={f.ph} value={form[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} onFocus={() => setFocused(f.k)} onBlur={() => setFocused("")} />
                    </div>
                  ))}
                  <div className={`f-field on-light ${focused === "svc" ? "focused" : ""}`}>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} onFocus={() => setFocused("svc")} onBlur={() => setFocused("")}>
                      <option value="">Select a Service</option>
                      {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className={`f-field on-light ${focused === "msg" ? "focused" : ""}`}>
                    <textarea placeholder="Tell us about your project..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("msg")} onBlur={() => setFocused("")} />
                  </div>
                  <button className="btn btn-dark" onClick={submit} disabled={sending} style={{ width: "100%", padding: "18px", marginBottom: 12, opacity: sending ? 0.6 : 1 }}>
                    {sending ? "Sending..." : "Send Enquiry →"}
                  </button>
                  <div className="f-or"><span>or</span></div>
                  <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                    <a href={WA_LINK_1} target="_blank" rel="noreferrer" className="btn btn-green" style={{ flex: 1, padding: "16px 10px", fontSize: "0.68rem" }}>💬 {PHONE_1}</a>
                    <a href={WA_LINK_2} target="_blank" rel="noreferrer" className="btn btn-green" style={{ flex: 1, padding: "16px 10px", fontSize: "0.68rem" }}>💬 {PHONE_2}</a>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── SITE LINK ── */}
      <div className="site-link-sec">
        <div className="lbl">See the full picture</div>
        <h2>Portfolio. Showreel.<br /><em>Company Profile.</em></h2>
        <p>Explore our full body of work — feature films, TV commercials, music videos, studio gallery and everything in between.</p>
        <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="site-link-btn">
          Visit Focal Length Media →
        </a>
        <div className="site-url">{WEBSITE_URL.replace("https://", "")}</div>
      </div>

      {/* ── FOOTER ── */}
      <div className="footer">
        <span>© 2026 Focal Length Media · RC 9528632</span>
        <span>Ikeja, Lagos, Nigeria</span>
      </div>

    </div>
  );
}