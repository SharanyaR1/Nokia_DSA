
import React, { useState,useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import ServicesContext from '../context/ServicesContext';
import { useStepContext } from "../StepContext"; // Import the context hook
// import services from "../config/dimensioning-services.services-dependency.json"; // Importing the configuration file
import "./CustomBundles.css";
import Service from './Service';
import DroppedServices from './DroppedServices';

const CustomBundles = () => {
  const navigate = useNavigate();
  const { handleNext, handlePrevious } = useStepContext(); // Using the context hook
  // const [droppedServices, setDroppedServices] = useState([]);
  const { droppedServices, setDroppedServices } = React.useContext(ServicesContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [services,setServices]=useState([])

  useEffect(() => {
    fetch('http://localhost:5009/api/config/custom/ ')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const servicesList = services.reduce((acc, item) => {
    return acc.concat(item.dependency.mainService);
  }, []);
  
/*
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
   */

  const uniqueServices = [...new Set(servicesList)];
  const servicesData = uniqueServices.map((serviceName, index) => ({
    id: index + 1,
    name: serviceName,
  }));

  const handleDrop = (service) => {
    setDroppedServices((prevServices) => [...prevServices, service]);
  };

  const handleRemove = (service) => {
    setDroppedServices((prevServices) =>
      prevServices.filter((s) => s.id !== service.id)
    );
  };


  const handleViewSummary = () => {
    // navigate('/dimensioningIP', { state: { droppedServices } });
    navigate('/finalcustomservices',{ state: { droppedServices } });
    handleNext(); // Set a specific value instead of incrementing by 1
  };

  const handlePrev = () => {
    // Reset completion status when going back
    navigate('/ServicesSelection');
    //handlePrevious(); // Call handlePrevious from the stepper context
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {console.log("DROPPEDSERVICES")}
      {console.log(droppedServices)}
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
          <DroppedServices droppedServices={droppedServices} onRemove={handleRemove}/>
        </div>
        <div className="button-container">
        <button onClick={handlePrev} >Previous</button>
          <button onClick={handleViewSummary} disabled={droppedServices.length === 0}>Next</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default CustomBundles;

