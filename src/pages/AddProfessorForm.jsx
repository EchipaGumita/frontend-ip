// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;
const AddProfessorForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    department: '',
    gender: '',
    isAdmin: false, //Default set to false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Post the form data to the backend
    axios.post(`${backendURL}/professor`, formData)
      .then(response => {
        console.log('Student added successfully:', response.data);
        // Optionally clear the form after submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          department: '',
          gender: '',
          isAdmin: false, //Default set to false});
      });
    })
      .catch(error => {
        console.error('There was an error adding the professor:', error);
      });
  };

  const handleItemClick = (path) => {
    window.location.href = path;
};

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Adaugare profesor</h2>
        <p style={subtitleStyle}>Adaugare de un nou profesor.</p>

        <input
          type="text"
          name="firstName"
          placeholder="Prenume"
          value={formData.name}
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

        <input
          type="text"
          name="department"
          placeholder="Departament"
          value={formData.department}
          onChange={handleChange}
          style={inputStyle}
        />
        
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

        <button type="submit" style={buttonStyle} onClick={() => handleItemClick('/professorlist')}>
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
  backgroundColor: '#fff', // Casetele albe
  color: '#333',
  outline: 'none',
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

export default AddProfessorForm;
