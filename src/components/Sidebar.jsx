import React, { useState, useEffect } from 'react';
import { Folder, FileText, User } from 'lucide-react';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('dashboard')) {
            setActiveItem('Orar Examene');
        } else if (path.includes('studentlist')) {
            setActiveItem('Studenți');
        } else if (path.includes('professorlist')) {
            setActiveItem('Profesori');
        } else {
            setActiveItem('Requests');
        }
    }, []);

    const handleItemClick = (itemName, path) => {
        setActiveItem(itemName);
        window.location.href = path;
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src="../../src/assets/logo usv.png" alt="USV Logo" className="logo" />
                <h2>USV</h2>
            </div>
            <nav className="nav-menu">
                <ul>
                    <li 
                        className={activeItem === 'Orar Examene' ? 'active' : ''} 
                        onClick={() => handleItemClick('Orar Examene', '/dashboard')}
                    >
                        <Folder /> Orar Examene
                    </li>
                    <li 
                        className={activeItem === 'Requests' ? 'active' : ''} 
                        onClick={() => handleItemClick('Requests', '/requestlist')}
                    >
                        <FileText /> Requests
                    </li>
                    <li 
                        className={activeItem === 'Studenți' ? 'active' : ''} 
                        onClick={() => handleItemClick('Studenți', '/studentlist')}
                    >
                        <User /> Studenți
                    </li>
                    <li 
                        className={activeItem === 'Profesori' ? 'active' : ''} 
                        onClick={() => handleItemClick('Profesori', '/professorlist')}
                    >
                        <User /> Profesori
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;