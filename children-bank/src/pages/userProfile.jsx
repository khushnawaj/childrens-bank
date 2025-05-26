import React from "react";
import { Link } from "react-router-dom";
import { FaCoins, FaPiggyBank, FaEdit, FaGift, FaHistory } from "react-icons/fa";
import "../styles/styles.css";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "Emma Johnson",
    age: 10,
    avatar: "👧", // Can replace with actual image URL
    balance: 245.50,
    points: 1200,
    goals: [
      { name: "New Bicycle", target: 500, current: 245.50 },
      { name: "Video Game", target: 60, current: 45 }
    ],
    transactions: [
      { date: "2023-08-01", description: "Allowance", amount: 20 },
      { date: "2023-07-28", description: "Toy Store", amount: -15 }
    ]
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f8ff",
      padding: "20px",
      fontFamily: "'Comic Neue', cursive, sans-serif"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
      }}>
        {/* Profile Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px"
        }}>
          <div style={{
            fontSize: "3.5rem",
            marginRight: "20px",
            backgroundColor: "#FFD700",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {user.avatar}
          </div>
          <div>
            <h1 style={{
              margin: 0,
              color: "#1E90FF",
              fontSize: "2rem"
            }}>
              {user.name}
              <span style={{
                fontSize: "1.2rem",
                color: "#666",
                marginLeft: "10px"
              }}>
                Age {user.age}
              </span>
            </h1>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px"
            }}>
              <FaCoins color="#FFD700" size={20} />
              <span style={{
                marginLeft: "10px",
                fontSize: "1.2rem",
                color: "#333"
              }}>
                {user.points} Points
              </span>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div style={{
          backgroundColor: "#1E90FF",
          borderRadius: "15px",
          padding: "20px",
          color: "white",
          marginBottom: "30px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            right: "-30px",
            top: "-30px",
            opacity: 0.1
          }}>
            <FaPiggyBank size={150} />
          </div>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Current Balance</h2>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            margin: "10px 0"
          }}>
            ${user.balance.toFixed(2)}
          </div>
          <Link
            to="/add-money"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50px",
              textDecoration: "none",
              color: "white",
              fontSize: "1rem",
              transition: "all 0.3s ease"
            }}
          >
            <FaEdit /> Add Money
          </Link>
        </div>

        {/* Savings Goals */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{
            color: "#1E90FF",
            fontSize: "1.8rem",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <FaGift /> Savings Goals
          </h2>
          {user.goals.map((goal, index) => (
            <div key={index} style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "15px",
              padding: "15px",
              marginBottom: "15px",
              position: "relative"
            }}>
              <div style={{
                width: `${(goal.current / goal.target) * 100}%`,
                height: "100%",
                backgroundColor: "#1E90FF",
                opacity: 0.1,
                position: "absolute",
                left: 0,
                top: 0,
                borderRadius: "15px"
              }} />
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative"
              }}>
                <div>
                  <h3 style={{ margin: 0, color: "#333" }}>{goal.name}</h3>
                  <p style={{ margin: "5px 0 0", color: "#666" }}>
                    ${goal.current} of ${goal.target}
                  </p>
                </div>
                <div style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1E90FF"
                }}>
                  {((goal.current / goal.target) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 style={{
            color: "#1E90FF",
            fontSize: "1.8rem",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <FaHistory /> Recent Transactions
          </h2>
          {user.transactions.map((transaction, index) => (
            <div key={index} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
              borderRadius: "10px",
              marginBottom: "10px"
            }}>
              <div>
                <div style={{ color: "#333" }}>{transaction.description}</div>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </div>
              <div style={{
                color: transaction.amount > 0 ? "#28a745" : "#dc3545",
                fontWeight: "bold"
              }}>
                ${transaction.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Profile Button */}
        <div style={{
          marginTop: "30px",
          textAlign: "center"
        }}>
          <Link
            to="/edit-profile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 30px",
              backgroundColor: "#FF6B6B",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              transition: "all 0.3s ease"
            }}
          >
            <FaEdit /> Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;