import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { Folder, FileText, User } from 'lucide-react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;

const StudentsList = () => {
  // State to store students
  const [students, setStudents] = useState([]);

  // Fetch students data when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backendURL}/students`); // Using axios to make the GET request
        setStudents(response.data.students); // Assuming response structure has a 'students' field
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="../../src/assets/logo usv.png" alt="USV Logo" className="logo" />
          <h2>USV</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li onClick={() => window.location.href = '/dashboard'}><Folder /> Orar Examene</li>
            <li onClick={() => window.location.href = '/examslist'}><FileText /> Examene</li>
            <li onClick={() => window.location.href = '/professorlist'}><User /> Profesori</li>
            <li className="active"><User /> Studenți</li>
          </ul>
        </nav>
      </aside>

      <main className="section students">
        <h3>Studenți</h3>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="bg-white px-3 py-3">
            <HiMiniMagnifyingGlass />
          </button>
        </div>

        {/* Table Headers (Columns) */}
        <div className="table-header">
          <span>Nume</span>           {/* Column for Name */}
          <span>Email</span>          {/* Column for Email */}
          <span>An de studiu</span>   {/* Column for Year of Study */}
        </div>

        {/* Table Body (Rows) */}
        <div className="table-body">
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student._id} className="table-row">
                <span>{student.firstName} {student.lastName}</span>  {/* Student Name */}
                <span>{student.email}</span>  {/* Student Email */}
                <span>{student.year}</span>  {/* Student Year of Study */}
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

export default StudentsList;
