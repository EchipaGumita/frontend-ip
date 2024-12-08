import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreateExamForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    examDate: "", // date part
    examTime: "", // time part
    examDuration: "",
    classroom: "",
    hour: "", // this will be managed separately
    mainProfessor: "",
    secondaryProfessor: "",
    faculty: "",
    group: "",
  });
  const [professors, setProfessors] = useState([]);
  const [groups, setGroups] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [studentId, setStudentId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const professorRes = await axios.get(`${backendURL}/professor`);
        setProfessors(professorRes.data.professors || []);
        const groupRes = await axios.get(`${backendURL}/groups`);
        setGroups(groupRes.data.groups || []);
        const classroomRes = await axios.get(`${backendURL}/classroom`);
        setClassrooms(classroomRes.data.classrooms || []);
        const token = localStorage.getItem("token");
        if (token) {
          // Decode the token to access the payload
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);

          // Extract the uniqueId from the payload
          setStudentId(decodedToken.uniqueId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "examDate") {
      const [date, time] = value.split("T");
      setFormData((prevState) => ({
        ...prevState,
        examDate: date,
        examTime: time,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert the hour to 12-hour format with AM/PM
    const [hour, minute] = formData.examTime.split(':');
    let hourInt = parseInt(hour, 10);
    let amOrPm = 'AM';
  
    if (hourInt >= 12) {
      amOrPm = 'PM';
      if (hourInt > 12) {
        hourInt -= 12; // Convert to 12-hour format
      }
    } else if (hourInt === 0) {
      hourInt = 12; // Midnight case (00:xx is 12:xx AM)
    }
  
    // Create a formatted time string with AM/PM
    const formattedTime = `${hourInt}:${minute} ${amOrPm}`;
  
    const requestData = {
      studentUniqueId: studentId,
      subject: formData.subject,
      examDate: formData.examDate,
      examDuration: parseInt(formData.examDuration, 10),
      classroom: formData.classroom,
      hour: formattedTime, // Use formatted time with AM/PM
      mainProfessor: formData.mainProfessor,
      secondaryProfessor: formData.secondaryProfessor || undefined,
      faculty: formData.faculty,
      group: formData.group,
    };
  
    try {
      const response = await axios.post(`${backendURL}/exam-request`, requestData);
      alert("Examenul a fost creat cu succes!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Eroare la crearea examenului.");
    }
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
      <h2 style={{ textAlign: "center", color: "#003366" }}>Creare Request Examen</h2>
      <p style={{ textAlign: "center", color: "#666" }}>Creare request examen nou.</p>
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

        {/* Data Examen */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="examDate">Data Examenului:</label>
          <input
            type="datetime-local"
            id="examDate"
            name="examDate"
            value={`${formData.examDate}T${formData.examTime}`}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Durată Examen */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="examDuration">Durată (minute):</label>
          <input
            type="number"
            id="examDuration"
            name="examDuration"
            value={formData.examDuration}
            onChange={handleChange}
            placeholder="Introduceți durata"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Classroom */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="classroom">Sala:</label>
          <select
            id="classroom"
            name="classroom"
            value={formData.classroom}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>Selectați sala</option>
            {classrooms.map((classroom) => (
              <option key={classroom._id} value={classroom._id}>
                {classroom.name}
              </option>
            ))}
          </select>
        </div>

        {/* Main Professor */}
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
            <option value="" disabled>Selectați profesorul</option>
            {professors.map((professor) => (
              <option key={professor._id} value={professor._id}>
                {professor.firstName} {professor.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Faculty */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="faculty">Facultate:</label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            placeholder="Introduceți facultatea"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Group */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="group">Grupă:</label>
          <select
            id="group"
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>Selectați grupa</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
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

export default CreateExamForm;
