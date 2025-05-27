const User = require("../models/User");

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.depositMoney = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ msg: "Invalid amount" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.balance += amount;
    user.transactions.push({ type: "credit", amount, description: "Deposit" });
    await user.save();

    res.json({ msg: "Deposit successful", balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.withdrawMoney = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ msg: "Invalid amount" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (amount > user.balance) return res.status(400).json({ msg: "Insufficient balance" });

    user.balance -= amount;
    user.transactions.push({ type: "debit", amount, description: "Withdrawal" });
    await user.save();

    res.json({ msg: "Withdrawal successful", balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ transactions: user.transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
