import React, { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/expenses");
    const data = await res.json();
    setExpenses(data);
  };

  const addExpense = async () => {
    if (!amount) return;

    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    setAmount("");
    fetchExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hi 👋</h1>
      <h2>Expense Tracker</h2>

      <div style={{
        border: "1px solid #ddd",
        padding: "20px",
        width: "300px",
        margin: "20px auto",
        borderRadius: "10px"
      }}>
        <h3>Total: ₹{total}</h3>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "10px", width: "80%" }}
        />

        <br /><br />

        <button
          onClick={addExpense}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Add
        </button>
      </div>

      <ul>
        {expenses.map((e, i) => (
          <li key={i}>₹ {e.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;