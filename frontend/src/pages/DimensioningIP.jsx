// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


// const DimensioningIP = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const droppedServices = location.state?.droppedServices || [];

//   // State to track input values
//   const [inputs, setInputs] = useState({});

//   // Function to handle input change
//   const handleInputChange = (event, serviceName) => {
//     const { value } = event.target;
//     setInputs({ ...inputs, [serviceName]: value });
   
//   };

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Submitting inputs:', inputs);


//     const data = inputs;
    
//   console.log(data)
//  fetch('http://localhost:5000/api/calculation', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('Success:', data);
//   navigate('/output')
// })
// .catch(error => {
//   console.error('Error:', error);
// });

//     // You can add code here to handle the submission
//     //now go to /output page


//   };

//   return (
//     <div>
//       <h2></h2>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <h3>Dimensioning Input</h3>
//           <ul>
//             {droppedServices.map((service) => (
//               <li key={service.id}>
//                 {service.name}{' '}
//                 <input
//                   type="number"
//                   value={inputs[service.name] || ''}
//                   onChange={(event) => handleInputChange(event, service.name)}
//                 />
//               </li>
//             ))}
//           </ul>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DimensioningIP;
// Import useEffect hook to make a side effect when the component mounts
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DimensioningIP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("These are the dropped services")

  const droppedServices = location.state?.droppedServices || location.state?.servicesArray || [];
  console.log(droppedServices)
  console.log("Dropped")
  console.log(droppedServices)
  const [projectId, setProjectId] = useState('');
  const [inputs, setInputs] = useState({});
  let proj={ }

  useEffect(() => {
    // Fetch project ID when the component mounts
    fetch('http://localhost:4005/api/project')
      .then(response => response.json())
      .then(data => {
        setProjectId(data[0]?.projectId);
        proj["projectId"]=data[0]?.projectId
        
        console.log(data[0]?.projectId);
        console.log(proj)
        
      })
      .catch(error => {
        console.error('Error fetching project ID:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleInputChange = (event, serviceName) => {
    const { value } = event.target;
    setInputs({ ...inputs, [serviceName]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = inputs
    proj["projectId"]=projectId
    console.log("This is the project Idddd")
    console.log(proj)
    let combinedHashMap = { ...data, ...proj};
    console.log("This is the combined hash")


    console.log(combinedHashMap)

    
    

    fetch('http://localhost:5005/api/calculation', {
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
    console.log("hey")
    combinedHashMap = { ...data, ...projectId };
    console.log(combinedHashMap)

      console.log('Success:', combinedHashMap);
      navigate('/output')
    })
    .catch(error => {
      console.error('Error that has occured :', error);
    });
  };
  
  const handlePrevious = () => {
    navigate('/ServicesSelection');
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
          <button onClick={handlePrevious}>Previous</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DimensioningIP;