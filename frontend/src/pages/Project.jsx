import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css';
import ProjectContext from '../context/ProjectContext';
import { useStepContext } from "../StepContext";

const Project = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const { handleNext } = useStepContext();
  const { Project, setProject } = React.useContext(ProjectContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(true);

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  useEffect(() => {
    const fetchExistingProjects = async () => {
      try {
        const response = await fetch('http://localhost:4007/api/project/all/');
        if (!response.ok) {
          throw new Error('Failed to fetch existing projects');
        }
        const data = await response.json();
        console.log(data)
        console.log("Putting it in Local Storage")
        
        //take it the projectdetails from the javascript object and convert it to array
        // const existingProjects = data.map(project => project.projectDetails);
        // console.log(existingProjects);
        // localStorage.setItem("existingProjects", JSON.stringify(existingProjects));

        localStorage.setItem('projects', JSON.stringify(data));

        // const existingProjects = data.project;
        // localStorage.setItem("existingProjects", JSON.stringify(existingProjects));
      } catch (error) {
        console.error('Error fetching existing projects:', error);
      }
    };

    fetchExistingProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  //   {
  //     "_id": "660be1202cdf3ab60a7e738f",
  //     "projectId": "m4yf55ll",
  //     "projectDetails": "ABC",
  //     "projectOwner": "A"
  // },
  // {
  //     "_id": "660c36470809dc82cb1fcf48",
  //     "projectId": "1e1cifhx",
  //     "projectDetails": "A",
  //     "projectOwner": "B"
  // },
    // Check if project details already exist

    const existingProjectsFromLocalStorage = JSON.parse(localStorage.getItem("projects")) || [];
    console.log("Existing Projects From Local Storage")
    console.log(existingProjectsFromLocalStorage)

    const isDetailsUnique = !existingProjectsFromLocalStorage.some(project => project.projectDetails === projectDetails && project.projectOwner === projectOwner);

    if (!isDetailsUnique) {
      console.log("NOT UNIQUE")
      setDetailsError("Project name already exists.");
      return;
    } else {
      console.log("UNIQUE")
      setDetailsError(""); // Clear error if details are unique
      setDetailsError("");
    }
    // Generate a unique project ID

    const projectId = generateUniqueId();

    localStorage.setItem('projectId', projectId);
    localStorage.setItem('projectDetails', projectDetails);
    localStorage.setItem('projectOwner', projectOwner);

    setProject({
      projectId,
      projectDetails,
      projectOwner
    });

    const updatedProjects = [...existingProjectsFromLocalStorage, { projectDetails, projectOwner }];
    localStorage.setItem("existingProjects", JSON.stringify(updatedProjects));

    console.log("THE DETAILS OF PROJ")
    console.log(projectId)
    console.log(projectDetails)
    console.log(projectOwner)
    // Send project data to the backend , TO STORE IN THE DB
    try {
      const response = await fetch('http://localhost:4007/api/project', {
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
        console.log("ERROR")
        throw new Error('Failed to send project data');
      }
      navigate('/ServicesSelection');
      handleNext();
    } catch (error) {
      console.error('Error sending project data:', error);
    }
  };

  const handleAuthentication = (e) => {
    e.preventDefault();
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setShowAuthModal(false);
    } else {
      setUsername('');
      setPassword('');
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="centered-form">
      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <h2>User Authentication</h2>
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
                <label htmlFor="password">Password:</label>
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

      {!showAuthModal && (
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>Project Details</h2>
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

