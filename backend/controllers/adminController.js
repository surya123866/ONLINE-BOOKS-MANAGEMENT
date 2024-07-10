const AdminUser = require("../models/AdminUser");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../logger");
const mongoose = require("mongoose");

// Register an Admin User
exports.registerAdmin = async (req, res) => {
  try {
    const { username, name, password, email, contactNumber } = req.body;
    const adminExists = await AdminUser.findOne({ username });

    if (adminExists) {
      return res.status(400).json({ message: "Admin user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new AdminUser({
      username,
      name,
      password: hashedPassword,
      email,
      contactNumber,
    });

    await admin.save();
    res.status(201).json({ message: "Admin user registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  logger.warn("Hell");
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const admin = await AdminUser.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ userId: admin._id, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a Book or Multiple Books
exports.addBooks = async (req, res) => {
  try {
    const books = Array.isArray(req.body) ? req.body : [req.body];
    logger.warn(books);

    const addedBooks = await Book.insertMany(books);

    res.status(201).json({
      message: `${addedBooks.length} book(s) added successfully`,
      addedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove a Book or Multiple Books
exports.removeBook = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the route parameters

    if (!id) {
      return res
        .status(400)
        .json({ message: "Invalid input, book ID required" });
    }

    const result = await Book.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Issue a Book
exports.issueBook = async (req, res) => {
  try {
    const { userId, bookId, dueDate } = req.body;

    if (!userId || !bookId || !dueDate) {
      return res
        .status(400)
        .json({ message: "userId, bookId, and dueDate are required" });
    }

    // Fetch user and book details
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or book not found" });
    }

    const transaction = new Transaction({
      userId: user._id, // Assign ObjectId
      bookId: book._id, // Assign ObjectId
      dueDate: new Date(dueDate),
      transactionType: "borrowed",
      userDetails: {
        name: user.name,
        email: user.email,
      },
      bookDetails: {
        title: book.title,
        author: book.author,
        image: book.imageLink,
      },
    });

    await transaction.save();

    // Update book availability in the database
    await Book.findByIdAndUpdate(bookId, { availability: false });

    res.status(201).json({ message: "Book issued successfully", transaction });
  } catch (error) {
    console.error("Error issuing book:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Return a Book
exports.returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Check if userId and bookId are provided
    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "userId and bookId are required" });
    }

    // Find the transaction where the user borrowed the book
    const transaction = await Transaction.findOne({
      userId,
      bookId,
      transactionType: "borrowed",
    });

    // Log the transaction found (for debugging purposes)
    console.log("Found transaction:", transaction);

    // If no such transaction is found, return a 404 error
    if (!transaction) {
      return res.status(404).json({ message: "Borrow transaction not found" });
    }

    // Update the transaction to mark the book as returned
    transaction.transactionType = "returned";
    await transaction.save();

    // Update book availability in the database
    await Book.findByIdAndUpdate(bookId, { $set: { availability: true } });

    // Send a success response
    res.status(201).json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    res.json(transactions);
  } catch (error) {
    logger.error(
      `Error fetching transactions for user ${userId}: ${error.message}`
    );
    res.status(500).json({ message: "Server Error" });
  }
};
