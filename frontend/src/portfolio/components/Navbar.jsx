import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection, SECTION_IDS } from "../scrollToSection.js";
import { useTheme } from "../../context/useTheme.js";

const NAV_LINKS = [
  { label: "Home", sectionId: SECTION_IDS.home },
  { label: "About", sectionId: SECTION_IDS.about },
  { label: "Experience", sectionId: SECTION_IDS.experience },
  { label: "Skills", sectionId: SECTION_IDS.skills },
  { label: "Projects", sectionId: SECTION_IDS.projects },
  { label: "Certifications", sectionId: SECTION_IDS.certifications },
  { label: "Achievements", sectionId: SECTION_IDS.achievements },
  { label: "Contact", sectionId: SECTION_IDS.contact },
  { label: "Resume", path: "/resume" },
];

export default function Navbar() {
  const { isDark, isWiping, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTION_IDS.home);
  const isResumeRoute = location.pathname === "/resume";
  const isPortfolioRoute = location.pathname === "/";

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
    };

    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .filter(({ sectionId }) => Boolean(sectionId))
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter(Boolean)
      .sort((a, b) => a.offsetTop - b.offsetTop);
    if (!sections.length) return;

    const NAVBAR_OFFSET = 64;
    let ticking = false;

    const updateActiveFromScroll = () => {
      // Use an absolute page marker just under the fixed navbar.
      const markerY = window.scrollY + NAVBAR_OFFSET + 1;
      let nextActive = sections[0].id;

      for (const section of sections) {
        if (markerY >= section.offsetTop) {
          nextActive = section.id;
          continue;
        }

        break;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        nextActive = sections[sections.length - 1].id;
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveFromScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Sync active link on first render and after hash-based deep links.
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onNavClick = (sectionId, path) => {
    if (path) {
      navigate(path);
      setMenuOpen(false);
      return;
    }

    if (!sectionId) {
      setMenuOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setMenuOpen(false);
      return;
    }

    scrollToSection(sectionId);
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .nav-link-item { position: relative; }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #185FA5, #1D9E75);
          transform: scaleX(0);
          transition: transform 0.2s ease;
          transform-origin: left;
        }
        .nav-link-item:hover::after { transform: scaleX(1); }
        .nav-link-item.active::after { transform: scaleX(1); }
        .nbtn-primary {
          background: linear-gradient(135deg,#185FA5,#1D9E75);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nbtn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(24,95,165,0.4);
        }
        .nbtn-ghost {
          position: relative;
          transition: border-color 0.2s, color 0.2s;
        }
        .nbtn-ghost::after {
          content: '';
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: -3px;
          height: 1.5px;
          background: linear-gradient(90deg, #185FA5, #1D9E75);
          transform: scaleX(0);
          transition: transform 0.2s ease;
          transform-origin: left;
        }
        .nbtn-ghost:hover::after,
        .nbtn-ghost.active::after {
          transform: scaleX(1);
        }
        .nbtn-ghost:hover { border-color: rgba(29,158,117,0.5) !important; color: #5DCAA5 !important; }
        .site-nav {
          padding: 0 40px;
          box-sizing: border-box;
          width: 100%;
        }
        .nav-actions-mobile {
          display: none;
          align-items: center;
          gap: 8px;
        }
        .nav-mobile-controls {
          display: none;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }
        @media (max-width: 1024px) {
          .site-nav { padding: 0 24px !important; }
        }
        @media (max-width: 768px) {
          .site-nav {
            padding-left: max(16px, env(safe-area-inset-left)) !important;
            padding-right: max(16px, env(safe-area-inset-right)) !important;
          }
          .nav-links-desktop { display: none !important; }
          .nav-actions-desktop { display: none !important; }
          .nav-mobile-controls { display: inline-flex !important; }
          .nav-actions-mobile { display: inline-flex !important; }
          .nav-hamburger { display: flex !important; }
          .mobile-menu { padding: 16px 16px 20px !important; }
          .mobile-link { text-align: center; }
        }
        @media (max-width: 420px) {
          .mobile-link { font-size: 14px; padding: 9px 10px; }
          .mobile-menu { padding: 14px 12px 18px !important; }
        }
        .mobile-menu {
          position: fixed; top: 64px; left: 0; right: 0;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          background: rgba(13,17,23,0.98);
          backdrop-filter: blur(20px);
          border-bottom: 0.5px solid #21262D;
          z-index: 49;
          padding: 20px 24px 28px;
          display: flex; flex-direction: column; gap: 6px;
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-link {
          padding: 10px 12px; border-radius: 8px;
          font-size: 15px; font-weight: 500;
          color: #7D8FA3; text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(24,95,165,0.1);
          color: #E6EDF3;
        }
        html[data-theme="light"] .mobile-menu {
          background: rgba(243,247,252,0.98);
          border-bottom: 0.5px solid rgba(24,95,165,0.2);
        }
        html[data-theme="light"] .mobile-link {
          color: #5F738D;
        }
        html[data-theme="light"] .mobile-link:hover,
        html[data-theme="light"] .mobile-link.active {
          background: rgba(24,95,165,0.12);
          color: #1F2B3D;
        }
        .theme-toggle-btn {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 0.5px solid rgba(133,183,235,0.2);
          background: transparent;
          color: #E6EDF3;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .theme-toggle-btn:hover {
          border-color: rgba(93,202,165,0.6);
          background: transparent;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(24,95,165,0.22);
        }
        .theme-toggle-btn:disabled {
          cursor: default;
          opacity: 0.92;
        }
        .theme-icon-shell {
          position: relative;
          width: 16px;
          height: 16px;
          overflow: hidden;
          display: block;
        }
        .theme-icon {
          position: absolute;
          left: 0;
          top: 0;
          transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.34s ease;
          will-change: transform, opacity;
        }
        .theme-toggle-btn[data-mode="dark"] .theme-icon-sun {
          transform: translateX(0);
          opacity: 1;
        }
        .theme-toggle-btn[data-mode="dark"] .theme-icon-moon {
          transform: translateX(18px);
          opacity: 0;
        }
        .theme-toggle-btn[data-mode="light"] .theme-icon-sun {
          transform: translateX(-18px);
          opacity: 0;
        }
        .theme-toggle-btn[data-mode="light"] .theme-icon-moon {
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>

      <nav
        className="site-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", height: 64,
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "100%",
          background: "transparent",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? (isDark ? "0.5px solid rgba(255,255,255,0.06)" : "0.5px solid rgba(24,95,165,0.18)")
            : (isDark ? "0.5px solid rgba(255,255,255,0.02)" : "0.5px solid rgba(24,95,165,0.09)"),
          transition: "border-color 0.3s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Logo */}
        <a
          href={`#${SECTION_IDS.home}`}
          onClick={(e) => {
            e.preventDefault();
            onNavClick(SECTION_IDS.home);
          }}
          style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#185FA5,#1D9E75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0 }}>SJ</div>
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links-desktop" style={{ display: "flex", gap: 20, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          {NAV_LINKS.map(({ label, sectionId, path }) => {
            const isActive = path ? isResumeRoute : (isPortfolioRoute && activeSection === sectionId);
            return (
              <li key={label}>
                <a
                  href={path || (sectionId ? `#${sectionId}` : "#")}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(sectionId, path);
                  }}
                  className={`nav-link-item${isActive ? " active" : ""}`}
                  style={{
                    fontSize: 13.5, fontWeight: 500, textDecoration: "none",
                    color: isActive
                      ? (isDark ? "#E6EDF3" : "#1F2B3D")
                      : (isDark ? "#7D8FA3" : "#5F738D"),
                    transition: "color 0.2s",
                    paddingBottom: 3,
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.target.style.color = isDark ? "#E6EDF3" : "#1F2B3D"; }}
                  onMouseLeave={(e) => { if (!isActive) e.target.style.color = isDark ? "#7D8FA3" : "#5F738D"; }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop action buttons */}
        <div className="nav-actions-desktop" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            disabled={isWiping}
            data-mode={isDark ? "dark" : "light"}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "transparent",
              color: isDark ? "#E6EDF3" : "#1F2B3D",
              borderColor: isDark ? "rgba(133,183,235,0.2)" : "rgba(24,95,165,0.28)",
            }}
          >
            <span className="theme-icon-shell" aria-hidden="true">
              <svg className="theme-icon theme-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <svg className="theme-icon theme-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3c0 0 0 0 0 0A7 7 0 0021 12.79z" />
              </svg>
            </span>
          </button>
        </div>

        <div className="nav-mobile-controls">
          <div className="nav-actions-mobile">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              disabled={isWiping}
              data-mode={isDark ? "dark" : "light"}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                background: "transparent",
                color: isDark ? "#E6EDF3" : "#1F2B3D",
                borderColor: isDark ? "rgba(133,183,235,0.2)" : "rgba(24,95,165,0.28)",
              }}
            >
              <span className="theme-icon-shell" aria-hidden="true">
                <svg className="theme-icon theme-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
                <svg className="theme-icon theme-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3c0 0 0 0 0 0A7 7 0 0021 12.79z" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5, background: isDark ? "#E6EDF3" : "#111827", borderRadius: 2, transition: "all 0.2s",
                transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)" : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)" : "scaleX(0)") : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} style={{ display: menuOpen ? "flex" : "none" }}>
        {NAV_LINKS.map(({ label, sectionId, path }) => (
          <a
            key={label}
            href={path || (sectionId ? `#${sectionId}` : "#")}
            onClick={(e) => {
              e.preventDefault();
              onNavClick(sectionId, path);
            }}
            className={`mobile-link${(path ? isResumeRoute : (isPortfolioRoute && activeSection === sectionId)) ? " active" : ""}`}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
