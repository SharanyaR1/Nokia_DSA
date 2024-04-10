import React, { createContext, useState } from 'react';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [Services, setServices] = useState(""); // Changed variable names
  return (
    <ServicesContext.Provider
      value={{ Services, setServices }} // Updated variable names
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContext; // Fixed export name
