import { useEffect, useRef, useState } from "react";
import { ThemeContext, getInitialTheme } from "./themeContext.js";

export function ThemeProvider({ children }) {
  const WIPE_DURATION_MS = 420;
  const [theme, setTheme] = useState(getInitialTheme);
  const [visualTheme, setVisualTheme] = useState(getInitialTheme);
  const [isWiping, setIsWiping] = useState(false);
  const [wipeTo, setWipeTo] = useState(null);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => clearTimers, []);

  const toggleTheme = () => {
    if (isWiping) return;

    const nextTheme = theme === "dark" ? "light" : "dark";
    clearTimers();
    setVisualTheme(nextTheme);
    setWipeTo(nextTheme);
    setTheme(nextTheme);
    setIsWiping(true);

    // Keep only the visual wipe duration; theme itself is already committed immediately.
    timersRef.current.push(window.setTimeout(() => {
      setIsWiping(false);
      setWipeTo(null);
      clearTimers();
    }, WIPE_DURATION_MS));
  };

  const wipeColor = wipeTo === "light"
    ? "rgba(243, 247, 252, 0.42)"
    : "rgba(13, 17, 23, 0.38)";

  const value = {
    theme,
    isDark: visualTheme === "dark",
    isWiping,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <div
        className={`theme-wipe-overlay${isWiping ? " active" : ""}`}
        style={{ "--theme-wipe-color": wipeColor }}
        aria-hidden="true"
      />
    </ThemeContext.Provider>
  );
}

