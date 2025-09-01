import React, { useContext } from "react";
import "@fontsource/titillium-web/400-italic.css";
import { ThemeContext } from "../styles/ThemeContext";
import Dial from "../components/Dial";
import ThemeButton from "../components/ThemeButton";

export default function Settings() {
  const { theme, themePick, setThemePick } = useContext(ThemeContext);

  // Preview colors per palette (primary, surface, background)
  const palettes = [
    { id: 0, label: "Discord Dark",       colors: ["#7289da", "#2b2f36", "#1f2125"] },
    { id: 1, label: "VS Code Dark",       colors: ["#007acc", "#252526", "#1e1e1e"] },
    { id: 2, label: "Minimal Light",      colors: ["#2563eb", "#ffffff", "#f7f7f9"] },
    { id: 3, label: "Pure Dark",          colors: ["#ffffff", "#121418", "#0b0c0f"] },
    { id: 4, label: "Neon Night",         colors: ["#ff4ecd", "#1a0f26", "#12081b"] },
    { id: 5, label: "Forest",             colors: ["#34d399", "#15231b", "#0f1a14"] },
    { id: 6, label: "Ocean",              colors: ["#4aa8ff", "#132836", "#0b1720"] },
    { id: 7, label: "Sunset",             colors: ["#ff7a59", "#31181c", "#1e0f12"] },
  ];

  return (
    <div
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <h1 style={styles(theme).settingsTitle}>Sleek Theme Settings</h1>
      <h1 style={styles(theme).settingsHeader}>Color Palettes</h1>

      <div style={styles(theme).paletteGrid}>
        {palettes.map((p) => (
          <div key={p.id} style={styles(theme).paletteItem} onClick={() => setThemePick(p.id)}>
            <ThemeButton
              numCircles={3}
              circleColors={p.colors}
              isActive={themePick === p.id}
              onClick={() => setThemePick(p.id)}
            />
            <div style={styles(theme).paletteLabel}>
              {p.label} {themePick === p.id ? "✓" : ""}
            </div>
          </div>
        ))}
      </div>

      <div style={styles(theme).settingsContainer}>
        <h1 style={styles(theme).settingsText}>Title Font Size:</h1>
        <Dial />
      </div>
    </div>
  );
}

const styles = (theme) => ({
  settingsTitle: {
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight.normal,
    fontStyle: theme.font.style.italic,
    fontSize: theme.font.size.title,
    color: theme.colors.title,
  },
  settingsHeader: {
    paddingRight: "12px",
    fontSize: theme.font.size.large,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  settingsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    marginTop: 20,
  },
  paletteGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 16,
    alignItems: "start",
  },
  paletteItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    padding: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    border: `1px solid ${theme.colors.border ?? theme.colors.primary}`,
  },
  paletteLabel: {
    fontSize: 12,
    opacity: 0.9,
    textAlign: "center",
  },
  settingsText: {
    paddingRight: "12px",
    fontSize: theme.font.size.medium,
  },
});
