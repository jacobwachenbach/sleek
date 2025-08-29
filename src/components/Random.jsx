import React from "react";
import theme from "../styles/theme";

export default function Random() {
  return (
    <div>
      <button style={{
        background: theme.colors.primary,
        color: theme.colors.text,
        border: "none",
        padding: theme.spacing.medium,
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: theme.font.family,
      }}>
        Random Button
      </button>
      <h2 style={{
        fontSize: theme.font.size.large,
        fontStyle: theme.font.style.italic,
        color: theme.colors.title,
      }}>
        Hi everyone 👋
      </h2>
    </div>
  );

}
