const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getBalance,
  depositMoney,
  withdrawMoney,
  getTransactions,
} = require("../controllers/accountController");

router.get("/balance", authMiddleware, getBalance);
router.post("/deposit", authMiddleware, depositMoney);
router.post("/withdraw", authMiddleware, withdrawMoney);
router.get("/transactions", authMiddleware, getTransactions);

module.exports = router;
