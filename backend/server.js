const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let expenses = [];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/add", (req, res) => {
  const expense = req.body;
  expenses.push(expense);
  res.send("Backend is running v2");
});

app.get("/all", (req, res) => {
  res.json(expenses);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});