import React, { useState } from 'react';

import '../ForgotPassword.css';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password email submitted:', email);
    // Add API call to send a reset password email
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
        <h2 style={formTitleStyle}>Forgot password</h2>
        <p style={formSubtitleStyle}>New password set to your email address.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" className="button">
            Send email
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
