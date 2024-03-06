import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
    <h2>Welcome to the Project Management System</h2>
      <div className="buttons-container">
        <Link to="/Project">
          <button>Create New Project</button>
        </Link>
        <Link to="/Contact">
          <button>Manage Projects</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
