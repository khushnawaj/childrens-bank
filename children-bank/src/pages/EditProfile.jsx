import React from "react";
import { Link } from "react-router-dom";
import { FaSave, FaUserEdit } from "react-icons/fa";

const EditProfile = () => {
  // You would typically get this data from your backend/context
  const user = {
    name: "Emma Johnson",
    age: 10,
    email: "emma@kidsbank.com"
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "20px auto",
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
    }}>
      <h1 style={{ color: "#1E90FF", display: "flex", alignItems: "center", gap: "10px" }}>
        <FaUserEdit /> Edit Profile
      </h1>
      
      <form>
        <div style={{ marginBottom: "20px" }}>
          <label>Name:</label>
          <input 
            type="text" 
            defaultValue={user.name}
            style={{ 
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #1E90FF"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Age:</label>
          <input
            type="number" 
            defaultValue={user.age}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #1E90FF"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          <Link
            to="/profile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 30px",
              backgroundColor: "#FF6B6B",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Cancel
          </Link>
          
          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 30px",
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;