import React, { useEffect, useState } from 'react';
import '../ExamsList.css';
import { Folder, FileText, User } from 'lucide-react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;

const ExamsList = () => {
  // State to store exams
  const [exams, setExams] = useState([]);

  // Fetch exams data when the component mounts
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${backendURL}/exams`); // Using axios to make the GET request
        setExams(response.data.exams); // Assuming response structure has a 'exams' field
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
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
            <li className="active"><FileText /> Examene</li>
            <li onClick={() => window.location.href = '/studentslist'}><User /> Studenți</li>
            <li onClick={() => window.location.href = '/professorlist'}><User /> Profesori</li>
          </ul>
        </nav>
      </aside>

      <main className="section exams">
        <h3>Toate examenele</h3>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="bg-white px-3 py-3">
            <HiMiniMagnifyingGlass />
          </button>
        </div>

        {/* Table Headers (Columns) */}
        <div className="table-header">
          <span>Nume Examen</span>      {/* Column for Exam Name */}
          <span>Data</span>            {/* Column for Date */}
          <span>Profesor</span>        {/* Column for Professor */}
        </div>

        {/* Table Body (Rows) */}
        <div className="table-body">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div key={exam._id} className="table-row">
                <span>{exam.name}</span>         {/* Exam Name */}
                <span>{exam.date}</span>         {/* Exam Date */}
                <span>{exam.professor}</span>    {/* Professor Name */}
              </div>
            ))
          ) : (
            <div>No exams found.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExamsList;
