import { useEffect, useRef, useState } from "react";
import { scrollToSection, SECTION_IDS } from "../scrollToSection.js";

function useInView(threshold = 0.12) {
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

const PROJECTS = [
  {
    id: 1,
    title: "NexGen E-Commerce Engine",
    desc: "A high-performance MERN marketplace with real-time inventory and Stripe integration.",
    category: "Full Stack",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop",
    github: "#",
    website: "#",
  },
  {
    id: 2,
    title: "DeepSentiment Analyzer",
    desc: "Multi-modal sentiment analysis tool using PyTorch and Transformer models.",
    category: "AI / ML",
    tags: ["Python", "PyTorch", "HuggingFace", "FastAPI"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=420&fit=crop",
    github: "#",
    website: "#",
  },
  {
    id: 3,
    title: "PulseHealth Patient Portal",
    desc: "HIPAA-compliant healthcare management system with real-time chat.",
    category: "Full Stack",
    tags: ["Next.js", "Socket.io", "PostgreSQL", "AWS S3"],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=420&fit=crop",
    github: "#",
    website: "#",
  },
  {
    id: 4,
    title: "VisionTrack Traffic Flow",
    desc: "Real-time vehicle detection and traffic density estimation using YOLOv8.",
    category: "AI / ML",
    tags: ["OpenCV", "YOLOv8", "Python", "Flask"],
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=420&fit=crop",
    github: "#",
    website: "#",
  },
];

const FILTERS = ["All Projects", "Full Stack", "AI / ML"];

// GitHub icon
const GithubIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// External link icon
const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function CategoryBadge({ category }) {
  const isAI = category === "AI / ML";
  return (
    <div style={{
      position: "absolute", top: 14, right: 14,
      display: "flex", alignItems: "center", gap: 6,
      padding: "5px 12px", borderRadius: 20,
      background: "rgba(13,17,23,0.82)",
      backdropFilter: "blur(10px)",
      border: `0.5px solid ${isAI ? "rgba(29,158,117,0.4)" : "rgba(24,95,165,0.4)"}`,
      fontSize: 11.5, fontWeight: 600,
      color: isAI ? "#5DCAA5" : "#85B7EB",
    }}>
      {isAI
        ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/><path d="M10.5 10.5h3v3h-3z"/></svg>
        : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      }
      {category}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#161B22",
        border: `0.5px solid ${hovered ? "rgba(29,158,117,0.35)" : "#21262D"}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ${index * 0.1}s ease, transform 0.55s ${index * 0.1}s ease, border-color 0.2s`,
      }}
    >
      {/* Image */}
      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
        <img
          src={project.img}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s ease" }}
          onError={(e) => { e.target.parentNode.style.background = "#1C2333"; e.target.style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(22,27,34,0.7) 0%, transparent 50%)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }} />
        <CategoryBadge category={project.category} />
      </div>

      {/* Content */}
      <div className="project-card-content" style={{ padding: "22px 24px 24px" }}>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17.5, color: "#E6EDF3", marginBottom: 8 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13.5, color: "#7D8FA3", lineHeight: 1.65, marginBottom: 16 }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "0.5px solid #21262D", color: "#7D8FA3" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Action icons */}
        <div style={{ display: "flex", gap: 12 }}>
          <a
            href={project.github}
            style={{ display: "inline-flex", alignItems: "center", gap: hoveredAction === "github" ? 8 : 0, justifyContent: "center", width: hoveredAction === "github" ? 106 : 34, height: 34, padding: hoveredAction === "github" ? "0 12px" : 0, borderRadius: 8, border: "0.5px solid #21262D", color: "#7D8FA3", textDecoration: "none", transition: "all 0.2s ease", overflow: "hidden", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { setHoveredAction("github"); e.currentTarget.style.borderColor = "rgba(133,183,235,0.5)"; e.currentTarget.style.color = "#85B7EB"; e.currentTarget.style.background = "rgba(133,183,235,0.06)"; }}
            onMouseLeave={(e) => { setHoveredAction(null); e.currentTarget.style.borderColor = "#21262D"; e.currentTarget.style.color = "#7D8FA3"; e.currentTarget.style.background = "transparent"; }}>
            <GithubIcon />
            {hoveredAction === "github" && <span style={{ fontSize: 12.5, fontWeight: 600 }}>GitHub</span>}
          </a>
          <a
            href={project.website}
            style={{ display: "inline-flex", alignItems: "center", gap: hoveredAction === "website" ? 8 : 0, justifyContent: "center", width: hoveredAction === "website" ? 110 : 34, height: 34, padding: hoveredAction === "website" ? "0 12px" : 0, borderRadius: 8, border: "0.5px solid #21262D", color: "#7D8FA3", textDecoration: "none", transition: "all 0.2s ease", overflow: "hidden", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { setHoveredAction("website"); e.currentTarget.style.borderColor = "rgba(29,158,117,0.5)"; e.currentTarget.style.color = "#5DCAA5"; e.currentTarget.style.background = "rgba(29,158,117,0.06)"; }}
            onMouseLeave={(e) => { setHoveredAction(null); e.currentTarget.style.borderColor = "#21262D"; e.currentTarget.style.color = "#7D8FA3"; e.currentTarget.style.background = "transparent"; }}>
            <ExternalIcon />
            {hoveredAction === "website" && <span style={{ fontSize: 12.5, fontWeight: 600 }}>Website</span>}
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsGrid({ filter }) {
  const filtered = filter === "All Projects"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
      {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; font-family: 'DM Sans', sans-serif; }
        .filter-btn {
          padding: 8px 22px; border-radius: 100px; font-size: 13.5px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; border: 0.5px solid #21262D;
          background: transparent; color: #7D8FA3; font-family: 'DM Sans', sans-serif;
        }
        .filter-btn:hover { color: #E6EDF3; border-color: rgba(133,183,235,0.4); }
        .filter-btn.active {
          background: linear-gradient(135deg,#185FA5,#1D9E75);
          border-color: transparent; color: #fff; font-weight: 600;
          box-shadow: 0 4px 16px rgba(24,95,165,0.3);
        }
        @media (max-width: 900px) {
          .projects-header { padding: 28px 24px 48px !important; }
          .projects-grid-wrap { padding: 0 24px 72px !important; }
          .projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 820px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .projects-filter-wrap { width: 100%; display: grid !important; grid-template-columns: 1fr 1fr; border-radius: 16px !important; }
          .projects-filter-wrap .filter-btn:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .projects-header { padding: 24px 16px 40px !important; }
          .projects-grid-wrap { padding: 0 16px 64px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-filter-wrap { grid-template-columns: 1fr 1fr; }
          .projects-filter-wrap .filter-btn:first-child { grid-column: 1 / -1; }
          .project-card-content { padding: 18px 16px 18px !important; }
        }
      `}</style>

      <main style={{ background: "#0D1117", minHeight: "100vh", paddingTop: 0, overflowX: "clip" }}>

        {/* Hero header */}
        <section className="projects-header" style={{ padding: "36px 40px 60px", textAlign: "center" }}>
          <div ref={headerRef} style={{ maxWidth: 680, margin: "0 auto", opacity: headerInView ? 1 : 0, transform: headerInView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>

            {/* Portfolio pill */}
            <div style={{ display: "inline-block", marginBottom: 20 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, padding: "5px 16px", borderRadius: 20, border: "0.5px solid rgba(24,95,165,0.4)", color: "#85B7EB", background: "rgba(24,95,165,0.08)" }}>
                Projects
              </span>
            </div>

            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(40px,5.2vw,64px)", color: "#E6EDF3", marginBottom: 38, letterSpacing: "-0.02em", lineHeight: 1.02 }}>
              Featured
              <br />
              <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Projects
              </span>
            </h1>

            {/* Filter tabs */}
            <div className="projects-filter-wrap" style={{ display: "inline-flex", gap: 8, padding: "6px", borderRadius: 100, background: "#161B22", border: "0.5px solid #21262D" }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-btn${activeFilter === f ? " active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects grid */}
        <section className="projects-grid-wrap" style={{ padding: "0 40px 80px", maxWidth: 1180, margin: "0 auto" }}>
          <ProjectsGrid filter={activeFilter} />
        </section>

        {/* Bottom CTA — small, tasteful, not a full banner */}
        <section style={{ padding: "0 40px 96px", maxWidth: 1180, margin: "0 auto" }}>
        </section>

      </main>
    </>
  );
}
