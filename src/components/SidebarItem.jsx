// src/components/SidebarItem.jsx
import React from "react";

export default function SidebarItem({ item, theme, sidebarOpen, activeTab, setActiveTab, editMode, deleteTab }) {
  return (
    <div
      style={{
        ...styles(theme).tabBtn,
        ...(activeTab === item.id ? styles(theme).tabBtnActive : {}),
      }}
      onClick={() => setActiveTab(item.id)}
    >
      {item.icon}
      {sidebarOpen && <span>{item.title}</span>}
      {editMode && item.id !== "overview" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTab(item.id);
          }}
          style={styles(theme).deleteBtn}
        >
          ❌
        </button>
      )}
    </div>
  );
}

const styles = (theme) => ({
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
  deleteBtn: {
    marginLeft: "auto",
    background: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer",
  },
});
