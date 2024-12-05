// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { Folder, FileText, User } from 'lucide-react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import axios from 'axios'; // Import axios
import Sidebar from '../components/Sidebar';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const ProfessorList = () => {
  // State to store professors
  const [professors, setProfessors] = useState([]);

  // Fetch professors data when the component mounts
  useEffect(() => {
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

  return (
    <div className="dashboard-container">
      <Sidebar/>

      <main className="section professors">
        <h3>Profesori</h3>
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
          <span>Materie</span>        {/* Column for Subject */}
        </div>

        {/* Table Body (Rows) */}
        <div className="table-body">
          {professors.length > 0 ? (
            professors.map((professor) => (
              <div key={professor._id} className="table-row">
                <span>{professor.firstName} {professor.lastName}</span>  {/* Professor Name */}
                <span>{professor.email}</span>  {/* Professor Email */}
                <span>{professor.department}</span>  {/* Professor Subject */}
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