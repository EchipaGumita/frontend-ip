import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ExamDropdown = ({ examId, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-exam/${examId}`); // Redirects to the edit page with the exam ID
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${backendURL}/exam/${examId}`);
      console.log('Exam deleted:', response.data);
      if (onDelete) {
        onDelete(examId); // Call the parent component's function to remove the exam from state
      }
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <div className="dropdown">
      <button className="dropdown-btn">Actions</button>
      <div className="dropdown-content">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
};

export default ExamDropdown;
