import React, { useState } from 'react';

const CreateExamRequestForm = () => {
  const [formData, setFormData] = useState({
    examiner: '',
    exam: '',
    date: '',
    subject: '',
    group: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Exam request created:', formData);
    // Add your API call or data submission logic here
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Creare request examen</h2>
        <p style={subtitleStyle}>Adaugare de un nou student.</p>

        <input
          type="text"
          name="examiner"
          placeholder="Examiner"
          value={formData.examiner}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="exam"
          placeholder="Examen"
          value={formData.exam}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          placeholder="Data"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Materie</option>
          <option value="Matematica">Matematica</option>
          <option value="Informatica">Informatica</option>
          {/* Add more options as needed */}
        </select>

        <select
          name="group"
          value={formData.group}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Grupa</option>
          <option value="Grupa A">Grupa A</option>
          <option value="Grupa B">Grupa B</option>
          {/* Add more options as needed */}
        </select>

        <button type="submit" style={buttonStyle}>
          Confirmare Request
        </button>
      </form>
    </div>
  );
};

// CSS-in-JS style objects
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2',
};

const formStyle: React.CSSProperties = {
  backgroundColor: '#4a90e2',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '400px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle: React.CSSProperties = {
  marginBottom: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
};

const subtitleStyle: React.CSSProperties = {
  marginBottom: '20px',
  fontSize: '14px',
};

const inputStyle: React.CSSProperties = {
  marginBottom: '15px',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '4px',
  border: 'none',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#003366',
  color: '#fff',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

export default CreateExamRequestForm;
