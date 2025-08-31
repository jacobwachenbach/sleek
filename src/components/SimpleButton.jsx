import React, { useContext } from "react";
import { ThemeContext } from "../styles/ThemeContext";

// ✅ use lowercase `onClick` like normal React prop
const SimpleButton = ({ textPlaceHolder, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={styles(theme).container} onClick={onClick}>
      <span>{textPlaceHolder}</span>
    </div>
  );
};

/** @param {any} theme
 *  @returns {{ [key: string]: import('react').CSSProperties }}
 */
const styles = (theme) => ({
  container: {
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    userSelect: "none",
  },
});

export default SimpleButton;
