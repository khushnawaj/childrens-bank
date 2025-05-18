const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Get account balance
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Deposit money
router.post('/deposit', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ msg: 'Invalid amount' });

    const user = await User.findById(req.user.id);
    user.balance += amount;
    user.transactions.push({ type: 'deposit', amount });
    await user.save();

    res.json({ msg: 'Deposit successful', balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Withdraw money
router.post('/withdraw', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);

    if (amount <= 0 || amount > user.balance) {
      return res.status(400).json({ msg: 'Invalid withdrawal amount' });
    }

    user.balance -= amount;
    user.transactions.push({ type: 'withdraw', amount });
    await user.save();

    res.json({ msg: 'Withdrawal successful', balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get transaction history
router.get('/transactions', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ transactions: user.transactions });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
