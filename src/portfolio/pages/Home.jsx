import { useEffect, useRef, useState } from "react";
import { scrollToSection, SECTION_IDS } from "../scrollToSection.js";

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

function HeroSection() {
  const cardRef = useRef(null);
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Particle canvas
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W, H, pts = [], raf;
    function resize() { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; }
    resize();
    window.addEventListener("resize", resize);
    function Pt() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.r = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.25; this.vy = (Math.random() - 0.5) * 0.25;
      this.a = Math.random() * 0.5 + 0.1;
      this.col = Math.random() > 0.5 ? "#185FA5" : "#1D9E75";
    }
    for (let i = 0; i < 90; i++) pts.push(new Pt());
    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.x = Math.random() * W;
        if (p.y < 0 || p.y > H) p.y = Math.random() * H;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#185FA5"; ctx.globalAlpha = (1 - d / 100) * 0.08;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col; ctx.globalAlpha = p.a; ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // 3D tilt
  const handleMouseMove = (e) => {
    if (!sceneRef.current || !cardRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.03)`;
    cardRef.current.style.transition = "transform 0.1s ease-out";
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)";
    cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  const fade = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  return (
    <section style={{ background: "#0D1117", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }} />
      {/* Glow blobs */}
      <div style={{ position: "absolute", pointerEvents: "none", width: 500, height: 500, top: -100, left: -100, borderRadius: "50%", background: "radial-gradient(circle, rgba(24,95,165,0.18) 0%, transparent 70%)", filter: "blur(80px)", animation: "blobFloat 12s ease-in-out infinite" }} />
      <div style={{ position: "absolute", pointerEvents: "none", width: 400, height: 400, bottom: 0, right: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,158,117,0.14) 0%, transparent 70%)", filter: "blur(80px)", animation: "blobFloat 15s ease-in-out infinite reverse" }} />

      <div className="home-section-inner" style={{ position: "relative", zIndex: 10, maxWidth: 1180, margin: "0 auto", width: "100%", padding: "80px 40px 20px" }}>
        <div className="home-hero-grid">
          {/* Left */}
          <div className="home-hero-left">
            <div style={fade(0.1)}>
              <div
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", border: "0.5px solid rgba(29,158,117,0.4)", background: "rgba(29,158,117,0.08)", color: "#5DCAA5" }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5DCAA5", boxShadow: "0 0 8px #5DCAA5", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
                Available for new opportunities
              </div>
            </div>
            <div style={fade(0.2)}>
              <h1 className="font-black leading-none tracking-tight" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(42px, 5.5vw, 72px)", color: "#E6EDF3" }}>
                Building<br />Intelligent<br />
                <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Web Experiences.
                </span>
              </h1>
            </div>
            <div style={{ ...fade(0.3), display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                style={{ padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#185FA5,#1D9E75)", border: "none", boxShadow: "0 4px 20px rgba(24,95,165,0.35)", transition: "all 0.2s" }}
                onClick={() => scrollToSection(SECTION_IDS.contact)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(29,158,117,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(24,95,165,0.35)"; }}
              >
                Get In Touch
              </button>
              <button
                style={{ padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 500, border: "0.5px solid #21262D", background: "transparent", color: "#E6EDF3", transition: "all 0.2s" }}
                onClick={() => window.open("https://github.com/ShlokCodes-85", "_blank", "noopener,noreferrer")}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(133,183,235,0.5)"; e.currentTarget.style.background = "rgba(133,183,235,0.05)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#21262D"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = ""; }}
              >
                GitHub
              </button>
            </div>
          </div>

          {/* Right — 3D card */}
          <div className="home-hero-right" style={fade(0.2)}>
            <div className="home-hero-scene" style={{ position: "relative", perspective: 1000, width: 320, height: 380 }}
              ref={sceneRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              {/* Rings */}
              {[370, 450].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: `0.5px solid rgba(${i === 0 ? "24,95,165" : "29,158,117"},${i === 0 ? 0.2 : 0.1})`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: `ringPulse 4s ease-in-out infinite ${i}s`, pointerEvents: "none" }} />
              ))}
              <div ref={cardRef} style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", borderRadius: 22, transition: "transform 0.12s ease-out" }}>
                <div
                  style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32, borderRadius: 22, background: "#161B22", border: "0.5px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)", overflow: "hidden" }}
                >
                  {/* Conic rotation bg */}
                  <div style={{ position: "absolute", inset: "-60%", background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(24,95,165,0.07) 60deg, rgba(29,158,117,0.1) 120deg, transparent 180deg, rgba(24,95,165,0.05) 240deg, transparent 360deg)", animation: "rotateConic 12s linear infinite" }} />
                  {/* Avatar */}
                  <div style={{ width: 120, height: 120, borderRadius: "50%", padding: 3, background: "linear-gradient(135deg,#185FA5,#1D9E75)", position: "relative", zIndex: 1 }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#1C2333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>SJ</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 5, right: 5, width: 18, height: 18, borderRadius: "50%", background: "#1D9E75", border: "3px solid #161B22", animation: "pulse 2.5s ease-in-out infinite" }} />
                  </div>
                  <div style={{ zIndex: 1, textAlign: "center" }}>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#E6EDF3" }}>Shlok Jain</div>
                    <div style={{ fontSize: 12.5, color: "#7D8FA3", lineHeight: 1.6, marginTop: 4 }}>
                      <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 600 }}>Full Stack</span>
                      {" · "}
                      <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 600 }}>AI/ML Engineer</span>
                      <br /><span style={{ WebkitTextFillColor: "#7D8FA3", fontSize: 11.5 }}>Fresher · Open to work</span>
                    </div>
                  </div>

                </div>
              </div>
              {/* Floating chips */}
              {[
                { label: "React + Node", color: "#5DCAA5", pos: { top: 14, left: -72 }, delay: 0 },
                { label: "PyTorch", color: "#85B7EB", pos: { bottom: 70, left: -64 }, delay: 1 },
                { label: "LangChain", color: "#AFA9EC", pos: { top: 40, right: -72 }, delay: 0.5 },
                { label: "MongoDB", color: "#5DCAA5", pos: { bottom: 28, right: -60 }, delay: 1.5 },
              ].map(({ label, color, pos, delay }) => (
                <div key={label}
                  className="hero-floating-chip"
                  style={{ position: "absolute", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, borderRadius: 12, padding: "8px 12px", backdropFilter: "blur(8px)", ...pos, background: "rgba(22,27,34,0.92)", border: "0.5px solid #21262D", color: "#8B949E", boxShadow: "0 4px 16px rgba(0,0,0,0.3)", whiteSpace: "nowrap", animation: `chipFloat 3.5s ease-in-out infinite ${delay}s` }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}`, display: "inline-block", flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="home-scroll-indicator" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingBottom: 16, opacity: 0.88 }}>
        <div style={{ width: 19, height: 30, border: "1.5px solid rgba(133,183,235,0.55)", borderRadius: 9, display: "flex", justifyContent: "center", paddingTop: 5, background: "rgba(13,17,23,0.18)" }}>
          <div style={{ width: 3, height: 6, background: "#5DCAA5", borderRadius: 2, boxShadow: "0 0 8px rgba(93,202,165,0.55)", animation: "scrollDown 1.6s ease-in-out infinite" }} />
        </div>
        <span style={{ fontSize: 9.5, letterSpacing: "0.13em", textTransform: "uppercase", color: "#8AA3BF", fontWeight: 600 }}>Scroll</span>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,30px) scale(0.95)} }
        @keyframes rotateConic { to { transform: rotate(360deg); } }
        @keyframes chipFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes ringPulse { 0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.5;transform:translate(-50%,-50%) scale(1.03)} }
        @keyframes scrollDown { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(8px);opacity:0} }
        .home-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: flex-start; }
        .home-hero-left { display: flex; flex-direction: column; gap: 28px; }
        .home-hero-right { display: flex; justify-content: center; align-items: center; }
        @media (max-width: 1140px) {
          .home-section-inner { padding: 76px 24px 20px !important; }
          .home-hero-grid { gap: 36px !important; }
        }
        @media (min-width: 1024px) {
          .home-hero-right { justify-content: flex-end; }
        }
        @media (max-width: 980px) {
          .home-hero-grid { grid-template-columns: 1fr; gap: 28px; }
          .home-hero-left { align-items: center; text-align: center; }
          .home-hero-left > div:last-child { justify-content: center; }
          .home-hero-right { justify-content: center; }
        }
        @media (max-width: 900px) {
          .home-hero-scene { width: 300px !important; height: 360px !important; }
          .hero-floating-chip { display: none !important; }
        }
        @media (max-width: 768px) {
          .home-hero-left h1 { font-size: clamp(34px, 12vw, 52px) !important; }
          .home-hero-left { gap: 20px; }
          .home-hero-scene { width: min(100%, 290px) !important; height: 340px !important; }
        }
        @media (max-width: 540px) {
          .home-section-inner { padding: 68px 16px 12px !important; }
          .home-scroll-indicator { display: none !important; }
          .home-hero-left button { width: 100%; justify-content: center; }
          .home-hero-scene { width: min(100%, 260px) !important; height: 312px !important; }
        }
      `}</style>
      <HeroSection />
    </>
  );
}
