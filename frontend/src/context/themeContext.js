import { createContext } from "react";

export const ThemeContext = createContext(null);

export function getInitialTheme() {
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return "light";
}