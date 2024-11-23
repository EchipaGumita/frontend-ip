// src/pages/Dashboard.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../Dashboard.css';
import { Folder, FileText, User } from 'lucide-react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";


const ProfessorList = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="../../src/assets/logo usv.png" alt="USV Logo" className="logo" />
          <h2>USV</h2>
        </div>
        <nav className="nav-menu">
          <ul>
             <li onClick={() => window.location.href = '/dashboard'}><User />Orar Examene</li>
            <li onClick={() => window.location.href = '/examslist'}><FileText /> Examene</li>
            <li className="active"><Folder />Profesori</li>
          </ul>
        </nav>
      </aside>

      <main className="section professors">
    <h3>Profesori</h3>
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit" className="bg-white px-3 py-3">
                <HiMiniMagnifyingGlass />
            </button>
          </div>
          <div className="table-header">
            <span>Nume</span>
            <span>Email</span>
            <span>Materie</span>
          </div>
          <div className="table-body">
        </div>
  </main>
    </div>
  );
};

export default ProfessorList;




 