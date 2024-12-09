// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;
const CreateExamForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    mainProfessor: "",
    secondaryProfessor: "",
    faculty: "",
    group: "",
    date: "",
    hour: "",
    duration: "",
    classroom: "",
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
    alert("Examenul a fost creat cu succes!");
    // Post the form data to the backend
    axios.post(`${backendURL}/students`, formData)
      .then(response => {
        console.log('Student added successfully:', response.data);
        // Optionally clear the form after submission
        setFormData({
          subject: '',
          mainProfessor: '',
          secondaryProfessor: '',
          faculty: '',
          group: '',
          date: '',
          hour: '',
          duration: '',
          classroom: '',
        });
      })
      .catch(error => {
        console.error('There was an error adding the student:', error);
      });
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Adaugare examen</h2>
        <p style={subtitleStyle}>Adaugare de un nou examen.</p>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="mainProfessor"
          placeholder="Main Professor"
          value={formData.mainProfessor}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="secondaryProfessor"
          placeholder="Secondary Professor"
          value={formData.secondaryProfessor}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="faculty"
          placeholder="Faculty"
          value={formData.faculty}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="group"
          placeholder="Group"
          value={formData.group}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="time"
          name="hour"
          value={formData.hour}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="classroom"          
          placeholder="Classroom"
          value={formData.classroom}          
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

export default CreateExamForm;
