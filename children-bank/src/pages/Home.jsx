import React from "react";
import { Link } from "react-router-dom";
import { FaPiggyBank, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "../styles/styles.css";

const Home = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #FFD700 0%, #1E90FF 100%)",
      padding: "20px",
      textAlign: "center"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        maxWidth: "600px",
        width: "100%"
      }}>
        <FaPiggyBank
          size={80}
          style={{
            color: "#1E90FF",
            marginBottom: "20px"
          }}
        />
        <h1 style={{
          fontSize: "2.5rem",
          color: "#333",
          marginBottom: "20px",
          fontWeight: "bold"
        }}>
          Welcome to <span style={{ color: "#1E90FF" }}>Kids</span> Bank!
        </h1>

        <p style={{
          fontSize: "1.2rem",
          color: "#666",
          marginBottom: "40px",
          lineHeight: "1.6"
        }}>
          A fun and safe place for kids to learn about saving money!
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px 30px",
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#187bcd"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#1E90FF"}
          >
            <FaSignInAlt /> Login
          </Link>

          <Link
            to="/signup"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px 30px",
              backgroundColor: "#FF6B6B",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#e05555"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#FF6B6B"}
          >
            <FaUserPlus /> Sign Up
          </Link>
        </div>

        <div style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#F8F9FA",
          borderRadius: "15px"
        }}>
          <h3 style={{
            color: "#1E90FF",
            marginBottom: "15px"
          }}>
            Why Join Kids Bank?
          </h3>
          <ul style={{
            listStyle: "none",
            padding: 0,
            textAlign: "left",
            display: "inline-block"
          }}>
            <li style={{ marginBottom: "10px" }}>🎯 Fun savings goals</li>
            <li style={{ marginBottom: "10px" }}>💰 Easy deposits & withdrawals</li>
            <li style={{ marginBottom: "10px" }}>📊 Track your money</li>
            <li>🏆 Earn badges for saving</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;