const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/auth");
const {
  registerAdmin,
  loginAdmin,
  addBooks,
  removeBook,
  issueBook,
  returnBook,
  getTransactions,
} = require("../controllers/admincontroller");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/addBook", authenticateToken, addBooks);
router.delete("/removeBook/:id", authenticateToken, removeBook);
router.post("/issueBook", authenticateToken, issueBook);
router.post("/returnBook", authenticateToken, returnBook);
router.get("/transactions", authenticateToken, getTransactions);

module.exports = router;
