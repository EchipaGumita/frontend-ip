// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const AddProfessorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    faculty: '',
    subject: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your API call or data submission logic here
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Adaugare profesor</h2>
        <p style={subtitleStyle}>Adaugare de un nou profesor.</p>

        <input
          type="text"
          name="name"
          placeholder="Nume"
          value={formData.name}
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
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Materii</option>
          <option value="Matematica">Analiza Matematica</option>
          <option value="Fizica">Fizica</option>
          <option value="Fizica">Matematici Speciale</option>
          <option value="Fizica">Electrotehnica</option>
          <option value="Fizica">Algebra Liniara</option>


          {/* Add more options as needed */}
        </select>

        <input
          type="text"
          name="position"
          placeholder="Functie"
          value={formData.position}
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
  backgroundColor: '#272f54',
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
  backgroundColor: '#81AFE2',
  color: '#272f54',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

export default AddProfessorForm;
