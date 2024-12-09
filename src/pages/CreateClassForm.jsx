// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreateClassForm = () => {
  const [formData, setFormData] = useState({
    cladire: "",
    numar_sala: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert("Sala a fost creată cu succes!");
    // Post the form data to the backend
    axios.post(`${backendURL}/students`, formData)
      .then(response => {
        console.log('Student added successfully:', response.data);
        // Optionally clear the form after submission
        setFormData({
          cladire: '',
          numar_sala: '',
        });
      })
      .catch(error => {
        console.error('There was an error adding the classroom:', error);
      });
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Adaugare sala</h2>
        <p style={subtitleStyle}>Adaugare de o noua sala.</p>

        <input
          type="text"
          name="cladire"
          placeholder="Cladire"
          value={formData.cladire}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="numar_sala"
          placeholder="Numar sala"
          value={formData.numar_sala}
          onChange={handleChange}
          style={inputStyle}
        />

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

export default CreateClassForm;
