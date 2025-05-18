const API_BASE_URL = "http://localhost:5000/api";

export const signup = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getBalance = async (token) => {
  const response = await fetch(`${API_BASE_URL}/bank/balance`, {
    headers: { Authorization: token },
  });
  return response.json();
};

export const depositMoney = async (token, amount) => {
  const response = await fetch(`${API_BASE_URL}/bank/deposit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ amount }),
  });
  return response.json();
};

export const withdrawMoney = async (token, amount) => {
  const response = await fetch(`${API_BASE_URL}/bank/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ amount }),
  });
  return response.json();
};

export const getTransactions = async (token) => {
  const response = await fetch(`${API_BASE_URL}/bank/transactions`, {
    headers: { Authorization: token },
  });
  return response.json();
};
