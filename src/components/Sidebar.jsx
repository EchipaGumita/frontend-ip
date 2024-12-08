// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Folder, Folders, FileText, User, Users, CircleUserRound } from 'lucide-react';
import { DropdownMenu } from './DropdownMenu.jsx';


const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('');
    //const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown


    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('examslist')) {
            setActiveItem('Orar Examene');
        } else if (path.includes('studentlist')) {
            setActiveItem('Studenți');
        }else if (path.includes('dashboard')) {
                setActiveItem('Dashboard');
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

    // const toggleDropdown = () => {
    //     setIsDropdownOpen(!isDropdownOpen);
    // };

    // const handleResetPassword = () => {
    //     // Logic for resetting the password
    //     alert("Reset Password clicked!");
    // };

    // const handleLogout = () => {
    //     // Logic for logging out
    //     alert("Logout clicked!");
    // };

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
                        <Users /> Studenți
                    </li>
                    <li 
                        className={activeItem === 'Profesori' ? 'active' : ''} 
                        onClick={() => handleItemClick('Profesori', '/professorlist')}
                    >
                        <User /> Profesori
                    </li>
                    <li>
                        <DropdownMenu />
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <p>Version: 1.0.0</p>
                <p>© 2024 USV. All rights reserved.</p>
            </div>
            {/* User Dropdown
            <div className="user-dropdown">
                <div className="user-info" onClick={toggleDropdown}>
                    <span className="user-name">John Doe</span>
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {isDropdownOpen && (
                    <ul className="dropdown-menu">
                        <li onClick={handleResetPassword}>Reset Password</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                )}
            </div> */}
        </aside>
    );
};

export default Sidebar;