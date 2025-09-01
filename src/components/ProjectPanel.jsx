import React, { useContext } from "react";
import { ThemeContext } from "../styles/ThemeContext";

function ProjectPanel({ name, description, created, lastEdited, coverUrl }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={styles(theme).container}>
      <div style={{ ...styles(theme).cover, backgroundImage: `url(${coverUrl})` }} />
      <div style={styles(theme).body}>
        <h2 style={{ margin: 0 }}>{name}</h2>
        <p style={{ margin: "6px 0 10px 0", opacity: 0.85 }}>{description}</p>
        <div style={styles(theme).dates}>
          <span>Created: {created}</span>
          <span>Last Edited: {lastEdited}</span>
        </div>
      </div>
    </div>
  );
}

/** @param {any} theme
 *  @returns {{ [key: string]: import('react').CSSProperties }}
 */
const styles = (theme) => ({
  container: {
    width: 300,
    border: `1px solid ${theme.colors.border}`,   // ✅ border color
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: theme.colors.panel,         // ✅ panel surface color
    color: theme.colors.text,
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
  },
  cover: {
    height: 120,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.colors.surface,       // ✅ fallback if no image
  },
  body: {
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  title: {
    fontSize: theme.font.size.large,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.title,                   // ✅ themed title color
  },
  description: {
    fontSize: theme.font.size.medium,
    color: theme.colors.text,
  },
  dates: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: theme.colors.mutedText ?? theme.colors.text, // ✅ softer text option
    opacity: 0.85,
  },
});


export default ProjectPanel;
