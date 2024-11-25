import React, { useEffect, useState } from 'react';
import { Folder, FileText, User } from 'react-feather';

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch lista de profesori din baza de date
    fetch('https://api.exemplu.com/professors') // Înlocuiește cu API-ul tău real
      .then((response) => response.json())
      .then((data) => setProfessors(data))
      .catch((error) => console.error('Eroare la preluarea profesorilor:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="../../src/assets/logo usv.png" alt="USV Logo" className="logo" />
          <h2>USV</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><Folder /> Dashboard</li>
            <li onClick={() => window.location.href = '/examslist'}><FileText /> Examene</li>
            <li className="active"><User /> Profesori</li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="main-content">
        <h1>Toți profesorii</h1>

        {/* Bara de căutare */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Caută un profesor..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>Caută</button>
        </div>

        {/* Lista de profesori */}
        <div className="professors-list">
          {filteredProfessors.map((professor) => (
            <div className="professor-card" key={professor.id}>
              <div className="professor-info">
                <span>{professor.name}</span>
              </div>
              <div className="professor-actions">
                <button>Detalii profesor</button>
                <button>Editare profesor</button>
                <button>Ștergere profesor</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfessorList;
