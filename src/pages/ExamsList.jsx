import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { HiMiniMagnifyingGlass, HiPlus } from "react-icons/hi2";
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ExamDropdown from '../components/ExamDropDown';
import ReactPaginate from 'react-paginate';
import { jwtDecode } from 'jwt-decode';
import { isAdmin } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserAdmin, setIsUserAdmin] = useState(false); 
  const examsPerPage = 5;
  const navigate = useNavigate();

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
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
  
        const decodedToken = jwtDecode(token);
        const professorUniqueId = decodedToken.uniqueId;
  
        const response = await axios.get(`${backendURL}/exam`);
        const allExams = response.data.exams;
  
        // Filter exams based on the search term
        let filteredExams = allExams.filter((exam) =>
          exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (exam.group && exam.group.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (exam.mainProfessor && `${exam.mainProfessor.firstName} ${exam.mainProfessor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (exam.secondaryProfessor && `${exam.secondaryProfessor.firstName} ${exam.secondaryProfessor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (exam.classroom && exam.classroom.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          exam.hour.toLowerCase().includes(searchTerm.toLowerCase()) ||
          new Date(exam.date).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
        );
  
        // Additional filtering for professors
        if (userRole === 'professor' && !isUserAdmin) {
          filteredExams = filteredExams.filter(
            (exam) =>
              (exam.mainProfessor && exam.mainProfessor.uniqueId === professorUniqueId) ||
              (exam.secondaryProfessor && exam.secondaryProfessor.uniqueId === professorUniqueId)
          );
        }
  
        // Calculate total pages
        setTotalPages(Math.ceil(filteredExams.length / examsPerPage));
  
        // Set the exams for the current page
        const startIndex = currentPage * examsPerPage;
        const currentPageExams = filteredExams.slice(startIndex, startIndex + examsPerPage);
        setExams(currentPageExams);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
  
    fetchExams();
  }, [currentPage, searchTerm, userRole, isUserAdmin]);
  

  const removeExamFromState = (examId) => {
    setExams(exams.filter(exam => exam._id !== examId));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemClick = (path) => {
    navigate(path);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to the first page when search changes
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <section className="section exams">
          <div className="header-bar">
            <h3>Orar examene</h3>
            {userRole === 'professor' && (
              <>
                <button className="add-request-button" onClick={() => handleItemClick('/createexam')}>
                  <HiPlus size={24} />
                  AE
                </button>
                {isUserAdmin && (
                <button className="add-request-button" onClick={() => handleItemClick('/creategroup-subgroup')}>
                  <HiPlus size={24} />
                  AG
                </button>
                )}
                 {isUserAdmin && (
                <button className="add-request-button" onClick={() => handleItemClick('/createclass')}>
                  <HiPlus size={24} />
                  AS
                </button>
                 )}
              </>
            )}
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
            <span>Materie</span>
            <span>Grupa</span>
            <span>Examiner</span>
            <span>Assistant</span>
            <span>Data</span>
            <span>Ora</span>
            <span>Sala</span>
            {userRole === 'professor'&& isUserAdmin &&( <span>Actiuni</span>)  }
          </div>

          <div className="table-body">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div key={exam._id} className="table-row">
                  <span>{exam.subject}</span>
                  <span>{exam.group?.name || 'No group assigned'}</span>
                  <span>{exam.mainProfessor?.firstName} {exam.mainProfessor?.lastName || 'N/A'}</span>
                  <span>
                    {exam.secondaryProfessor
                      ? `${exam.secondaryProfessor.firstName} ${exam.secondaryProfessor.lastName}`
                      : 'N/A'}
                  </span>
                  <span>{new Date(exam.date).toLocaleDateString()}</span>
                  <span>{exam.hour}</span>
                  <span>{exam.classroom?.name || 'No classroom assigned'}</span>
                  {userRole === 'professor' && isUserAdmin && (
                    <span>
                      <ExamDropdown examId={exam._id} onDelete={removeExamFromState} />
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div>No exams found.</div>
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
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
