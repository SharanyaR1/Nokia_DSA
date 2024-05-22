
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStepContext } from "../StepContext"; // Import the context hook
import "./DimensioningIP.css";

const DimensioningIP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleNext, handlePrevious } = useStepContext(); // Using the context hook
  const droppedServices = location.state?.droppedServices || location.state?.servicesArray || [];
  const [projectId, setProjectId] = useState('');
  const [inputs, setInputs] = useState({});
  const [selectedVersions, setSelectedVersions] = useState({});
  
  /*INSTEAD GLOBAL PROJECT ID CAN BE TAKEN FROM THE GLOBAL PROJECT VARIABLE*/
  useEffect(() => {
    // Fetch project ID when the component mounts
    fetch('http://localhost:4007/api/project')
      .then(response => response.json())
      .then(data => {
        setProjectId(data[0]?.projectId);
      })
      .catch(error => {
        console.error('Error fetching project ID:', error);
      });
  }, []); 

  const handleInputChange = (event, serviceName) => {
    const { value } = event.target;
    setInputs({ ...inputs, [serviceName]: value });
  };

  const handleVersionChange = (event, serviceName) => {
    const { value } = event.target;
    setSelectedVersions({ ...selectedVersions, [serviceName]: value });
  };

  const handleMasterVersionChange = (event) => {
    const { value } = event.target;
    const updatedVersions = {};
    droppedServices.forEach(service => {
      updatedVersions[service.name] = value;
    });
    setSelectedVersions(updatedVersions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = inputs;

    const combinedHashMap = { ...data, projectId };

    console.log("The combined hashmap")
    console.log(combinedHashMap)
    
    fetch('http://localhost:5009/api/calculation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(combinedHashMap)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      navigate('/output');
      handleNext(); // Call handleNext from the stepper context
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  const handlePrev = () => {
    navigate('/ServicesSelection');
    handlePrevious(); // Call handlePrevious from the stepper context
  };

  return (
    <div className="dimensioning-ip">
      <h2></h2>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Dimensioning Input</h3>
          <select onChange={handleMasterVersionChange}>
                  <option value="">Select version</option>
                  <option value="Latest">Latest</option>
                  <option value="1.0">1.0</option>
                  <option value="2.0">2.0</option>
            {/* Add more options if needed */}
          </select>
          <ul>
            {droppedServices.map((service) => (
              <li key={service.id}>
                {service.name}{' '}
                <select
                  value={selectedVersions[service.name] || ''}
                  onChange={(event) => handleVersionChange(event, service.name)}
                >
                  
                  {/* Assuming versions are fetched from somewhere */}
                  <option value="">Select</option>
                  <option value="Latest">Latest</option>
                  <option value="1.0">1.0</option>
                  <option value="2.0">2.0</option>
                  {/* Add more options if needed */}
                </select>
                <input
                  type="number"
                  placeholder="Traffic Input"
                  value={inputs[service.name] || ''}
                  onChange={(event) => handleInputChange(event, service.name)}
                />
              </li>
            ))}
          </ul>
          <div className="btns">
             <button onClick={handlePrev}>Previous</button>
             <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DimensioningIP;
