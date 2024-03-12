import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const DimensioningIP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const droppedServices = location.state?.droppedServices || [];

  // State to track input values
  const [inputs, setInputs] = useState({});

  // Function to handle input change
  const handleInputChange = (event, serviceName) => {
    const { value } = event.target;
    setInputs({ ...inputs, [serviceName]: value });
   
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting inputs:', inputs);


    const data = inputs;
    
  console.log(data)
 fetch('http://localhost:5000/api/calculation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
  navigate('/output')
})
.catch(error => {
  console.error('Error:', error);
});

    // You can add code here to handle the submission
    //now go to /output page


  };

  return (
    <div>
      <h2></h2>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Dimensioning Input</h3>
          <ul>
            {droppedServices.map((service) => (
              <li key={service.id}>
                {service.name}{' '}
                <input
                  type="number"
                  value={inputs[service.name] || ''}
                  onChange={(event) => handleInputChange(event, service.name)}
                />
              </li>
            ))}
          </ul>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DimensioningIP;
