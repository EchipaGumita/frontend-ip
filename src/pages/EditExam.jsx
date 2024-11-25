import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../EditExam.css'; // Import the CSS file

const backendURL = import.meta.env.VITE_BACKEND_URL;

const EditExam = () => {
  const { id } = useParams(); // Get the exam ID from the URL
  const [formData, setFormData] = useState({
    subject: "",
    mainProfessor: "",
    secondaryProfessor: "",
    faculty: "",
    group: "",
    classroom: "",
    startTime: "",
  });
  const [groups, setGroups] = useState([]); 
  const [professors, setProfessors] = useState([]);            
  const [classrooms, setClassrooms] = useState([]);  
  const [hours, setHours] = useState([
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ]);

  // Retrieve JWT from localStorage (or sessionStorage or context, based on your app setup)
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const examResponse = await axios.get(`${backendURL}/exam/${id}`);
        setFormData({
          subject: examResponse.data.subject,
          mainProfessor: examResponse.data.mainProfessor,
          secondaryProfessor: examResponse.data.secondaryProfessor,
          faculty: examResponse.data.faculty,
          group: examResponse.data.group,
          classroom: examResponse.data.classroom,
          startTime: examResponse.data.hour,
        });
  
        const professorsResponse = await axios.get(`${backendURL}/professor`);
        setProfessors(professorsResponse.data.professors || []);
  
        const groupsResponse = await axios.get(`${backendURL}/groups`);
        const flattenedGroups = groupsResponse.data.groups.flatMap(group => 
          group.subGroups.map(subGroup => ({
            ...subGroup,
            parentGroupId: group._id,
            parentGroupName: group.name
          }))
        );
        setGroups(flattenedGroups);
  
        const classroomsResponse = await axios.get(`${backendURL}/classroom`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("Classrooms Response:", classroomsResponse.data); // Check if this is correct
        setClassrooms(Array.isArray(classroomsResponse.data.classrooms) ? classroomsResponse.data.classrooms : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchExamData();
  }, [id, jwt]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent, including 'hour' and 'classroom'
    const dataToUpdate = {
      hour: formData.startTime,  // Only send the hour field
      classroom: formData.classroom,  // Send the classroom ObjectId
    };

    try {
      const response = await axios.put(`${backendURL}/exam/${id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Exam updated:", response.data);
      // Optionally, show success message or redirect
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  return (
    <div className="main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="form-title">Editare Examen</h3>
        <p className="form-subtitle">Editare examen </p>

        <input
          type="text"
          name="subject"
          placeholder="Materie"
          value={formData.subject || ""}
          onChange={handleChange}
          className="input-field"
        />

        <select
          name="mainProfessor"
          value={formData.mainProfessor || ""}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Selectează Profesor Principal</option>
          {professors.map((professor) => (
            <option key={professor._id} value={professor._id}>
              {professor.firstName} {professor.lastName}
            </option>
          ))}
        </select>

        <select
          name="secondaryProfessor"
          value={formData.secondaryProfessor || ""}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Selectează Profesor Suplimentar</option>
          {professors.map((professor) => (
            <option key={professor._id} value={professor._id}>
              {professor.firstName} {professor.lastName}
            </option>
          ))}
        </select>

        <select
          name="faculty"
          value={formData.faculty || ""}
          onChange={handleChange}
          className="input-field"
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
        </select>

        <select
  name="group"
  value={formData.group || ""}
  onChange={handleChange}
  className="input-field"
>
  <option value="">Selectează Grupă</option>
  {Array.isArray(groups) && groups.length > 0 ? (
    groups.map((group) => (
      <option key={group._id} value={group._id}>
        {group.parentGroupName} - {group.name}
      </option>
    ))
  ) : (
    <option value="">No groups available</option>
  )}
</select>

<select
  name="classroom"
  value={formData.classroom}
  onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
>
  <option value="">Select Classroom</option>
  {classrooms.length > 0 ? (
    classrooms.map((classroom) => (
      <option key={classroom._id} value={classroom._id}>
        {classroom.name}
      </option>
    ))
  ) : (
    <option>No classrooms available</option>
  )}
</select>

        <select
          name="startTime"
          value={formData.startTime || ""}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Selectează Ora de Începere</option>
          {hours.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-button">Salvează Modificările</button>
      </form>
    </div>
  );
};

export default EditExam;
