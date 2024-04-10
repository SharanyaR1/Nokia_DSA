import React, { useState } from 'react';
import { useStepContext } from "../StepContext"; // Import the context hook
import './Production.css';

const Production = () => {
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


  const handleButtonClick = async (action) => {
    console.log(`Button "${action}" clicked`);
  };

  return (
    <div className="production-container">
      <div className="production-section">
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
            <label>Loading</label>
          ) : (
            <label>{Action1status}</label>
          )}
        </div>
      </div>

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
            <label>Loading</label>
          ) : (
            <label>{Action2status}</label>
          )}
        </div>
      </div>
 

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
          <label>Status: </label>
          {loading3 ? (
            <label>Loading</label>
          ) : (
            <label>{Action3status}</label>
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
            <label>Loading</label>
          ) : (
            <label>{Action4status}</label>
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
            <label>Loading</label>
          ) : (
            <label>{Action5status}</label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Production;
