const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Transaction = require("../models/Transaction");
const logger = require("../logger");

exports.registerUser = async (req, res) => {
  const { username, name, email, contactNumber, password } = req.body;
  const userExists = await User.findOne({ username });
  logger.info(username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    email,
    contactNumber,
    password: hashedPassword,
  });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  logger.info(`Logging in user: ${username}`);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    logger.info(`Found user: ${user.username}`);

    // Ensure user.password exists and is not null or undefined
    if (!user.password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", userId: user._id, token });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find transactions associated with the user and populate the 'book' field
    const transactions = await Transaction.find({ userId }).populate("bookId");

    // Check if transactions were found
    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    // Return transactions as JSON response
    res.json(transactions);
  } catch (error) {
    logger.error(`Error fetching user transactions: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
