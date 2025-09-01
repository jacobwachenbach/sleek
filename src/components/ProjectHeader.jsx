// src/components/ProjectHeader.jsx
import React, { useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";

export default function ProjectHeader({ project, theme, updateField }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [hovered, setHovered] = useState(null); // "title" or "desc"
  const [title, setTitle] = useState(project.projectName);
  const [desc, setDesc] = useState(project.description);

  return (
    <div style={styles(theme).overlay}>
      {/* Title */}
      <div
        style={styles(theme).editableWrap}
        onMouseEnter={() => setHovered("title")}
        onMouseLeave={() => setHovered(null)}
        onDoubleClick={() => setIsEditingTitle(true)}
      >
        {isEditingTitle ? (
          <div style={styles(theme).inlineEdit}>
            <input
              style={styles(theme).editInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              style={styles(theme).confirmBtn}
              onClick={() => {
                updateField("projectName", title);
                setIsEditingTitle(false);
              }}
            >
              <FaCheck />
            </button>
          </div>
        ) : (
          <>
            <h1 style={styles(theme).title}>{project.projectName}</h1>
            {hovered === "title" && (
              <button
                style={styles(theme).editBtn}
                onClick={() => setIsEditingTitle(true)}
              >
                <FaEdit />
              </button>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <div
        style={styles(theme).editableWrap}
        onMouseEnter={() => setHovered("desc")}
        onMouseLeave={() => setHovered(null)}
        onDoubleClick={() => setIsEditingDesc(true)}
      >
        {isEditingDesc ? (
          <div style={styles(theme).inlineEdit}>
            <textarea
              style={styles(theme).editTextarea}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              style={styles(theme).confirmBtn}
              onClick={() => {
                updateField("description", desc);
                setIsEditingDesc(false);
              }}
            >
              <FaCheck />
            </button>
          </div>
        ) : (
          <>
            <p style={styles(theme).desc}>{project.description}</p>
            {hovered === "desc" && (
              <button
                style={styles(theme).editBtn}
                onClick={() => setIsEditingDesc(true)}
              >
                <FaEdit />
              </button>
            )}
          </>
        )}
      </div>

      {/* Dates → bottom left */}
      <div style={styles(theme).dates}>
        <span>Created: {project.created}</span> &nbsp;•&nbsp;
        <span>Last Edited: {project.lastEdited}</span>
      </div>
    </div>
  );
}

/** @param {any} theme */
const styles = (theme) => ({
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    color: theme.colors.text,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
  },
  title: {
    fontSize: theme.font.size.xtitle,
    fontWeight: theme.font.weight.bold,
    fontFamily: theme.font.family.til,
    fontStyle: theme.font.style.italic,
    color: theme.colors.title,
    margin: 0,
  },
  desc: {
    fontSize: theme.font.size.lmedium,
    color: theme.colors.text,
    marginTop: 6,
    maxWidth: "50%",
    lineHeight: 1.4,
    whiteSpace: "pre-wrap",
  },
  dates: {
    position: "absolute",
    bottom: 12,
    left: 16,
    fontSize: 14,
    opacity: 0.85,
  },
  editableWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 10,
  },
  editBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: theme.colors.primary,
    fontSize: 14,
  },
  inlineEdit: {
    width: '30vw',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  editInput: {
    fontSize: theme.font.size.title,
    padding: "6px 10px",
    borderRadius: 6,
    border: `1px solid ${theme.colors.border}`,
    background: "rgba(255,255,255,0.2)", // ✅ subtle overlay
    color: theme.colors.text,
    outline: "none",
    fontFamily: theme.font.family,
    textAlign: "center",
  },
  editTextarea: {
    fontSize: theme.font.size.medium,
    padding: "6px 10px",
    borderRadius: 6,
    border: `1px solid ${theme.colors.border}`,
    background: "rgba(255,255,255,0.2)", // ✅ subtle overlay
    color: theme.colors.text,
    outline: "none",
    fontFamily: theme.font.family,
    width: "100%",
    minHeight: 60,
    resize: "vertical",
    textAlign: "center",
  },
  confirmBtn: {
    border: "none",
    borderRadius: 6,
    background: theme.colors.primary,
    color: theme.colors.onPrimary ?? "#fff",
    cursor: "pointer",
    padding: "6px 8px",
  },
});
