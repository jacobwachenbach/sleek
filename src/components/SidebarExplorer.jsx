import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaFolderPlus,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSearch,
  FaBook,
  FaProjectDiagram,
} from "react-icons/fa";

export default function SidebarExplorer({
  theme,
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}) {
  const [editingSidebar, setEditingSidebar] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([
    { id: "overview", type: "page", name: "Overview" },
    { id: "todos", type: "page", name: "To-Do List" },
    { id: "flowchart", type: "page", name: "Flowchart" },
  ]);
  const [addingItem, setAddingItem] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [search, setSearch] = useState("");

  const handleAddItem = (type) => {
    if (!newItemName.trim()) return;
    const id = newItemName.toLowerCase().replace(/\s+/g, "-") + Date.now();
    setSidebarItems((prev) => [...prev, { id, type, name: newItemName.trim() }]);
    setNewItemName("");
    setAddingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (!window.confirm("Delete this item?")) return;
    setSidebarItems((prev) => prev.filter((i) => i.id !== id));
    if (activeTab === id) setActiveTab("overview");
  };

  return (
    <div style={{ ...styles(theme).sideTabs, width: sidebarOpen ? 240 : 64 }}>
      <button
        onClick={() => setSidebarOpen((s) => !s)}
        style={styles(theme).collapseBtn}
      >
        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Search */}
      {sidebarOpen && (
        <div style={styles(theme).searchRow}>
          <FaSearch style={{ opacity: 0.6 }} />
          <input
            style={styles(theme).searchInput}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Sidebar actions */}
      {sidebarOpen && (
        <div style={styles(theme).actionRow}>
          <button
            style={styles(theme).actionBtn}
            onClick={() => setEditingSidebar((e) => !e)}
          >
            <FaEdit />
          </button>
          <button
            style={styles(theme).actionBtn}
            onClick={() => setAddingItem("page")}
          >
            <FaPlus />
          </button>
          <button
            style={styles(theme).actionBtn}
            onClick={() => setAddingItem("folder")}
          >
            <FaFolderPlus />
          </button>
        </div>
      )}

      {/* Items */}
      <div style={{ marginTop: 8 }}>
        {sidebarItems
          .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <div
              key={item.id}
              style={{
                ...styles(theme).tabBtn,
                ...(activeTab === item.id ? styles(theme).tabBtnActive : {}),
              }}
              onClick={() => setActiveTab(item.id)}
            >
              {item.type === "page" ? <FaBook /> : <FaProjectDiagram />}
              {sidebarOpen && <span>{item.name}</span>}
              {editingSidebar && item.id !== "overview" && (
                <FaTrash
                  style={styles(theme).deleteIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(item.id);
                  }}
                />
              )}
            </div>
          ))}

        {/* Add item input */}
        {addingItem && (
          <div style={styles(theme).addItemRow}>
            <input
              style={styles(theme).addItemInput}
              placeholder={`New ${addingItem}`}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem(addingItem)}
            />
            <FaCheck
              style={styles(theme).confirmIcon}
              onClick={() => handleAddItem(addingItem)}
            />
            <FaTimes
              style={styles(theme).cancelIcon}
              onClick={() => setAddingItem(null)}
            />
          </div>
        )}
      </div>
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
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 6,
    background: theme.colors.surface,
    padding: "4px 8px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: theme.colors.text,
  },
  actionRow: { display: "flex", gap: 6, marginTop: 6 },
  actionBtn: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 6,
    background: theme.colors.surface,
    color: theme.colors.text,
    cursor: "pointer",
    padding: 6,
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
    marginTop: 4,
  },
  tabBtnActive: {
    background: theme.colors.primary,
    color: theme.colors.onPrimary ?? "#fff",
    borderColor: theme.colors.primary,
  },
  deleteIcon: { marginLeft: "auto", cursor: "pointer" },
  addItemRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 6 },
  addItemInput: {
    flex: 1,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 6,
    background: theme.colors.surface,
    color: theme.colors.text,
    outline: "none",
    padding: "4px 6px",
  },
  confirmIcon: { cursor: "pointer", color: "green" },
  cancelIcon: { cursor: "pointer", color: "red" },
});
