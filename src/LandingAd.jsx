import { useState } from "react";
import API_URL from "./config.js";

const WEBSITE_URL = "https://focal-length-media.vercel.app";
const WHATSAPP = "2347067349942";
const PHONE_1 = "07067349942";
const PHONE_2 = "08161880830";
const EMAIL = "focallengthmedia26@gmail.com";
const ADDRESS = "2 Bolaji Street, off Kudirat Abiola Way, Ikeja, Lagos";

const services = [
  "Media Production",
  "Artist Management",
  "Event & Project Management",
  "TV Commercials",
  "Photography",
  "General Entertainment",
];

export default function LandingAd() {
  const [form, setForm] = useState({ name: "", contact: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState("");

  const submit = async () => {
    if (!form.name || !form.contact) {
      alert("Please enter your name and contact.");
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
      else alert("Something went wrong. Please try WhatsApp instead.");
    } catch {
      alert("Cannot reach server. Please contact us on WhatsApp.");
    }
    setSending(false);
  };

  return (
    <div style={{ background: "#f7f5f0", minHeight: "100vh", fontFamily: "'Georgia', serif", color: "#111" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; background: #f7f5f0; }

        .page { font-family: 'Inter', sans-serif; }

        /* ── HERO ── */
        .hero { background: #111; color: #fff; padding: 80px 6% 70px; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: -60px; right: -60px; width: 340px; height: 340px; border-radius: 50%; background: rgba(220,180,80,0.12); pointer-events: none; }
        .hero-label { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 5px; text-transform: uppercase; color: #c9a84c; margin-bottom: 22px; display: flex; align-items: center; gap: 12px; }
        .hero-label::before { content: ''; display: block; width: 28px; height: 1px; background: #c9a84c; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 8vw, 5.5rem); font-weight: 900; line-height: 1.02; letter-spacing: -0.02em; margin-bottom: 24px; }
        .hero h1 em { font-style: italic; color: #c9a84c; }
        .hero p { font-family: 'Inter', sans-serif; font-size: clamp(0.92rem, 2vw, 1.08rem); font-weight: 300; color: rgba(255,255,255,0.62); line-height: 1.85; max-width: 520px; margin-bottom: 40px; }

        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn-primary { background: #c9a84c; color: #111; font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border: none; border-radius: 6px; padding: 16px 32px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: background-color 0.2s, transform 0.2s; }
        .btn-primary:hover { background: #e0bb5c; transform: translateY(-1px); }
        .btn-wa { background: #25d366; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border: none; border-radius: 6px; padding: 16px 32px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: background-color 0.2s, transform 0.2s; }
        .btn-wa:hover { background: #20bb5a; transform: translateY(-1px); }

        /* ── STRIP ── */
        .strip { background: #c9a84c; padding: 18px 6%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .strip span { font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #111; }
        .strip a { font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #111; text-decoration: none; border-bottom: 1px solid #111; }

        /* ── SECTIONS ── */
        .section { padding: 80px 6%; }
        .section-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: #c9a84c; margin-bottom: 16px; }
        .section h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 0; }
        .divider { width: 100%; height: 1px; background: #e0dbd0; }

        /* ── SERVICES ── */
        .services-bg { background: #fff; }
        .svc-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0; margin-top: 50px; border-top: 1px solid #e0dbd0; border-left: 1px solid #e0dbd0; }
        .svc-item { padding: 28px 26px; border-right: 1px solid #e0dbd0; border-bottom: 1px solid #e0dbd0; transition: background-color 0.2s; cursor: default; }
        .svc-item:hover { background: #f7f5f0; }
        .svc-num { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.82rem; color: #c9a84c; margin-bottom: 10px; }
        .svc-name { font-family: 'Inter', sans-serif; font-size: 0.92rem; font-weight: 600; color: #111; }

        /* ── INFO ── */
        .info-bg { background: #f7f5f0; }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 40px; margin-top: 50px; }
        .info-block .info-label { font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #999; margin-bottom: 10px; }
        .info-block .info-val { font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 500; color: #111; line-height: 1.7; }
        .info-block a { color: #111; text-decoration: none; border-bottom: 1px solid #c9a84c; transition: color 0.2s; }
        .info-block a:hover { color: #c9a84c; }

        /* ── FORM ── */
        .form-bg { background: #111; color: #fff; }
        .form-bg .section-label { color: #c9a84c; }
        .form-bg h2 { color: #fff; }
        .form-wrap { margin-top: 50px; display: flex; flex-direction: column; gap: 16px; max-width: 640px; }
        .field { border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; background: rgba(255,255,255,0.04); transition: border-color 0.2s, background-color 0.2s; }
        .field.is-focused { border-color: #c9a84c; background: rgba(201,168,76,0.04); }
        .field input, .field select, .field textarea { width: 100%; background: transparent; border: none; outline: none; padding: 18px 20px; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 300; }
        .field input::placeholder, .field textarea::placeholder { color: rgba(255,255,255,0.3); }
        .field select { color: rgba(255,255,255,0.6); cursor: pointer; appearance: none; }
        .field select option { background: #222; color: #fff; }
        .field textarea { resize: none; }
        .submit-btn { background: #c9a84c; color: #111; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; border: none; border-radius: 8px; padding: 20px; cursor: pointer; transition: background-color 0.2s, opacity 0.2s; }
        .submit-btn:hover { background: #e0bb5c; }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .or-line { display: flex; align-items: center; gap: 16px; color: rgba(255,255,255,0.25); font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase; }
        .or-line::before, .or-line::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }

        /* ── SITE LINK ── */
        .site-link-sec { background: #fff; padding: 80px 6%; text-align: center; border-top: 4px solid #c9a84c; }
        .site-link-sec p { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 4px; text-transform: uppercase; color: #999; margin-bottom: 20px; }
        .site-link-sec h3 { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 700; color: #111; margin-bottom: 32px; }
        .site-link-big { display: inline-flex; align-items: center; gap: 12px; background: #111; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 20px 48px; border-radius: 8px; text-decoration: none; transition: background-color 0.2s, transform 0.2s; }
        .site-link-big:hover { background: #222; transform: translateY(-2px); }
        .site-link-big span { color: #c9a84c; }

        /* ── FOOTER ── */
        .footer { background: #111; color: rgba(255,255,255,0.35); padding: 36px 6%; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; }
        .footer span { font-family: 'Inter', sans-serif; font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; }

        /* ── SUCCESS ── */
        .success-box { background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.3); border-radius: 12px; padding: 48px 32px; text-align: center; max-width: 640px; }
        .success-box h3 { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #c9a84c; margin-bottom: 12px; }
        .success-box p { font-family: 'Inter', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.55); line-height: 1.75; }

        /* ── MOBILE ── */
        @media (max-width: 600px) {
          .hero { padding: 60px 6% 55px; }
          .section { padding: 60px 6%; }
          .hero-btns { flex-direction: column; }
          .hero-btns a, .hero-btns button { width: 100%; justify-content: center; }
          .info-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .site-link-big { width: 100%; justify-content: center; }
          .strip { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="page">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-label">Focal Length Media · Lagos, Nigeria</div>
          <h1>We Make<br /><em>Visuals</em><br />That Sell.</h1>
          <p>
            Nigeria's premier creative production house — feature films, TV commercials,
            music videos, artist management, photography and full-scale event production.
            One studio. Every solution.
          </p>
          <div className="hero-btns">
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to discuss a project with Focal Length Media.")}`} target="_blank" rel="noreferrer" className="btn-wa">
              💬 Chat on WhatsApp
            </a>
            <a href={`tel:${PHONE_1}`} className="btn-primary">
              📞 Call Us Now
            </a>
          </div>
        </div>

        {/* ── STRIP ── */}
        <div className="strip">
          <span>RC: 9528632 · Ikeja, Lagos · Est. 2009</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>

        {/* ── SERVICES ── */}
        <div className="section services-bg">
          <div className="section-label">What We Do</div>
          <h2>Six Ways We<br />Build Your Brand</h2>
          <div className="svc-list">
            {services.map((s, i) => (
              <div key={s} className="svc-item">
                <div className="svc-num">0{i + 1}</div>
                <div className="svc-name">{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* ── CONTACT INFO ── */}
        <div className="section info-bg">
          <div className="section-label">Reach Us</div>
          <h2>Let's Talk<br />Business</h2>
          <div className="info-grid">
            <div className="info-block">
              <div className="info-label">WhatsApp</div>
              <div className="info-val"><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">+{WHATSAPP}</a></div>
            </div>
            <div className="info-block">
              <div className="info-label">Phone</div>
              <div className="info-val">
                <a href={`tel:${PHONE_1}`}>{PHONE_1}</a><br />
                <a href={`tel:${PHONE_2}`}>{PHONE_2}</a>
              </div>
            </div>
            <div className="info-block">
              <div className="info-label">Email</div>
              <div className="info-val"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            </div>
            <div className="info-block">
              <div className="info-label">Address</div>
              <div className="info-val">{ADDRESS}</div>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* ── FORM ── */}
        <div className="section form-bg">
          <div className="section-label">Send an Enquiry</div>
          <h2>Tell Us About<br />Your Project</h2>

          {sent ? (
            <div className="success-box" style={{ marginTop: 50 }}>
              <h3>Message Sent ✓</h3>
              <p>We've received your enquiry and will be in touch shortly.<br />For faster response, WhatsApp us directly at +{WHATSAPP}.</p>
            </div>
          ) : (
            <div className="form-wrap">
              <div className={`field ${focused === "name" ? "is-focused" : ""}`}>
                <input placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused("")} />
              </div>
              <div className={`field ${focused === "contact" ? "is-focused" : ""}`}>
                <input placeholder="Phone Number or Email *" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} onFocus={() => setFocused("contact")} onBlur={() => setFocused("")} />
              </div>
              <div className={`field ${focused === "service" ? "is-focused" : ""}`}>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} onFocus={() => setFocused("service")} onBlur={() => setFocused("")}>
                  <option value="">Select a Service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className={`field ${focused === "msg" ? "is-focused" : ""}`}>
                <textarea placeholder="Tell us about your project..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("msg")} onBlur={() => setFocused("")} />
              </div>
              <button className="submit-btn" onClick={submit} disabled={sending}>
                {sending ? "Sending..." : "Send Enquiry →"}
              </button>

              <div className="or-line">or</div>

              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to discuss a project.")}`} target="_blank" rel="noreferrer" className="btn-wa" style={{ borderRadius: 8, padding: "18px", justifyContent: "center", fontSize: "0.82rem", letterSpacing: "2px" }}>
                💬 Message Us on WhatsApp Instead
              </a>
            </div>
          )}
        </div>

        {/* ── SITE LINK ── */}
        <div className="site-link-sec">
          <p>Want to see more?</p>
          <h3>Explore our full portfolio,<br />showreel & company profile</h3>
          <a href={WEBSITE_URL} target="_blank" rel="noreferrer" className="site-link-big">
            Visit <span>Focal Length Media</span> →
          </a>
        </div>

        {/* ── FOOTER ── */}
        <div className="footer">
          <span>© 2026 Focal Length Media · RC 9528632</span>
          <span>Ikeja, Lagos, Nigeria</span>
        </div>

      </div>
    </div>
  );
}