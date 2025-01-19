import React, { useState, useEffect } from 'react';
import { Folder, Folders, FileText, User, Users, CircleUserRound } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu.jsx';
import { jwtDecode } from 'jwt-decode';
import { isAdmin } from '../utils/authUtils'; // Import the isAdmin function

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false); // Track admin status

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
    const initialize = async () => {
      const role = getUserRole();
      setUserRole(role);
  
      if (role === 'professor') {
        const adminStatus = await isAdmin(); // Check if the user is an admin
        setIsUserAdmin(adminStatus);
      }
    };
  
    initialize();
  
    const path = window.location.pathname;
    if (path.includes('examslist')) {
      setActiveItem('Orar Examene');
    } else if (path.includes('studentlist')) {
      setActiveItem('Studenți');
    } else if (path.includes('dashboard') && !path.includes('admindashboard')) {
      setActiveItem('Dashboard');
    } else if (path.includes('admindashboard')) {
      setActiveItem('Admin Dashboard');
    } else if (path.includes('professorlist')) {
      setActiveItem('Profesori');
    } else if (path.includes('viewexamstudent')) {
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
            </li>
          )}
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
            </li>
          )}
          <li
            className={activeItem === 'Profesori' ? 'active' : ''}
            onClick={() => handleItemClick('Profesori', '/professorlist')}
          >
            <User /> Profesori
          </li>
          {isUserAdmin && (
            <li
              className={activeItem === 'Admin Dashboard' ? 'active' : ''}
              onClick={() => handleItemClick('Admin Dashboard', '/admindashboard')}
            >
              <Folders /> Admin Dashboard
            </li>
          )}
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
