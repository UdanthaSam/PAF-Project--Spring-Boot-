import React from 'react'
import Cookies from 'js-cookie';
import formStyles from "../Style/Style"; // adjust path if needed

function Feed() {
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "",
    border: "2px solid #E52B50",
    adding: "10px 20px",
    backgroundColor: "white",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
    color:"#E52B50",
  };

  return (
    <div>
      <button 
        onClick={() => {
          Cookies.remove('id');
          Cookies.remove('fname');
          Cookies.remove('lname');
          Cookies.remove('username');
          window.location.href = '/';
        }} 
        style={logoutButtonStyle}
      >
        Logout
      </button>

      <button 
        onClick={() => window.location.href = "http://localhost:3000/AddPost"} 
        style={buttonStyle}
      >
        Add Post
      </button>
    </div>
  )
}

export default Feed;
