import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBalance,
  depositMoney,
  withdrawMoney,
  getTransactions,
} from "../services/api";
import {
  FaPiggyBank,
  FaArrowUp,
  FaArrowDown,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/styles.css";

function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("transactions");
  const [savingsGoal, setSavingsGoal] = useState(1000);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBalance();
      fetchTransactions();
    }
  }, [token, navigate]);

  const fetchBalance = async () => {
    try {
      const data = await getBalance(token);
      setBalance(data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(token);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDeposit = async () => {
    if (!amount || isNaN(amount)) return;
    try {
      await depositMoney(token, parseFloat(amount));
      setAmount("");
      await Promise.all([fetchBalance(), fetchTransactions()]);
    } catch (error) {
      alert(error.response?.data?.message || "Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount)) return;
    try {
      await withdrawMoney(token, parseFloat(amount));
      setAmount("");
      await Promise.all([fetchBalance(), fetchTransactions()]);
    } catch (error) {
      alert(error.response?.data?.message || "Withdrawal failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const progressPercentage = Math.min((balance / savingsGoal) * 100, 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F9FA",
        padding: "20px",
      }}
    >
      {/* Header */}
      {/* <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFD700",
          padding: "15px 25px",
          borderRadius: "15px",
          marginBottom: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaPiggyBank
            size={30}
            color="#1E90FF"
            style={{ marginRight: "10px" }}
          />
          <h1
            style={{
              fontSize: "1.5rem",
              color: "#333",
              margin: 0,
            }}
          >
            Kids Savings Bank
          </h1>
        </div>
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
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </header> */}

      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Balance Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#666",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FaPiggyBank color="#1E90FF" /> Your Balance
          </h2>
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1E90FF",
              margin: "10px 0",
            }}
          >
            ₹{balance.toFixed(2)}
          </p>

          {/* Savings Goal Progress */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#666", marginBottom: "10px" }}>
              Savings Goal: ₹{savingsGoal}
            </h3>
            <div
              style={{
                height: "20px",
                backgroundColor: "#eee",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercentage}%`,
                  backgroundColor:
                    progressPercentage >= 100 ? "#28A745" : "#1E90FF",
                  transition: "width 0.5s ease",
                }}
              ></div>
            </div>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              {progressPercentage >= 100
                ? "🎉 Goal Achieved!"
                : `${progressPercentage.toFixed(0)}% of your goal`}
            </p>
          </div>
        </div>

        {/* Transaction Controls */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ color: "#666", marginBottom: "20px" }}>Quick Actions</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ Enter amount"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #ddd",
                  borderRadius: "10px",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              />
              <button
                onClick={handleDeposit}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#28A745",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <FaArrowUp /> Deposit
              </button>
            </div>
            <div>
              <div style={{ height: "42px", marginBottom: "10px" }}></div>
              <button
                onClick={handleWithdraw}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#FF6B6B",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <FaArrowDown /> Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Transactions/Savings Tabs */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #eee",
            }}
          >
            <button
              onClick={() => setActiveTab("transactions")}
              style={{
                flex: 1,
                padding: "15px",
                backgroundColor:
                  activeTab === "transactions" ? "#1E90FF" : "transparent",
                color: activeTab === "transactions" ? "white" : "#666",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaHistory /> Transactions
            </button>
            <button
              onClick={() => setActiveTab("savings")}
              style={{
                flex: 1,
                padding: "15px",
                backgroundColor:
                  activeTab === "savings" ? "#1E90FF" : "transparent",
                color: activeTab === "savings" ? "white" : "#666",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaPiggyBank /> Savings Tips
            </button>
          </div>

          <div style={{ padding: "20px" }}>
            {activeTab === "transactions" ? (
              <>
                <h3 style={{ color: "#666", marginBottom: "15px" }}>
                  Recent Transactions
                </h3>
                {transactions.length === 0 ? (
                  <p style={{ color: "#999", textAlign: "center" }}>
                    No transactions yet
                  </p>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {transactions.map((txn, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "12px 15px",
                          borderBottom: "1px solid #eee",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {txn.type === "deposit" ? (
                            <FaArrowUp color="#28A745" />
                          ) : (
                            <FaArrowDown color="#FF6B6B" />
                          )}
                          <span
                            style={{
                              color:
                                txn.type === "deposit" ? "#28A745" : "#FF6B6B",
                              fontWeight: "bold",
                            }}
                          >
                            {txn.type.toUpperCase()}
                          </span>
                        </div>
                        <span style={{ fontWeight: "bold" }}>
                          ₹{txn.amount.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <div>
                <h3 style={{ color: "#666", marginBottom: "15px" }}>
                  Savings Tips
                </h3>
                <div
                  style={{
                    backgroundColor: "#E3F2FD",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <h4 style={{ color: "#1E90FF", marginTop: 0 }}>
                    💰 Save Regularly
                  </h4>
                  <p style={{ color: "#333" }}>
                    Try to save a little bit every week, even if it's just a
                    small amount!
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#E3F2FD",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <h4 style={{ color: "#1E90FF", marginTop: 0 }}>
                    🎯 Set Goals
                  </h4>
                  <p style={{ color: "#333" }}>
                    Having a goal like a new toy or game can help you stay
                    motivated to save!
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#E3F2FD",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <h4 style={{ color: "#1E90FF", marginTop: 0 }}>
                    📊 Watch Your Money Grow
                  </h4>
                  <p style={{ color: "#333" }}>
                    Check your balance often to see how your savings are
                    growing!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
