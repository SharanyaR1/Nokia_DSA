import React, { useState } from 'react';

const services = ['Hss_ims', 'Hss_lte', 'Hss_auth']; 


//Service ': ['Optional A of Service ', 'Optional B of Service ']
const optionalServices = {
    'Hss_ims': ['Lawful Interception'],
    'Hss_lte': ['Lawful Interception'],
    'Hss_auth': [],
    'Service 4': ['Lawful Interception'],
  }; 
  
const FinalServicesPage = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedOptionalServices, setSelectedOptionalServices] = useState([]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleOptionalServiceSelect = (service) => {
    setSelectedOptionalServices(prevServices => [...prevServices, service]);
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
    borderRadius:'10px' // Changed from 'radius' to 'borderRadius'
  };

  return (
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
        <h3>Optional Dependencies</h3>
        {optionalServices[selectedService]?.map((service, index) => (
          <div key={index} style={commonStyles}>
            <input 
              type="checkbox" 
              name="optionalService" 
              value={service} 
              onChange={() => handleOptionalServiceSelect(service)}
            />
            {service}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalServicesPage;