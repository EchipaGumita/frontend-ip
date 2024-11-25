import React, { useEffect, useState } from 'react';
import './StudentsListS.css';
import { Folder, FileText, User } from 'lucide-react';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const StudentsListS = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${backendURL}/students`);
        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="../../src/assets/logo usv.png" alt="USV Logo" className="logo" />
          <h2>USV</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li onClick={() => window.location.href = '/dashboard'}><Folder /> Orar Examene</li>
            <li onClick={() => window.location.href = '/examslist'}><FileText /> Examene</li>
            <li className="active"><User /> Studenți</li>
            <li onClick={() => window.location.href = '/professorlist'}><User /> Profesori</li>
          </ul>
        </nav>
      </aside>

      <main className="section students">
        <h3>Lista Studenți</h3>
        <div className="students-table">
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student._id} className="student-row">
                <span>{student.name}</span>
                <span>{student.email}</span>
                <span>{student.faculty}</span>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentsListS;
