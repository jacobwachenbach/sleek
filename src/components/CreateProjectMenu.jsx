import React, { useState, useContext } from "react";
import { ThemeContext } from "../styles/ThemeContext";
import { FaCheckCircle } from "react-icons/fa";

// Put these images in /src/assets/covers/ (or /public/covers and use "/covers/..")
import CoverBitcoin from "../assets/covers/Bitcoin.webp";
import CoverMoney from "../assets/covers/Money.webp";
import CoverSleekGradient from "../assets/covers/Sleek-Gradient.jpg";
import CoverGradientCircle from "../assets/covers/Gradient_Circle.jpg";
import CoverWaterfall from "../assets/covers/Nature-Waterfall.jpg";
import CoverRiver from "../assets/covers/Nature-River.jpg";

function CreateProjectMenu({ onCancel, onCreate }) {
  const { theme } = useContext(ThemeContext);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCoverId, setSelectedCoverId] = useState(null);

  const covers = [
    { id: "btc", label: "Bitcoin", src: CoverBitcoin },
    { id: "usd", label: "Dollars", src: CoverMoney },
    { id: "sleek", label: "Sleek Gradient", src: CoverSleekGradient },
    { id: "ring", label: "Neon Ring", src: CoverGradientCircle },
    { id: "falls", label: "Waterfall", src: CoverWaterfall },
    { id: "river", label: "River", src: CoverRiver },
  ];

  const isFormValid = projectName.trim() && description.trim() && selectedCoverId;

  const handleCreate = () => {
    if (!isFormValid) return;
    const cover = covers.find((c) => c.id === selectedCoverId);
    onCreate({
      projectName: projectName.trim(),
      description: description.trim(),
      coverUrl: cover?.src || "",
    });
  };

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

      {/* Cover Picker */}
      <div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Choose a cover</div>
        <div style={styles(theme).coversGrid}>
          {covers.map((c) => {
            const active = selectedCoverId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCoverId(c.id)}
                style={{
                  ...styles(theme).coverTile,
                  outline: active ? `2px solid blue` : `1px solid ${theme.colors.primary}`,
                }}
                title={c.label}
              >
                {active && <FaCheckCircle style={styles(theme).checkIcon} />}
                <img src={c.src} alt={c.label} style={styles(theme).coverImg} />
                <div style={styles(theme).coverLabel}>{c.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <textarea
        style={styles(theme).description}
        placeholder="Add a short description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Footer */}
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
          onClick={handleCreate}
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
    gap: 16,
    padding: 20,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.primary}`,
    width: 520,
    maxWidth: "90vw",
  },
  nameInput: {
    padding: 10,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: 6,
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
    outline: "none",
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
  coversGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  coverTile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: 8,
    borderRadius: 10,
    background: "transparent",
    cursor: "pointer",
    border: "none",
  },
  coverImg: {
    width: "100%",
    height: 90,
    objectFit: "cover",
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary}`,
  },
  coverLabel: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.85,
    textAlign: "center",
  },
  checkIcon: {
    position: "absolute",
    top: 8,
    right: 12,
    color: "green",
    fontSize: 18,
    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.6))",
  },
  description: {
    height: 90,
    resize: "vertical",
    padding: 10,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: 6,
    fontSize: theme.font.size.medium,
    fontFamily: theme.font.family,
    outline: "none",
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: `1px solid ${theme.colors.text}`,
    borderRadius: 6,
    color: theme.colors.text,
    cursor: "pointer",
  },
  createBtn: {
    padding: "8px 16px",
    backgroundColor: theme.colors.primary,
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
  },
});

export default CreateProjectMenu;
