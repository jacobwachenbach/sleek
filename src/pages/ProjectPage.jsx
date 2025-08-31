// src/pages/ProjectPage.jsx
import React, { useContext, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "../styles/ThemeContext";
import { ProjectsContext } from "../context/ProjectsContext.jsx";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBook,
  FaTasks,
  FaProjectDiagram,
} from "react-icons/fa";

/** Minimal markdown -> HTML (headings, bold, italic, inline code, line breaks) */
function renderMarkdown(md) {
  if (!md) return "";
  // Escape basic HTML
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headings: ###, ##, #
  html = html
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // Bold **text** and italic *text*
  html = html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code `code`
  html = html.replace(/`([^`]+?)`/g, "<code>$1</code>");

  // Line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}

export default function ProjectPage() {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { projects } = useContext(ProjectsContext);

  const project = useMemo(
    () => projects.find((p) => p.id.toString() === id),
    [projects, id]
  );

  // Local UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Overview content starts with the project's description
  const [overviewMd, setOverviewMd] = useState(project?.description || "");

  // Simple local todo list for now (you can persist later)
  const [todos, setTodos] = useState([
    // { id: 1, text: "Example task", done: false }
  ]);
  const [todoInput, setTodoInput] = useState("");

  if (!project) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Project not found</h2>
        <p>
          If you refreshed the page, in-memory context may be empty. Go back to Home and reopen the
          project, or persist projects to a database/localStorage.
        </p>
        <Link to="/" style={{ color: theme.colors.primary }}>← Back to Home</Link>
      </div>
    );
  }

  const addTodo = () => {
    const text = todoInput.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setTodoInput("");
  };

  const toggleTodo = (todoId) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  return (
    <div style={styles(theme).pageWrap}>
      {/* Project-local side menu (to the right of global hamburger) */}
      <div
        style={{
          ...styles(theme).sideTabs,
          width: sidebarOpen ? 220 : 64,
        }}
      >
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          style={styles(theme).collapseBtn}
          title={sidebarOpen ? "Collapse" : "Expand"}
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
          <FaBook style={styles(theme).tabIcon} />
          {sidebarOpen && <span>Overview</span>}
        </div>

        <div
          style={{
            ...styles(theme).tabBtn,
            ...(activeTab === "todos" ? styles(theme).tabBtnActive : {}),
          }}
          onClick={() => setActiveTab("todos")}
        >
          <FaTasks style={styles(theme).tabIcon} />
          {sidebarOpen && <span>To-Do List</span>}
        </div>

        <div
          style={{
            ...styles(theme).tabBtn,
            ...(activeTab === "flowchart" ? styles(theme).tabBtnActive : {}),
          }}
          onClick={() => setActiveTab("flowchart")}
        >
          <FaProjectDiagram style={styles(theme).tabIcon} />
          {sidebarOpen && <span>Flowchart</span>}
        </div>
      </div>

      {/* Main content */}
      <div style={styles(theme).contentWrap}>
        <div style={styles(theme).headerRow}>
          <div>
            <h1 style={{ margin: 0, color: theme.colors.title }}>{project.projectName}</h1>
            <div style={{ opacity: 0.8, marginTop: 4 }}>
              <span>Type: {project.projectType}</span> &nbsp;•&nbsp; 
              <span>Created: {project.created}</span> &nbsp;•&nbsp; 
              <span>Last Edited: {project.lastEdited}</span>
            </div>
          </div>
          <Link to="/" style={{ color: theme.colors.primary, textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>

        {/* Tabs */}
        {activeTab === "overview" && (
          <div style={styles(theme).panel}>
            <h2 style={{ marginTop: 0 }}>Overview</h2>
            <div style={styles(theme).overviewGrid}>
              <textarea
                style={styles(theme).mdInput}
                placeholder="Write project overview in Markdown..."
                value={overviewMd}
                onChange={(e) => setOverviewMd(e.target.value)}
              />
              <div
                style={styles(theme).mdPreview}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(overviewMd) }}
              />
            </div>
          </div>
        )}

        {activeTab === "todos" && (
          <div style={styles(theme).panel}>
            <h2 style={{ marginTop: 0 }}>To-Do List</h2>
            <div style={styles(theme).todoRow}>
              <input
                style={styles(theme).todoInput}
                placeholder="Add a task..."
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? addTodo() : null)}
              />
              <button style={styles(theme).primaryBtn} onClick={addTodo}>
                Add
              </button>
            </div>

            <div style={{ marginTop: 12 }}>
              {todos.length === 0 && <div style={{ opacity: 0.7 }}>No tasks yet.</div>}
              {todos.map((t) => (
                <div key={t.id} style={styles(theme).todoItem}>
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTodo(t.id)}
                  />
                  <span
                    style={{
                      marginLeft: 8,
                      textDecoration: t.done ? "line-through" : "none",
                      opacity: t.done ? 0.6 : 1,
                    }}
                  >
                    {t.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(t.id)}
                    style={styles(theme).dangerBtn}
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "flowchart" && (
          <div style={styles(theme).panel}>
            <h2 style={{ marginTop: 0 }}>Flowchart</h2>
            <div style={{ opacity: 0.8, marginBottom: 8 }}>
              Placeholder for your flowchart editor. Later you can add a canvas/graph library and
              save nodes/edges per project in your database.
            </div>
            <div style={styles(theme).flowCanvas}>
              <div style={styles(theme).flowNode}>Start</div>
              <div style={styles(theme).flowArrow}>↓</div>
              <div style={styles(theme).flowNode}>Do a thing</div>
              <div style={styles(theme).flowArrow}>↓</div>
              <div style={styles(theme).flowNode}>End</div>
            </div>
          </div>
        )}
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
    gap: 16,
    minHeight: "calc(100vh - 40px)",
  },

  // project-local sidebar
  sideTabs: {
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.primary}`,
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
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: 8,
    background: "transparent",
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
    border: `1px solid ${theme.colors.primary}`,
    background: "transparent",
    color: theme.colors.text,
    cursor: "pointer",
    userSelect: "none",
  },
  tabBtnActive: {
    background: theme.colors.primary,
    color: "#fff",
    borderColor: theme.colors.primary,
  },
  tabIcon: { minWidth: 16 },

  // main content
  contentWrap: {
    flex: 1,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: 10,
    padding: 16,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
  },
  panel: {
    background: "transparent",
    borderRadius: 10,
  },

  // Overview
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  mdInput: {
    minHeight: 220,
    resize: "vertical",
    padding: 12,
    borderRadius: 10,
    border: `1px solid ${theme.colors.primary}`,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.font.family,
    fontSize: theme.font.size.medium,
    outline: "none",
  },
  mdPreview: {
    minHeight: 220,
    padding: 12,
    borderRadius: 10,
    border: `1px solid ${theme.colors.primary}`,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.font.family,
    fontSize: theme.font.size.medium,
  },

  // Todos
  todoRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  todoInput: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary}`,
    background: theme.colors.background,
    color: theme.colors.text,
    outline: "none",
    fontFamily: theme.font.family,
    fontSize: theme.font.size.medium,
  },
  primaryBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: theme.colors.primary,
    color: "#fff",
    cursor: "pointer",
  },
  dangerBtn: {
    marginLeft: "auto",
    padding: "4px 8px",
    borderRadius: 6,
    border: `1px solid ${theme.colors.primary}`,
    background: "transparent",
    color: theme.colors.text,
    cursor: "pointer",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 6px",
    borderBottom: `1px dashed ${theme.colors.primary}`,
  },

  // Flowchart placeholder
  flowCanvas: {
    display: "grid",
    gap: 8,
    placeItems: "center",
    padding: 12,
    border: `1px dashed ${theme.colors.primary}`,
    borderRadius: 10,
    minHeight: 240,
  },
  flowNode: {
    padding: "10px 14px",
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary}`,
  },
  flowArrow: { opacity: 0.6 },
});
