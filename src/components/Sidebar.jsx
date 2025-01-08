// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Folder, Folders, FileText, User, Users, CircleUserRound } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu.jsx';
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('');
    const [userRole, setUserRole] = useState(null);
    //const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
    const getUserRole = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
    
        try {
          const decodedToken = jwtDecode(token);
          const { uniqueId } = decodedToken;
          const parts = uniqueId.split('-');
          if (parts.length !== 3) {
            console.error('Invalid token format');
            return null;
          }
          const [, middle] = parts;
          if (middle.length === 1 && !isNaN(middle)) {
            return 'student';
          }
          if (middle.length === 3 && isNaN(middle)) {
            return 'professor';
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
        return null;
      };

    useEffect(() => {
        setUserRole(getUserRole());
        const path = window.location.pathname;
        if (path.includes('examslist')) {
            setActiveItem('Orar Examene');
        } else if (path.includes('studentlist')) {
            setActiveItem('Studenți');
        }else if (path.includes('dashboard')) {
                setActiveItem('Dashboard');
        } else if (path.includes('professorlist')) {
            setActiveItem('Profesori');
        }
        else if (path.includes('Vizualizare examene')) {
            setActiveItem('Vizualizare examene');
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
                        className={activeItem === 'Dashboard' ? 'active' : ''} 
                        onClick={() => handleItemClick('Dashboard', '/dashboard')}
                    >
                        <Folders /> Dashboard
                    </li>
                    <li 
                        className={activeItem === 'Orar Examene' ? 'active' : ''} 
                        onClick={() => handleItemClick('Orar Examene', '/examslist')}
                    >
                        <Folder /> Orar Examene
                    </li>
                    {userRole === 'student' && (
                    <li 
                        className={activeItem === 'Vizualizare examene' ? 'active' : ''} 
                        onClick={() => handleItemClick('Vizualizare examene', '/viewexamstudent')}
                    >
                        <Folder /> Vizualizare examene
                    </li>)}
                    <li 
                        className={activeItem === 'Requests' ? 'active' : ''} 
                        onClick={() => handleItemClick('Requests', '/requestlist')}
                    >
                        <FileText /> Requests
                    </li>
                    {userRole === 'professor' && (
                    <li 
                        className={activeItem === 'Studenți' ? 'active' : ''} 
                        onClick={() => handleItemClick('Studenți', '/studentlist')}
                    >
                        <Users /> Studenți
                    </li>)}
                    <li 
                        className={activeItem === 'Profesori' ? 'active' : ''} 
                        onClick={() => handleItemClick('Profesori', '/professorlist')}
                    >
                        <User /> Profesori
                    </li>
                    <li>
                        <CircleUserRound />
                        <DropdownMenu />
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <p>Version: 1.0.0</p>
                <p>© 2024 Echipa Gumita. All rights reserved.</p>
            </div>
        </aside>
    );
};

export default Sidebar;