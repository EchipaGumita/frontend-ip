import React, { useState } from 'react';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AssignmentPopup = ({ student, actionType, onClose }) => {
  const [groupId, setGroupId] = useState('');
  const [subgroupId, setSubgroupId] = useState('');

  const handleAssignment = async () => {
    try {
      if (actionType === 'Assign Group') {
        const response = await axios.post(`${backendURL}/groups/assign`, {
          studentID: student._id,
          groupID: groupId,
        });
        console.log('Group assignment response:', response.data);
        alert('Student assigned to group successfully!');
      } else if (actionType === 'Assign Subgroup') {
        const response = await axios.post(`${backendURL}/subgroups/assign`, {
          studentID: student._id,
          subgroupID: subgroupId,
        });
        console.log('Subgroup assignment response:', response.data);
        alert('Student assigned to subgroup successfully!');
      }
      onClose(); // Close the popup after successful assignment
    } catch (error) {
      console.error(`Error assigning student to ${actionType.toLowerCase()}:`, error);
      alert('Failed to assign student.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg transform scale-105">
        <h2 className="text-2xl font-bold mb-4">Assign {actionType.split(' ')[1]}</h2>
        <p className="mb-4">Student: {student.firstName} {student.lastName}</p>
  
        {actionType === 'Assign Group' && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Group ID</h3>
            <input
              type="text"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              placeholder="Enter Group ID"
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>
        )}
  
        {actionType === 'Assign Subgroup' && (
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
        )}
  
        <button
          onClick={handleAssignment}
          disabled={(actionType === 'Assign Group' && !groupId) || (actionType === 'Assign Subgroup' && !subgroupId)}
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
