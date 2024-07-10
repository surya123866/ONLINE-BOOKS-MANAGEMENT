const express = require("express");
const router = express.Router();
const {
  getUserTransactions,
  borrowBook,
  returnBook,
} = require("../controllers/transactionController");
const authenticateToken = require("../middleware/auth");

// Get all transactions for a user
router.get("/:userId", authenticateToken, getUserTransactions);

// Borrow a book
router.post("/borrow", authenticateToken, borrowBook);

// Return a book
router.post("/return", authenticateToken, returnBook);

module.exports = router;
