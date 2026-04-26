import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/Background.jpeg";
import "./Register.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/api/auth/login",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      alert("Login Successful ✅");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Invalid Username or Password ❌");
    }
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="register-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign In</button>

          <p className="login-text">
            New user? <Link to="/">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;