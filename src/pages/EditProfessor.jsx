import React, { useState } from "react";

const EditProfessor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: "",
    subject: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Aici poți adăuga logica pentru editarea profesorului
  };

  return (
    <div style={mainContainerStyle}>
      <h2 style={pageTitleStyle}>Editare Profesor</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h3 style={formTitleStyle}>Editare profesor</h3>
        <p style={formSubtitleStyle}>Adaugați sau editați profesorul</p>

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
          <option value="Facultatea de Matematica">Facultatea de Matematica</option>
          <option value="Facultatea de Fizica">Facultatea de Fizica</option>
          {/* Adaugă alte opțiuni */}
        </select>

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Materii</option>
          <option value="Matematica">Matematica</option>
          <option value="Fizica">Fizica</option>
          {/* Adaugă alte opțiuni */}
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
          Confirmare Editare
        </button>
      </form>
    </div>
  );
};

// Stiluri CSS-in-JS
const mainContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f4f4f4",
  fontFamily: "Arial, sans-serif",
};

const pageTitleStyle = {
  fontSize: "24px",
  color: "#555",
  marginBottom: "20px",
};

const formStyle = {
  backgroundColor: "#dce3f7",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "400px",
  display: "flex",
  flexDirection: "column",
};

const formTitleStyle = {
  fontSize: "20px",
  color: "#333",
  marginBottom: "10px",
};

const formSubtitleStyle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "20px",
};

const inputStyle = {
  marginBottom: "15px",
  padding: "10px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  outline: "none",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#4a90e2",
  color: "#fff",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

export default EditProfessor;
