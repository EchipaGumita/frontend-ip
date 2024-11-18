import React, { useState } from 'react';
import './ExamsList.css';

export const ExamsList = () => {
    const [exams, setExams] = useState([
        { id: 1, name: 'Examen 1' },
        { id: 2, name: 'Examen 2' },
        { id: 3, name: 'Examen 3' },
        { id: 4, name: 'Examen 4' },
        { id: 5, name: 'Examen 5' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredExams = exams.filter((exam) =>
        exam.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        setExams(exams.filter((exam) => exam.id !== id));
    };

    return (
        <div className="exams-page">
            <aside className="sidebar">
                <div className="logo">
                    <img src="/src/assets/logo-usv.png" alt="USV Logo" />
                </div>
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li className="active">Examene</li>
                        <li>Studenți</li>
                        <li>Profesori</li>
                    </ul>
                </nav>
                <button className="logout">Logout</button>
            </aside>

            <main className="content">
                <header className="header">
                    <h1>Toate examenele</h1>
                    <input
                        type="text"
                        placeholder="Caută examen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </header>
                <section className="exams-list">
                    {filteredExams.map((exam) => (
                        <div key={exam.id} className="exam-item">
                            <div className="exam-info">
                                <i className="exam-icon">📄</i>
                                <span>{exam.name}</span>
                            </div>
                            <div className="exam-actions">
                                <button className="more-button">More ▼</button>
                                <div className="dropdown">
                                    <button>Detalii examen</button>
                                    <button>Editare examen</button>
                                    <button onClick={() => handleDelete(exam.id)}>Ștergere examen</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};
