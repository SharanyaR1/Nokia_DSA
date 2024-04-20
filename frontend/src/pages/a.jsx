import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Project.css";
import ProjectContext from "../context/ProjectContext";
import { useStepContext } from "../StepContext"; // Importing the context hook

const Project = () => {
  const [projectDetails, setProjectDetails] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  // const { handleNext } = useStepContext(); // Using the context hook
  const { Project, setProject } = React.useContext(ProjectContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProjectDetails = localStorage.getItem("projectDetails");
    const savedProjectOwner = localStorage.getItem("projectOwner");
    if (savedProjectDetails) {
      setProjectDetails(savedProjectDetails);
    }
    if (savedProjectOwner) {
      setProjectOwner(savedProjectOwner);
    }
  }, []);

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique project ID
    const projectId = generateUniqueId();

    // Store the project ID and details in localStorage
    localStorage.setItem("projectId", projectId);
    localStorage.setItem("projectDetails", projectDetails);
    localStorage.setItem("projectOwner", projectOwner);

    setIsSubmitted(true);

    try {
      const response = await fetch("http://localhost:4004/api/project/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          projectDetails,
          projectOwner,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send project data");
      }

      // Navigate to the Services Selection component
      navigate("/ServicesSelection");

      // Call handleNext to proceed to the next step in the stepper
      handleNext(1);
    } catch (error) {
      console.error("Error sending project data:", error);
      // Handle error
    }
  };

  const handleNext = async () => {
    navigate("/ServicesSelection");
  };

  return (
    <div className="centered-form">
      <form
        onSubmit={isSubmitted ? handleNext : handleSubmit}
        className="form-container"
      >
        <div className="form-group">
          <label htmlFor="projectDetails">Project Details:</label>
          <input
            id="projectDetails"
            className="input-field"
            type="text"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectOwner">Project Owner:</label>
          <input
            id="projectOwner"
            className="input-field"
            type="text"
            value={projectOwner}
            onChange={(e) => setProjectOwner(e.target.value)}
            required
          />
        </div>

        <button className="submit-button" type="submit">
          {isSubmitted ? "Next" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Project;
