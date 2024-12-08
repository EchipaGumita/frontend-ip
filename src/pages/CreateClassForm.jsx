// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const CreateClassForm = () => {
  const [formData, setFormData] = useState({
    cladire: "",
    etaj: "",
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
      <h2 style={{ textAlign: "center", color: "#003366" }}>Creare Sala</h2>
      <p style={{ textAlign: "center", color: "#666" }}>Creare sala noua.</p>
      <form onSubmit={handleSubmit}>
        {/* Cladire */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="building">Cladire:</label>
          <input
            type="text"
            id="building"
            name="building"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Introduceți identificatorul cladirii.."
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Nr sala */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="room_nr">Nr Sala:</label>
          <input
            type="text"
            id="room_nr"
            name="room_nr"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Introduceți nr salii.."
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

// const styles = {
//   container: { maxWidth: "400px", margin: "0 auto", padding: "20px", background: "#e8f4fc", borderRadius: "8px" },
//   title: { textAlign: "center", color: "#003366" },
//   field: { marginBottom: "15px" },
//   input: { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
//   button: { width: "100%", padding: "10px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
// };

export default CreateClassForm;
