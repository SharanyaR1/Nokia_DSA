import React, { createContext, useContext, useState } from 'react';

const StepContext = createContext();

export const useStepContext = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handleNext = () => {
    console.log();
    if(currentStep === 1)
    {
      setCurrentStep(prev => prev + 1);
    }
   
    
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <StepContext.Provider value={{ currentStep, complete, handleNext, handlePrevious }}>
      {children}
    </StepContext.Provider>
  );
};
