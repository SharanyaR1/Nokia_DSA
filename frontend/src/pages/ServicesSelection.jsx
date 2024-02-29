import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesSelection = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('');
  const [services, setServices] = useState(['Select']);
  const [selectedServices, setSelectedServices] = useState([]);

  const bundleOptions = [
    { id: 'volte', label: 'Volte' },
    { id: 'vonr', label: 'VoNR' },
    { id: 'full-network', label: 'Full Network' },
    { id: '5g', label: '5G' },
  ];

  // Function to handle change in the radio buttons
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Set services based on the selected option
    switch (e.target.value) {
      case 'volte':
        setServices([ 'Lawful Interception']);
        break;
      case 'vonr':
        setServices([ 'Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        break;
      case 'full-network':
        setServices([ 'Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        break;
      case '5g':
        setServices([ 'Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        break;
      default:
        setServices(['Select']);
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (service) => {
    if (selectedServices.includes(service)) {
      // Remove the service if already selected
      setSelectedServices((prevServices) => prevServices.filter((s) => s !== service));
    } else {
      // Add the service if not selected
      setSelectedServices((prevServices) => [...prevServices, service]);
    }
  };

  // Function to handle custom bundle button click
  const handleCustomBundle = () => {
    // Add your logic for handling custom bundle creation here
    console.log("Custom Bundle button clicked");
    // Navigate to CustomBundles.jsx page with selected services
    navigate('/custombundles');
  };

  return (
    <>
      <div className="bundle">
        <p>Select Bundle</p>
        {/* Use map to generate radio buttons dynamically */}
        {bundleOptions.map((option) => (
          <div key={option.id}>
            <input
              type="radio"
              id={option.id}
              value={option.id}
              checked={selectedOption === option.id}
              onChange={handleOptionChange}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
        <br />
        <p>Select Optional Services</p>
        {services.map((service, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`service-checkbox-${index}`}
              value={service}
              checked={selectedServices.includes(service)}
              onChange={() => handleCheckboxChange(service)}
            />
            <label htmlFor={`service-checkbox-${index}`}>{service}</label>
          </div>
        ))}
        
        <p>Custom Bundle</p>
        <button onClick={handleCustomBundle}>Custom Bundle</button>
      </div>
    </>
  );
};

export default ServicesSelection;
