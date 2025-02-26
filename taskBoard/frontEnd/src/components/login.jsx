import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    axios.post('http://localhost:7070/API/login', { email, password })
      .then((res) => { 
        console.log('>>>>result>>>',res.data.color);
        localStorage.setItem('color', res.data.color);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        alert('login sussesful');
        navigate('/createTask');
      })
      .catch((err) => {
        alert('get error');
      });
  
  };

  return (
    <div
    style={{
      background: "white",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      width: "320px",
      textAlign: "center",
      margin: "auto",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h2 style={{ color: "#333", marginBottom: "1rem" }}>Login</h2>
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1rem", textAlign: "left" }}>
        <label htmlFor="email" style={{ fontWeight: "bold", color: "#555" }}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "1rem",
            transition: "0.3s",
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem", textAlign: "left" }}>
        <label htmlFor="password" style={{ fontWeight: "bold", color: "#555" }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "1rem",
            transition: "0.3s",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          background: "#667eea",
          color: "white",
          marginTop: "1rem",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#5563c1")}
        onMouseOut={(e) => (e.target.style.background = "#667eea")}
      >
        Login
      </button>
    </form>
    <button
      onClick={() => navigate('/forgatePassword')}
      style={{
        background: "transparent",
        color: "#667eea",
        textDecoration: "underline",
        marginTop: "1rem",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
      }}
      onMouseOver={(e) => (e.target.style.color = "#5548a0")}
      onMouseOut={(e) => (e.target.style.color = "#667eea")}
    >
      Forgot Password
    </button>
  </div>
  
  );
};

export default Login;