import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPiggyBank, FaLock, FaEnvelope } from "react-icons/fa";
import { toast } from 'react-toastify'

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container" style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #F8F9FA 0%, #E3F2FD 100%)"
    }}>
      <div className="form-container" style={{
        width: "100%",
        maxWidth: "450px",
        padding: "2.5rem",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <div style={{
          marginBottom: "2rem",
          color: "#1E90FF"
        }}>
          <FaPiggyBank size={60} style={{ marginBottom: "1rem" }} />
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#333"
          }}>Welcome to Kids Bank!</h1>
          <p style={{ color: "#666" }}>Save, learn, and grow your money!</p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "1.5rem", position: "relative" }}>
            <div style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#1E90FF"
            }}>
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "2px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "2rem", position: "relative" }}>
            <div style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#1E90FF"
            }}>
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "2px solid #ddd",
                borderRadius: "50px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#FFD700",
              color: "#333",
              border: "none",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#FFC107"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#FFD700"}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", color: "#666" }}>
          <p>New here? <a href="/signup" style={{ color: "#1E90FF", fontWeight: "bold", textDecoration: "none" }}>Create an account</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;