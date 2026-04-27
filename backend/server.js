const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let expenses = [];

app.get('/expenses', (req, res) => {
    res.json(expenses);
});

app.post('/expenses', (req, res) => {
    const expense = req.body;
    expenses.push(expense);
    res.json({ message: "Expense added" });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});