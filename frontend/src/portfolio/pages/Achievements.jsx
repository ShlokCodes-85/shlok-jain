import { useEffect, useRef, useState } from "react";

// Add achievements here: { title, description, date, image, tags, link }
const ACHIEVEMENTS = [];

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

function AchievementCard({ achievement, index, inView }) {
  return (
    <article
      className="achievement-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transitionDelay: `${index * 70}ms`,
      }}
    >
      <div className="achievement-card-image">
        {achievement.image ? (
          <img src={achievement.image} alt={achievement.title} />
        ) : (
          <div className="achievement-card-placeholder" aria-hidden="true">A</div>
        )}
        {achievement.date && <span className="achievement-card-date">{achievement.date}</span>}
      </div>
      <div className="achievement-card-content">
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>
        {achievement.tags?.length > 0 && (
          <div className="achievement-card-tags">
            {achievement.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        )}
        {achievement.link && (
          <a href={achievement.link} target="_blank" rel="noopener noreferrer">View achievement</a>
        )}
      </div>
    </article>
  );
}

export default function Achievements() {
  const [ref, inView] = useInView();

  return (
    <section className="achievement-section" ref={ref}>
      <style>{`
        .achievement-section {
          background: #0A0F16;
          padding: 64px 32px 72px;
          overflow-x: clip;
        }
        .achievement-header {
          text-align: center;
          margin: 0 auto 30px;
        }
        .achievement-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .achievement-card {
          border: 0.5px solid #21262D;
          border-radius: 14px;
          background: #161B22;
          overflow: hidden;
          transition: transform 0.25s ease, translate 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .achievement-card:hover {
          translate: 0 -3px;
          border-color: rgba(93,202,165,0.4);
          box-shadow: 0 14px 28px rgba(0,0,0,0.22);
        }
        .achievement-card-image {
          position: relative;
          height: 126px;
          overflow: hidden;
          background: linear-gradient(135deg, #17263A, #16312B);
        }
        .achievement-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .achievement-card:hover .achievement-card-image img { transform: scale(1.04); }
        .achievement-card-placeholder {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          font-family: "Syne", sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: rgba(230,237,243,0.3);
        }
        .achievement-card-date {
          position: absolute;
          top: 9px;
          right: 9px;
          padding: 4px 8px;
          border: 0.5px solid rgba(133,183,235,0.35);
          border-radius: 999px;
          background: rgba(13,17,23,0.82);
          color: #85B7EB;
          font-size: 10.5px;
          font-weight: 600;
        }
        .achievement-card-content { padding: 15px; }
        .achievement-card-content h3 {
          margin: 0 0 7px;
          color: #E6EDF3;
          font-family: "Syne", sans-serif;
          font-size: 15px;
          line-height: 1.3;
        }
        .achievement-card-content p {
          margin: 0;
          color: #7D8FA3;
          font-size: 12.5px;
          line-height: 1.6;
        }
        .achievement-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 12px;
        }
        .achievement-card-tags span {
          padding: 3px 7px;
          border: 0.5px solid #29313B;
          border-radius: 5px;
          color: #8FA2B8;
          font-size: 10px;
        }
        .achievement-card-content a {
          display: inline-flex;
          margin-top: 13px;
          color: #5DCAA5;
          font-size: 11.5px;
          font-weight: 600;
          text-decoration: none;
        }
        @media (max-width: 980px) {
          .achievement-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .achievement-section { padding: 52px 16px 60px; }
          .achievement-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header
          className="achievement-header"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span style={{ display: "inline-flex", marginBottom: 12, fontSize: 11.5, fontWeight: 600, padding: "5px 16px", borderRadius: 20, border: "0.5px solid rgba(24,95,165,0.4)", color: "#85B7EB", background: "rgba(24,95,165,0.08)" }}>
            Achievements
          </span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,40px)", color: "#E6EDF3", margin: 0, lineHeight: 1.08 }}>
            Notable <span style={{ background: "linear-gradient(90deg,#85B7EB,#5DCAA5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Achievements</span>
          </h2>
        </header>

        <div className="achievement-grid">
          {ACHIEVEMENTS.map((achievement, index) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
