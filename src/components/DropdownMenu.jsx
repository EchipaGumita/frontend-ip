// eslint-disable-next-line no-unused-vars
import React from "react";
import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

export function DropdownMenu() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleItemClick = (path) => {
    window.location.href = path;
};

  const handleLogout = () => {
    // Clear session data
    localStorage.clear(); // Clear user data stored in localStorage
    sessionStorage.clear(); // Clear sessionStorage if used

    // Redirect to login page
    navigate("/");
  };

  return (
    <Dropdown label="Profil" dismissOnClick={true}>
      <Dropdown.Item onClick={() => handleItemClick('/resetpassword')}>
        Change Password
      </Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
