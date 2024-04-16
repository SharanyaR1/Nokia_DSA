// import React, { createContext, useState, useContext } from 'react';

// const WizardContext = createContext();

// export const WizardProvider = ({ children }) => {
//   const [visiblePages, setVisiblePages] = useState(['Home']); // Initialize state for visible pages

//   const handleMenuSelection = (selectedPage) => {
//     setVisiblePages([selectedPage]); // Function to update the visible pages state
//   };

//   return (
//     <WizardContext.Provider value={{ visiblePages, handleMenuSelection }}>
//       {children}
//     </WizardContext.Provider>
//   );
// };

// export const useWizard = () => useContext(WizardContext); // Custom hook to consume the context

// WizardContext.js
import React, { createContext, useState, useContext } from 'react';

const WizardContext = createContext();

export const WizardProvider = ({ children }) => {
  const [selectedPages, setSelectedPages] = useState(['Home']); // Initialize state for selected pages

  const handleMenuSelection = (selectedPage) => {
    setSelectedPages((prevSelectedPages) => {
      // If selectedPage is "Project", reset selectedPages to contain only "Home"
      if (selectedPage === "Project") {
        return ["Home","Project"];
      } 
      else if (selectedPage === "Manage") {
        return ["Home","Manage"];
      }
      else if (!prevSelectedPages.includes(selectedPage)) {
        // If selectedPage is not already included, add it to selectedPages
        return [...prevSelectedPages, selectedPage];
      } else {
        // If selectedPage is already included, remove it from selectedPages
        return prevSelectedPages.filter((page) => page !== selectedPage);
      }
    });
  };

  return (
    <WizardContext.Provider value={{ selectedPages, handleMenuSelection }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => useContext(WizardContext); // Custom hook to consume the context
