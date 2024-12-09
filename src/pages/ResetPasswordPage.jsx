import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Fixing import statement
import '../ForgotPassword.css';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ForgotPasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    // Extract the studentId from the token stored in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setStudentId(decodedToken.uniqueId); // Use the appropriate key if it's different
      } catch (error) {
        console.error('Error decoding the token:', error);
        alert('Invalid token');
      }
    } else {
      alert('You are not logged in');
    }
  }, []);

  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) {
      alert('Student ID could not be retrieved');
      return;
    }

    try {
      const response = await axios.put(`${backendURL}/students/${studentId}/password`, {
        currentPassword,
        newPassword,
      });

      console.log('Password change response:', response.data);
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Error changing password. Please try again.');
      } else {
        alert('Error changing password. Please try again.');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img
          src="../../src/assets/logo usv.png"
          alt="USV Logo"
          style={logoStyle}
        />
      </div>

      <div style={formContainerStyle}>
        <h2 style={formTitleStyle}>Change Password</h2>
        <p style={formSubtitleStyle}>Please enter your current and new password.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={handleChangeCurrentPassword}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleChangeNewPassword}
            style={inputStyle}
            required
          />
          <button type="submit" className="button">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2',
  padding: '20px',
};

const logoContainerStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '20px',
};

const logoStyle = {
  width: '150px',
  marginBottom: '10px',
};

const formContainerStyle = {
  flex: 1,
  backgroundColor: '#6699cc',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
};

const formTitleStyle = {
  marginBottom: '10px',
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#f2f2f2',
};

const formSubtitleStyle = {
  marginBottom: '20px',
  fontSize: '14px',
  color: '#f2f2f2',
};

const inputStyle = {
  width: '100%',
  marginBottom: '15px',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  outline: 'none',
};

export default ForgotPasswordPage;
