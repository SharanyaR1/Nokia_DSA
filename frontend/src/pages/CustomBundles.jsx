import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

import Service from './Service';
import DroppedServices from './DroppedServices';

const servicesList = [ 
    'Udm_uecm',
    'Udm_ueauth',
    'Udm_sdm',
    'Ausf_ueAuth',
    'Ausf_niddau',
    'EIR_deviceCheck',
    'Hss_ims',
    'HSS_lte',
    'Hlr_callp',
    'Hlr_auth',
];
  // Remove duplicates from the services list
  const uniqueServices = [...new Set(servicesList)];
  
  // Convert the services to the desired format
  const servicesData = uniqueServices.map((serviceName, index) => ({
    id: index + 1,
    name: serviceName,
  }));
  

const CustomBundles = () => {
  const navigate = useNavigate();
  const [droppedServices, setDroppedServices] = useState([]);

  const handleDrop = (service) => {
    setDroppedServices((prevServices) => [...prevServices, service]);
  };

  const handleViewSummary = () => {
    navigate('/dimensioningIP', { state: { droppedServices } });
  };

  const handlePrevious = () => {
    navigate('/ServicesSelection');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <div className="services-container">
          <h2>Available Services</h2>
          {servicesData.map((service) => (
            <Service key={service.id} service={service} onDrop={handleDrop} />
          ))}
        </div>
        <div className="divider"></div>
        <div className="dropped-services-container">
          <h2>Selected Services</h2>
          <DroppedServices droppedServices={droppedServices} />
        </div>
        <div className="button-container">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleViewSummary} disabled={droppedServices.length === 0}>NEXT</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default CustomBundles;
