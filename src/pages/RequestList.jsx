// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import '../ExamsList.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons for approve/deny
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RequestList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${backendURL}/exam-request`);
        setExams(response.data.requests);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  const handleApproval = async (id, approve) => {
    try {
      await axios.put(`${backendURL}/exam-request/${id}`, {
        approved: approve,
        reason: approve ? "Approved by admin" : "Denied by admin",
      });
      // Update state locally after approval/denial
      setExams((prevExams) =>
        prevExams.map((exam) =>
          exam._id === id ? { ...exam, approved: approve } : exam
        )
      );
    } catch (error) {
      console.error(`Error ${approve ? 'approving' : 'denying'} exam:`, error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="section exams">
        <div className="header-bar">
          <h3>Toate examenele</h3>
          <button className="add-request-button" onClick={() => handleItemClick('/createexamrequest')}>
            <HiPlus size={24} />
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
          <span>Nume Examen</span>
          <span>Data</span>
          <span>Profesor</span>
          <span>Actiune</span>
        </div>

        {/* Table Body (Rows) */}
        <div className="table-body">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div key={exam._id} className="table-row">
                <span>{exam.subject}</span> {/* Exam Name */}
                <span>{new Date(exam.examDate).toLocaleDateString()}</span> {/* Exam Date */}
                <span>{exam.mainProfessor.firstName} {exam.mainProfessor.lastName}</span> {/* Professor Name */}
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
