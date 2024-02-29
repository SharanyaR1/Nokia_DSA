import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css';

const Project = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Project Details:', projectDetails);
    console.log('Project Owner:', projectOwner);

    // Navigate to the Services Selection component
    navigate('/ServicesSelection');
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