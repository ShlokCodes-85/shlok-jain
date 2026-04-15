import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SOCIAL_ICONS = {
  github: { path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", label: "GitHub", href: "https://github.com/ShlokCodes-85" },
  linkedin: { path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", label: "LinkedIn", href: "https://www.linkedin.com/in/shlok-jain-674144295/" },
  instagram: { path: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm8.58 1.72a1.34 1.34 0 1 0 0 2.68 1.34 1.34 0 0 0 0-2.68zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4z", label: "Instagram", href: "https://www.instagram.com/shlok_jain_72/" },
  email: { path: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2 9 6 9-6", label: "Email", href: "mailto:bjainshlok0902@gmail.com" },
};

function SocialIcon({ type, path }) {
  const neutralIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  );

  if (type === "instagram") {
    return (
      <>
        <span className="icon-neutral">{neutralIcon}</span>
        <span className="icon-brand" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F58529" />
                <stop offset="35%" stopColor="#DD2A7B" />
                <stop offset="68%" stopColor="#8134AF" />
                <stop offset="100%" stopColor="#515BD4" />
              </linearGradient>
            </defs>
            <path d={path} fill="url(#ig-gradient)" />
          </svg>
        </span>
      </>
    );
  }

  if (type === "email") {
    return (
      <>
        <span className="icon-neutral">{neutralIcon}</span>
        <span className="icon-brand" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="mail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="30%" stopColor="#EA4335" />
                <stop offset="65%" stopColor="#FBBC05" />
                <stop offset="100%" stopColor="#34A853" />
              </linearGradient>
            </defs>
            <path d={path} fill="url(#mail-gradient)" />
          </svg>
        </span>
      </>
    );
  }

  if (type === "linkedin") {
    return (
      <>
        <span className="icon-neutral">{neutralIcon}</span>
        <span className="icon-brand" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d={path} fill="#0A66C2" />
          </svg>
        </span>
      </>
    );
  }

  return <span className="icon-neutral">{neutralIcon}</span>;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const isFormComplete = [form.name, form.email, form.subject, form.message].every((field) => field.trim().length > 0);
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormComplete || !isEmailValid) return;
    setStatus("sending");
    // Simulate API call — replace with: await axios.post('/api/contact', form)
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; font-family: 'DM Sans', sans-serif; }
        .contact-input {
          width: 100%; padding: 11px 14px; border-radius: 9px;
          border: 0.5px solid #21262D; background: #0D1117;
          color: #E6EDF3; font-size: 13.5px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-input::placeholder { color: #4A5568; }
        .contact-input:focus { border-color: rgba(24,95,165,0.5); box-shadow: 0 0 0 3px rgba(24,95,165,0.1); }
        .contact-input:focus-within { border-color: rgba(24,95,165,0.5); }
        .contact-label { font-size: 12px; font-weight: 500; color: #7D8FA3; margin-bottom: 7px; display: flex; align-items: center; gap: 6px; }
        .send-btn {
          width: 100%; padding: 13px; border-radius: 10px;
          background: linear-gradient(135deg,#185FA5,#1D9E75);
          border: none; color: #fff; font-size: 14px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(24,95,165,0.3);
        }
        .send-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(29,158,117,0.4); }
        .send-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .social-icon-btn {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 14px 20px; border-radius: 10px;
          border: 0.5px solid #21262D; background: #161B22;
          color: #7D8FA3; text-decoration: none;
          font-size: 11px; font-weight: 500;
          transition: all 0.2s; cursor: pointer;
          min-width: 0;
        }
        .social-icon-btn:hover { border-color: rgba(29,158,117,0.4); color: #5DCAA5; background: rgba(29,158,117,0.06); }
        .social-icon-btn .social-brand-icon {
          position: relative;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .social-icon-btn .social-brand-icon .icon-neutral,
        .social-icon-btn .social-brand-icon .icon-brand {
          position: absolute;
          inset: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }
        .social-icon-btn .social-brand-icon .icon-neutral { opacity: 1; }
        .social-icon-btn .social-brand-icon .icon-brand { opacity: 0; }
        .social-icon-btn:hover .social-brand-icon.has-brand .icon-neutral { opacity: 0; }
        .social-icon-btn:hover .social-brand-icon.has-brand .icon-brand { opacity: 1; }
        .social-icon-btn.social-github:hover { border-color: rgba(0,0,0,0.6); color: #000; background: rgba(0,0,0,0.12); }
        .social-icon-btn.social-linkedin:hover { border-color: rgba(10,102,194,0.5); color: #0A66C2; background: rgba(10,102,194,0.08); }
        .social-icon-btn.social-instagram:hover { border-color: rgba(225,48,108,0.5); color: #E1306C; background: rgba(225,48,108,0.1); }
        .social-icon-btn.social-email:hover { border-color: rgba(234,67,53,0.55); color: #EA4335; background: rgba(234,67,53,0.1); }
        html[data-theme="light"] .page-content .social-icon-btn.social-github:hover {
          border-color: rgba(0,0,0,0.6);
          color: #000;
          background: rgba(0,0,0,0.12);
          filter: invert(1) hue-rotate(180deg);
        }
        @media (max-width: 860px) {
          .contact-hero { padding: 28px 24px 52px !important; }
          .contact-hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .contact-hero-grid > div:first-child { width: 100%; max-width: none; }
          .contact-intro-text { max-width: none !important; }
          .contact-hero-grid > div:last-child { width: 100%; max-width: 520px; margin: 0 auto; }
          .contact-form-wrap { margin-top: 18px !important; }
        }
        @media (max-width: 768px) {
          .contact-social-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-form-columns { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .contact-hero { padding: 24px 16px 44px !important; }
          .contact-social-grid { grid-template-columns: 1fr !important; }
          .contact-form-card { padding: 20px 16px 18px !important; }
          .contact-hero h1 { font-size: clamp(36px, 11vw, 48px) !important; }
        }
      `}</style>

      <main style={{ background: "#0D1117", minHeight: "100vh", paddingTop: 0 }}>

        {/* Hero */}
        <section className="contact-hero" style={{ padding: "36px 40px 60px", maxWidth: 1100, margin: "0 auto" }}>
          <div className="contact-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 60, alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "inline-flex", marginBottom: 20 }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, padding: "5px 16px", borderRadius: 20, border: "0.5px solid rgba(24,95,165,0.4)", color: "#85B7EB", background: "rgba(24,95,165,0.08)" }}>Contact</span>
              </div>

              <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(40px,5.2vw,64px)", color: "#E6EDF3", lineHeight: 1.02, marginBottom: 20, letterSpacing: "-0.02em" }}>
                Let's Build Something{" "}
                <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Exceptional
                </span>{" "}Together.
              </h1>
              <p className="contact-intro-text" style={{ fontSize: 15, color: "#7D8FA3", lineHeight: 1.75, maxWidth: 420 }}>
                I'm currently open to new opportunities, specialized project roles, and speaking engagements. Let's start the conversation.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ width: "100%", background: "#161B22", border: "0.5px solid rgba(24,95,165,0.25)", borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1D9E75", boxShadow: "0 0 8px rgba(29,158,117,0.7)", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "#E6EDF3" }}>Available for Hire</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 20, background: "rgba(24,95,165,0.1)", color: "#85B7EB", border: "0.5px solid rgba(24,95,165,0.2)" }}>Full-time / Contract</span>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 20, background: "rgba(24,95,165,0.1)", color: "#85B7EB", border: "0.5px solid rgba(24,95,165,0.2)" }}>
                    Remote / On-site
                  </span>
                </div>
              </div>

              <div>
                <div className="contact-social-grid" style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10 }}>
                  {Object.entries(SOCIAL_ICONS).map(([key, { path, label, href }]) => (
                    <a key={key} href={href} className={`social-icon-btn social-${key}`}>
                      <span className={`social-brand-icon${key === "linkedin" || key === "instagram" || key === "email" ? " has-brand" : ""}`}>
                        <SocialIcon type={key} path={path} />
                      </span>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap" style={{ width: "100%", maxWidth: 760, margin: "28px auto 0" }}>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <div className="contact-form-card" style={{ background: "#161B22", border: "0.5px solid #21262D", borderRadius: 16, padding: "28px 28px 24px", width: "min(100%, 620px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(24,95,165,0.12)", border: "0.5px solid rgba(24,95,165,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="2,4 12,13 22,4"/></svg>
                  </div>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#E6EDF3" }}>Send a Message</span>
                </div>
                <p style={{ fontSize: 13, color: "#7D8FA3", marginBottom: 24 }}>Have a project in mind or just want to say hi? Feel free to drop a message below.</p>

                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "48px 20px" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(29,158,117,0.12)", border: "0.5px solid rgba(29,158,117,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5DCAA5" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#E6EDF3", marginBottom: 8 }}>Message Sent!</h3>
                    <p style={{ fontSize: 13.5, color: "#7D8FA3" }}>Thanks for reaching out. I'll get back to you within 4 hours.</p>
                    <button onClick={() => { setForm({ name:"",email:"",subject:"",message:"" }); setStatus(null); }} style={{ marginTop: 20, padding: "9px 22px", borderRadius: 8, border: "0.5px solid #21262D", background: "transparent", color: "#E6EDF3", fontSize: 13, cursor: "pointer" }}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="contact-form-columns" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      <div>
                        <label className="contact-label">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          Full Name
                        </label>
                        <input className="contact-input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <label className="contact-label">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="2,4 12,13 22,4"/></svg>
                          Email Address
                        </label>
                        <input className="contact-input" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                        {form.email.trim().length > 0 && !isEmailValid ? (
                          <p style={{ marginTop: 6, fontSize: 11.5, color: "#E26D6D" }}>Please enter a valid email address.</p>
                        ) : null}
                      </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label className="contact-label">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Subject
                      </label>
                      <input className="contact-input" name="subject" placeholder="How can I help you?" value={form.subject} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label className="contact-label">Message</label>
                      <textarea className="contact-input" name="message" placeholder="Tell me about your project, goals, or just say hello..." value={form.message} onChange={handleChange} required rows={5} style={{ resize: "vertical", minHeight: 120 }} />
                    </div>
                    <button className="send-btn" type="submit" disabled={!isFormComplete || !isEmailValid || status === "sending"}>
                      {status === "sending" ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
