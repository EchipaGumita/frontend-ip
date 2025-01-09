import React, { useState } from "react";
import axios from 'axios'; // Import axios
const backendURL = import.meta.env.VITE_BACKEND_URL;

const CreateGroup_SubgroupForm = () => {
  const [formData, setFormData] = useState({
    group: "", // maps to grupa
    subgroups: "", // maps to comma-separated semigrupa names
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert("Grupa/semigrupa a fost creată cu succes!");

    try {
      // Create Group
      const groupResponse = await axios.post(`${backendURL}/groups`, { name: formData.group });
      console.log('Group created successfully:', groupResponse.data);

      // Extract group ID from the response
      const groupId = groupResponse.data.group._id;
      if (!groupId) {
        throw new Error("Group creation failed, no group ID returned.");
      }

      // Split the subgroups input into an array
      const subgroupNames = formData.subgroups.split(',').map(subgroup => subgroup.trim());

      const createdSubgroups = [];

      // Create Subgroups
      for (let name of subgroupNames) {
        const subgroupResponse = await axios.post(`${backendURL}/subgroup`, { name });
        console.log('Subgroup created successfully:', subgroupResponse.data);
        createdSubgroups.push(subgroupResponse.data.subGroup._id);
      }

      if (createdSubgroups.length === 0) {
        throw new Error("No subgroups created.");
      }

      // Now associate the subgroups with the group
      const addSubgroupResponse = await axios.post(`${backendURL}/groups/add-subgroups`, {
        groupId: groupId,  // Group ID from the group creation response
        subGroupIds: createdSubgroups, // Array of subgroup IDs from the subgroup creation responses
      });

      console.log('Subgroups added to group:', addSubgroupResponse.data);

      // Optionally clear the form after submission
      setFormData({
        group: '',
        subgroups: '',
      });
    } catch (error) {
      console.error('Error creating group or subgroups:', error);
    }
  };

  const handleItemClick = (path) => {
    window.location.href = path;
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Adaugare Grupa+Semigrupe</h2>
        <p style={subtitleStyle}>Adaugare de o noua grupa+semigrupe.</p>

        <input
          type="text"
          name="group"
          placeholder="Grupa"
          value={formData.group}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="subgroups"
          placeholder="Semigrupa (separate cu virgula)"
          value={formData.subgroups}
          onChange={handleChange}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Confirmare Adaugare
        </button>
      </form>
    </div>
  );
};

// CSS-in-JS style objects
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2',
};

const formStyle = {
  backgroundColor: '#6699cc',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '400px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  marginBottom: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
};

const subtitleStyle = {
  marginBottom: '20px',
  fontSize: '14px',
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc', 
  outline: 'none',
  backgroundColor: '#fff', // fundal alb
  color: '#000', 
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#003366',
  color: '#fff',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

export default CreateGroup_SubgroupForm;
