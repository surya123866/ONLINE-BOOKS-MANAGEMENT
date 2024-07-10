const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getUserTransactions,
} = require("../controllers/usercontroller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/transactions/:userId", authenticateToken, getUserTransactions);

module.exports = router;
