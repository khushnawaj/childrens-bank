import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBalance,
  depositMoney,
  withdrawMoney,
  getTransactions,
  // updateSavingsGoal
} from "../services/api";
import {
  FaPiggyBank,
  FaArrowUp,
  FaArrowDown,
  FaHistory,
  FaCoins,
  FaChartLine,
  FaEdit,
  FaCheck
} from "react-icons/fa";
import "../styles/styles.css";

function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("transactions");
  const [savingsGoal, setSavingsGoal] = useState(1000);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(savingsGoal);
  const [activeFilter, setActiveFilter] = useState("all");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const fetchData = async () => {
    await Promise.all([fetchBalance(), fetchTransactions()]);
  };

  const fetchBalance = async () => {
    try {
      const data = await getBalance(token);
      setBalance(data.balance);
      if (data.savingsGoal) setSavingsGoal(data.savingsGoal);
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
      await fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount)) return;
    try {
      await withdrawMoney(token, parseFloat(amount));
      setAmount("");
      await fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Withdrawal failed");
    }
  };

  const handleGoalUpdate = async () => {
    try {
      await updateSavingsGoal(token, tempGoal);
      setSavingsGoal(tempGoal);
      setIsEditingGoal(false);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const filteredTransactions = transactions.filter(txn =>
    activeFilter === "all" || txn.type === activeFilter
  );

  const progressPercentage = Math.min((balance / savingsGoal) * 100, 100);
  const daysLeft = Math.ceil((savingsGoal - balance) / (balance / 30)); // Simple projection

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F8F9FA",
      padding: "20px",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "25px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {/* Top Cards Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {/* Balance Card */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <FaPiggyBank size={24} color="#1E90FF" />
              <h3 style={cardTitleStyle}>Your Balance</h3>
            </div>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1E90FF",
              margin: "15px 0",
              textAlign: "center"
            }}>
              ₹{balance.toFixed(2)}
            </h2>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px"
            }}>
              <span style={{ color: "#666" }}>Last 30 days</span>
              <span style={{
                color: balance >= savingsGoal ? "#28A745" : "#1E90FF",
                fontWeight: "bold"
              }}>
                {balance >= savingsGoal ? "+100%" : `+${(balance / 30).toFixed(2)}/day`}
              </span>
            </div>
          </div>

          {/* Savings Goal Card */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <FaCoins size={24} color="#1E90FF" />
              <h3 style={cardTitleStyle}>Savings Goal</h3>
              {isEditingGoal ? (
                <button
                  onClick={handleGoalUpdate}
                  style={iconButtonStyle}
                >
                  <FaCheck color="#28A745" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingGoal(true)}
                  style={iconButtonStyle}
                >
                  <FaEdit color="#1E90FF" />
                </button>
              )}
            </div>

            {isEditingGoal ? (
              <input
                type="number"
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1.2rem",
                  border: "2px solid #1E90FF",
                  borderRadius: "8px",
                  margin: "15px 0",
                  textAlign: "center"
                }}
              />
            ) : (
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#1E90FF",
                margin: "15px 0",
                textAlign: "center"
              }}>
                ₹{savingsGoal.toFixed(2)}
              </h2>
            )}

            <div style={progressContainerStyle}>
              <div style={{
                ...progressBarStyle,
                width: `${progressPercentage}%`,
                backgroundColor: progressPercentage >= 100 ? "#28A745" : "#1E90FF"
              }}></div>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px"
            }}>
              <span style={{ color: "#666" }}>
                {progressPercentage >= 100 ? "Goal achieved!" : `${progressPercentage.toFixed(0)}%`}
              </span>
              <span style={{ color: "#666" }}>
                {progressPercentage < 100 && `~${daysLeft} days left`}
              </span>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <FaChartLine size={24} color="#1E90FF" />
              <h3 style={cardTitleStyle}>Quick Stats</h3>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginTop: "15px"
            }}>
              <div style={statBoxStyle}>
                <div style={{ color: "#28A745", fontWeight: "bold" }}>
                  ₹{transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>Total Saved</div>
              </div>
              <div style={statBoxStyle}>
                <div style={{ color: "#FF6B6B", fontWeight: "bold" }}>
                  ₹{transactions.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>Total Spent</div>
              </div>
              <div style={statBoxStyle}>
                <div style={{ color: "#1E90FF", fontWeight: "bold" }}>
                  {transactions.length}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>Transactions</div>
              </div>
              <div style={statBoxStyle}>
                <div style={{
                  color: balance >= savingsGoal ? "#28A745" : "#FFD700",
                  fontWeight: "bold"
                }}>
                  {balance >= savingsGoal ? "🎉" : "🏆"}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  {balance >= savingsGoal ? "Goal Met!" : "Keep Going!"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Controls */}
        <div style={{
          ...cardStyle,
          padding: "25px"
        }}>
          <h3 style={{
            color: "#666",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            Quick Actions
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ Enter amount"
                style={inputStyle}
              />
              <button
                onClick={handleDeposit}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#28A745"
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
                  ...buttonStyle,
                  backgroundColor: "#FF6B6B"
                }}
              >
                <FaArrowDown /> Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div style={cardStyle}>
          <div style={{
            display: "flex",
            borderBottom: "1px solid #eee"
          }}>
            <button
              onClick={() => setActiveTab("transactions")}
              style={{
                ...tabButtonStyle,
                backgroundColor: activeTab === "transactions" ? "#1E90FF" : "transparent",
                color: activeTab === "transactions" ? "white" : "#666"
              }}
            >
              <FaHistory /> Transactions
            </button>
            <button
              onClick={() => setActiveTab("savings")}
              style={{
                ...tabButtonStyle,
                backgroundColor: activeTab === "savings" ? "#1E90FF" : "transparent",
                color: activeTab === "savings" ? "white" : "#666"
              }}
            >
              <FaPiggyBank /> Savings Tips
            </button>
          </div>

          <div style={{ padding: "20px" }}>
            {activeTab === "transactions" ? (
              <>
                <div style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "20px",
                  flexWrap: "wrap"
                }}>
                  <button
                    onClick={() => setActiveFilter("all")}
                    style={{
                      ...filterButtonStyle,
                      backgroundColor: activeFilter === "all" ? "#1E90FF" : "#eee",
                      color: activeFilter === "all" ? "white" : "#666"
                    }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter("deposit")}
                    style={{
                      ...filterButtonStyle,
                      backgroundColor: activeFilter === "deposit" ? "#28A745" : "#eee",
                      color: activeFilter === "deposit" ? "white" : "#666"
                    }}
                  >
                    Deposits
                  </button>
                  <button
                    onClick={() => setActiveFilter("withdraw")}
                    style={{
                      ...filterButtonStyle,
                      backgroundColor: activeFilter === "withdraw" ? "#FF6B6B" : "#eee",
                      color: activeFilter === "withdraw" ? "white" : "#666"
                    }}
                  >
                    Withdrawals
                  </button>
                </div>

                {filteredTransactions.length === 0 ? (
                  <div style={{
                    textAlign: "center",
                    padding: "40px 0",
                    color: "#999"
                  }}>
                    No transactions found
                  </div>
                ) : (
                  <div style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    borderRadius: "8px"
                  }}>
                    {filteredTransactions.map((txn, index) => (
                      <div
                        key={index}
                        style={{
                          ...transactionItemStyle,
                          borderLeft: `4px solid ${txn.type === "deposit" ? "#28A745" : "#FF6B6B"}`
                        }}
                      >
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}>
                          {txn.type === "deposit" ? (
                            <FaArrowUp color="#28A745" />
                          ) : (
                            <FaArrowDown color="#FF6B6B" />
                          )}
                          <div>
                            <div style={{ fontWeight: "bold" }}>
                              {txn.type.toUpperCase()}
                            </div>
                            <div style={{
                              fontSize: "0.8rem",
                              color: "#999"
                            }}>
                              {new Date(txn.date).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div style={{
                          fontWeight: "bold",
                          color: txn.type === "deposit" ? "#28A745" : "#FF6B6B"
                        }}>
                          ₹{txn.amount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div>
                <h3 style={{ color: "#666", marginBottom: "15px" }}>
                  Savings Tips
                </h3>
                <div style={{
                  backgroundColor: "#E3F2FD",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px"
                }}>
                  <h4 style={{ color: "#1E90FF", marginTop: 0 }}>
                    💰 The 50-30-20 Rule
                  </h4>
                  <p style={{ color: "#333" }}>
                    Try to spend 50% on needs, 30% on wants, and save 20% of your money!
                  </p>
                </div>
                <div style={{
                  backgroundColor: "#E3F2FD",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px"
                }}>
                  <h4 style={{ color: "#1E90FF", marginTop: 0 }}>
                    🎯 SMART Goals
                  </h4>
                  <p style={{ color: "#333" }}>
                    Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound!
                  </p>
                </div>
                <div style={{
                  backgroundColor: "#E3F2FD",
                  padding: "15px",
                  borderRadius: "10px"
                }}>
                  <h4 style={{ color: "#1E90FF", marginTop: 0 }}>
                    📈 Compound Interest
                  </h4>
                  <p style={{ color: "#333" }}>
                    Money grows faster when you save regularly because you earn interest on your interest!
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

// Style constants
const cardStyle = {
  backgroundColor: "white",
  borderRadius: "15px",
  padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px"
};

const cardTitleStyle = {
  color: "#666",
  margin: 0,
  fontSize: "1.2rem",
  flex: 1
};

const iconButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem"
};

const progressContainerStyle = {
  height: "10px",
  backgroundColor: "#eee",
  borderRadius: "5px",
  overflow: "hidden",
  margin: "15px 0"
};

const progressBarStyle = {
  height: "100%",
  transition: "width 0.5s ease"
};

const statBoxStyle = {
  backgroundColor: "#F8F9FA",
  borderRadius: "8px",
  padding: "12px",
  textAlign: "center"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "2px solid #ddd",
  borderRadius: "8px",
  fontSize: "16px",
  marginBottom: "10px"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.3s ease"
};

const tabButtonStyle = {
  flex: 1,
  padding: "15px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.3s ease"
};

const filterButtonStyle = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const transactionItemStyle = {
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
  marginBottom: "10px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
};

export default Dashboard;