// import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './HomePage.css';

// const HomePage = () => {
//   return (
//     <div className="home-page-container">
//     <h2>Dynamic Service Aggregator</h2>
//       <div className="buttons-container">
//         <Link to="/Project">
//           <button>Create New Project</button>
//         </Link>
//         <Link to="/Contact">
//           <button>Manage Projects</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useWizard } from '../context/WizardContext'; 

// const HomePage = () => {
//   const { handleMenuSelection } = useWizard(); 

//   const handleManageProjectsClick = () => {
//     handleMenuSelection('Manage');
//   };

//   const handleCreateNewProjectClick = () => {
//     handleMenuSelection('Project');
//   };

//   return (
//     <div className="home-page-container">
//       <h2>Dynamic Service Aggregator</h2>
//       <div className="buttons-container">
//         <Link to="/Project">
//           <button onClick={handleCreateNewProjectClick}>Create New Project</button>
//         </Link>
//         <Link to="/Contact">
//           <button onClick={handleManageProjectsClick}>Manage Projects</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWizard } from '../context/WizardContext';
import "./HomePage.css";

const HomePage = () => {
  const { handleMenuSelection } = useWizard(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleManageProjectsClick = () => {
    handleMenuSelection('Manage');
    handleMenuSelection('Observe');
  };

  const handleCreateNewProjectClick = () => {
    handleMenuSelection('Project');
    handleMenuSelection('ServicesSelection');
    handleMenuSelection('DimensioningIP');
    handleMenuSelection('DimensioningOP');
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
            <button onClick={handleLoginAsServiceOwner}>Service Owner</button>
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


