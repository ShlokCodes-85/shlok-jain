import { scrollToSection, SECTION_IDS } from "../scrollToSection.js";

const currentYear = new Date().getFullYear();

const QUICK_LINKS = [
  { label: "Home", sectionId: SECTION_IDS.home },
  { label: "About", sectionId: SECTION_IDS.about },
  { label: "Experience", sectionId: SECTION_IDS.experience },
  { label: "Skills", sectionId: SECTION_IDS.skills },
  { label: "Projects", sectionId: SECTION_IDS.projects },
  { label: "Contact", sectionId: SECTION_IDS.contact },
  { label: "Resume", href: "/Resume.pdf", external: true },
];

const SOCIAL_PATHS = {
  github: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  instagram: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm8.58 1.72a1.34 1.34 0 1 0 0 2.68 1.34 1.34 0 0 0 0-2.68zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4z",
  email: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2 9 6 9-6",
};

export default function Footer() {
  const onLinkClick = (sectionId, href, external = false) => {
    if (external && href) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (!sectionId) return;
    scrollToSection(sectionId);
  };

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 28%), radial-gradient(circle at 20% 25%, rgba(133,183,235,0.08), transparent 18%), radial-gradient(circle at 80% 30%, rgba(93,202,165,0.07), transparent 16%), #090b14",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .footer-section-title {
          margin: 16px 0 8px;
          font-size: 11.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(235, 230, 224, 0.6);
        }
        .footer-identity {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 22px;
        }
        .footer-name {
          margin: 0;
          font-family: 'Great Vibes', cursive;
          font-size: clamp(24px, 2.6vw, 32px);
          font-weight: 400;
          letter-spacing: 0;
          color: #efe7df;
          line-height: 1;
        }
        .footer-copyright {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.45;
          color: #A9A9B7;
        }
        .footer-quick-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          max-width: 460px;
        }
        .footer-connect-grid {
          display: grid;
          grid-template-columns: repeat(4, 44px);
          gap: 10px;
          align-items: center;
        }
        .footer-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 28px;
          align-items: start;
        }
        .footer-connect-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .footer-social-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #CFC9C4;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .footer-social-btn:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.12);
          color: #E8E1DB;
        }
        .footer-social-icon-shell {
          position: relative;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .footer-icon-neutral,
        .footer-icon-brand {
          position: absolute;
          inset: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }
        .footer-icon-neutral { opacity: 1; }
        .footer-icon-brand { opacity: 0; }
        .footer-social-btn.has-brand:hover .footer-icon-neutral { opacity: 0; }
        .footer-social-btn.has-brand:hover .footer-icon-brand { opacity: 1; }
        .footer-social-btn.social-github:hover { border-color: rgba(0,0,0,0.6); color: #000; background: rgba(0,0,0,0.12); }
        html[data-theme="dark"] .page-content .footer-social-btn.social-github:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.1);
        }
        html[data-theme="light"] .page-content .footer-social-btn.social-github:hover {
          border-color: rgba(0,0,0,0.6);
          color: #000;
          background: rgba(0,0,0,0.12);
          filter: invert(1) hue-rotate(180deg);
        }
        .footer-social-btn.social-linkedin:hover { border-color: rgba(10,102,194,0.5); color: #0A66C2; background: rgba(10,102,194,0.08); }
        .footer-social-btn.social-instagram:hover { border-color: rgba(225,48,108,0.5); color: #E1306C; background: rgba(225,48,108,0.1); }
        .footer-social-btn.social-email:hover { border-color: rgba(234,67,53,0.55); color: #EA4335; background: rgba(234,67,53,0.1); }
        .footer-connect-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .footer-inner { padding: 34px 24px 22px !important; }
          .footer-top {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .footer-meta { order: 1; }
          .footer-connect-col { order: 2; }
          .footer-connect-col {
            align-items: flex-start;
          }
          .footer-quick-pill {
            font-size: 12.5px !important;
          }
          .footer-quick-grid {
            max-width: 100%;
          }
          .footer-connect-grid {
            width: auto;
            grid-template-columns: repeat(4, 44px);
            gap: 10px;
            justify-content: flex-start;
          }
          .footer-identity { margin-top: 18px; }
        }
        @media (max-width: 540px) {
          .footer-inner { padding: 28px 16px 18px !important; }
          .footer-meta {
            width: 100%;
            justify-content: flex-start;
          }
          .footer-identity { gap: 8px; }
          .footer-quick-grid { gap: 8px; }
          .footer-connect-grid {
            grid-template-columns: repeat(4, 44px);
            gap: 10px;
          }
          .footer-quote-wrap { margin-top: 44px !important; }
        }
        .footer-quick-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          text-decoration: none;
          color: #d3ccc7;
          font-size: 12.5px;
          letter-spacing: 0.02em;
          border: 0.5px solid rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.05);
          border-radius: 999px;
          padding: 7px 13px;
          line-height: 1.2;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .footer-quick-pill:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }
        .footer-connect-link {
          text-decoration: none;
          color: #c8c1bc;
          font-size: 13px;
          line-height: 1.45;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .footer-connect-link:hover {
          color: #f0e8e1;
          transform: translateX(2px);
        }
        .footer-social-ig-gradient stop:nth-child(1) {}
      `}</style>

      <div className="footer-inner" style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "42px 40px 26px" }}>
        <div className="footer-top">
          <div className="footer-meta" style={{ display: "flex", alignItems: "center", gap: 14, color: "#A9A9B7", flexWrap: "wrap" }}>
            <div>
              <p className="footer-section-title">Quick Links</p>
              <div className="footer-quick-grid">
                {QUICK_LINKS.map(({ label, sectionId, href, external }) => (
                  <a
                    key={label}
                    href={external ? href : `#${sectionId}`}
                    onClick={(e) => {
                      if (!external) e.preventDefault();
                      onLinkClick(sectionId, href, external);
                    }}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="footer-quick-pill"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-connect-col">
            <p className="footer-section-title" style={{ marginTop: 0 }}>Connect</p>
            <div className="footer-connect-grid">
              {[
                ["email", SOCIAL_PATHS.email, "mailto:bjainshlok0902@gmail.com"],
                ["instagram", SOCIAL_PATHS.instagram, "https://www.instagram.com/shlok_jain_72/"],
                ["github", SOCIAL_PATHS.github, "https://github.com/ShlokCodes-85"],
                ["linkedin", SOCIAL_PATHS.linkedin, "https://www.linkedin.com/in/shlok-jain-674144295/"],
              ].map(([name, path, href]) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target={name === "email" ? undefined : "_blank"}
                  rel={name === "email" ? undefined : "noopener noreferrer"}
                  className={`footer-social-btn${name === "linkedin" || name === "instagram" || name === "email" ? " has-brand" : ""} social-${name}`}
                >
                  <span className="footer-social-icon-shell">
                    {name === "instagram" ? (
                      <>
                        <span className="footer-icon-neutral">
                          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                            <path d={path} fill="currentColor" />
                          </svg>
                        </span>
                        <span className="footer-icon-brand" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <defs>
                              <linearGradient id="footer-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F58529" />
                                <stop offset="35%" stopColor="#DD2A7B" />
                                <stop offset="68%" stopColor="#8134AF" />
                                <stop offset="100%" stopColor="#515BD4" />
                              </linearGradient>
                            </defs>
                            <path d={path} fill="url(#footer-ig-gradient)" />
                          </svg>
                        </span>
                      </>
                    ) : name === "email" ? (
                      <>
                        <span className="footer-icon-neutral">
                          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                            <path d={path} fill="currentColor" />
                          </svg>
                        </span>
                        <span className="footer-icon-brand" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <defs>
                              <linearGradient id="footer-mail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4285F4" />
                                <stop offset="30%" stopColor="#EA4335" />
                                <stop offset="65%" stopColor="#FBBC05" />
                                <stop offset="100%" stopColor="#34A853" />
                              </linearGradient>
                            </defs>
                            <path d={path} fill="url(#footer-mail-gradient)" />
                          </svg>
                        </span>
                      </>
                    ) : name === "linkedin" ? (
                      <>
                        <span className="footer-icon-neutral">
                          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                            <path d={path} fill="currentColor" />
                          </svg>
                        </span>
                        <span className="footer-icon-brand" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d={path} fill="#0A66C2" />
                          </svg>
                        </span>
                      </>
                    ) : (
                      <span className="footer-icon-neutral">
                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                          <path d={path} fill="currentColor" />
                        </svg>
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-identity">
          <p className="footer-name">Shlok Jain</p>
          <p className="footer-copyright">© {currentYear} All rights reserved.</p>
        </div>

        <div className="footer-quote-wrap" style={{ marginTop: 62, display: "flex", justifyContent: "center" }}>
          <p
            style={{
              margin: 0,
              maxWidth: 1050,
              textAlign: "center",
              fontSize: "clamp(1rem, 1.05vw, 1.2rem)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(218, 212, 206, 0.42)",
              fontStyle: "italic",
            }}
          >
            "Be enough for yourself"
          </p>
        </div>
      </div>
    </footer>
  );
}
