// LoginDialog.jsx

import React, { useState } from 'react';
import './LoginDialog.css';

const LoginDialog = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repoName, setRepoName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Call the onSubmit function passed from the parent component with the form data
    onSubmit({ username, password, repoName, email });
  };

  return (
    <div className="login-dialog-container">
      <div className="login-dialog-content">
        
        <label>
          Repo Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default LoginDialog;
