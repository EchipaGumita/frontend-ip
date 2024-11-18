import React, { useState } from 'react';
import './ProfessorList.css';

export const ProfessorList = () => {
    const [professors, setProfessors] = useState([
        { id: 1, name: 'Profesor 1' },
        { id: 2, name: 'Profesor 2' },
        { id: 3, name: 'Profesor 3' },
        { id: 4, name: 'Profesor 4' },
        { id: 5, name: 'Profesor 5' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProfessors = professors.filter((prof) =>
        prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        setProfessors(professors.filter((prof) => prof.id !== id));
    };

    return (
        <div className="professors-page">
            <aside className="sidebar">
                <div className="logo">
                    <img src="/src/assets/logo-usv.png" alt="USV Logo" />
                </div>
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li>Examene</li>
                        <li>Studenți</li>
                        <li className="active">Profesori</li>
                    </ul>
                </nav>
                <button className="logout">Logout</button>
            </aside>

            <main className="content">
                <header className="header">
                    <h1>Toți profesorii</h1>
                    <input
                        type="text"
                        placeholder="Caută profesor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </header>
                <section className="professors-list">
                    {filteredProfessors.map((prof) => (
                        <div key={prof.id} className="professor-item">
                            <div className="professor-info">
                                <i className="professor-icon">📄</i>
                                <span>{prof.name}</span>
                            </div>
                            <div className="professor-actions">
                                <button className="more-button">More ▼</button>
                                <div className="dropdown">
                                    <button>Detalii profesor</button>
                                    <button>Editare profesor</button>
                                    <button onClick={() => handleDelete(prof.id)}>Ștergere profesor</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};
