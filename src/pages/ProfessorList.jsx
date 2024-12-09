// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import '../ProfessorList.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2"; // Import the plus icon
import axios from 'axios'; // Import axios
import Sidebar from '../components/Sidebar';
import { jwtDecode } from 'jwt-decode';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const ProfessorList = () => {
  // State to store professors
  const [professors, setProfessors] = useState([]);
  const [userRole, setUserRole] = useState(null);
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

  // Fetch professors data when the component mounts
  useEffect(() => {
    setUserRole(getUserRole());
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(`${backendURL}/professor`); // Using axios to make the GET request
        setProfessors(response.data.professors); // Assuming response structure has a 'professors' field
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    fetchProfessors();
  }, []);

  const handleItemClick = (path) => {
    window.location.href = path;
};

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="section professors">
        <div className="header-bar">
          <h3>Profesori</h3>
          {userRole === 'professor' && (<button className="add-request-button" onClick={() => handleItemClick('/addprofessor')}>
            <HiPlus size={24} />
          </button>)}
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="bg-white px-3 py-3">
            <HiMiniMagnifyingGlass />
          </button>
        </div>

        {/* Table Headers (Columns) */}
        <div className="table-header">
          <span>Nume</span> {/* Column for Name */}
          <span>Email</span> {/* Column for Email */}
          <span>Materie</span> {/* Column for Subject */}
        </div>

        {/* Table Body (Rows) */}
        <div className="table-body">
          {professors.length > 0 ? (
            professors.map((professor) => (
              <div key={professor._id} className="table-row">
                <span>{professor.firstName} {professor.lastName}</span> {/* Professor Name */}
                <span>{professor.email}</span> {/* Professor Email */}
                <span>{professor.department}</span> {/* Professor Subject */}
              </div>
            ))
          ) : (
            <div>No professors found.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfessorList;
