import React, { useState } from 'react';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password reset:', formData.password);
    // Add API logic here
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e3/USV_Logo.png"
          alt="USV Logo"
          style={logoStyle}
        />
        <h2 style={universityNameStyle}>Universitatea „Ștefan cel Mare” din Suceava</h2>
      </div>

      <div style={formContainerStyle}>
        <h2 style={formTitleStyle}>Reset password</h2>
        <p style={formSubtitleStyle}>Create a new password for your account.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Confirm password
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

const universityNameStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#003366',
};

const formContainerStyle = {
  flex: 1,
  backgroundColor: '#e7eff8',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
};

const formTitleStyle = {
  marginBottom: '10px',
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#003366',
};

const formSubtitleStyle = {
  marginBottom: '20px',
  fontSize: '14px',
  color: '#555',
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

const buttonStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#003366',
  color: '#fff',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

export default ResetPasswordPage;
