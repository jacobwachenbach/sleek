// src/components/OverviewMarkdown.jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaEdit, FaCheck } from "react-icons/fa";

export default function OverviewMarkdown({ text, setText, theme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={styles(theme).panel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isEditing ? (
        <div style={styles(theme).editWrap}>
          <textarea
            style={styles(theme).input}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* ✅ confirm handled by same top-right button */}
        </div>
      ) : (
        <div
          style={styles(theme).markdownWrap}
          onDoubleClick={() => setIsEditing(true)}
        >
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <p {...props} style={{ margin: 0 }} />
              ),
              h1: ({ node, ...props }) => (
                <h1 {...props} style={{ margin: "0.5em 0" }} />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} style={{ margin: "0.5em 0" }} />
              ),
              li: ({ node, ...props }) => (
                <li {...props} style={{ margin: "0.25em 0" }} />
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      )}

      {/* Edit Button — always top-right */}
      {hovered && !isEditing && (
        <button
          style={styles(theme).editBtn}
          onClick={() => setIsEditing(true)}
        >
          <FaEdit />
        </button>
      )}
      {isEditing && (
        <button
          style={styles(theme).editBtn}
          onClick={() => setIsEditing(false)}
        >
          <FaCheck />
        </button>
      )}
    </div>
  );
}

const styles = (theme) => ({
  panel: {
    position: "relative",
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 10,
    paddingLeft: 14,
    paddingTop: 12,
    width: "100%",
    minHeight: 300,
    boxSizing: "border-box",
  },
  editWrap: {
    width: "100%",
  },
  input: {
    width: "100%",
    minHeight: 280,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 6,
    background: theme.colors.surface,
    color: theme.colors.text,
    fontFamily: theme.font.family,
    fontSize: theme.font.size.smmall,
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  },
  markdownWrap: {
    width: "100%",
    minHeight: 280,
    color: theme.colors.text,
    fontFamily: theme.font.family,
    fontSize: theme.font.size.medium,
    lineHeight: 1.5,
    overflowWrap: "break-word",
    wordBreak: "break-word",
    maxWidth: "100%",
  },
  editBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 6,
    padding: "4px 6px",
    cursor: "pointer",
    color: theme.colors.primary,
    fontSize: 16,
  },
  confirmBtn: {
    display: "none", // ✅ handled by top-right button instead
  },
});
