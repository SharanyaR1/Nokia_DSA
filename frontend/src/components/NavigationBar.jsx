// NavigationBar.js
import React, { useState, useEffect } from 'react';
import logo from './logo.jpg';
import './NavigationBar.css';
import Stepper from './Stepper';

const NavigationBar = () => {

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode styles when isDarkMode changes
    const body = document.body;
    body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <img style={{ height: '100px' }} src={logo} alt="Logo" />

      <div>
      <Stepper
  // steps={servicesData.map(service => service.name)}
  // currentStep={currentStep}
  // complete={complete}
/>   
       </div>

      <div className="toggle-switch" onClick={toggleDarkMode}>
        <div className={`slider ${isDarkMode ? 'dark' : ''}`}></div>
      </div>
     
    </div>
  );
};

export default NavigationBar;
