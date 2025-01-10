import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { HiPlus } from 'react-icons/hi';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate'; // Import ReactPaginate

const backendURL = import.meta.env.VITE_BACKEND_URL;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]); // State for groups
  const [subgroups, setSubgroups] = useState([]); // State for subgroups
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [groupId, setGroupId] = useState('');
  const [subgroupId, setSubgroupId] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [studentsPerPage] = useState(5); // Set the number of students per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch students
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

  // Fetch groups and subgroups
  useEffect(() => {
    const fetchGroupsAndSubgroups = async () => {
      try {
        const response = await axios.get(`${backendURL}/groups`);
        if (response.data && Array.isArray(response.data.groups)) {
          setGroups(response.data.groups);
          const allSubgroups = response.data.groups.flatMap(group => group.subGroups);
          setSubgroups(allSubgroups);
        } else {
          console.error('Fetched groups data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching groups and subgroups:', error);
      }
    };

    fetchGroupsAndSubgroups();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemClick = (path) => {
    window.location.href = path;
  };

  const handleDropdownOption = async (action, student) => {
    if (action === 'Assign Group') {
      setSelectedStudent(student);
      setShowModal(true);
    } else if (action === 'Edit') {
      console.log(`Editing student with uniqueId ${student.uniqueId}`);
      // Add logic for editing student if needed
    } else if (action === 'Remove') {
      await handleRemoveStudent(student.uniqueId);
    } else if (action === 'Assign Subgroup') {
      console.log(`Assigning subgroup to student with uniqueId ${student.uniqueId}`);
      // Add logic for subgroup assignment if needed
    }
  };

  const handleAssignGroup = async () => {
    try {
      if (selectedStudent && groupId) {
        console.log(`Assigning student with uniqueId ${selectedStudent.uniqueId} to group with ID ${groupId}`);
        await axios.post(`${backendURL}/groups/move-student-to-group`, {
          uniqueId: selectedStudent.uniqueId,
          groupId: groupId,
        });
        alert('Student moved to group successfully!');
        setShowModal(false);
        setGroupId('');
      } else {
        alert('Please select a student and a group.');
      }
    } catch (error) {
      console.error('Error moving student to group:', error);
      alert('An error occurred while moving the student to the group.');
    }
  };
  const handleAssignSubgroup = async () => {
    try {
      if (selectedStudent && subgroupId) {
        console.log(`Assigning student with uniqueId ${selectedStudent.uniqueId} to subgroup with ID ${subgroupId}`);
        await axios.post(`${backendURL}/subgroup/add-students`, {
          uniqueId: selectedStudent.uniqueId,
          subgroupId: subgroupId,
        });
        alert('Student added to subgroup successfully!');
        setShowModal(false);
        setSubgroupId('');
      } else {
        alert('Please select a student and a subgroup.');
      }
    } catch (error) {
      console.error('Error adding student to subgroup:', error);
      alert('An error occurred while adding the student to the subgroup.');
    }
  };
  const handleRemoveStudent = async (uniqueId) => {
    try {
      await axios.delete(`${backendURL}/students/${uniqueId}`);
      setStudents(students.filter(student => student.uniqueId !== uniqueId));
      alert('Student removed successfully!');
    } catch (error) {
      console.error('Error removing student:', error);
      alert('An error occurred while removing the student.');
    }
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
                      <Dropdown.Item onClick={() => handleDropdownOption('Edit', student)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDropdownOption('Remove', student)}>Remove</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDropdownOption('Assign Group', student)}>Assign Subgroup</Dropdown.Item>
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

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign Group/Subgroup</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Student: {selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : ''}</p>
              <div className="mb-3">
                <label htmlFor="subgroupId" className="form-label">Select Subgroup</label>
                <select
                  className="form-control"
                  id="subgroupId"
                  value={subgroupId}
                  onChange={(e) => setSubgroupId(e.target.value)}
                >
                  <option value="">--Select Subgroup--</option>
                  {subgroups.map((subgroup) => (
                    <option key={subgroup._id} value={subgroup._id}>
                      {subgroup.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAssignSubgroup}>Assign Subgroup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
