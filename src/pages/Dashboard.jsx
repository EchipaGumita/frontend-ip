import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { Folder, FileText, User } from 'lucide-react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  // State to store exams
  const [exams, setExams] = useState([]);

  // Fetch exams data when the component mounts
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${backendURL}/exam`); // Using axios to make the GET request
        setExams(response.data.exams); // Assuming response structure has an 'exams' field
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
            <li className="active"><Folder /> Orar Examene</li>
            <li onClick={() => window.location.href = '/examslist'}><FileText /> Examene</li>
            <li onClick={() => window.location.href = '/professorlist'}><User /> Profesori</li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <section className="section exams">
          <h3>Orar examene</h3>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit" className="bg-white px-3 py-3">
              <HiMiniMagnifyingGlass />
            </button>
          </div>

          {/* Table Headers (Columns) */}
          <div className="table-header">
            <span>Materie</span>         {/* Column for Subject */}
            <span>Grupa</span>          {/* Column for Group */}
            <span>Examiner</span>       {/* Column for Main Professor */}
            <span>Assistant</span>      {/* Column for Secondary Professor */}
            <span>Data</span>           {/* Column for Exam Date */}
            <span>Ora</span>            {/* Column for Exam Hour */}
            <span>Sala</span>           {/* Column for Classroom */}
          </div>

          {/* Table Body (Rows) */}
          <div className="table-body">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div key={exam._id} className="table-row">
                  <span>{exam.subject}</span>          {/* Subject (Materie) */}
                  <span>{exam.group?.name || 'No group assigned'}</span>   {/* Group Name */}
                  <span>{exam.mainProfessor?.firstName} {exam.mainProfessor?.lastName || 'N/A'}</span>  {/* Main Professor */}
                  <span>
                    {exam.secondaryProfessor
                      ? `${exam.secondaryProfessor.firstName} ${exam.secondaryProfessor.lastName}`
                      : 'N/A'}
                  </span>  {/* Secondary Professor */}
                  <span>{new Date(exam.date).toLocaleDateString()}</span>   {/* Exam Date */}
                  <span>{exam.hour}</span>  {/* Exam Hour */}
                  <span>{exam.classroom?.name || 'No classroom assigned'}</span>   {/* Classroom */}
                </div>
              ))
            ) : (
              <div>No exams found.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
