import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/Background.jpeg";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/api/users/register",
        formData
      );

      if (response.status === 200) {
        alert("Registration Successful ✅");

        setFormData({
          username: "",
          email: "",
          password: "",
          role: ""
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }

    } catch (error) {
      alert("Registration Failed ❌");
      console.error(error);
    }
  };

  return (
    <div
  className="register-container"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
      <div className="register-card">
        <h2>Register</h2>

        {/* IMPORTANT: autoComplete OFF */}
        <form onSubmit={handleSubmit} autoComplete="off">

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit">Sign Up</button>

          <p className="login-text">
            Already a user? <Link to="/login">Login here</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;