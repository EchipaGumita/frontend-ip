// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import '../StudentList.css';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi"; // Import the plus icon
import axios from 'axios';
import Sidebar from '../components/Sidebar';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backendURL}/students`);
        console.log('API Response:', response.data); // Debugging
        setStudents(response.data || []); // Set the response directly to students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
  
    fetchStudents();
  }, []);

  const handleItemClick = (path) => {
    window.location.href = path;
};

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="section students">
      <div className="header-bar">
          <h3>Studenți</h3>
          <button className="add-request-button" onClick={() => handleItemClick('/addstudent')}>
            <HiPlus size={24} />
          </button>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="bg-white px-3 py-3">
            <HiMiniMagnifyingGlass />
          </button>
        </div>

        <div className="table-header">
          <span>Nume</span>
          <span>Email</span>
          <span>Specializare</span>
          <span>Facultate</span>
          <span>Gen</span>
          <span>An</span>
          <span>ID Unic</span>
        </div>

        <div className="table-body">
          {students && students.length > 0 ? (
            students.map((student) => (
              <div key={student._id} className="table-row">
                <span>{student.firstName} {student.lastName}</span>
                <span>{student.email}</span>
                <span>{student.major}</span>
                <span>{student.faculty}</span>
                <span>{student.gender}</span>
                <span>{student.year}</span>
                <span>{student.uniqueId}</span>
              </div>
            ))
          ) : (
            <div>No students found.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentList;
