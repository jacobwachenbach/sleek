import React, { useContext } from 'react';
import { ThemeContext } from '../styles/ThemeContext';

function ProjectPanel({ name, type, description, created, lastEdited }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={styles(theme).container}>
      <h2>Project Name: {name}</h2>
      <p>Project Type: {type}</p>
      <p>{description}</p>
      <div style={styles(theme).dateContainer}>
        <p>Created: {created}</p>
        <p>Last Edited: {lastEdited}</p>
      </div>
    </div>
  );
}

/** @param {any} theme
 *  @returns {{ [key: string]: import('react').CSSProperties }}
 */
const styles = (theme) => ({
  container: {
    width: '20vw',
    margin: 4,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "12px",
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: "6px",
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: "12px",
    color: theme.colors.text,
    opacity: 0.8,
  }
});

export default ProjectPanel;
