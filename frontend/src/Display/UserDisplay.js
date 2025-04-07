import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// import formStyles from "../Style/Style"; // adjust path if needed

function UserDisplay() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setUserId] = useState('');
  const [filteredUser, setFilteredUser] = useState(null);
  const [styled, setStyled] = useState(Cookies.get('styled') === 'true'); // Read initial state from cookies

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/user');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/user/${id}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setFilteredUser(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setFilteredUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (userid) => {
    if (userid) {
      window.location.href = `/UpdateUser/${userid}`;
    }
  };

  const handleDelete = async (userid) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`http://localhost:8080/user/${userid}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      alert('User deleted successfully');
      fetchUsers(); // Refresh the list
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleLogout = () => {
    Cookies.remove('id');
    Cookies.remove('fname');
    Cookies.remove('lname');
    Cookies.remove('username');
    window.location.href = '/';
  };

  const toggleStyle = () => {
    const newStyled = !styled;
    setStyled(newStyled);
    Cookies.set('styled', newStyled.toString(), { expires: 7 });
  };

  const tableStyle = styled
    ? {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #ddd',
      }
    : {};

  const thtdStyle = styled
    ? {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
      }
    : {};

  const buttonStyle = styled
    ? {
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginRight: '10px',
      }
    : {};

  const inputStyle = styled
    ? {
        padding: '12px',
        marginRight: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }
    : {};

  return (
    <div style={styled ? { fontFamily: 'sans-serif', padding: '20px' } : {}}>
      <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      <button onClick={toggleStyle} style={buttonStyle}>
        {styled ? 'Disable Style' : 'Enable Style'}
      </button>

      <h2>User List</h2>

      <button onClick={() => (window.location.href = 'http://localhost:3000/insertUser')} style={buttonStyle}>
        Add User
      </button>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={id}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          style={inputStyle}
        />
        <button onClick={handleSearch} style={buttonStyle}>
          Search
        </button>
      </div>

      {error && <div style={formStyles.errorStyle}>Error: {error}</div>}

      {(filteredUser ? [filteredUser] : users).length === 0 ? (
        <p>No users found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtdStyle}>First Name</th>
              <th style={thtdStyle}>Last Name</th>
              <th style={thtdStyle}>Username</th>
              <th style={thtdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUser ? [filteredUser] : users).map((user, index) => (
              <tr key={index}>
                <td style={thtdStyle}>{user.fname}</td>
                <td style={thtdStyle}>{user.lname}</td>
                <td style={thtdStyle}>{user.username}</td>
                <td style={thtdStyle}>
                  <button onClick={() => handleUpdate(user.userid)} style={buttonStyle}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(user.userid)} style={buttonStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserDisplay;
