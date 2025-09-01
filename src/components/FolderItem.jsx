// src/components/FolderItem.jsx
import React from "react";
import SidebarItem from "./SidebarItem";

export default function FolderItem({ item, theme, sidebarOpen, activeTab, setActiveTab, editMode, toggleFolder, addPageToFolder, deleteTab }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{ ...styles(theme).tabBtn, justifyContent: "space-between" }}
        onClick={() => toggleFolder(item.id)}
      >
        <span>{item.open ? "📂" : "📁"} {sidebarOpen && item.title}</span>
        {editMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addPageToFolder(item.id);
            }}
            style={styles(theme).addBtn}
          >
            ➕
          </button>
        )}
      </div>

      {item.open && (
        <div style={{ marginLeft: 16 }}>
          {item.children.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              theme={theme}
              sidebarOpen={sidebarOpen}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              editMode={editMode}
              deleteTab={(id) => deleteTab(id, item.id)}
            />
          ))}
        </div>
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
  addBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: theme.colors.primary,
  },
});
