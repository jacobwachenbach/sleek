// src/components/Flowchart.jsx
import React from "react";

export default function Flowchart({ theme }) {
  return (
    <div style={styles(theme).panel}>
      <h2 style={{ marginTop: 0 }}>Flowchart</h2>
      <div style={{ opacity: 0.8, marginBottom: 8 }}>
        Placeholder for a canvas/graph editor.
      </div>
      <div style={styles(theme).flowCanvas}>
        <div style={styles(theme).flowNode}>Start</div>
        <div style={styles(theme).flowArrow}>↓</div>
        <div style={styles(theme).flowNode}>Do a thing</div>
        <div style={styles(theme).flowArrow}>↓</div>
        <div style={styles(theme).flowNode}>End</div>
      </div>
    </div>
  );
}

const styles = (theme) => ({
  panel: { background: theme.colors.surface, borderRadius: 10, padding: 12 },
  flowCanvas: {
    display: "grid",
    gap: 8,
    placeItems: "center",
    padding: 12,
    border: `1px dashed ${theme.colors.border}`,
    borderRadius: 10,
    minHeight: 240,
    background: theme.colors.surface,
  },
  flowNode: {
    padding: "10px 14px",
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.panel,
  },
  flowArrow: { opacity: 0.6 },
});
