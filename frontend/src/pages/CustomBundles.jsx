import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

import Service from './Service';
import DroppedServices from './DroppedServices';
//import './App.css';

const servicesList = [
    'Hss_ims', 'HSS_lte',
    'Hss_auth', 'Lawful Interception', 'Hss_ims',
    'Lawful Interception',
    'Hss_auth',
    'Ausf_niddau',
    'Ausf_ueAuth',
    'EIR_deviceCheck',
    'Udm_uecm',
    'Udm_ueauth',
    'Udm_sidf',
    'Udm_sdm',
    'Hss_ims',
    'Lawful Interception',
    'Hss_auth',
    'Ausf_niddau',
    'HSS_lte',
    'EIR_deviceCheck',
    'Ausf_ueAuth',
    'Udm_uecm',
    'Udm_ueauth',
    'Udm_sidf',
    'Udm_sdm',
    'Hlr_callp',
    'Hlr_auth',
    'Ausf_ueAuth',
    'Lawful Interception',
    'Udm_uecm',
    'Ausf_niddau',
    'Udm_ueauth',
    'EIR_deviceCheck',
    'Udm_sidf',
    'Udm_sdm',
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
    // Navigate to SummaryPage with dropped services as state
    navigate('/dimensioningIP', { state: { droppedServices } });
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
          <button  onClick={handleViewSummary} disabled={droppedServices.length === 0} >NEXT</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default CustomBundles;
