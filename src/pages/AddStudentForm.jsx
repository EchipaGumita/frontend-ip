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
          <option value="FDSA">FDSA</option>
          <option value="FEAA">FEAA</option>
          <option value="FEFS">FEFS</option>
          <option value="FIA">FIA</option>
          <option value="FIMAR">FIMAR</option>
          <option value="FIG">FIG</option>
          <option value="FLSC">FLSC</option>
          <option value="FMSB">FMSB</option>
          <option value="FS">FS</option>
          <option value="FSE">FSE</option>
          {/* Add more options as needed */}
        </select>

        <select
          name="major"
          value={formData.major}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Specializare</option>
          <option value="Analiza Matematica">Analiza Matematica</option>
          <option value="Fizica">Fizica</option>
          <option value="Matematici Speciale">Matematici Speciale</option>
          <option value="FElectrotehnica">Electrotehnica</option>
          <option value="Algebra Liniara">Algebra Liniara</option>
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

        <button type="submit" style={buttonStyle}>
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
  backgroundColor: '#4a90e2',
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
