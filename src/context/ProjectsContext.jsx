// src/context/ProjectsContext.jsx
import React, { createContext, useState } from "react";

// create context
export const ProjectsContext = createContext();

// provider
export function ProjectsProvider({ children }) {
  // ✅ preload with one default project
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "Demo Project",
      description: "This is a demo project. Double-click or hover to edit the title and description.",
      projectType: "Default",
      coverUrl: "https://picsum.photos/1200/400", // sample cover
      created: new Date().toLocaleString(),
      lastEdited: new Date().toLocaleString(),
    },
  ]);

  const addProject = (project) => {
    setProjects((prev) => [
      ...prev,
      {
        ...project,
        id: Date.now(),
        created: new Date().toLocaleString(),
        lastEdited: new Date().toLocaleString(),
      },
    ]);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}
