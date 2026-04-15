import { useEffect, useRef, useState } from "react";
import { SECTION_IDS } from "../scrollToSection.js";

const STACK_CATEGORIES = [
  {
    title: "Languages",
    note: "Python, HTML, CSS, and JavaScript",
    items: ["Python", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Frontend",
    note: "React.js and Tailwind CSS",
    items: ["React.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    note: "Node.js and Express.js",
    items: ["Node.js", "Express.js"],
  },
  {
    title: "Databases",
    note: "SQL and MongoDB",
    items: ["SQL", "MongoDB"],
  },
  {
    title: "AI/ML",
    note: "Numpy, Pandas, Matplotlib, Scikit-learn, TensorFlow",
    items: ["Numpy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow"],
  },
  {
    title: "Tools & DevOps",
    note: "Git/GitHub, Vercel, Render, GCP, AWS",
    subnote: "GCP and AWS are still in progress.",
    items: ["Git", "GitHub", "Vercel", "Render", "GCP", "AWS"],
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id={SECTION_IDS.skills} className="skills-section" style={{ background: "#080D13", padding: "96px 40px", scrollMarginTop: 64 }}>
      <style>{`
        .skills-section {
          overflow-x: clip;
        }
        .skills-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }
        .skills-card {
          padding: 28px !important;
          min-height: 220px;
        }
        @media (max-width: 1100px) {
          .skills-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .skills-card {
            min-height: 0;
          }
        }
        @media (max-width: 980px) {
          .skills-heading { margin-bottom: 40px !important; }
          .skills-grid { gap: 16px !important; }
        }
        @media (max-width: 900px) {
          .skills-section { padding: 72px 24px !important; }
        }
        @media (max-width: 540px) {
          .skills-section { padding: 56px 16px !important; }
          .skills-heading { text-align: center !important; }
          .skills-heading h2 { font-size: clamp(30px, 8.8vw, 40px) !important; }
          .skills-section .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="skills-heading"
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: 56,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ display: "inline-flex", marginBottom: 16 }}>
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
              Skills
            </span>
          </div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,38px)", color: "#E6EDF3", marginBottom: 12 }}>
            Tech{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#85B7EB,#5DCAA5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stack
            </span>
          </h2>
        </div>

        <div
          className="skills-grid"
          style={{
            display: "grid",
            gap: 20,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s 0.1s ease, transform 0.6s 0.1s ease",
          }}
        >
          {STACK_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="skills-card"
              style={{
                padding: "24px",
                borderRadius: 14,
                background: "#161B22",
                border: "0.5px solid #21262D",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(93,202,165,0.45)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#21262D";
                e.currentTarget.style.transform = "";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#E6EDF3" }}>{cat.title}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {cat.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(133,183,235,0.25)",
                      background: "rgba(24,95,165,0.08)",
                      color: "#DCE6F2",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
