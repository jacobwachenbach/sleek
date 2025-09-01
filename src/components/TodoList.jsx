// src/components/TodoList.jsx
import React, { useState } from "react";

export default function TodoList({ theme }) {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  const addTodo = () => {
    const t = todoInput.trim();
    if (!t) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: t, done: false }]);
    setTodoInput("");
  };

  const toggleTodo = (id) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTodo = (id) =>
    setTodos((p) => p.filter((t) => t.id !== id));

  return (
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
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span
              style={{
                marginLeft: 8,
                textDecoration: t.done ? "line-through" : "none",
                opacity: t.done ? 0.6 : 1,
              }}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t.id)} style={styles(theme).dangerBtn}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = (theme) => ({
  panel: { background: theme.colors.surface, borderRadius: 10, padding: 12 },
  todoRow: { display: "flex", gap: 8, alignItems: "center" },
  todoInput: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.text,
    outline: "none",
  },
  primaryBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: theme.colors.primary,
    color: theme.colors.onPrimary ?? "#fff",
    cursor: "pointer",
  },
  dangerBtn: {
    marginLeft: "auto",
    padding: "4px 8px",
    borderRadius: 6,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
    color: theme.colors.text,
    cursor: "pointer",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 6px",
    borderBottom: `1px dashed ${theme.colors.border}`,
  },
});
