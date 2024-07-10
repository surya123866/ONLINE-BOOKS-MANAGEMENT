const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/auth");
const {
  getBooksByName,
  getAllBooks,
} = require("../controllers/bookcontroller");

router.get("/", authenticateToken, getAllBooks);
router.get("/book", authenticateToken, getBooksByName);

module.exports = router;
