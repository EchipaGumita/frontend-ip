// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;
const AddStudentForm = () => {
  // Initial state matching the required post structure
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    year: 1, // Default year set to 1
    faculty: '',
    major: '',
    gender: '', // Added for gender selection
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Post the form data to the backend
    axios.post(`${backendURL}/students`, formData)
      .then(response => {
        console.log('Student added successfully:', response.data);
        // Optionally clear the form after submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          year: 1,
          faculty: '',
          major: '',
          gender: '',
        });
      })
      .catch(error => {
        console.error('There was an error adding the student:', error);
      });
  };

  const handleItemClick = (path) => {
    window.location.href = path;
};

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Adaugare student</h2>
        <p style={subtitleStyle}>Adaugare de un nou student.</p>

        <input
          type="text"
          name="firstName"
          placeholder="Prenume"
          value={formData.firstName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Nume"
          value={formData.lastName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Facultate</option>

          <option value="FIESC">FIESC</option>
          {/* Add more options as needed */}
        </select>

        <select
          name="major"
          value={formData.major}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Specializare</option>
          <option value="Automatica si Informatica Aplicata">Automatica si Informatica Aplicata</option>
          <option value="Calculatoare">Calculatoare</option>
          <option value="Echipamente si Sisteme de Comnada si Control pentru Autovehicule">Echipamente si Sisteme de Comnada si Control pentru Autovehicule</option>
          <option value="Echipamente si Sisteme Medicale">Echipamente si Sisteme Medicale</option>
          <option value="Electronica Aplicata">Electronica Aplicata</option>
          <option value="Energetica si Tehnologii Informate">Energetica si Tehnologii Informate</option>
          <option value="Managementul Energiei">Managementul Energiei</option>
          <option value="Retele si Software de telecomunicatii">Retele si Software de telecomunicatii</option>
          <option value="Sisteme Electrice">Sisteme Electrice</option>

          {/* Add more options as needed */}
        </select>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Gen</option>
          <option value="male">Masculin</option>
          <option value="female">Feminin</option>
        </select>

        <button type="submit" style={buttonStyle} onClick={() => handleItemClick('/studentlist')}>
          Confirmare Adaugare
        </button>
      </form>
    </div>
  );
};

// CSS-in-JS style objects
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2',
};

const formStyle = {
  backgroundColor: '#6699cc',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '400px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  marginBottom: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
};

const subtitleStyle = {
  marginBottom: '20px',
  fontSize: '14px',
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc', 
  outline: 'none',
  backgroundColor: '#fff', // fundal alb
  color: '#000', 
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#003366',
  color: '#fff',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

export default AddStudentForm;
