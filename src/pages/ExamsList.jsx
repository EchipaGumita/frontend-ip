import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2";
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ExamDropdown from '../components/ExamDropDown'; // Import the new ExamDropdown component
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode to decode the token

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [userRole, setUserRole] = useState(null);

  // Function to decode the token and get the role
  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      const { uniqueId } = decodedToken;
      const parts = uniqueId.split('-');
      if (parts.length !== 3) {
        console.error('Invalid token format');
        return null;
      }
      const [, middle] = parts;
      if (middle.length === 1 && !isNaN(middle)) {
        return 'student';
      }
      if (middle.length === 3 && isNaN(middle)) {
        return 'professor';
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return null;
  };

  // Set user role when the component mounts
  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  // Fetch exams data when the component mounts
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${backendURL}/exam`);
        setExams(response.data.exams);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  // Function to remove an exam from the state after deletion
  const removeExamFromState = (examId) => {
    setExams(exams.filter(exam => exam._id !== examId));
  };

  const handleItemClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <section className="section exams">
          <div className="header-bar">
            <h3>Orar examene</h3>
            {/* Render the "Create Exam" button only if the user is a professor */}
            {userRole === 'professor' && (
              <button className="add-request-button" onClick={() => handleItemClick('/createexam')}>
                <HiPlus size={24} />
                AE
              </button>
            )}
            {/* Render the "Create Class" button for all roles */}
            {userRole === 'professor' && (
            <button className="add-request-button" onClick={() => handleItemClick('/createclass')}>
              <HiPlus size={24} />
              AS
            </button>
            )}
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
            <span>Ora</span>            {/* Exam Hour */}
            <span>Sala</span>           {/* Classroom */}
            {userRole === 'professor' && (<span>Actiuni</span> )}       {/* Actions */}
          </div>

          {/* Table Body (Rows) */}
          <div className="table-body">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div key={exam._id} className="table-row">
                  <span>{exam.subject}</span>          {/* Subject */}
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
                  {userRole === 'professor' && (
                  <span>
                    <ExamDropdown examId={exam._id} onDelete={removeExamFromState} />
                  </span>)}
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
