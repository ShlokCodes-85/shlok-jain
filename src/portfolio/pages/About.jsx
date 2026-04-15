import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const FOCUS_AREAS = [
  {
    key: "fullstack",
    title: "Full-Stack Development",
    desc: "Building polished interfaces and reliable app flows with modern frameworks.",
    impact: "End-to-End Product Delivery",
    tags: ["React", "Node.js", "API Design"],
    accent: "linear-gradient(135deg,#185FA5,#63A8F5)",
  },
  {
    key: "ai",
    title: "AI/ML",
    desc: "Using machine learning and smart features to add more value to applications.",
    impact: "Smarter User Experiences",
    tags: ["LLMs", "NLP", "Applied ML"],
    accent: "linear-gradient(135deg,#1D9E75,#66D5B0)",
  },
];

function FocusIcon({ type }) {
  if (type === "fullstack") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 3 12 9 6" />
        <polyline points="15 6 21 12 15 18" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}


// ── Hero bio ─────────────────────────────────────────────────────────────────
function BioSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="about-section" ref={ref} style={{ background: "#0D1117", padding: "72px 40px 80px" }}>
      <div className="about-layout" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "300px 1fr", gap: 72, alignItems: "flex-start" }}>

        {/* Left card */}
        <div className="about-left" style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {/* Avatar */}
          <div style={{ position: "relative", width: 130, marginBottom: 24 }}>
            <div style={{ width: 130, height: 130, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg,#185FA5,#1D9E75)" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#1C2333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontSize: 42, fontWeight: 800, background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>SJ</span>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "#1D9E75", border: "3px solid #0D1117", boxShadow: "0 0 10px rgba(29,158,117,0.6)", animation: "pulse 2s ease-in-out infinite" }} />
          </div>

          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 26, color: "#E6EDF3", marginBottom: 4 }}>Shlok Jain</h2>
          <div style={{ fontSize: 14, fontWeight: 600, background: "linear-gradient(90deg,#185FA5,#1D9E75)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 16 }}>
            MERN & AI/ML Engineer
          </div>
        </div>

        {/* Right content */}
        <div className="about-right" style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(28px)",
          transition: "opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease",
        }}>
          <div style={{ display: "inline-flex", marginBottom: 14 }}>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                padding: "5px 16px",
                borderRadius: 20,
                border: "0.5px solid rgba(24,95,165,0.4)",
                color: "#85B7EB",
                background: "rgba(24,95,165,0.08)",
              }}
            >
              About
            </span>
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(30px,4vw,44px)", color: "#E6EDF3", marginBottom: 18, lineHeight: 1.08, letterSpacing: "-0.015em" }}>
            About{" "}
            <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Me
            </span>
          </h1>

          <p style={{ fontSize: 15, color: "#7D8FA3", lineHeight: 1.8, marginBottom: 18 }}>
            Hey! I am Shlok Jain, a developer focused equally on <strong style={{ color: "#E6EDF3", fontWeight: 600 }}>MERN full-stack development</strong> and <strong style={{ color: "#E6EDF3", fontWeight: 600 }}>AI/ML engineering</strong>, building clean and user-friendly products people actually enjoy using.
          </p>
          <p style={{ fontSize: 15, color: "#7D8FA3", lineHeight: 1.8, marginBottom: 18 }}>
            I enjoy working across both tracks, from APIs, databases, and frontend experience to model-driven features and intelligent product flows. Whether it is shipping a full-stack feature or improving an AI-powered interaction, I like refining things step by step.
          </p>
          <p style={{ fontSize: 15, color: "#7D8FA3", lineHeight: 1.8, marginBottom: 36 }}>
            I am always building, always learning, and focused on keeping things simple, functional, and thoughtfully crafted.
          </p>

          {/* Trait cards */}
          <div className="about-traits-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {FOCUS_AREAS.map((item) => (
              <div
                key={item.key}
                className="focus-tile"
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div className="focus-tile-icon" style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(24,95,165,0.12)", border: "0.5px solid rgba(24,95,165,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                    <FocusIcon type={item.key} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13.5, color: "#E6EDF3", marginBottom: 6 }}>{item.title}</div>
                    <p style={{ fontSize: 12.5, color: "#7D8FA3", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; font-family: 'DM Sans', sans-serif; }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
        .focus-tile {
          padding: 18px 20px;
          border-radius: 12px;
          background: #161B22;
          border: 0.5px solid #21262D;
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
        }
        .focus-tile:hover {
          border-color: rgba(133,183,235,0.6);
          background: linear-gradient(135deg, rgba(24,95,165,0.18), rgba(29,158,117,0.16)), #161B22;
          box-shadow: 0 10px 24px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(133,183,235,0.12);
          transform: translateY(-2px);
        }
        .focus-tile:hover .focus-tile-icon {
          background: linear-gradient(135deg, #185FA5, #1D9E75) !important;
          border-color: rgba(255,255,255,0.16) !important;
          color: #fff;
        }
        @media (max-width: 1100px) {
          .about-layout { grid-template-columns: 260px 1fr !important; gap: 44px !important; }
        }
        @media (max-width: 900px) {
          .about-section { padding: 64px 24px 72px !important; }
          .about-layout { grid-template-columns: 1fr !important; gap: 28px !important; }
          .about-left { max-width: 520px; margin: 0; text-align: left; }
          .about-right { max-width: 100%; }
          .about-right h1 { font-size: clamp(34px, 9vw, 52px) !important; }
        }
        @media (max-width: 640px) {
          .about-section { padding: 56px 16px 64px !important; }
          .about-right { text-align: left; }
          .about-right > div:first-child { justify-content: flex-start; }
          .about-right h1 { font-size: clamp(36px, 10vw, 48px) !important; }
          .about-traits-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .focus-top { flex-direction: column; align-items: flex-start; }
          .focus-impact { white-space: normal; }
        }
      `}</style>
      <BioSection />
    </>
  );
}
