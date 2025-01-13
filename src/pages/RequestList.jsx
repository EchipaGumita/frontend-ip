import React, { useEffect, useState } from 'react';
import '../ExamsList.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the token

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RequestList = () => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState({}); // Store students' data by unique ID
  const [userRole, setUserRole] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);

  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      const { uniqueId } = decodedToken;
      setUniqueId(uniqueId);
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

  useEffect(() => {
    const fetchExams = async () => {
      setUserRole(getUserRole());
      try {
        const response = await axios.get(`${backendURL}/exam-request`);
        const examData = response.data.requests;

        // Filter requests based on user role
        let filteredExams = examData;
        if (userRole === 'student') {
          filteredExams = examData.filter(
            (exam) => exam.studentUniqueId === uniqueId
          );
        } else if (userRole === 'professor') {
          filteredExams = examData.filter(
            (exam) =>
              exam.mainProfessor.uniqueId === uniqueId ||
              exam.secondaryProfessor.uniqueId === uniqueId
          );
        }

        setExams(filteredExams);

        // Fetch student data for each exam
        const studentPromises = filteredExams.map((exam) =>
          axios.get(`${backendURL}/students/${exam.studentUniqueId}`)
        );

        const studentResponses = await Promise.all(studentPromises);
        const studentData = studentResponses.reduce((acc, curr) => {
          acc[curr.data.uniqueId] = curr.data;
          return acc;
        }, {});

        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching exams or students:', error);
      }
    };

    fetchExams();
  }, [userRole, uniqueId]);

  const handleApproval = async (id, approve) => {
    try {
      await axios.put(`${backendURL}/exam-request/${id}`, {
        approved: approve,
        reason: approve ? 'Approved by admin' : 'Denied by admin',
      });
      window.location.reload(); // Refresh the page after approval/denial
    } catch (error) {
      console.error(`Error ${approve ? 'approving' : 'denying'} exam:`, error);
    }
  };

  const handleItemClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="section exams">
        <div className="header-bar">
          <h3>Toate request-urile de examene</h3>
          {userRole === 'student' && (
            <button
              className="add-request-button"
              onClick={() => handleItemClick('/createexamrequest')}
            >
              <HiPlus size={24} />
            </button>
          )}
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="bg-white px-3 py-3">
            <HiMiniMagnifyingGlass />
          </button>
        </div>

        <div className="table-header">
          <span>Nume Examen</span>
          <span>Data</span>
          <span>Profesor</span>
          <span>Student</span>
          {userRole === 'professor' && <span>Actiune</span>}
        </div>

        <div className="table-body">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div key={exam._id} className="table-row">
                <span>{exam.subject}</span>
                <span>{new Date(exam.examDate).toLocaleDateString()}</span>
                <span>
                  {exam.mainProfessor.firstName} {exam.mainProfessor.lastName}
                </span>
                <span>
                  {students[exam.studentUniqueId]
                    ? `${students[exam.studentUniqueId].firstName} ${students[exam.studentUniqueId].lastName}`
                    : 'Loading...'}
                </span>
                {userRole === 'professor' && (
                  <span className="action-buttons">
                    <button
                      className="approve-button"
                      onClick={() => handleApproval(exam._id, true)}
                    >
                      <FaCheck color="green" />
                    </button>
                    <button
                      className="deny-button"
                      onClick={() => handleApproval(exam._id, false)}
                    >
                      <FaTimes color="red" />
                    </button>
                  </span>
                )}
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

export default RequestList;
