import { useState } from "react";
import { scrollToSection, SECTION_IDS } from "../scrollToSection.js";

const RESUMES = {
  webOptimized: {
    label: "Web Optimized",
    name: "Shlok Jain",
    title: "Senior Full Stack Developer & AI Engineer",
    summary: "Versatile Full Stack Engineer with 7+ years of experience specializing in high-performance MERN applications and integrated Machine Learning models. Proven track record of architecting scalable cloud solutions and mentoring high-growth engineering teams.",
    contact: {
      email: "alex.sterling@mernfolio.dev",
      phone: "+1 (512) 334-5678",
      location: "San Francisco, CA",
      website: "mernfolio.dev",
    },
    digital: ["github", "linkedin", "twitter", "dribbble"],
    projects: [
      {
        name: "Nexus Predict: Enterprise Forecast Engine",
        year: "2022",
        company: "Predictive Analytics Suite",
        desc: "Built a full-stack dashboard for financial forecasting utilizing a custom LSTM model served via a FastAPI backend. Engineered a dynamic React-based visualization layer with Recharts for real-time risk assessment monitoring.",
        tags: ["Python", "FastAPI", "React", "LSTM", "Recharts"],
      },
      {
        name: "Aura: Decentralized Marketplace",
        year: "2020",
        company: "Web3 Infrastructure Project",
        desc: "Developed the frontend interface for a peer-to-peer asset exchange using Next.js and Ethers.js integration. Managed state architecture using Redux Toolkit to handle complex real-time blockchain event synchronization.",
        tags: ["Next.js", "Ethers.js", "Redux", "Solidity"],
      },
    ],
    skills: {
      "MERN Stack": ["MERN/MEAN", "Next.js", "Docker", "Kubernetes", "Redis", "GraphQL"],
      Intelligence: ["TensorFlow", "OpenCV", "NLTK", "Scikit-learn", "Pandas"],
    },
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Certificate",
      "Professional Scrum Master 1",
    ],
  },
  traditional: {
    label: "Traditional Layout",
    name: "Shlok Jain",
    title: "Senior Full Stack Developer & AI Engineer",
    summary: "Versatile Full Stack Engineer with 7+ years of experience specializing in high-performance MERN applications and integrated Machine Learning models.",
    contact: {
      email: "alex.sterling@mernfolio.dev",
      phone: "+1 (512) 334-5678",
      location: "San Francisco, CA",
      website: "mernfolio.dev",
    },
    digital: ["github", "linkedin", "twitter", "dribbble"],
    projects: [
      {
        name: "Nexus Predict: Enterprise Forecast Engine",
        year: "2022",
        company: "Predictive Analytics Suite",
        desc: "Built a full-stack dashboard for financial forecasting utilizing a custom LSTM model served via a FastAPI backend.",
        tags: ["Python", "FastAPI", "React", "LSTM"],
      },
    ],
    skills: {
      "MERN Stack": ["MERN/MEAN", "Next.js", "Docker", "Kubernetes", "Redis", "GraphQL"],
      Intelligence: ["TensorFlow", "OpenCV", "NLTK", "Scikit-learn", "Pandas"],
    },
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Certificate",
    ],
  },
};

const SOCIAL_ICONS = {
  github: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  linkedin: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  twitter: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  dribbble: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 12.756 2.386 12.672 1.966 12.67c0 .04-.006.084-.006.124 0 2.41.91 4.61 2.4 6.272zm-2.34-7.407c.43.006 4.583.002 8.168-1.063-.83-1.477-1.72-2.878-2.676-4.16-2.556 1.202-4.57 3.29-5.492 5.223zM12 1.98c-.998 0-1.967.14-2.88.396 1.168 1.52 2.215 3.177 2.97 4.857C15.145 6.47 17.3 5.122 18.55 3.83A10.07 10.07 0 0012 1.98zm7.33 2.905c-1.165 1.344-3.466 2.883-6.77 4.127.09.204.178.41.264.618l.045.106c3.16-.4 6.312.244 6.827.368-.016-1.855-.53-3.6-1.366-5.22z"/></svg>,
};

