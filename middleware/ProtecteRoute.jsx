import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles, hasPermission }) => {
  const token = localStorage.getItem('token');

  const getUserRole = (token) => {
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      const { uniqueId } = decodedToken;
      console.log(uniqueId);
      const parts = uniqueId.split('-');
      if (parts.length !== 3) {
        console.error('Invalid token format');
        return null;
      }

      const [, middle] = parts;
      if (middle.length === 1 && !isNaN(middle)) {
        console.log('student');
        return 'student';
      }
      if (middle.length === 3 && isNaN(middle)) {
        console.log('professor');
        return 'professor';
      }

      return null;
    } catch {
      return null;
    }
  };

  const userRole = getUserRole(token);

  if (!userRole) {
    console.error('Invalid token');
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.error('Unauthorized access');
    return <Navigate to="/dashboard" />;
  }

  // Check for permission for specific UI elements
  if (hasPermission && !allowedRoles.includes(userRole)) {
    return null; // Prevent the component from rendering
  }

  return <Outlet />;
};

export default ProtectedRoute;
