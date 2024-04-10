import React, { useState } from 'react';
import { useStepContext } from "../StepContext"; // Import the context hook
import './Production.css';

const Production = () => {
  const { handleNext } = useStepContext(); // Using the context hook
  const [packageApprover, setPackageApprover] = useState('');
  const [nearApprover, setNearApprover] = useState('');
  const [customerRepoApprover, setCustomerRepoApprover] = useState('');
  const [productionApprover, setProductionApprover] = useState('');
  const [status, setStatus] = useState('incomplete');

  const handleButtonClick = (action) => {
    // Add your logic here based on the button action
    console.log(`Button "${action}" clicked`);
    // Assuming the logic is completed and it's time to move to the next step
    handleNext(); // Call handleNext from the stepper context
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
          {status === 'completed' ? (
            <label>Complete</label>
          ) : (
            <label>Incomplete</label>
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
          {status === 'completed' ? (
            <label>Complete</label>
          ) : (
            <label>Incomplete</label>
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
          {status === 'completed' ? (
            <label>Complete</label>
          ) : (
            <label>Incomplete</label>
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
          {status === 'completed' ? (
            <label>Complete</label>
          ) : (
            <label>Incomplete</label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Production;
