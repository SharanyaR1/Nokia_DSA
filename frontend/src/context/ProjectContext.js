import React, { createContext, useState } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [Project, setProject] = useState({}); // Changed variable names
  return (
    <ProjectContext.Provider
      value={{ Project, setProject}} // Updated variable names
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext; // Fixed export name
