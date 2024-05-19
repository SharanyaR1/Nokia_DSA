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

// Project.jsx-------------(initial)
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Project.css';
// import ProjectContext from '../context/ProjectContext';
// import { useStepContext } from "../StepContext"; // Importing the context hook

// const Project = () => {
//   const [projectDetails, setProjectDetails] = useState('');
//   const [projectOwner, setProjectOwner] = useState('');
//   const { handleNext } = useStepContext(); // Using the context hook
//   const { Project, setProject } = React.useContext(ProjectContext);
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

//     setProject({
//       projectId,
//       projectDetails,
//       projectOwner
//     });


//     // Send project data to the backend
//     try {
//       const response = await fetch('http://localhost:4007/api/project/', {
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

//       // Call handleNext to proceed to the next step in the stepper
//       handleNext(1);
//     } catch (error) {
//       console.error('Error sending project data:', error);
//       // Handle error
//     }
//   };

//   return (
//     <div className="centered-form">
//       <form className="form-container" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="projectDetails">
//           Project Details:
//           </label>
//           <input
//             id="projectDetails"
//             type="text"
//             className="input-field"
//             value={projectDetails}
//             onChange={(e) => setProjectDetails(e.target.value)}
//           />
       
//         </div>
         
//         <div className="form-group">
//         <label htmlFor="projectOwner">
//           Project Owner:
//           </label>
//           <input
//             id="projectOwner"
//             type="text"
//             className='input-field'
//             value={projectOwner}
//             onChange={(e) => setProjectOwner(e.target.value)}
//           />
      
//         </div>

//         <button className="submit-button" type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Project;

// with input validation
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css';
import ProjectContext from '../context/ProjectContext';
import { useStepContext } from "../StepContext"; // Importing the context hook

const Project = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const { handleNext } = useStepContext(); // Using the context hook
  const { Project, setProject } = React.useContext(ProjectContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(true); // State to manage authentication modal visibility

  const generateUniqueId = () => {
    // Generate a random 8-character alphanumeric string
    return Math.random().toString(36).substr(2, 8);
  };

  useEffect(() => {
    // Fetch existing projects from the API
    const fetchExistingProjects = async () => {
      try {
        const response = await fetch('http://localhost:4007/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch existing projects');
        }
        const data = await response.json();
        const existingProjects = data.projects; // Assuming the API response contains an array of projects
        localStorage.setItem("existingProjects", JSON.stringify(existingProjects));
      } catch (error) {
        console.error('Error fetching existing projects:', error);
        // Handle error
      }
    };

    fetchExistingProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!projectDetails.trim()) {
      setDetailsError('Project name cannot be empty.');
      return;
    } else {
      setDetailsError('');
    }
    if (!projectOwner.trim()) {
      setOwnerError('Project Owner cannot be empty.');
      return;
    } else {
      setOwnerError('');
    }

    // Check if project details already exist
    const existingProjectsFromLocalStorage = JSON.parse(localStorage.getItem("existingProjects")) || [];
    const isDetailsUnique = !existingProjectsFromLocalStorage.some(project => project.projectDetails === projectDetails && project.projectOwner === projectOwner);

    if (!isDetailsUnique) {
      setDetailsError("Project name already exists.");
      return;
    } else {
      setDetailsError(""); // Clear error if details are unique
    }

    // Generate a unique project ID
    const projectId = generateUniqueId();

    // Store the project ID and details in localStorage
    localStorage.setItem('projectId', projectId);
    localStorage.setItem('projectDetails', projectDetails);
    localStorage.setItem('projectOwner', projectOwner);

    setProject({
      projectId,
      projectDetails,
      projectOwner
    });

    // Save new project details to existing projects
    const updatedProjects = [...existingProjectsFromLocalStorage, { projectDetails, projectOwner }];
    localStorage.setItem("existingProjects", JSON.stringify(updatedProjects));

    // Send project data to the backend
    try {
      const response = await fetch('http://localhost:4007/api/project/', {
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
      handleNext();
    } catch (error) {
      console.error('Error sending project data:', error);
      // Handle error
    }
  };
  // Function to handle authentication
  const handleAuthentication = () => {
    // Hardcoded username and password for now
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setShowAuthModal(false); // Hide authentication modal if credentials are correct
    } else {
      // Clear input fields and display error
      setUsername('');
      setPassword('');
      alert('Invalid username or password. Please try again.');
    }
  };

 
  return (
    <div className="centered-form">
      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <h2> User Authentication</h2>
            <form onSubmit={handleAuthentication}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:  </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Main Form */}
      {!showAuthModal && (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectDetails">Project Name:</label>
            <input
              id="projectDetails"
              type="text"
              className="input-field"
              value={projectDetails}
              onChange={(e) => {
                setProjectDetails(e.target.value);
                setDetailsError('');
              }}
            />
            {detailsError && <p className="error-message">{detailsError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="projectOwner">Project Owner:</label>
            <input
              id="projectOwner"
              type="text"
              className='input-field'
              value={projectOwner}
              onChange={(e) => {
                setProjectOwner(e.target.value);
                setOwnerError('');
              }}
            />
            {ownerError && <p className="error-message">{ownerError}</p>}
          </div>

          <button className="submit-button" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Project;

