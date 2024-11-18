import React, { useState } from "react";

const CreateExamForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    mainProfessor: "",
    supervisingProfessors: "",
    faculty: "",
    groups: "",
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
    // merge adaugat un apel la API aici pentru a salva datele
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        background: "#e8f4fc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#003366" }}>Creare Examen</h2>
      <p style={{ textAlign: "center", color: "#666" }}>Creare examen nou.</p>
      <form onSubmit={handleSubmit}>
        {/* Materie */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="subject">Materie:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Introduceți materia"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Profesor Principal */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="mainProfessor">Profesor Principal:</label>
          <select
            id="mainProfessor"
            name="mainProfessor"
            value={formData.mainProfessor}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>
              Selectați profesorul
            </option>
            <option value="prof1">Prof. Ion Popescu</option>
            <option value="prof2">Prof. Maria Ionescu</option>
            <option value="prof3">Prof. Alexandru Vasile</option>
          </select>
        </div>

        {/* Profesori Supraveghetori */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="supervisingProfessors">Profesori Supraveghetori:</label>
          <input
            type="text"
            id="supervisingProfessors"
            name="supervisingProfessors"
            value={formData.supervisingProfessors}
            onChange={handleChange}
            placeholder="Introduceți profesorii supraveghetori"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Facultate */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="faculty">Facultate:</label>
          <select
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>
              Selectați facultatea
            </option>
            <option value="facultate1">Facultatea de Matematică</option>
            <option value="facultate2">Facultatea de Informatică</option>
            <option value="facultate3">Facultatea de Fizică</option>
          </select>
        </div>

        {/* Grupe */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="groups">Grupă/e:</label>
          <input
            type="text"
            id="groups"
            name="groups"
            value={formData.groups}
            onChange={handleChange}
            placeholder="Introduceți grupa/le"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Confirmare */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Confirmare Adăugare
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "0 auto", padding: "20px", background: "#e8f4fc", borderRadius: "8px" },
  title: { textAlign: "center", color: "#003366" },
  field: { marginBottom: "15px" },
  input: { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
  button: { width: "100%", padding: "10px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default CreateExamPage;
