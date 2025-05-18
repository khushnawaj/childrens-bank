import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBalance, depositMoney, withdrawMoney, getTransactions } from "../services/api";
import "../styles/styles.css";

function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBalance();
      fetchTransactions();
    }
  }, [token]);

  const fetchBalance = async () => {
    const data = await getBalance(token);
    setBalance(data.balance);
  };

  const fetchTransactions = async () => {
    const data = await getTransactions(token);
    setTransactions(data.transactions);
  };

  const handleDeposit = async () => {
    await depositMoney(token, parseFloat(amount));
    setAmount("");
    fetchBalance();
    fetchTransactions();
  };

  const handleWithdraw = async () => {
    await withdrawMoney(token, parseFloat(amount));
    setAmount("");
    fetchBalance();
    fetchTransactions();
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <h2>Balance: ₹{balance}</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>

      <h2>Transaction History</h2>
      <ul>
        {transactions.map((txn, index) => (
          <li key={index}>
            {txn.type.toUpperCase()} ₹{txn.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
