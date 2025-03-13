import { useState, useEffect } from "react";
import AddTransaction from "../components/AddTransaction";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const getIncome = () =>
    transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);

  const getExpenses = () =>
    transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  return (
    <div
      className={`dashboard-container ${darkMode ? "dark" : "light"}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: darkMode
          ? "linear-gradient(135deg, #1e1e2f, #121212)"
          : "linear-gradient(135deg, #84fab0, #8fd3f4)",
        color: darkMode ? "#fff" : "#333",
        transition: "all 0.3s ease",
      }}
    >
      {/* Mode Toggle */}
      <div className="toggle-container">
        <span style={{ marginRight: "10px" }}>{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span className="slider"></span>
        </label>
      </div>

      {/* Dashboard Header */}
      <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Dashboard</h2>

      {/* Balance Section */}
      <div className="balance-card">
        <h3>Balance: ${getIncome() - getExpenses()}</h3>
        <p className="income">Income: ₹{getIncome()}</p>
        <p className="expense">Expenses: ₹{getExpenses()}</p>
      </div>

      {/* Add Transaction Component */}
      <AddTransaction addTransaction={addTransaction} />

      {/* Transaction List */}
      <div className="transaction-list">
        <h3>Transactions</h3>
        {transactions.length === 0 ? (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>No transactions yet...</p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className={`transaction-card ${t.type}`}>
              <span>{t.description}</span>
              <span>₹{t.amount}</span>
              <span>{t.type === "income" ? "🟢" : "🔴"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

