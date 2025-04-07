import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserCreate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user", user, {
        headers: { "Content-Type": "application/json" },
      });
      setUser({ fname: "", lname: "", username: "", password: "" });
      navigate("/userDisplay");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const labelStyle = {
    display: "block",
    marginTop: "10px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const submitButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const cancelButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#fff",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "inset 0 0 0 2px #333",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmit}>
        <label htmlFor="fname" style={labelStyle}>First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={user.fname}
          onChange={onInputChange}
          required
          style={inputStyle}
        />

        <label htmlFor="lname" style={labelStyle}>Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={user.lname}
          onChange={onInputChange}
          required
          style={inputStyle}
        />

        <label htmlFor="username" style={labelStyle}>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={onInputChange}
          required
          style={inputStyle}
        />

        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={onInputChange}
          required
          style={inputStyle}
        />

        <div>
          <button type="submit" style={submitButtonStyle}>Submit</button>
          <button
            type="button"
            style={cancelButtonStyle}
            onClick={() => navigate("/")}
          >
            Already have
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
