// SummaryPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const DimensioningIP = () => {
  // Check if location is undefined or null
//   if (!location) {
//     return <div>Error: Location is undefined or null</div>;
//   }
    const location = useLocation();
  // Access the state property with optional chaining (?.)
  const droppedServices = location.state?.droppedServices || [];

  return (
    <div>
      <h2></h2>
      <div>
        <h3>Dimensioning Input</h3>
        <ul>
          {droppedServices.map((service) => (
            <li key={service.id}>{service.name} <input type="number" /></li>
            
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default DimensioningIP;
