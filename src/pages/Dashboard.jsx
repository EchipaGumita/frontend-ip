// src/pages/Dashboard.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../Dashboard.css';
import { Folder, FileText, User } from 'lucide-react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="../../src/assets/logo usv.png" alt="USV Logo" className="logo" />
          <h2>USV</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="active"><Folder /> Orar Examene</li>
            <li onClick={() => window.location.href = '/examslist'}><FileText /> Examene</li>
            <li onClick={() => window.location.href = '/professorlist'}><User /> Profesori</li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <section className="section exams">
          <h3>Orar examene</h3>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit" className="bg-white px-3 py-3">
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
          </div>
          <div className="table-body">
            {/* Rows of exam schedules would go here */}
          </div>
        </section>

        
      </main>
    </div>
  );
};

export default Dashboard;
