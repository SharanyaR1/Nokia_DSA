
import React from 'react';
import Popup from 'reactjs-popup';
import './CreatePackagePopup.css'; // Import CSS file for custom styles

const CreatePackagePopup = ({ isOpen, message }) => {
    console.log('CreatePackagePopup');
    return (
        <Popup open={isOpen} modal contentStyle={{ background: 'white' }}>
            {(close) => (
                <div className="custom-popup">
                    <button className="close-btn" onClick={close}>
                        X
                    </button>
                    <div className="popup-content">{message}</div>
                </div>
            )}
        </Popup>
    );
};

export default CreatePackagePopup;