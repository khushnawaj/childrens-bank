import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPiggyBank, FaSignOutAlt } from "react-icons/fa";
import "../styles/styles.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{
      backgroundColor: "#FFD700",
      padding: "15px 25px",
      borderRadius: "0 0 15px 15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "#333",
            fontWeight: "bold",
            fontSize: "1.1rem"
          }}
        >
          <FaHome size={20} color="#1E90FF" /> Home
        </Link>

        {token && (
          <Link
            to="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
              fontSize: "1.1rem"
            }}
          >
            <FaPiggyBank size={20} color="#1E90FF" /> Dashboard
          </Link>
        )}
      </div>

      {token && (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#FF6B6B",
            color: "white",
            border: "none",
            borderRadius: "20px",
            padding: "8px 15px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#e05555"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#FF6B6B"}
        >
          <FaSignOutAlt /> Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;