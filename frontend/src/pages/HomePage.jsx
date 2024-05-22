


// HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWizard } from '../context/WizardContext';
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
  const { handleMenuSelection } = useWizard(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const handleManageProjectsClick = () => {
    handleMenuSelection('Manage');
    handleMenuSelection('Observe');
  };

  const handleCreateNewProjectClick = () => {
    handleMenuSelection('Project');
    handleMenuSelection('Services Selection');
    handleMenuSelection('Dimensioning Input');
    handleMenuSelection('Dimensioning Output');
    handleMenuSelection('Production');
    handleMenuSelection('CustomBundles');
  };

  const handleLoginAsServiceOwner = () => {
    setIsLoggedIn(false);
    // Additional logic for Service Owner if needed
  };

  const handleLoginAsSolutionArchitect = () => {
    setIsLoggedIn(true);
    // Additional logic for Solution Architect if needed
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page-container">
        <div className="login-form">
          <h2>Login As</h2>
          <div className="buttons-container">
            <button onClick={handleLoginAsSolutionArchitect}>Solution Architect</button>
            <Link to="http://localhost:3001">
            <button onClick={handleLoginAsServiceOwner}>Service Owner</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page-container">
      <div className="homepage-form">
        <h2>Dynamic Service Aggregator</h2>
        <div className="buttons-container">
          <Link to="/Project">
            <button onClick={handleCreateNewProjectClick}>Create New Project</button>
          </Link>
          <Link to="/Contact">
            <button onClick={handleManageProjectsClick}>Manage Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


