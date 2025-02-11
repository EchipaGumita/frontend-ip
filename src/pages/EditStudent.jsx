import React, { useState } from "react";

const EditStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: "",
    profile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Aici poți adăuga logica pentru editarea studentului
  };

  return (
    <div style={mainContainerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h3 style={formTitleStyle}>Editare student</h3>
        <p style={formSubtitleStyle}>Editare student adaugat</p>

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
          placeholder="Parola"
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
          {/* Adaugă alte opțiuni */}
        </select>

        <select
          name="profile"
          value={formData.profile}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Profil</option>
          <option value="Informatica">Informatica</option>
          <option value="Biologie">Biologie</option>
          {/* Adaugă alte opțiuni */}
        </select>

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

const formStyle = {
  backgroundColor: "#dce3f7",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "350px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  marginBottom: "15px",
  padding: "10px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  outline: "none",
  backgroundColor: "#ffffff",
  color: "#000000",
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

export default EditStudent;