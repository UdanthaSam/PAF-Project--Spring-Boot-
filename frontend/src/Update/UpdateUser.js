import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function UpdateUser() {
  const [user, setUser] = useState({ fname: '', lname: '', username: '' });
  const [styled, setStyled] = useState(Cookies.get('styled') === 'true');
  const { id } = useParams();

  useEffect(() => {
    if (id && id !== 'undefined') {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:8080/user/${id}`);
          if (!response.ok) throw new Error(`User not found`);
          const data = await response.json();
          setUser(data);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to update user');
      alert('User updated successfully');
      window.location.href = '/userDisplay';
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleCancel = () => {
    window.location.href = '/userDisplay';
  };

  const inputStyle = styled
    ? {
        padding: '12px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        display: 'block',
      }
    : {};

  const buttonStyle = styled
    ? {
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '10px',
        marginRight: '10px',
      }
    : {};

    const cancelButtonStyle = styled
    ? {
        padding: '10px 20px',
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: 'inset 0 0 0 2px #333'
      }
    : {};

  const labelStyle = styled
    ? { marginTop: '10px', display: 'block', fontWeight: 'bold' }
    : {};

  return (
    <div style={styled ? { fontFamily: 'sans-serif', padding: '20px' } : {}}>
      <h2>Update User (ID: {id || 'Not specified'})</h2>

      <label style={labelStyle}>First Name:</label>
      <input 
        type="text" 
        name="fname" 
        value={user.fname} 
        onChange={handleChange} 
        style={inputStyle}
      />

      <label style={labelStyle}>Last Name:</label>
      <input 
        type="text" 
        name="lname" 
        value={user.lname} 
        onChange={handleChange} 
        style={inputStyle}
      />

      <label style={labelStyle}>Username:</label>
      <input 
        type="text" 
        name="username" 
        value={user.username} 
        onChange={handleChange} 
        style={inputStyle}
      />

      <button onClick={handleSave} style={buttonStyle}>Save</button>
      <button onClick={handleCancel} style={cancelButtonStyle}>Cancel</button>
    </div>
  );
}

export default UpdateUser;
