import React from 'react';
import Popup from 'reactjs-popup';

const CheckStatusPopup = ({ msg, isOpen, onClose }) => {
 console.log("Status here")
 console.log("In the pop up page")
 //  console.log(msg)
   console.log(isOpen)

  console.log(msg)
  
  return (
    <Popup open={isOpen} modal contentStyle={{ background: 'white', width: '400px' }}>
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