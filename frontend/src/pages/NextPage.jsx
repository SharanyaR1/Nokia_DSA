import React, { useState } from 'react';

const NextPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [services, setServices] = useState(['Select']);

  // Function to handle change in the first dropdown
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Set services based on the selected option
    switch (e.target.value) {
      case 'volte':
        setServices(['Select', 'Lawful Interception']);
        break;
      case 'vonr':
        setServices(['Select', 'Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        break;
      case 'full-network':
        setServices(['Select', 'Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        break;
      case '5g':
        setServices(['Select', 'Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        break;
      default:
        setServices(['Select']);
    }
  };

  // Function to handle custom bundle button click
  const handleCustomBundle = () => {
    // Add your logic for handling custom bundle creation here
    console.log("Custom Bundle button clicked");
  };

  return (
    <>
      <div className="bundle">
        <p>Select Bundle</p>
        <select id="network-options" onChange={handleOptionChange} value={selectedOption}>
          <option value="">Select Bundle</option>
          <option value="volte">Volte</option>
          <option value="vonr">VoNR</option>
          <option value="full-network">Full Network</option>
          <option value="5g">5G</option>
        </select>
        <br />
        <p>Select Optional Service</p>
        <select id="service-options">
          {services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>
        
        <p>Custom Bundle</p>
        <button onClick={handleCustomBundle}>Custom Bundle</button>
       </div>
    </>
  );
};

export default NextPage;
