import React, { useEffect, useState } from 'react';
import '../ProfessorList.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2";
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate';
import { isAdmin } from '../utils/authUtils';
import { jwtDecode } from 'jwt-decode';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isUserAdmin, setIsUserAdmin] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const professorsPerPage = 5;

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
 useEffect(() => {
     const initialize = async () => {
       const role = getUserRole();
       setUserRole(role);
 
       if (role === 'professor') {
         const adminStatus = await isAdmin(); // Check admin status
         setIsUserAdmin(adminStatus);
       }
     };
 
     initialize();
   }, []);
  useEffect(() => {
    setUserRole(getUserRole());
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(`${backendURL}/professor`);
        const allProfessors = response.data.professors;

        // Filter professors based on the search term
        const filteredProfessors = allProfessors.filter(professor =>
          `${professor.firstName} ${professor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professor.department.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Calculate total pages
        setTotalPages(Math.ceil(filteredProfessors.length / professorsPerPage));

        // Set the professors for the current page
        const startIndex = currentPage * professorsPerPage;
        const currentPageProfessors = filteredProfessors.slice(startIndex, startIndex + professorsPerPage);
        setProfessors(currentPageProfessors);
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    fetchProfessors();
  }, [currentPage, searchTerm]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to the first page when search changes
  };

  const handleItemClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="section professors">
        <div className="header-bar">
          <h3>Profesori</h3>
          {userRole === 'professor' &&isUserAdmin && (
            
            <button className="add-request-button" onClick={() => handleItemClick('/addprofessor')}>
              <HiPlus size={24} />
            </button>)}
          
        </div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="form-control" 
          />
          <button type="submit" className="btn btn-outline-primary">
            <HiMiniMagnifyingGlass />
          </button>
        </div>

        <div className="table-header">
          <span>Nume</span>
          <span>Email</span>
          <span>Materie</span>
        </div>

        <div className="table-body">
          {professors.length > 0 ? (
            professors.map((professor) => (
              <div key={professor._id} className="table-row">
                <span>{professor.firstName} {professor.lastName}</span>
                <span>{professor.email}</span>
                <span>{professor.department}</span>
              </div>
            ))
          ) : (
            <div>No professors found.</div>
          )}
        </div>

        <ReactPaginate
          previousLabel={<button className="btn btn-outline-primary">Previous</button>}
          nextLabel={<button className="btn btn-outline-primary">Next</button>}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center mt-4"
          activeClassName="active"
          previousClassName={`page-item ${currentPage === 0 ? 'disabled' : ''}`}
          nextClassName={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
        />
      </main>
    </div>
  );
};

export default ProfessorList;