function ResumeDocument({ data, layout }) {
  const isWeb = layout === "webOptimized";

  return (
    <div style={{
      background: "#fff", color: "#1a1a2e", fontFamily: "'DM Sans', sans-serif",
      maxWidth: 860, margin: "0 auto", borderRadius: 12,
      boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
      overflow: "hidden",
    }}>
      {isWeb ? (
        // ── Web Optimized: 2-column ──────────────────────────────────────
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px" }}>
          {/* Left main */}
          <div style={{ padding: "44px 40px", borderRight: "1px solid #F0F2F5" }}>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 32, color: "#0F1117", marginBottom: 4 }}>{data.name}</h1>
            <div style={{ fontSize: 14, fontWeight: 600, background: "linear-gradient(90deg,#185FA5,#1D9E75)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 14 }}>{data.title}</div>
            <p style={{ fontSize: 12.5, color: "#5A6579", lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>{data.summary}</p>

            {/* Key Projects */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: "linear-gradient(135deg,#185FA5,#1D9E75)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#0F1117", letterSpacing: "0.06em", textTransform: "uppercase" }}>Key Projects</span>
              </div>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < data.projects.length - 1 ? "1px solid #F0F2F5" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13.5, color: "#0F1117" }}>{proj.name}</span>
                    <span style={{ fontSize: 11, color: "#9AA3B2" }}>{proj.year}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "#185FA5", fontWeight: 600, marginBottom: 8 }}>{proj.company}</div>
                  <p style={{ fontSize: 12.5, color: "#5A6579", lineHeight: 1.65, marginBottom: 10 }}>{proj.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {proj.tags.map((t) => <span key={t} style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 4, background: "#EEF6FF", color: "#185FA5", fontWeight: 500 }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ background: "#FAFBFC", padding: "44px 22px" }}>
            {/* Contact */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: 12 }}>Contact Detail</div>
              {[
                { icon: "✉", val: data.contact.email },
                { icon: "📞", val: data.contact.phone },
                { icon: "📍", val: data.contact.location },
                { icon: "🌐", val: data.contact.website },
              ].map(({ icon, val }) => (
                <div key={val} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                  <span style={{ fontSize: 11 }}>{icon}</span>
                  <span style={{ fontSize: 11, color: "#5A6579", wordBreak: "break-all" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Digital presence */}
            <div style={{ marginBottom: 28, paddingTop: 16, borderTop: "1px solid #EAECF0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: 12 }}>Digital Presence</div>
              <div style={{ display: "flex", gap: 8 }}>
                {data.digital.map((s) => (
                  <div key={s} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #EAECF0", display: "flex", alignItems: "center", justifyContent: "center", color: "#9AA3B2", cursor: "pointer" }}>
                    {SOCIAL_ICONS[s]}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            {Object.entries(data.skills).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 22, paddingTop: 16, borderTop: "1px solid #EAECF0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: 10 }}>{cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {items.map((skill) => (
                    <span key={skill} style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 5, background: "#F0F2F5", color: "#5A6579", fontWeight: 500 }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Certifications */}
            <div style={{ paddingTop: 16, borderTop: "1px solid #EAECF0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9AA3B2", marginBottom: 12 }}>Certifications</div>
              {data.certifications.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 1, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 11, color: "#5A6579", lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // ── Traditional Layout: single column ─────────────────────────────
        <div style={{ padding: "44px 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 32, paddingBottom: 24, borderBottom: "2px solid", borderImage: "linear-gradient(90deg,#185FA5,#1D9E75) 1" }}>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 34, color: "#0F1117", marginBottom: 6 }}>{data.name}</h1>
            <div style={{ fontSize: 14, fontWeight: 600, background: "linear-gradient(90deg,#185FA5,#1D9E75)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 12 }}>{data.title}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              {[data.contact.email, data.contact.phone, data.contact.location, data.contact.website].map((v) => (
                <span key={v} style={{ fontSize: 12, color: "#5A6579" }}>{v}</span>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 13, color: "#5A6579", lineHeight: 1.75, marginBottom: 32, textAlign: "center" }}>{data.summary}</p>

          {/* Projects */}
          <Section title="Projects">
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13.5, color: "#0F1117" }}>{proj.name}</span>
                  <span style={{ fontSize: 11, color: "#9AA3B2" }}>{proj.year}</span>
                </div>
                <div style={{ fontSize: 12, color: "#185FA5", fontWeight: 600, marginBottom: 6 }}>{proj.company}</div>
                <p style={{ fontSize: 12.5, color: "#5A6579", lineHeight: 1.65 }}>{proj.desc}</p>
              </div>
            ))}
          </Section>

          {/* Skills + Certifications side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <Section title="Skills">
              {Object.entries(data.skills).map(([cat, items]) => (
                <div key={cat} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#0F1117", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {items.map((s) => <span key={s} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "#F0F2F5", color: "#5A6579" }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </Section>
            <Section title="Certifications">
              <div style={{ marginTop: 12 }}>
                {data.certifications.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 2, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 11.5, color: "#5A6579" }}>{c}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      )}

      {/* Resume footer CTA */}
      <div style={{ background: "linear-gradient(135deg,rgba(24,95,165,0.06),rgba(29,158,117,0.06))", borderTop: "1px solid #F0F2F5", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 12, color: "#9AA3B2", maxWidth: 440, lineHeight: 1.6 }}>
          Looking for a developer who can bridge the gap between robust system architecture and cutting-edge AI? Let's discuss your next project.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => scrollToSection(SECTION_IDS.contact)} style={{ padding: "8px 18px", borderRadius: 8, background: "linear-gradient(135deg,#185FA5,#1D9E75)", border: "none", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Contact Me</button>
          <button onClick={() => scrollToSection(SECTION_IDS.projects)} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid #E2E6ED", background: "transparent", color: "#5A6579", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>View Projects</button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ height: 2, width: 24, background: "linear-gradient(90deg,#185FA5,#1D9E75)", borderRadius: 2 }} />
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, color: "#0F1117", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</span>
        <div style={{ flex: 1, height: "1px", background: "#F0F2F5" }} />
      </div>
      {children}
    </div>
  );
}

export default function Resume() {
  const [activeLayout, setActiveLayout] = useState("webOptimized");
  const data = RESUMES[activeLayout];

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; font-family: 'DM Sans', sans-serif; }
        @media print {
          .resume-toolbar { display: none !important; }
          body { background: white; }
        }
        .layout-tab {
          padding: 7px 20px; border-radius: 8px; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; border: 0.5px solid #21262D;
          background: transparent; color: #7D8FA3; font-family: 'DM Sans', sans-serif;
        }
        .layout-tab.active {
          background: linear-gradient(135deg,#185FA5,#1D9E75);
          border-color: transparent; color: #fff; font-weight: 600;
        }
        .layout-tab:hover:not(.active) { border-color: rgba(133,183,235,0.4); color: #E6EDF3; }
      `}</style>

      <main style={{ background: "#0D1117", minHeight: "100vh", paddingTop: 0 }}>
        <section style={{ padding: "32px 40px 24px", maxWidth: 980, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", marginBottom: 18 }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, padding: "5px 16px", borderRadius: 20, border: "0.5px solid rgba(24,95,165,0.4)", color: "#85B7EB", background: "rgba(24,95,165,0.08)" }}>Resume</span>
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(40px,5.2vw,64px)", color: "#E6EDF3", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            Professional
            <br />
            <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Resume
            </span>
          </h1>
        </section>

        {/* Toolbar */}
        <div className="resume-toolbar" style={{ position: "sticky", top: 64, zIndex: 40, background: "rgba(13,17,23,0.95)", backdropFilter: "blur(16px)", borderBottom: "0.5px solid #21262D", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, color: "#4A5568", marginBottom: 2 }}>Document view</div>
            <div style={{ fontSize: 12.5, color: "#7D8FA3" }}>Last updated: Jan 2025</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {Object.entries(RESUMES).map(([key, r]) => (
              <button key={key} className={`layout-tab${activeLayout === key ? " active" : ""}`} onClick={() => setActiveLayout(key)}>
                {r.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleDownload}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 8, background: "linear-gradient(135deg,#185FA5,#1D9E75)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(24,95,165,0.3)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(24,95,165,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(24,95,165,0.3)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Download PDF
          </button>
        </div>

        {/* Resume document */}
        <div style={{ padding: "48px 40px 80px", maxWidth: 980, margin: "0 auto" }}>
          <ResumeDocument data={data} layout={activeLayout} />
        </div>
      </main>
    </>
  );
}
