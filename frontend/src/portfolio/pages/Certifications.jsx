import { useEffect, useRef, useState } from "react";

// Add certifications here: { title, issuer, date, image, skills, link }
const CERTIFICATIONS = [];

function useInView(threshold = 0.12) {
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

function CertificationCard({ certification, index, inView }) {
  return (
    <article
      className="certification-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transitionDelay: `${index * 70}ms`,
      }}
    >
      <div className="certification-card-image">
        {certification.image ? (
          <img src={certification.image} alt={certification.title} />
        ) : (
          <div className="certification-card-placeholder" aria-hidden="true">C</div>
        )}
        {certification.date && <span className="certification-card-date">{certification.date}</span>}
      </div>
      <div className="certification-card-content">
        <h3>{certification.title}</h3>
        <p>{certification.issuer}</p>
        {certification.skills?.length > 0 && (
          <div className="certification-card-skills">
            {certification.skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        )}
        {certification.link && (
          <a href={certification.link} target="_blank" rel="noopener noreferrer">View credential</a>
        )}
      </div>
    </article>
  );
}

export default function Certifications() {
  const [ref, inView] = useInView();

  return (
    <section className="certification-section" ref={ref}>
      <style>{`
        .certification-section {
          background: #0D1117;
          padding: 64px 32px 72px;
          overflow-x: clip;
        }
        .certification-header {
          text-align: center;
          margin: 0 auto 30px;
        }
        .certification-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .certification-card {
          border: 0.5px solid #21262D;
          border-radius: 14px;
          background: #161B22;
          overflow: hidden;
          transition: transform 0.25s ease, translate 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .certification-card:hover {
          translate: 0 -3px;
          border-color: rgba(133,183,235,0.42);
          box-shadow: 0 14px 28px rgba(0,0,0,0.22);
        }
        .certification-card-image {
          position: relative;
          height: 126px;
          overflow: hidden;
          background: linear-gradient(135deg, #182A40, #18302C);
        }
        .certification-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .certification-card:hover .certification-card-image img { transform: scale(1.04); }
        .certification-card-placeholder {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          font-family: "Syne", sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: rgba(230,237,243,0.3);
        }
        .certification-card-date {
          position: absolute;
          top: 9px;
          right: 9px;
          padding: 4px 8px;
          border: 0.5px solid rgba(93,202,165,0.35);
          border-radius: 999px;
          background: rgba(13,17,23,0.82);
          color: #5DCAA5;
          font-size: 10.5px;
          font-weight: 600;
        }
        .certification-card-content { padding: 15px; }
        .certification-card-content h3 {
          margin: 0 0 7px;
          color: #E6EDF3;
          font-family: "Syne", sans-serif;
          font-size: 15px;
          line-height: 1.3;
        }
        .certification-card-content p {
          margin: 0;
          color: #85B7EB;
          font-size: 12px;
          line-height: 1.5;
        }
        .certification-card-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 12px;
        }
        .certification-card-skills span {
          padding: 3px 7px;
          border: 0.5px solid #29313B;
          border-radius: 5px;
          color: #8FA2B8;
          font-size: 10px;
        }
        .certification-card-content a {
          display: inline-flex;
          margin-top: 13px;
          color: #5DCAA5;
          font-size: 11.5px;
          font-weight: 600;
          text-decoration: none;
        }
        @media (max-width: 980px) {
          .certification-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .certification-section { padding: 52px 16px 60px; }
          .certification-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header
          className="certification-header"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span style={{ display: "inline-flex", marginBottom: 12, fontSize: 11.5, fontWeight: 600, padding: "5px 16px", borderRadius: 20, border: "0.5px solid rgba(24,95,165,0.4)", color: "#85B7EB", background: "rgba(24,95,165,0.08)" }}>
            Certifications
          </span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,40px)", color: "#E6EDF3", margin: 0, lineHeight: 1.08 }}>
            Professional <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Certifications</span>
          </h2>
        </header>

        <div className="certification-grid">
          {CERTIFICATIONS.map((certification, index) => (
            <CertificationCard key={certification.title} certification={certification} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
