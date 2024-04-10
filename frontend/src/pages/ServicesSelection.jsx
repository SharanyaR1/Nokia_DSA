// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ServicesSelection = () => {
//   const navigate = useNavigate();

//   const [selectedOption, setSelectedOption] = useState('');
//   const [services, setServices] = useState(['Select']);
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [bundleServices, setBundleServices] = useState([]);

//   const bundleOptions = [
//     { id: 'volte', label: 'Volte' },
//     { id: 'vonr', label: 'VoNR' },
//     { id: 'full-network', label: 'Full Network' },
//     { id: '5g', label: '5G' },
//   ];

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//     switch (e.target.value) {
//       case 'volte':
//         setServices(['Lawful Interception']);
//         setBundleServices("VoLTE")
//         break;
//       case 'vonr':
//         setServices(['Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
//         setBundleServices('VoNR')
//         break;
//       case 'full-network':
//         setServices(['Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
//         setBundleServices('Full Network [3G/4G/5G]')
//         break;
//       case '5g':
//         setServices(['Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
//         setBundleServices("5G Only")
//         break;
//       default:
//         setServices(['Select']);
//     }
//   };

//   const handleCheckboxChange = (service) => {
//     if (selectedServices.includes(service)) {
//       setSelectedServices((prevServices) => prevServices.filter((s) => s !== service));
//     } else {
//       setSelectedServices((prevServices) => [...prevServices, service]);
//     }
//   };

//   const handleCustomBundle = () => {
//     console.log("Custom Bundle button clicked");
//     navigate('/custombundles');
//   };

//   const handleSubmit = async () => {
//     console.log("Submit button clicked");
//     console.log("Service")
//     console.log(bundleServices)
//     try {
//       const response = await fetch('http://localhost:5001/api/bundleservices/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ "bundles":bundleServices }), // Sending selected services in the request body
//       });
//       const responseData = await response.json(); // Parse the response body as JSON
//       console.log(responseData);
  
//       if (!response.ok) {
//         throw new Error('Failed to submit selected services');
//       }

//       const inputObject = responseData
      
//       const servicesArray = inputObject.services.split(',').map((name, id) => ({ id, name }));
      
  
//       // Assuming successful submission, navigate to the DimensioningIP page
//       navigate('/dimensioningIP', { state: { servicesArray } });


//     } catch (error) {
//       console.error('Error submitting selected services:', error);
//     }
//   };
  
//   return (
//     <>
//       <div className="bundle">
//         <p>Select Bundle</p>
//         {bundleOptions.map((option) => (
//           <div key={option.id}>
//             <input
//               type="radio"
//               id={option.id}
//               value={option.id}
//               checked={selectedOption === option.id}
//               onChange={handleOptionChange}
//             />
//             <label htmlFor={option.id}>{option.label}</label>
//           </div>
//         ))}
//         <button onClick={handleSubmit}>Submit</button>
//         <br />
//         <p>Select Optional Services</p>
//         {services.map((service, index) => (
//           <div key={index}>
//             <input
//               type="checkbox"
//               id={`service-checkbox-${index}`}
//               value={service}
//               checked={selectedServices.includes(service)}
//               onChange={() => handleCheckboxChange(service)}
//             />
//             <label htmlFor={`service-checkbox-${index}`}>{service}</label>
//           </div>
//         ))}
//         <button onClick={handleCustomBundle}>Custom Bundle</button>
//         <br />
//       </div>
//     </>
//   );
// };

// export default ServicesSelection;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStepContext } from "../StepContext"; // Importing the context hook

const ServicesSelection = () => {
  const navigate = useNavigate();
  const { handleNext } = useStepContext(); // Using the context hook

  const [selectedOption, setSelectedOption] = useState('');
  const [services, setServices] = useState(['Select']);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bundleServices, setBundleServices] = useState([]);
  console.log("The optional services are")
  console.log(services)
  console.log("The newly selected optional services are")
  console.log(selectedServices)

  const bundleOptions = [
    { id: 'volte', label: 'Volte' },
    { id: 'vonr', label: 'VoNR' },
    { id: 'full-network', label: 'Full Network' },
    { id: '5g', label: '5G' },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    switch (e.target.value) {
      case 'volte':
        setServices(['Lawful Interception']);
        setBundleServices("VoLTE")
        break;
      case 'vonr':
        setServices(['Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        setBundleServices('VoNR')
        break;
      case 'full-network':
        setServices(['Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        setBundleServices('Full Network [3G/4G/5G]')
        break;
      case '5g':
        setServices(['Lawful Interception', 'Ausf_niddau', 'EIR_deviceCheck']);
        setBundleServices("5G Only")
        break;
      default:
        setServices(['Select']);
    }
  };

  const handleCheckboxChange = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices((prevServices) => prevServices.filter((s) => s !== service));
    } else {
      setSelectedServices((prevServices) => [...prevServices, service]);
    }
  };

  const handleCustomBundle = () => {
    console.log("Custom Bundle button clicked");
    navigate('/custombundles');
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked");
    console.log("Service")
    console.log("Bundle services before")
    console.log(bundleServices)

    
    try {
      const response = await fetch('http://localhost:5004/api/bundleservices/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "bundles":bundleServices }), // Sending selected services in the request body
      });
      const responseData = await response.json(); // Parse the response body as JSON
      console.log(responseData);
  
      if (!response.ok) {
        throw new Error('Failed to submit selected services');
      }

      const inputObject = responseData
      
      const servicesArray = inputObject.services.split(',').map((name, id) => ({ id, name }));

      console.log("The services array was")
      console.log(servicesArray)
      
      //combine the optional services to services array(selectedservices)


      servicesArray.push(...selectedServices.map((name, id) => ({ id: servicesArray.length + id, name })));

      console.log("The services array is")
      console.log(servicesArray)
      
  
      // Assuming successful submission, navigate to the DimensioningIP page
      navigate('/dimensioningIP', { state: { servicesArray } });

      // Call handleNext to proceed to the next step in the stepper
      handleNext();

    } catch (error) {
      console.error('Error submitting selected services:', error);
    }
  };

  return (
    <>
      <div className="bundle">
        <p>Select Bundle</p>
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
        <button onClick={handleSubmit}>Submit</button>
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
        <button onClick={handleCustomBundle}>Custom Bundle</button>
        <br />
      </div>
    </>
  );
};

export default ServicesSelection;
