import React, { useEffect, useState } from 'react';
import { useStepContext } from "../StepContext";
import { useNavigate, useLocation } from 'react-router-dom';
import ServicesContext from '../context/ServicesContext';
import './FinalServicesPage.css';

const FinalCustomServicesPage = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [optionalServices, setOptionalServices] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const services = location.state?.droppedServices || [];
  const servicesname = services.map(service => service.name);
  const { droppedServices, setDroppedServices } = React.useContext(ServicesContext);
  const { handleNext, handlePrevious } = useStepContext();

  useEffect(() => {
    console.log("Component rendered");
    console.log("LOCATION STATE", location.state);
    console.log("SERVICES IN USEEFFECT", services);

    if (servicesname.length > 0) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5009/api/config/optionaldependency/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicesname)
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Data from API:', data);
          // Map optional services to match the format of dropped services
          const formattedOptionalServices = data.map((service, index) => ({
            id: services.length + index + 1, // Assign a new ID based on the length of dropped services
            name: service
          }));
          setOptionalServices(formattedOptionalServices);

        } catch (error) {
          console.error('Failed to fetch optional services:', error);
        }
      };

      fetchData();
    } else {
      console.log("Services array is empty on initial render.");
    }
  }, []);

  useEffect(() => {
    console.log("OptionalServicesUpdatedFinally");
    console.log(optionalServices);
  }, [optionalServices]);

  const handleServiceSelect = (service) => {
    setSelectedServices((prevServices) => [...prevServices, service]);
    console.log("Selected Services CHECK")
    console.log(selectedServices)
  };

  const handlePrev = () => {
    navigate(-1);
    handlePrevious();
  };

  const handleOptionalServiceSelect = (service, isChecked) => {
    console.log(service)
    console.log(isChecked)
    setSelectedServices((prevServices) => {
      if (isChecked) {
        return [...prevServices, service];

      } else {
        return prevServices.filter((s) => s !== service);
      }
    });
    console.log("CHECK")
    console.log(selectedServices)
  };

  const handleSubmit = () => {
    console.log(selectedServices)
    console.log("HANDLE SUBMIT");
    console.log(droppedServices);
    console.log(optionalServices);
    console.log("LOC")
    console.log(location)
    const combinedServices = [...droppedServices, ...selectedServices];
    navigate('/dimensioningIP', { state: { combinedServices } });
    
  };

  return (
    <div className="final-services-container">
      {console.log("Rendering FinalCustomServicesPage")}
      {console.log("Current services:", services)}
      {console.log("Current optional services:", optionalServices)}

      <div className="flex-container">
        <div className="services-list-container">
          <h3>Services</h3>
          {services.map((service, index) => (
            <button
              key={index}
              className="service-button"
              onClick={() => handleServiceSelect(service)}
            >
              {service.name}
            </button>
          ))}
        </div>
        <div className="optional-services-list-container">
          <h3>Optional Dependencies</h3>
          {optionalServices.map((service, index) => (
            <label key={index} className="optional-service-item">
              <input
                type="checkbox"
                name="optionalService"
                value={service.name}
                onChange={(e) => handleOptionalServiceSelect(service, e.target.checked)}
              />
              {service.name}
              
            </label>
          ))}
        </div>
      </div>
      <div className="buttons-container">
        <button className="action-button" onClick={handlePrev}>Previous</button>
        <button className="action-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default FinalCustomServicesPage;
