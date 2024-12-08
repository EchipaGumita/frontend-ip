// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2";
import axios from 'axios'; // Import axios
import Sidebar from '../components/Sidebar';
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

  const handleItemClick = (path) => {
    window.location.href = path;
};

  return (
    <div className="dashboard-container">
      
      <Sidebar/>
      <main className="content">
        <section className="section exams">
          <div className="header-bar">
            <h3>Orar examene</h3>
            <button className="add-request-button" onClick={() => handleItemClick('/createexam')}>
              <HiPlus size={24} />
              AE
            </button>
            <button className="add-request-button" onClick={() => handleItemClick('/createclass')}>
              <HiPlus size={24} />
              AS
            </button>
          </div>

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
