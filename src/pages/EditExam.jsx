import React, { useState } from "react";

const EditExam = () => {
  const [formData, setFormData] = useState({
    subject: "",
    mainProfessor: "",
    supervisingProfessors: "",
    faculty: "",
    groups: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Adaugă logica pentru salvarea datelor
  };

  return (
    <div style={mainContainerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h3 style={formTitleStyle}>Editare Examen</h3>
        <p style={formSubtitleStyle}>Editare examen </p>

        <input
          type="text"
          name="subject"
          placeholder="Materie"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="mainProfessor"
          placeholder="Profesor principal"
          value={formData.mainProfessor}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="supervisingProfessors"
          placeholder="Profesori supraveghetori"
          value={formData.supervisingProfessors}
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
          {/* Adaugă alte opțiuni aici */}
        </select>

        <input
          type="text"
          name="groups"
          placeholder="Grupe"
          value={formData.groups}
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
  backgroundColor: "#e3e3e3",
  fontFamily: "Arial, sans-serif",
};

const formStyle = {
  backgroundColor: "#8aa4d8",
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
    backgroundColor: "#ffffff", // Fundal alb
    color: "#000000",          // Text negru pentru contrast
  };

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#4F96E8",
  color: "#fff",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

export default EditExam;
