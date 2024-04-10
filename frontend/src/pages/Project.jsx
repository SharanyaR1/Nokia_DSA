// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Project.css';

// const Project = () => {
//   const [projectDetails, setProjectDetails] = useState('');
//   const [projectOwner, setProjectOwner] = useState('');
//   const navigate = useNavigate();

//   const generateUniqueId = () => {
//     // Generate a random 8-character alphanumeric string
//     return Math.random().toString(36).substr(2, 8);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Generate a unique project ID
//     const projectId = generateUniqueId();

//     // Store the project ID and details in localStorage
//     localStorage.setItem('projectId', projectId);
//     localStorage.setItem('projectDetails', projectDetails);
//     localStorage.setItem('projectOwner', projectOwner);

//     // Send project data to the backend
//     try {
//       const response = await fetch('http://localhost:4000/api/project/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           projectId,
//           projectDetails,
//           projectOwner
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send project data');
//       }

//       // Navigate to the Services Selection component
//       navigate('/ServicesSelection');
//     } catch (error) {
//       console.error('Error sending project data:', error);
//       // Handle error
//     }
//   };

//   return (
//     <div className="centered-form">
//       <form onSubmit={handleSubmit}>
//         <label>
//           Project Details:
//           <input
//             type="text"
//             value={projectDetails}
//             onChange={(e) => setProjectDetails(e.target.value)}
//           />
//         </label>

//         <label>
//           Project Owner:
//           <input
//             type="text"
//             value={projectOwner}
//             onChange={(e) => setProjectOwner(e.target.value)}
//           />
//         </label>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Project;

// Project.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css';
import { useStepContext } from "../StepContext"; // Importing the context hook

const Project = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const { handleNext } = useStepContext(); // Using the context hook
  const navigate = useNavigate();

  const generateUniqueId = () => {
    // Generate a random 8-character alphanumeric string
    return Math.random().toString(36).substr(2, 8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique project ID
    const projectId = generateUniqueId();

    // Store the project ID and details in localStorage
    localStorage.setItem('projectId', projectId);
    localStorage.setItem('projectDetails', projectDetails);
    localStorage.setItem('projectOwner', projectOwner);

    // Send project data to the backend
    try {
      const response = await fetch('http://localhost:4005/api/project/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId,
          projectDetails,
          projectOwner
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send project data');
      }

      // Navigate to the Services Selection component
      navigate('/ServicesSelection');

      // Call handleNext to proceed to the next step in the stepper
      handleNext(1);
    } catch (error) {
      console.error('Error sending project data:', error);
      // Handle error
    }
  };

  return (
    <div className="centered-form">
      <form onSubmit={handleSubmit}>
        <label>
          Project Details:
          <input
            type="text"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
          />
        </label>

        <label>
          Project Owner:
          <input
            type="text"
            value={projectOwner}
            onChange={(e) => setProjectOwner(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Project;


