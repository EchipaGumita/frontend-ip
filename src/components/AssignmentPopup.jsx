import React, { useState } from 'react';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AssignmentPopup = ({ student, onClose }) => {
  const [subgroupId, setSubgroupId] = useState('');

  const handleAssignment = async () => {
    try {
      // Send the assignment request to the backend
      const response = await axios.post(`${backendURL}/subgroup/add-students`, {
        subGroupId: subgroupId, // Ensure key matches backend expectation
        studentUniqueIds: [student.uniqueId], // Wrap studentUniqueId in an array
      });

      console.log('Backend response:', response.data);
      alert('Student successfully added to the subgroup!');
      onClose(); // Close the popup after successful assignment
    } catch (error) {
      console.error('Error adding student to subgroup:', error.response?.data || error.message);
      alert('Failed to add student to the subgroup.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg transform scale-105">
        <h2 className="text-2xl font-bold mb-4">Assign to Subgroup</h2>
        <p className="mb-4">
          Student: {student.firstName} {student.lastName}
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Subgroup ID</h3>
          <input
            type="text"
            value={subgroupId}
            onChange={(e) => setSubgroupId(e.target.value)}
            placeholder="Enter Subgroup ID"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <button
          onClick={handleAssignment}
          disabled={!subgroupId}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
        >
          Assign
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 py-2 rounded mt-2 hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AssignmentPopup;
