import React, { useContext } from "react";
import { ThemeContext } from "../styles/ThemeContext";

// ✅ Correct syntax: arrow function with props
const SimpleButton = ({ textPlaceHolder }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={styles(theme).container}>
      <span>{textPlaceHolder}</span>   {/* ✅ render placeholder text */}
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
    padding: "4px 8px",
    cursor: "pointer",
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
});

export default SimpleButton;
