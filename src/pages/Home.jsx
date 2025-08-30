import React, { useContext } from "react";
import { ThemeContext } from "../styles/ThemeContext";
import SimpleButton from "../components/SimpleButton";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  return (
    <div>
      {/* Search Bar */}
      <div style={styles(theme).SearchBarContainer}>
        <h1>Choose a project to work</h1>
        <div style={styles(theme).SearchWrapper}>
          <input style={styles(theme).SearchBar} placeholder="Search Project" />
          <FaSearch style={styles(theme).SearchIcon} />
        </div>
      </div>

      {/* CRUD bar */}
      <div style={styles(theme).CrudBarContainer}>
        <h1>{formattedDate}</h1>
        <hr style={styles(theme).Divider} />
        <SimpleButton textPlaceHolder="+ Create" />
        <SimpleButton textPlaceHolder="Import" />
        <SimpleButton textPlaceHolder="Delete" />
      </div>
    </div>
  );
}

/** @param {any} theme
 *  @returns {{ [key: string]: import('react').CSSProperties }}
 */
const styles = (theme) => ({
  SearchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
  },
  SearchWrapper: {
    display: "flex",                 // ✅ use flexbox
    alignItems: "center",
    width: "35vw",
    height: "40px",
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: "8px",
    backgroundColor: theme.colors.background,
    padding: "0 10px",               // padding inside wrapper
  },
  SearchBar: {
    flex: 1,               // ✅ takes all remaining space
    border: "none",
    outline: "none",
    background: "transparent",
    color: theme.colors.text,
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
  },
  SearchIcon: {
    marginLeft: "8px",               // ✅ sits flush right naturally
    color: theme.colors.primary,
    flexShrink: 0,                   // ✅ prevents icon from shrinking
  },

  CrudBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    width: "100%",
  },
  Divider: {
    flex: 1,
    border: 0,
    height: "1px",
    backgroundColor: theme.colors.primary,
  },
});
