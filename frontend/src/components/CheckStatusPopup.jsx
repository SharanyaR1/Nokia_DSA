import React from 'react';
import Popup from 'reactjs-popup';

const CheckStatusPopup = ({ msg, isOpen, onClose }) => {
 console.log("Status here")
 console.log("In the pop up page")
  return (
    <Popup open={isOpen} modal contentStyle={{ background: 'white' }}>
      {(close) => (
        <div className="custom-popup">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <div className="popup-content">
            {msg}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default CheckStatusPopup;