import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCoins } from "react-icons/fa";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container" style={{
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
          <FaCoins size={60} style={{ marginBottom: "1rem" }} />
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#333"
          }}>Join Kids Bank!</h1>
          <p style={{ color: "#666" }}>Start your savings adventure today!</p>
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
              <FaUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
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
              placeholder="Create Password"
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
              backgroundColor: "#1E90FF",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#187bcd"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#1E90FF"}
          >
            Create Account
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", color: "#666" }}>
          <p>Already have an account? <a href="/login" style={{ color: "#1E90FF", fontWeight: "bold", textDecoration: "none" }}>Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;