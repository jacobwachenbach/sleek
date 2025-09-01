// src/components/Sidebar.jsx
import React, { useState, useMemo } from "react";
import SidebarItem from "./SidebarItem";
import FolderItem from "./FolderItem";

export default function Sidebar({ theme, sidebarOpen, activeTab, setActiveTab, tabs, setTabs }) {
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTabs = useMemo(
    () => tabs.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())),
    [tabs, search]
  );

  const deleteTab = (id, folderId = null) => {
    if (id === "overview") return;
    if (folderId) {
      setTabs((prev) =>
        prev.map((f) =>
          f.id === folderId ? { ...f, children: f.children.filter((c) => c.id !== id) } : f
        )
      );
    } else {
      setTabs((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const toggleFolder = (id) =>
    setTabs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, open: !f.open } : f))
    );

  const addPageToFolder = (folderId) => {
    const newPage = {
      type: "tab",
      id: Date.now().toString(),
      title: "New Page",
      icon: "📄",
    };
    setTabs((prev) =>
      prev.map((f) =>
        f.id === folderId ? { ...f, children: [...f.children, newPage] } : f
      )
    );
  };

  return (
    <div style={{ ...styles(theme).sideTabs, width: sidebarOpen ? 220 : 64 }}>
      {sidebarOpen && (
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles(theme).searchInput}
        />
      )}

      {sidebarOpen && (
        <button
          onClick={() => setEditMode((e) => !e)}
          style={{ ...styles(theme).primaryBtn, width: "100%", fontSize: 12, marginBottom: 8 }}
        >
          {editMode ? "Done Editing" : "Edit Tabs"}
        </button>
      )}

      {filteredTabs.map((item) =>
        item.type === "tab" ? (
          <SidebarItem
            key={item.id}
            item={item}
            theme={theme}
            sidebarOpen={sidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            editMode={editMode}
            deleteTab={deleteTab}
          />
        ) : (
          <FolderItem
            key={item.id}
            item={item}
            theme={theme}
            sidebarOpen={sidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            editMode={editMode}
            toggleFolder={toggleFolder}
            addPageToFolder={addPageToFolder}
            deleteTab={deleteTab}
          />
        )
      )}
    </div>
  );
}

const styles = (theme) => ({
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
  searchInput: {
    marginBottom: 8,
    padding: "4px 6px",
    borderRadius: 6,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.text,
    outline: "none",
    fontSize: 13,
  },
  primaryBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    background: theme.colors.primary,
    color: theme.colors.onPrimary ?? "#fff",
    cursor: "pointer",
  },
});
