import React, { useState } from 'react';
import { useStepContext } from "../StepContext"; // Import the context hook
import ProjectContext from '../context/ProjectContext';
import ServicesContext from '../context/ServicesContext';
import CreatePackagePopup from '../components/CreatePackagePopup';
import { saveAs } from 'file-saver';
import LoginDialog from '../components/LoginDialog';

import './Production.css';

const Production = () => {
  const {Project, setProject} = React.useContext(ProjectContext);
  const {Services, setServices} = React.useContext(ServicesContext);

  const [showLogin, setShowLogin] = useState(true); // State to control login dialog visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to handle login form submission
  const handleLoginSubmit = async (loginData) => {
    // Send loginData to backend for authentication
    // Example:
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        // If authentication is successful, set isLoggedIn to true
        setIsLoggedIn(true);
      } else {
        // If authentication fails, display error message or handle as needed
        alert('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error
    }
  };

  console.log("The project details are ")
  console.log(Project)
  const { handleNext } = useStepContext(); // Using the context hook
  const [packageApprover, setPackageApprover] = useState('');
  const [nearApprover, setNearApprover] = useState('');
  const [customerRepoApprover, setCustomerRepoApprover] = useState('');
  const [productionApprover, setProductionApprover] = useState('');
  const [Action1status, setAction1Status] = useState('incomplete');
  const [Action2status, setAction2Status] = useState('incomplete');
  const [Action3status, setAction3Status] = useState('incomplete');
  const [Action4status, setAction4Status] = useState('incomplete');
  const [Action5status, setAction5Status] = useState('incomplete');



  //whatever from the response you want to store in the state, you can store it here
  const [Action1data, setAction1] = useState(null);
  const [Action2data, setAction2] = useState(null);
  const [Action3data, setAction3] = useState(null);
  const [Action4data, setAction4] = useState(null);
  const [Action5data, setAction5] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const handledownloadButtonClick = async () => {
    const response = await fetch('http://localhost:5000/download');
    const blob = await response.blob();
    saveAs(blob, 'boss-0.1.0.tgz');
  };

  const handleButtonClick = async (action) => {
    console.log(`Button "${action}" clicked`);
    const formattedData = {
      project_name: Project.projectDetails,
      version: "0.1.0",
      charts: Services
    };

    const formattedData2 = {
      project_name:Project.projectDetails,
      version: "0.1.0"
    };

    const formattedData3 = {
      project_name: Project.projectDetails
    };
     
    const jsonData = JSON.stringify(formattedData);
    const jsonData2 = JSON.stringify(formattedData2);
    const jsonData3 = JSON.stringify(formattedData3);
    
    console.log("The json data is ")
    console.log(jsonData)
    console.log(jsonData2)
    console.log(jsonData3)

     // IF the action is Create Package
     if (action === 'Create Package') {
      setLoading1(true);
  
      try {
        const response = await fetch('http://localhost:5000/aggregate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        });
  
        if (!response.ok) {
          throw new Error('Failed to create package');
        }
  
        const responseData = await response.json();
        console.log("The response1 received is ", responseData);
  
        setAction1(responseData);
        setLoading1(false);
        setAction1Status('completed');
      } catch (error) {
       
        console.error('Error creating package:', error);
        setLoading1(false);
        setAction1Status('failed')
        ;
      }
    }
    //IF the action is Push to NEAR
    if (action == 'Push to NEAR') {
      console.log("Inside push to NEAR")
      console.log(jsonData2)
      setLoading2(true);
      try {
        const response = await fetch('http://localhost:5000/pushtorepo',{

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData2
        });
        const json = await response.json();
        console.log("The response received is ")
        console.log(json);
        setAction2(json);
        setLoading2(false);
        setAction2Status('completed');


      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading2(false);
        setAction2Status('failed');
    };
    }

    //IF the action is Test
    if (action === 'Test') {
      console.log("Inside Test")
      console.log(jsonData3)
      setLoading3(true);
      try {
          const response = await fetch('http://localhost:5001/deployinprod', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: jsonData3
          });
          const responseData = await response.json(); // Changed variable name to responseData
          console.log("The response received is ");
          console.log(responseData); // Changed variable name to responseData
          setAction3(responseData); // Changed variable name to responseData
          setLoading3(false);
          setAction3Status('completed');
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading3(false);
          setAction3Status('failed');
      }
  }
  
    
    //IF the action is Push to Customer Repo
    if (action === 'Push to Customer Repo') {
      setLoading4(true);
      try {
        const response = await fetch('https://api.example.com/data');
        const jsonData = await response.json();
        console.log("The response received is ")
        console.log(jsonData);
        setAction4(jsonData);
        setLoading4(false);
        setAction4Status('completed');
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading4(false);
        setAction4Status('failed');
    };
    }

    //IF the action is Deploy in production
    if (action === 'Deploy in production') {
      setLoading5(true);
      try {
        const response = await fetch('https://api.example.com/data');
        const jsonData = await response.json();
        console.log("The response received is ")
        console.log(jsonData);
        setAction5(jsonData);
        setLoading5(false);
        setAction5Status('completed');
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading5(false);
        setAction5Status('failed');
    };
    }

  };


  return (
    <div className="production-container">
       {showLogin && !isLoggedIn && ( // Render login dialog if showLogin is true and user is not logged in
        <LoginDialog onSubmit={handleLoginSubmit} />
      )}
      { isLoggedIn && <div className="production-section">
        <button onClick={() => handleButtonClick('Create Package')}>Create Package</button>
        <label>Approver: </label>
        <input
          className="production-input"
          type="text"
          value={packageApprover}
          onChange={(e) => setPackageApprover(e.target.value)}
        />
        <div className="production-status">
          <label>Status: </label>
          {loading1? (
            <label className="status">Loading</label>
          ) : (
            <label className="status">{Action1status}</label>
          )}
        </div>
       
        <p>
        <div>
  {
    Action1status === 'completed' && 
    <button 
      className='Download' 
      onClick={handledownloadButtonClick} 
      style={{
        height: '50px',
        width:'200px',
        backgroundColor: '#4682B4',
        color: 'white', 
        border: 'none', 
        padding: '10px 20px', 
        borderRadius: '50px',
        display: 'inline-block',
        marginTop: '10px' // Adjust this value to add space between the button and the content above
      }}
    >
      Download
    </button>
  }

    {/* Conditionally render the popup when Action1status is 'completed' */}
    {Action1status === 'completed' && (
          <CreatePackagePopup
            message="Package created"
            isOpen={true}    
       // Replace with your trigger element
          />
        )}
</div>

        </p>
      </div> }

      <div className="production-section">
        <button onClick={() => handleButtonClick('Push to NEAR')}>Push to NEAR</button>
        <label>Approver: </label>
        <input
          className="production-input"
          type="text"
          value={nearApprover}
          onChange={(e) => setNearApprover(e.target.value)}
        />
        <div className="production-status">
          <label>Status: </label>
          {loading2? (
            <label  className="status">Loading</label>
          ) : (
            <label  className="status">{Action2status}</label>
          )}
        </div>
      </div>

      <div className="production-section"></div>
      <div className="production-section">
        <button onClick={() => handleButtonClick('Test')}>Test</button>
        <label>Approver: </label>
        <input
          className="production-input"
          type="text"
          value={customerRepoApprover}
          onChange={(e) => setCustomerRepoApprover(e.target.value)}
        />
        <div className="production-status">
          <label >Status: </label>
          {loading3 ? (
            <label  className="status">Loading</label>
          ) : (
            <label  className="status">{Action3status}</label>
          )}
        </div>
      </div>
      <div className="production-section">
        <button onClick={() => handleButtonClick('Push to Customer Repo')}>Push to Customer Repo</button>
        <label>Approver: </label>
        <input
          className="production-input"
          type="text"
          value={customerRepoApprover}
          onChange={(e) => setCustomerRepoApprover(e.target.value)}
        />
        <div className="production-status">
          <label>Status: </label>
          {loading4 ? (
            <label  className="status">Loading</label>
          ) : (
            <label  className="status">{Action4status}</label>
          )}
        </div>
      </div>

      <div className="production-section">
        <button onClick={() => handleButtonClick('Deploy in production')}>Deploy in production</button>
        <label>Approver: </label>
        <input
          className="production-input"
          type="text"
          value={productionApprover}
          onChange={(e) => setProductionApprover(e.target.value)}
        />
        <div className="production-status">
          <label>Status: </label>
          {loading5 ? (
            <label  className="status">Loading</label>
          ) : (
            <label  className="status">{Action5status}</label>
          )}
        </div>
      </div>
    </div>
  );
};


export default Production;
