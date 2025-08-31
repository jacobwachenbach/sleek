import React, { useState, useContext } from "react";
import { ThemeContext } from "../styles/ThemeContext";
import { FaCode, FaProjectDiagram, FaBook, FaBriefcase, FaRegSquare, FaCheckCircle } from "react-icons/fa";

function CreateProjectMenu({ onCancel, onCreate }) {
  const { theme } = useContext(ThemeContext);

  // Local state
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState(null);
  const [description, setDescription] = useState("");

  // Tiles data
  const projectTypes = [
    { id: "coding", label: "Coding Project", icon: <FaCode /> },
    { id: "flowchart", label: "Flowchart / Diagram", icon: <FaProjectDiagram /> },
    { id: "journal", label: "Personal Journal", icon: <FaBook /> },
    { id: "business", label: "Business Plan", icon: <FaBriefcase /> },
    { id: "blank", label: "Blank Canvas", icon: <FaRegSquare /> },
  ];

  // Validation (must fill all)
  const isFormValid = projectName.trim() && projectType && description.trim();

  return (
    <div style={styles(theme).container}>
      {/* Project Name */}
      <input
        style={styles(theme).nameInput}
        type="text"
        placeholder="Enter project name..."
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      {/* Project Type Tiles */}
      <div style={styles(theme).tilesGrid}>
        {projectTypes.map((type) => (
          <div
            key={type.id}
            style={{
              ...styles(theme).tile,
              borderColor: projectType === type.id ? "blue" : theme.colors.text,
            }}
            onClick={() => setProjectType(type.id)}
          >
            {/* Checkmark if active */}
            {projectType === type.id && (
              <FaCheckCircle style={styles(theme).checkIcon} />
            )}
            <div style={styles(theme).tileIcon}>{type.icon}</div>
            <div>{type.label}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <textarea
        style={styles(theme).description}
        placeholder="Add a short description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Footer Actions */}
      <div style={styles(theme).footer}>
        <button style={styles(theme).cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button
          style={{
            ...styles(theme).createBtn,
            opacity: isFormValid ? 1 : 0.5,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
          disabled={!isFormValid}
          onClick={() => onCreate({ projectName, projectType, description })}
        >
          Create
        </button>
      </div>
    </div>
  );
}

/** @param {any} theme
 *  @returns {{ [key: string]: import('react').CSSProperties }}
 */
const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.primary}`,
    width: "400px",
  },
  nameInput: {
    padding: "10px",
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: "6px",
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
    outline: "none",
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
  tilesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },
  tile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: theme.colors.background,
  },
  tileIcon: {
    fontSize: "20px",
    marginBottom: "8px",
  },
  checkIcon: {
    position: "absolute",
    top: "6px",
    right: "6px",
    color: "green",
    fontSize: "16px",
  },
  description: {
    height: "80px",
    resize: "none",
    padding: "10px",
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: "6px",
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
    outline: "none",
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: `1px solid ${theme.colors.text}`,
    borderRadius: "6px",
    color: theme.colors.text,
    cursor: "pointer",
  },
  createBtn: {
    padding: "8px 16px",
    backgroundColor: theme.colors.primary,
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
  },
});

export default CreateProjectMenu;
