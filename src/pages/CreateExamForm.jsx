// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected import for jwtDecode
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreateExamForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    examDate: new Date(),
    examTime: "",
    duration: "",
    classroom: "",
    mainProfessor: "",
    secondaryProfessor: "",
    faculty: "",
    group: "",
  });
  const [professors, setProfessors] = useState([]);
  const [groups, setGroups] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [isDateBooked, setIsDateBooked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professorRes = await axios.get(`${backendURL}/professor`);
        setProfessors(professorRes.data.professors || []);

        const groupRes = await axios.get(`${backendURL}/groups`);
        setGroups(groupRes.data.groups || []);

        const classroomRes = await axios.get(`${backendURL}/classroom`);
        const allClassrooms = classroomRes.data.classrooms || [];
        setClassrooms(allClassrooms);

        // Decode token to access student ID
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          setStudentId(decodedToken.uniqueId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formData.classroom && formData.examDate) {
      const classroom = classrooms.find((cls) => cls._id === formData.classroom);
      if (classroom) {
        const bookedDatesList = classroom.booked_slots.map((slot) => new Date(slot.date).toDateString());
        setBookedDates(bookedDatesList);

        if (bookedDatesList.includes(formData.examDate.toDateString())) {
          setIsDateBooked(true);
        } else {
          setIsDateBooked(false);
        }
      }
    }
  }, [formData.classroom, formData.examDate, classrooms]);

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      examDate: date,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the selected date is already booked
    if (isDateBooked) {
      alert("Data selectată este deja rezervată. Vă rugăm să selectați o altă dată.");
      return; // Prevent form submission
    }
  
    // Format the hour correctly
    const [hour, minute] = formData.examTime.split(':');
    const hourInt = parseInt(hour, 10);
    const formattedTime = `${hourInt.toString().padStart(2, '0')}:${minute}`;
  
    // Format the date as "yyyy-mm-dd"
    const formattedDate = formData.examDate.toISOString().split('T')[0]; // This will output "yyyy-mm-dd"
  
    // Construct requestData in the desired format
    const requestData = {
      subject: formData.subject,
      mainProfessor: formData.mainProfessor,
      secondaryProfessor: formData.secondaryProfessor || null,
      faculty: formData.faculty,
      group: formData.group,
      date: formattedDate, // Correctly formatted date
      hour: formattedTime,
      duration: parseInt(formData.duration, 10),
      classroom: formData.classroom,
    };
  
    try {
      const response = await axios.post(`${backendURL}/exam`, requestData);
      alert("Examenul a fost creat cu succes!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Eroare la crearea examenului.");
    }
  };

  const handleItemClick = (path) => {
    window.location.href = path;
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

        {/* Date Picker for Exam Date */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="examDate">Data Examenului:</label>
          <DatePicker
            selected={formData.examDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            highlightDates={bookedDates.map(date => new Date(date))}
            inline
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Exam Time Input */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="examTime">Oră Examen:</label>
          <input
            type="time"
            id="examTime"
            name="examTime"
            value={formData.examTime}
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
          <label htmlFor="duration">Durată (minute):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
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
                {classroom.name} - {classroom.building}
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

        {/* Secondary Professor */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="secondaryProfessor">Profesor Secundar:</label>
          <select
            id="secondaryProfessor"
            name="secondaryProfessor"
            value={formData.secondaryProfessor}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">N/A</option>
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
          <label htmlFor="group">Grup:</label>
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
            <option value="" disabled>Selectați grupul</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#003366",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => handleItemClick('/dashboard')}>
          Creare Examen
        </button>
      </form>
    </div>
  );
};

export default CreateExamForm;
