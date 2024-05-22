import React, { useState, useEffect } from 'react';
import { useStepContext } from "../StepContext"; // Import the context hook
import ProjectContext from '../context/ProjectContext';
import ServicesContext from '../context/ServicesContext';
import CreatePackagePopup from '../components/CreatePackagePopup';
import { saveAs } from 'file-saver';
import LogsPopup from './LogsPopUp';
import LogsPopup2 from './LogsPopUp2';
import LoginDialog from '../components/LoginDialog';
import { Checkmark } from 'react-checkmark' // checkmark-icon
import CheckStatusPopup from '../components/CheckStatusPopup';

import './Production.css';

const Production = () => {

  const { handleNext } = useStepContext(); // Using the context hook
  const [packageApprover, setPackageApprover] = useState('');
  const [nearApprover, setNearApprover] = useState('');
  const [customerRepoApprover, setCustomerRepoApprover] = useState('');
  const [productionApprover, setProductionApprover] = useState('');

  const [isOpen, setIsOpen] = useState(false);

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
  const [action1Success, setAction1Success] = useState(false);
  const [action2Success, setAction2Success] = useState(false);
  const [action3Success, setAction3Success] = useState(false);
  const [action4Success, setAction4Success] = useState(false);
  const [action5Success, setAction5Success] = useState(false);

  // Use useEffect to monitor the success status of each action
  useEffect(() => {
    // Enable Action 2 button if Action 1 is successful
    if (Action1status === 'completed') {
      setAction2Success(true);
    } else {
      setAction2Success(false);
    }
  }, [Action1status]);

  useEffect(() => {
    // Enable Action 3 button if Action 2 is successful
    if (Action2status === 'completed') {
      setAction3Success(true);
    } else {
      setAction3Success(false);
    }
  }, [Action2status]);

  useEffect(() => {
    // Enable Action 4 button if Action 3 is successful
    if (Action3status === 'completed') {
      setAction4Success(true);
    } else {
      setAction4Success(false);
    }
  }, [Action3status]);

  useEffect(() => {
    // Enable Action 5 button if Action 4 is successful
    if (Action4status === 'completed') {
      setAction5Success(true);
    } else {
      setAction5Success(false);
    }
  }, [Action4status]);

  const handlePopupClose = () => {
    setIsOpen(false);
  };


  //This is for the setstatus output to appear in the UI
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState('');

  const { Project, setProject } = React.useContext(ProjectContext);
  const { services, setServices } = React.useContext(ServicesContext);

  const [showLogin, setShowLogin] = useState(false); // State to control login dialog visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  function formatPodStatus(inputStr) {
    // Split the input string into lines
    const lines = inputStr.split('\n');

    // Extract column headings and data
    const columnHeadings = lines[0].split(/\s+/);
    const data = lines.slice(1).map(line => line.split(/\s+/));

    // Find maximum length for each column
    const columnWidths = columnHeadings.map((_, i) =>
      Math.max(...data.map(row => (row[i] ? row[i].toString().length : 0)))
    );

    // Format each line
    const formattedLines = [];
    formattedLines.push(columnHeadings.join(' '));
    data.forEach(row => {
      const formattedRow = row.map((item, i) =>
        (item ? item.toString().padEnd(columnWidths[i]) : '').padEnd(columnWidths[i])
      ).join(' ');
      formattedLines.push(formattedRow);
    });

    // Join the formatted lines
    return formattedLines.join('\n');
  }
  // Function to handle login form submission
  const handleLoginSubmit = async (loginData) => {
    // Send loginData to backend for authentication
    // Example:
    // try {
    //   const response = await fetch('http://localhost:5000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(loginData)
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     // If authentication is successful, set isLoggedIn to true
    setIsLoggedIn(true);
    //     } else {
    //       // If authentication fails, display error message or handle as needed
    //       alert('Authentication failed. Please try again.');
    //     }
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //     // Handle error
    //   }
    // };
  }

  console.log("The project details are ")
  console.log(Project)


  const checkstatus = async () => {
    setIsOpen(true);
    const project_name = Project.projectDetails; // Assuming Project.projectDetails contains the project name
    const data = { project_name: project_name };
    console.log("Inside checkstatus")
    console.log(data)
    const response = await fetch('http://localhost:5002/checkstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });


    const jsonData = await response.json();

    console.log("The response received for status is ");
    console.log(jsonData);
    setStatus(jsonData.result);
    console.log("The status is ")
    // setOutput(formatPodStatus(status));
  };

  const handledownloadButtonClick = async () => {

    const project_name = Project.projectDetails
    const response = await fetch(`http://localhost:5000/download`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ project_name: project_name })
      }
    );
    const blob = await response.blob();
    saveAs(blob, `${project_name}-0.1.0.tar`);

  };
  const handleButtonClick = async (action) => {
    console.log(`Button "${action}" clicked`);
    const formattedData = {
      project_name: Project.projectDetails,
      version: "0.1.0",
      charts: services
    };

    console.log("The Services are")
    console.log(services)

    const formattedData2 = {
      project_name: Project.projectDetails,
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
    //the response from the server. If the server returns a successful response (status code 200-299),
    if (action === 'Create Package') {
      setLoading1(true);
      console.log("Inside Create Package button 1")
      console.log(jsonData)
      try {
        const responsePromise = fetch('http://localhost:5000/aggregate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        });


        const response = await responsePromise;
        const responseData = await response.json();
        console.log("The response1 received is ", responseData);

        //
        if (!response.ok) {
          throw new Error('Failed to create package');
        }
        setAction1(responseData);
        setLoading1(false);
        // setAction1Status(<Checkmark size='medium' alt='completed' />);
        setAction1Status('completed')
      } catch (error) {
        //so in this there is no response also when the project name is emptyy in the request it gives 500 error 
        console.error('Error creating package:', error);
        setLoading1(false);
        setAction1Status('failed');
      }
    }




    
    //IF the action is Push to NEAR
    if (action == 'Push to NEAR') {
      console.log("Inside push to NEAR")
      console.log(jsonData2)
      setLoading2(true);
      try {
        const response = await fetch('http://localhost:5000/pushtorepo', {

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
        // setAction2Status(<Checkmark size='medium' alt='completed' />);
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
        // setAction3Status(<Checkmark size='medium' alt='completed' />);
        setAction3Status('completed')
        handleNext();
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
        // setAction4Status(<Checkmark size='medium' alt='completed' />);
        setAction4Status('completed')
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
        // setAction5Status(<Checkmark size='medium' alt='completed' />);
        setAction5Status('completed')
        handleNext();
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading5(false);
        setAction5Status('failed');
      };
    }

  };


  return (
    <div className="production-container">
      
      {<div className="production-section">
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
          {loading1 ? (
            <label className="status">Loading
              <img
                className="350.gif"
                src="/350.gif" // Replace with the path to your loading GIF
              />
            </label>
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
                  width: '150px',
                  backgroundColor: '#4682B4',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  display: 'inline-block',
                  marginTop: '10px',  // Adjust this value to add space between the button and the content above
                  marginLeft: '30px',
                  fontSize: 'medium'
                }}
              >
                Download
              </button>
            }
            {console.log("LOADING STATUS")}
            {console.log(loading1)}
            {loading1 === true && (
              <LogsPopup isOpen={true} />
            )
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
      </div>}

      <div className="production-section">
      {showLogin && !isLoggedIn && ( // Render login dialog if showLogin is true and user is not logged in
        <LoginDialog onSubmit={handleLoginSubmit} />
      )}
      <button
        onClick={() => {
          if (!isLoggedIn) {
            setShowLogin(true); // Show login dialog if user is not logged in
          } else {
            handleButtonClick("Push to NEAR"); // Proceed with pushing to NEAR if user is logged in
          }
        }}
        disabled={!action2Success}
      >
        Push to NEAR
      </button>
        <label>Approver: </label>
        <input
          className="production-input"
          type="text"
          value={nearApprover}
          onChange={(e) => setNearApprover(e.target.value)}
        />
        <div className="production-status">
          <label>Status: </label>
          {loading2 ? (
            <label className="status">Loading
              <img
                className="350.gif"
                src="/350.gif" // Replace with the path to your loading GIF
              /></label>
          ) : (
            <label className="status">{Action2status}</label>
          )}
        </div>
        {loading2 === true && (
          <LogsPopup isOpen={true} />
        )
        }
      </div>
      <div className="production-section">
        <button onClick={() => handleButtonClick('Test')} disabled={!action3Success}>Deploy and Test in Lab</button>
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
            <label className="status">Loading
              <img
                className="350.gif"
                src="/350.gif" // Replace with the path to your loading GIF
              /></label>
          ) : (
            <label className="status">{Action3status}</label>
          )}
        </div>

        {
          //-------------------------------------------------
          <button
            className='CheckStatus'
            onClick={checkstatus}
            style={{
              height: '50px',
              width: '150px',
              backgroundColor: '#4682B4',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              display: 'inline-block',
              marginTop: '10px',
              marginLeft: '30px',
              fontSize: 'medium'
            }}
          >
            Check Status
          </button>

        }

        {loading3 === true && (
          <LogsPopup2 isOpen={true} />
        )}

        {/*to check status of deployments in the kubernetes cluster*/}
        {/* {status && <div><br /><p>{status}</p></div>} */}
        {console.log("Here's the Status stuff")}
        {console.log(isOpen)}
        {console.log(status)}
        {status && <CheckStatusPopup msg={status} isOpen={isOpen} onClose={handlePopupClose} />}
      </div>

      <div className="production-section">
        <button onClick={() => handleButtonClick('Push to Customer Repo')} disabled={!action4Success}>Push to Customer Repository</button>
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
            <label className="status">Loading
              <img
                className="350.gif"
                src="/350.gif" // Replace with the path to your loading GIF
              /></label>
          ) : (
            <label className="status">{Action4status}</label>
          )}
        </div>
      </div>

      <div className="production-section">
        <button onClick={() => handleButtonClick('Deploy in production')} disabled={!action5Success}>Deploy and Test in Production</button>
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
            <label className="status">Loading
              <img
                className="350.gif"
                src="/350.gif" // Replace with the path to your loading GIF
              /></label>
          ) : (
            <label className="status">{Action5status}</label>
          )}
        </div>
      </div>
    </div>
  );
};


export default Production;
