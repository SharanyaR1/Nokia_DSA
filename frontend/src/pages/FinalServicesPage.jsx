import React, { useState, useContext } from 'react';
import ServicesContext from '../context/ServicesContext';
import { useNavigate } from "react-router-dom";

const FinalServicesPage = () => {
  const {selectedServices, setSelectedServices, services, setServices, optionalServices, setOptionalServices} = React.useContext(ServicesContext);
  const navigate = useNavigate();
  const handleServiceSelect = (service) => {
    setSelectedServices(prevServices => {
      return [...prevServices, service];
    });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleOptionalServiceSelect = (service, isChecked) => {
    setSelectedServices(prevServices => {
      if (isChecked) {
        // If the checkbox is checked, add the service to the array
        return [...prevServices, service];
      } else {
        // If the checkbox is unchecked, remove the service from the array
        return prevServices.filter(s => s !== service);
      }
    });
  };

  const handleSubmit = () => {
    navigate("/dimensioningIP", {
      state: {
        servicesArray: [...services, ...selectedServices].map((name, id) => ({
          id,
          name,
        })),
      },
    });
  };

  const commonStyles = {
    display: 'block', 
    width: '95%', 
    padding: '10px', 
    margin: '10px 0',
    fontSize: '16px',
    border: '1px solid black', 
    backgroundColor: '#f8f8f8', 
    cursor: 'pointer',
    color:'black',
    borderRadius:'10px'
  };

  return (
    <div>
    <div style={{ display: 'flex', marginTop: '50px' }}>
      <div style={{ border: '1px solid black', color:'black',padding: '10px', marginRight: '20px', width: '300px', maxHeight: '300px', overflowY: 'auto' }}>
        <h3>Services</h3>
        {services.map((service, index) => (
          <button key={index} style={commonStyles} onClick={() => handleServiceSelect(service)}>
            {service}
          </button>
        ))}
      </div>
      <div style={{border: '1px solid black', padding: '10px', width: '300px', maxHeight: '300px', overflowX: 'hidden' }}>
        <h3>Optional Services</h3>
        {optionalServices.map((service, index) => (
          <div key={index} style={commonStyles}>
            <input 
              type="checkbox" 
              name="optionalService" 
              value={service} 
              onChange={(e) => handleOptionalServiceSelect(service, e.target.checked)}
            />
            {service}
          </div>
        ))}
      </div>
      </div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
   
    </div>
  );
};

export default FinalServicesPage;