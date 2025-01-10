import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { HiPlus } from 'react-icons/hi';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subgroups, setSubgroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const studentsPerPage = 5;

  // Fetch Students and Paginate
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backendURL}/students`);
        const allStudents = response.data || [];

        // Calculate total pages
        setTotalPages(Math.ceil(allStudents.length / studentsPerPage));

        // Paginate students
        const startIndex = currentPage * studentsPerPage;
        const paginatedStudents = allStudents.slice(startIndex, startIndex + studentsPerPage);
        setStudents(paginatedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="section students">
        <div className="header-bar">
          <h3>Studenți</h3>
          <button className="add-request-button" onClick={() => handleItemClick('/addstudent')}>
            <HiPlus size={24} />
          </button>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="bg-white px-3 py-3">
            <HiMiniMagnifyingGlass />
          </button>
        </div>

        <div className="table-header">
          <span>Nume</span>
          <span>Email</span>
          <span>Specializare</span>
          <span>Facultate</span>
          <span>Gen</span>
          <span>An</span>
          <span>ID Unic</span>
          <span>Actiuni</span>
        </div>

        <div className="table-body">
          {students && students.length > 0 ? (
            students.map((student) => (
              <div key={student.uniqueId} className="table-row">
                <span>{student.firstName} {student.lastName}</span>
                <span>{student.email}</span>
                <span>{student.major}</span>
                <span>{student.faculty}</span>
                <span>{student.gender}</span>
                <span>{student.year}</span>
                <span>{student.uniqueId}</span>
                <span>
                  <Dropdown>
                    <Dropdown.Toggle variant="info" id={`dropdown-${student.uniqueId}`}>
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item>Remove</Dropdown.Item>
                      <Dropdown.Item>Assign Group</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </div>
            ))
          ) : (
            <div>No students found.</div>
          )}
        </div>

        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center mt-4"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName={`page-item ${currentPage === 0 ? 'disabled' : ''}`}
          nextClassName={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
        />
      </main>
    </div>
  );
};

export default StudentList;
