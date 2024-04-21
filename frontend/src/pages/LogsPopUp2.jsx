import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import io from 'socket.io-client'; // Import socket.io-client library

const LogsPopup2 = ({ isOpen }) => {
  const [messages, setMessages] = useState([]); // State to store the messages to display in the popup

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('messageFromBackend', (data) => {
      setMessages(prevMessages => [...prevMessages, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log('LogsPopup');
  return (
    <Popup open={isOpen} modal contentStyle={{ background: 'white' }}>
      {(close) => (
        <div className="custom-popup">
          <button className="close-btn" onClick={close}>
            X
          </button>
          <div className="popup-content">
            {messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default LogsPopup2;
