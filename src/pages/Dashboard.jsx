// src/pages/Dashboard.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../Dashboard.css';
import { Folder, FileText, User, Users } from 'lucide-react';

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
            <li><Folder /> Dashboard</li>
            <li className="active"><FileText /> Examene</li>
            <li><Users /> Studenti</li>
            <li><User /> Profesori</li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <section className="section exams">
          <h3>Orar examene</h3>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button><span role="img" aria-label="search">🔍</span></button>
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

        <section className="section professors">
          <h3>Profesori</h3>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button><span role="img" aria-label="search">🔍</span></button>
          </div>
          <div className="table-header">
            <span>Nume</span>
            <span>Email</span>
            <span>Materie</span>
          </div>
          <div className="table-body">
            {/* Rows of professors would go here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
