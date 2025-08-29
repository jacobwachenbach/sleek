import React, { useContext } from "react";
import { FaHome, FaCog, FaInfoCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeContext } from "../styles/ThemeContext";

export default function HamburgerMenu({ isOpen, setIsOpen }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ ...styles(theme).sidebar, width: isOpen ? "200px" : "60px" }}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles(theme).hamburgerBtn}>
        <FaBars />
      </button>

      <ul style={styles(theme).navList}>
        <li style={styles(theme).navItem}>
          <Link to="/" style={styles(theme).navLink}>
            <FaHome style={styles(theme).icon} /> 
            <span style={{ display: isOpen ? "inline" : "none" }}>Home</span>
          </Link>
        </li>
        <li style={styles(theme).navItem}>
          <Link to="/settings" style={styles(theme).navLink}>
            <FaCog style={styles(theme).icon} /> 
            <span style={{ display: isOpen ? "inline" : "none" }}>Settings</span>
          </Link>
        </li>
        <li style={styles(theme).navItem}>
          <Link to="/about" style={styles(theme).navLink}>
            <FaInfoCircle style={styles(theme).icon} /> 
            <span style={{ display: isOpen ? "inline" : "none" }}>About</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

const styles = (theme) => ({
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
    margin: "70px 0 0 0",
  },
  navItem: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
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
    minWidth: "24px",
    textAlign: "center",
  },
});
