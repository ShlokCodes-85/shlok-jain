import { useEffect, useRef, useState } from "react";

const EXPERIENCE_ITEMS = [
  {
    role: "AI/ML Intern",
    org: "Fundora",
    period: "Jul 2025 - Dec 2025",
    mode: "Internship",
    desc: "Remote internship based in Mumbai, Maharashtra, India where I focused on building production-grade data and recommendation workflows in a startup environment.",
    highlights: [
      "Scraped and collected 5,000+ structured records using Python and Apify to support ML pipelines.",
      "Used Pandas and NumPy for data cleaning, feature preparation, and preprocessing workflows.",
      "Designed and trained a foundational recommendation engine using Scikit-learn.",
      "Took ownership of high-impact data tasks while collaborating in a fast-paced startup team.",
    ],
    documents: [
      {
        label: "View Internship Certificate",
        href: "/Fundora%20Internship%20Documents.pdf",
      },
    ],
  },
  {
    role: "Machine Learning Intern",
    org: "Acmegrade",
    period: "May 2024 - Jul 2024",
    mode: "Internship",
    desc: "Remote internship based in Mumbai, Maharashtra, India focused on supervised learning pipelines and recommendation systems.",
    highlights: [
      "Built a cancer diagnostic classification pipeline with 90%+ accuracy using Logistic Regression, SVM, and Random Forest.",
      "Developed a content-based movie recommendation engine using TF-IDF vectorization and cosine similarity.",
      "Executed end-to-end ML workflows including EDA, feature engineering, scaling, and dimensionality reduction.",
      "Validated models using ROC-AUC, Precision, Recall, and F1-score metrics.",
    ],
    documents: [
      {
        label: "View Internship Certificate",
        href: "/Acmegrade%20Internship%20Completion.pdf",
      },
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function Experience() {
  const [ref, inView] = useInView(0.12);

  return (
    <section className="experience-section" style={{ background: "#0A0F16", padding: "88px 40px", scrollMarginTop: 64 }}>
      <style>{`
        .experience-section {
          overflow-x: clip;
        }
        .experience-stack {
          display: grid;
          gap: 18px;
        }
        .experience-card {
          position: relative;
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(22,27,34,0.95), rgba(18,23,32,0.96));
          border: 0.5px solid #21262D;
          padding: 20px 22px;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }
        .experience-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 100% 0%, rgba(133,183,235,0.12), transparent 40%);
          pointer-events: none;
        }
        .experience-top {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
        }
        .experience-meta {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }
        .experience-chip {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 999px;
          border: 0.5px solid rgba(29,158,117,0.35);
          color: #5DCAA5;
          background: rgba(29,158,117,0.1);
        }
        .experience-period {
          font-size: 12.5px;
          color: #87A1BC;
          font-weight: 500;
        }
        .experience-body {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(220px, 0.8fr);
          gap: 16px;
          align-items: start;
        }
        .experience-work-list {
          margin: 10px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }
        .experience-work-list li {
          font-size: 13px;
          color: #8FA2B8;
          line-height: 1.7;
          padding-left: 15px;
          position: relative;
        }
        .experience-work-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.66em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #85B7EB, #5DCAA5);
          box-shadow: 0 0 8px rgba(93,202,165,0.4);
        }
        .experience-docs {
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          background: rgba(13,17,23,0.65);
          padding: 12px;
          display: grid;
          gap: 10px;
          width: 100%;
          max-width: 320px;
          justify-self: end;
        }
        .experience-docs-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6C829C;
          font-weight: 700;
        }
        .experience-doc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border-radius: 9px;
          padding: 10px 12px;
          border: 0.5px solid #2A3340;
          background: #151B24;
          color: #D5DEE8;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 600;
          transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .experience-doc-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(133,183,235,0.5);
          color: #85B7EB;
        }
        @media (max-width: 900px) {
          .experience-section { padding: 72px 24px !important; }
        }
        @media (max-width: 980px) {
          .experience-body { grid-template-columns: 1fr !important; }
          .experience-meta { align-items: flex-start !important; }
          .experience-docs {
            justify-self: stretch;
            max-width: none;
          }
        }
        @media (max-width: 700px) {
          .experience-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
        @media (max-width: 640px) {
          .experience-section { padding: 60px 16px !important; }
          .experience-card { padding: 16px !important; }
          .experience-card h3 { font-size: 16px !important; }
          .experience-header {
            max-width: 100% !important;
            margin-bottom: 28px !important;
            text-align: center;
          }
          .experience-header h2 { font-size: clamp(30px, 9vw, 38px) !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="experience-header"
          ref={ref}
          style={{
            maxWidth: 760,
            marginBottom: 40,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
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
              Experience
            </span>
          </div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.2vw,34px)", color: "#E6EDF3", marginBottom: 12, lineHeight: 1.08 }}>
            <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Professional
            </span>{" "}
            Experience
          </h2>
        </div>

        <div
          className="experience-stack"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s 0.08s ease, transform 0.6s 0.08s ease",
          }}
        >
          {EXPERIENCE_ITEMS.map((item, index) => (
            <article
              key={item.role}
              className="experience-card"
              style={{
                transitionDelay: `${index * 40}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(93,202,165,0.35)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 16px 34px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#21262D";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div className="experience-top">
                <div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#E6EDF3", margin: "0 0 4px" }}>{item.role}</h3>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#85B7EB" }}>{item.org}</div>
                </div>
                <div className="experience-meta">
                  <span className="experience-chip">{item.mode}</span>
                  <span className="experience-period">{item.period}</span>
                </div>
              </div>

              <div className="experience-body">
                <div>
                  <p style={{ fontSize: 13.5, color: "#7D8FA3", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <ul className="experience-work-list">
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                {item.documents?.length > 0 && (
                  <div className="experience-docs">
                    <div className="experience-docs-title">Internship Documents</div>
                    {item.documents.map((doc) => (
                      <a key={doc.href} className="experience-doc-btn" href={doc.href} target="_blank" rel="noopener noreferrer">
                        {doc.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
