// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import '../ExamsList.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2"; // Import the plus icon
import axios from 'axios'; // Import axios
import Sidebar from '../components/Sidebar';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const RequestList = () => {
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

  const handleItemClick = (path) => {
    window.location.href = path;
};

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="section exams">
        <div className="header-bar">
          <h3>Toate examenele</h3>
          <button className="add-request-button" onClick={() => handleItemClick('/createexam')}>
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
          <span>Nume Examen</span> {/* Column for Exam Name */}
          <span>Data</span> {/* Column for Date */}
          <span>Profesor</span> {/* Column for Professor */}
        </div>

        {/* Table Body (Rows) */}
        <div className="table-body">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <div key={exam._id} className="table-row">
                <span>{exam.name}</span> {/* Exam Name */}
                <span>{exam.date}</span> {/* Exam Date */}
                <span>{exam.professor}</span> {/* Professor Name */}
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
