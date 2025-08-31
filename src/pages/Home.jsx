// src/pages/Home.jsx
import React, { useContext, useState } from "react";
import { ThemeContext } from "../styles/ThemeContext";
import { ProjectsContext } from "../context/ProjectsContext.jsx"; // ✅ context with addProject/projects
import { FaSearch } from "react-icons/fa";
import SimpleButton from "../components/SimpleButton";
import CreateProjectMenu from "../components/CreateProjectMenu";
import ProjectPanel from "../components/ProjectPanel";
import { Link } from "react-router-dom";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { projects, addProject } = useContext(ProjectsContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <SimpleButton textPlaceHolder="+ Create" onClick={() => setIsMenuOpen(true)} />
        <SimpleButton textPlaceHolder="Import" />
        <SimpleButton textPlaceHolder="Delete" />
      </div>

      {/* Create Project Modal */}
      {isMenuOpen && (
        <div style={styles(theme).modalOverlay}>
          <div style={styles(theme).modalContent}>
            <CreateProjectMenu
              onCancel={() => setIsMenuOpen(false)}
              onCreate={(projectData) => {
                addProject(projectData);     // ✅ add via context
                setIsMenuOpen(false);        // ✅ close modal
              }}
            />
          </div>
        </div>
      )}

      {/* Project Panels (wrap into rows) */}
      <div style={styles(theme).PanelContainers}>
        {projects.map((p) => (
          <Link key={p.id} to={`/project/${p.id}`} style={{ textDecoration: "none" }}>
            <ProjectPanel
              name={p.projectName}
              type={p.projectType}
              description={p.description}
              created={p.created}
              lastEdited={p.lastEdited}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

/** @param {any} theme
 *  @returns {{ [key: string]: import('react').CSSProperties }}
 */
const styles = (theme) => ({
  // Search
  SearchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
  },
  SearchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "35vw",
    height: "40px",
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: "8px",
    backgroundColor: theme.colors.background,
    padding: "0 10px",
  },
  SearchBar: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: theme.colors.text,
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
  },
  SearchIcon: {
    marginLeft: "8px",
    color: theme.colors.primary,
    flexShrink: 0,
  },

  // CRUD row
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

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: "10px",
    padding: "20px",
    minWidth: "420px",
    maxWidth: "90vw",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },

  // Panels grid (wrap)
  PanelContainers: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "flex-start",
    marginTop: "16px",
  },
});
