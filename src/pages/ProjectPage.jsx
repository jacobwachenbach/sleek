// src/pages/ProjectPage.jsx
import React, { useContext, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "../styles/ThemeContext";
import { ProjectsContext } from "../context/ProjectsContext.jsx";
import { FaChevronLeft, FaChevronRight, FaBook, FaTasks, FaProjectDiagram } from "react-icons/fa";

import OverviewMarkdown from "../components/OverviewMarkdown.jsx";
import TodoList from "../components/TodoList.jsx";
import Flowchart from "../components/Flowchart.jsx";
import ProjectHeader from "../components/ProjectHeader.jsx";

export default function ProjectPage() {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { projects, setProjects } = useContext(ProjectsContext);

  const project = useMemo(
    () => projects.find((p) => p.id.toString() === id),
    [projects, id]
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  if (!project) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: theme.colors.primary }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  // update fields (title/desc/etc)
  const updateProjectField = (field, value) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id
          ? { ...p, [field]: value, lastEdited: new Date().toLocaleString() }
          : p
      )
    );
  };

  return (
    <div style={styles(theme).pageWrap}>
      {/* hero cover with overlay header */}
      <div
        style={{
          ...styles(theme).hero,
          backgroundImage: `url(${project.coverUrl})`,
          position: "relative",
        }}
      >
        <ProjectHeader
          project={project}
          theme={theme}
          updateField={updateProjectField}
        />
      </div>

      <div style={styles(theme).mainRow}>
        {/* local sidebar */}
        <div
          style={{ ...styles(theme).sideTabs, width: sidebarOpen ? 220 : 64 }}
        >
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            style={styles(theme).collapseBtn}
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
          <div
            style={{
              ...styles(theme).tabBtn,
              ...(activeTab === "overview" ? styles(theme).tabBtnActive : {}),
            }}
            onClick={() => setActiveTab("overview")}
          >
            <FaBook style={styles(theme).tabIcon} />{" "}
            {sidebarOpen && <span>Overview</span>}
          </div>
          <div
            style={{
              ...styles(theme).tabBtn,
              ...(activeTab === "todos" ? styles(theme).tabBtnActive : {}),
            }}
            onClick={() => setActiveTab("todos")}
          >
            <FaTasks style={styles(theme).tabIcon} />{" "}
            {sidebarOpen && <span>To-Do List</span>}
          </div>
          <div
            style={{
              ...styles(theme).tabBtn,
              ...(activeTab === "flowchart" ? styles(theme).tabBtnActive : {}),
            }}
            onClick={() => setActiveTab("flowchart")}
          >
            <FaProjectDiagram style={styles(theme).tabIcon} />{" "}
            {sidebarOpen && <span>Flowchart</span>}
          </div>
        </div>

        {/* content */}
        <div style={styles(theme).contentWrap}>
          <div style={styles(theme).headerRow}>
            <h2 style={{ margin: 0, color: theme.colors.title }}>
              {activeTab === "overview"
                ? "Overview"
                : activeTab === "todos"
                ? "To-Do List"
                : "Flowchart"}
            </h2>
            <Link
              to="/"
              style={{ color: theme.colors.primary, textDecoration: "none" }}
            >
              ← Back to Home
            </Link>
          </div>

          {activeTab === "overview" && (
            <OverviewMarkdown
              text={project.description}
              setText={(val) => updateProjectField("description", val)}
              theme={theme}
            />
          )}

          {activeTab === "todos" && <TodoList project={project} theme={theme} />}

          {activeTab === "flowchart" && (
            <Flowchart project={project} theme={theme} />
          )}
        </div>
      </div>
    </div>
  );
}

/** @param {any} theme
 *  @returns {{ [key: string]: import('react').CSSProperties }}
 */
const styles = (theme) => ({
  pageWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  hero: {
    height: 220,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 12,
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.surface,
  },

  mainRow: {
    display: "flex",
    gap: 16,
    minHeight: "calc(100vh - 260px)",
  },

  sideTabs: {
    backgroundColor: theme.colors.panel,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 10,
    padding: 8,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    transition: "width 0.2s ease",
    position: "sticky",
    top: 16,
    height: "fit-content",
  },

  collapseBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 8,
    background: theme.colors.surface,
    color: theme.colors.text,
    padding: "6px 8px",
    cursor: "pointer",
    marginBottom: 6,
  },

  tabBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.text,
    cursor: "pointer",
  },
  tabBtnActive: {
    background: theme.colors.primary,
    color: theme.colors.onPrimary ?? "#fff",
    borderColor: theme.colors.primary,
  },
  tabIcon: { minWidth: 16 },

  contentWrap: {
    flex: 1,
    backgroundColor: theme.colors.panel,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 10,
    padding: 16,
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
    color: theme.colors.header,
  },
});
