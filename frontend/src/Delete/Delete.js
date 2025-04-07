import React, { useState } from 'react';
import axios from 'axios';

function Delete() {
  const [id, setId] = useState('');

  const handleInputChange = (e) => {
    setId(e.target.value);
  };

  const handleDelete = async () => {
    if (!id) {
      alert('Please enter an ID');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/user/${id}`);
      console.log('Delete response:', response.data);
      alert(`User with ID ${id} deleted successfully`);
      setId('');
    } catch (error) {
      console.error('Error deleting user:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert('Failed to delete user. Check console for details.');
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete all users?')) {
      return;
    }

    try {
      const response = await axios.delete('http://localhost:8080/user');
      console.log('Delete all response:', response.data);
      alert('All users deleted successfully');
    } catch (error) {
      console.error('Error deleting all users:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert('Failed to delete all users. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <label htmlFor="userId">Enter User ID:</label>
      <input
        type="text"
        id="userId"
        value={id}
        onChange={handleInputChange}
        placeholder="Enter ID to delete"
      />
      <br />
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleDeleteAll} style={{ marginLeft: '10px' }}>Delete All</button>
    </div>
  );
}

export default Delete;
