// import React, { createContext, useState } from 'react';

// const ServicesContext = createContext();

// export const ServicesProvider = ({ children }) => {
//   const [Services, setServices] = useState(""); // Changed variable names
//   return (
//     <ServicesContext.Provider
//       value={{ Services, setServices }} // Updated variable names
//     >
//       {children}
//     </ServicesContext.Provider>
//   );
// };

// export default ServicesContext; // Fixed export name
import React, { createContext, useState } from 'react';

// Create contexts for services and optional services
const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);//all main services of the bundle
  const [optionalServices, setOptionalServices] = useState([]);//all optional services
  const [selectedServices, setSelectedServices] = useState([]);//Selected optional services

  return (
    <ServicesContext.Provider
      value={{ services, setServices, optionalServices, setOptionalServices ,selectedServices,setSelectedServices}}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContext;
