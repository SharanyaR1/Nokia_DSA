// NavigationBar.js
import React from 'react';
import logo from './logo.jpg'
import '././NavigationBar.css';
const NavigationBar = () => {
  return (
    <div className="navbar">
      <img style={{height: "100px"}} src={logo} alt="Logo" />
    </div>
  );
};

export default NavigationBar;
