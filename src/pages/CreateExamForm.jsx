import React, { useState } from "react";

const CreateExamPage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    mainProfessor: "",
    supervisingProfessors: "",
    faculty: "",
    groups: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Examenul a fost creat cu succes!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Creare Examen</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Materie", name: "subject", type: "text", placeholder: "Introduceți materia" },
          { label: "Profesori Supraveghetori", name: "supervisingProfessors", type: "text", placeholder: "Introduceți profesorii" },
          { label: "Grupă/e", name: "groups", type: "text", placeholder: "Introduceți grupa/le" },
        ].map((field, index) => (
          <div style={styles.field} key={index}>
            <label>{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}
        <div style={styles.field}>
          <label>Profesor Principal:</label>
          <select
            name="mainProfessor"
            value={formData.mainProfessor}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Selectați profesorul</option>
            <option value="prof1">Prof. Ion Popescu</option>
            <option value="prof2">Prof. Maria Ionescu</option>
          </select>
        </div>
        <div style={styles.field}>
          <label>Facultate:</label>
          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Selectați facultatea</option>
            <option value="matematica">Facultatea de Matematică</option>
            <option value="informatica">Facultatea de Informatică</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Confirmare Adăugare</button>
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
