'use client'
import React, { useState } from 'react';
import './AdminLogin.css'; // External CSS for styling

const AdminLogin = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login ID:', loginId);
    console.log('Password:', password);

    // Example: Validate credentials (replace with actual logic)
    if (loginId === 'admin' && password === 'admin123') {
      alert('Login successful!');
      // Redirect or perform further actions
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="loginId">Login ID</label>
          <input
            type="text"
            id="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="Enter your login ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;