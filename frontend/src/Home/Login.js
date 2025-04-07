import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching from: http://localhost:8080/user');
        const response = await fetch('http://localhost:8080/user');
        console.log('Response status:', response.status);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch users: ${response.status} - ${text.slice(0, 100)}`);
        }

        const data = await response.json();
        console.log('Fetched users:', data);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching user data: ' + err.message);
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchUsers();

    // Optional: Check if user is already logged in via cookies
    const loggedInUsername = Cookies.get('username');
    if (loggedInUsername) {
      console.log('Already logged in as:', loggedInUsername);
      window.location.href = 'http://localhost:3000/feed';
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (loading) {
      setError('Please wait, loading user data...');
      return;
    }

    console.log('Users array:', users);
    console.log('Entered username:', username);

    const user = users.find((u) => u.username === username);

    if (!user) {
      setError('Username does not exist');
      console.log('No user found with username:', username);
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }

    // Set cookies on successful login
    Cookies.set('id', user.id, { expires: 7 });
    Cookies.set('fname', user.fname, { expires: 7 });
    Cookies.set('lname', user.lname, { expires: 7 });
    Cookies.set('username', user.username, { expires: 7 });

    // Set default style cookie (false - styles disabled)
    Cookies.set('styled', 'false', { expires: 7 });

    setError('');
    window.location.href = 'http://localhost:3000/feed';
  };

  return (
    <div>
      <h2>Login</h2>
      {loading && <div>Loading user data...</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            disabled={loading}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={loading}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <a href="http://localhost:3000/insertUser">
        Create Account
      </a>
    </div>
  );
}

export default Home;
