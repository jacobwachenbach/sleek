import React from "react";
import { FaHome, FaCog, FaInfoCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import theme from "../styles/theme";

export default function HamburgerMenu({ isOpen, setIsOpen }) {
  return (
    <div style={{ ...styles.sidebar, width: isOpen ? "200px" : "60px" }}>
      {/* Hamburger button */}
      <button onClick={() => setIsOpen(!isOpen)} style={styles.hamburgerBtn}>
        <FaBars />
      </button>

      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>
            <FaHome style={styles.icon} /> 
            <span style={{ display: isOpen ? "inline" : "none" }}>Home</span>
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/settings" style={styles.navLink}>
            <FaCog style={styles.icon} /> 
            <span style={{ display: isOpen ? "inline" : "none" }}>Settings</span>
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>
            <FaInfoCircle style={styles.icon} /> 
            <span style={{ display: isOpen ? "inline" : "none" }}>About</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

/* ---------------- Styles ---------------- */
const styles = {
    sidebar: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      transition: "width 0.3s ease-in-out",
      overflowX: "hidden",
      zIndex: 1000,
      fontFamily: theme.font.family,
      boxShadow: "2px 0 8px rgba(0,0,0,0.4)",
    },


  hamburgerBtn: {
    fontSize: "22px",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: theme.colors.text,
    position: "absolute",
    top: theme.spacing.medium,
    right: theme.spacing.medium,
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: "70px 0 0 0",  // ✅ pushes nav below hamburger neatly
  },
  navItem: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center", // ✅ aligns icon + text vertically
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    color: theme.colors.text,
    textDecoration: "none",
    padding: "10px 15px",
    fontSize: theme.font.size.medium,
  },

  icon: {
    fontSize: theme.font.size.medium,
    minWidth: "24px", // ✅ keeps icon aligned even when text hidden
    textAlign: "center",
  },
};
