import React, { createContext, useState } from "react";

export const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const addProject = (projectData) => {
    const now = new Date().toLocaleString();
    const newProject = {
      id: Date.now(),
      ...projectData,
      created: now,
      lastEdited: now,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}
