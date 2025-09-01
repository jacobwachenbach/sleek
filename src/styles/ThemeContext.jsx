import React, { createContext, useState, useEffect } from "react";
import baseTheme from "./theme";

/**
 * Shape of the extended theme colors:
 * background  → app/page background
 * surface     → panels/cards/containers background
 * sidebar     → left/right rail backgrounds
 * card        → small cards (can be same as surface)
 * border      → borders/dividers
 * inputBg     → inputs/textareas bg
 * inputBorder → inputs borders
 * text        → primary text
 * textMuted   → secondary/placeholder text
 * title       → big headings (H1)
 * header      → section headers / H2-H3
 * link        → link color (often same as primary)
 * primary     → primary brand/action
 * secondary   → secondary accents
 * accent      → fun accent
 * success/warning/danger → status colors
 */
const colorPalettes = {
  // 0 — Discord-ish Dark
  0: {
    background: "#1f2125",
    surface:    "#2b2f36",
    sidebar:    "#262a31",
    card:       "#2b2f36",
    border:     "#3a3f47",

    inputBg:     "#23262b",
    inputBorder: "#3a3f47",

    text:       "#e6e8ee",
    textMuted:  "#a6acb8",
    title:      "#7289da",
    header:     "#cfd6e6",
    link:       "#8ab4ff",

    primary:    "#7289da",
    secondary:  "#5865f2",
    accent:     "#00d4ff",

    success:    "#27ae60",
    warning:    "#f39c12",
    danger:     "#e74c3c",
  },

  // 1 — VS Code Dark (your current default vibe)
  1: {
    background: "#1e1e1e",
    surface:    "#252526",
    sidebar:    "#2d2d30",
    card:       "#2a2a2e",
    border:     "#3c3c3c",

    inputBg:     "#2b2b2b",
    inputBorder: "#3c3c3c",

    text:       "#d4d4d4",
    textMuted:  "#a6a6a6",
    title:      "#007acc",
    header:     "#c5e4ff",
    link:       "#4fc1ff",

    primary:    "#007acc",
    secondary:  "#569cd6",
    accent:     "#c586c0",

    success:    "#2ea043",
    warning:    "#d29922",
    danger:     "#f85149",
  },

  // 2 — Minimal Light
  2: {
    background: "#f7f7f9",
    surface:    "#ffffff",
    sidebar:    "#f0f2f5",
    card:       "#ffffff",
    border:     "#dcdfe6",

    inputBg:     "#ffffff",
    inputBorder: "#c9ced6",

    text:       "#111827",
    textMuted:  "#6b7280",
    title:      "#0f172a",
    header:     "#111827",
    link:       "#2563eb",

    primary:    "#2563eb",
    secondary:  "#4f46e5",
    accent:     "#00bcd4",

    success:    "#16a34a",
    warning:    "#d97706",
    danger:     "#dc2626",
  },

  // 3 — Pure Dark
  3: {
    background: "#0b0c0f",
    surface:    "#121418",
    sidebar:    "#101216",
    card:       "#151821",
    border:     "#242833",

    inputBg:     "#121418",
    inputBorder: "#242833",

    text:       "#e5e7eb",
    textMuted:  "#9ca3af",
    title:      "#ffffff",
    header:     "#d1d5db",
    link:       "#60a5fa",

    primary:    "#ffffff",
    secondary:  "#9ca3af",
    accent:     "#22d3ee",

    success:    "#22c55e",
    warning:    "#eab308",
    danger:     "#ef4444",
  },

  // 4 — Neon Night (magenta/cyan synthwave)
  4: {
    background: "#12081b",
    surface:    "#1a0f26",
    sidebar:    "#160d22",
    card:       "#20112f",
    border:     "#3a174f",

    inputBg:     "#1a0f26",
    inputBorder: "#3a174f",

    text:       "#efe7ff",
    textMuted:  "#c8b7e6",
    title:      "#ff4ecd",
    header:     "#ffd6f2",
    link:       "#5be7ff",

    primary:    "#ff4ecd",
    secondary:  "#5be7ff",
    accent:     "#b388ff",

    success:    "#20e3b2",
    warning:    "#ffb020",
    danger:     "#ff5470",
  },

  // 5 — Forest Green
  5: {
    background: "#0f1a14",
    surface:    "#15231b",
    sidebar:    "#122019",
    card:       "#193325",
    border:     "#244233",

    inputBg:     "#15231b",
    inputBorder: "#284a39",

    text:       "#e3f2ea",
    textMuted:  "#bcd6c9",
    title:      "#a7f3d0",
    header:     "#d1fae5",
    link:       "#34d399",

    primary:    "#34d399",
    secondary:  "#10b981",
    accent:     "#86efac",

    success:    "#22c55e",
    warning:    "#f59e0b",
    danger:     "#ef4444",
  },

  // 6 — Ocean Blue
  6: {
    background: "#0b1720",
    surface:    "#0f1e2a",
    sidebar:    "#0d1a23",
    card:       "#132836",
    border:     "#1f3a4d",

    inputBg:     "#0f1e2a",
    inputBorder: "#1f3a4d",

    text:       "#e6f0f7",
    textMuted:  "#b7c9d6",
    title:      "#77c7ff",
    header:     "#cfe9ff",
    link:       "#4aa8ff",

    primary:    "#4aa8ff",
    secondary:  "#7dd3fc",
    accent:     "#22d3ee",

    success:    "#22c55e",
    warning:    "#eab308",
    danger:     "#ef4444",
  },

  // 7 — Sunset (warm orange/pink)
  7: {
    background: "#1e0f12",
    surface:    "#261316",
    sidebar:    "#210f12",
    card:       "#31181c",
    border:     "#4a242a",

    inputBg:     "#261316",
    inputBorder: "#4a242a",

    text:       "#ffe9e6",
    textMuted:  "#f8c7bf",
    title:      "#ff7a59",
    header:     "#ffd9cf",
    link:       "#ff9e80",

    primary:    "#ff7a59",
    secondary:  "#f472b6",
    accent:     "#f59e0b",

    success:    "#22c55e",
    warning:    "#eab308",
    danger:     "#ef4444",
  },
};

// create context
export const ThemeContext = createContext();

// provider
export function ThemeProvider({ children }) {
  // pick any default palette index from above
  const [themePick, setThemePick] = useState(1);
  const [theme, setTheme] = useState({ ...baseTheme, colors: colorPalettes[1] });

  useEffect(() => {
    const palette = colorPalettes[themePick];
    if (palette) setTheme({ ...baseTheme, colors: palette });
  }, [themePick]);

  // Expose names so your Settings page can label choices
  const themeNames = {
    0: "Discord Dark",
    1: "VS Code Dark",
    2: "Minimal Light",
    3: "Pure Dark",
    4: "Neon Night",
    5: "Forest",
    6: "Ocean",
    7: "Sunset",
  };

  return (
    <ThemeContext.Provider value={{ theme, themePick, setThemePick, themeNames, colorPalettes }}>
      {children}
    </ThemeContext.Provider>
  );
}
