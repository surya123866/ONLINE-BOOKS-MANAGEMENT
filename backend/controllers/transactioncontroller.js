const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const logger = require("../logger"); // Import the logger

exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ user: userId }).populate(
      "book"
    );
    logger.info(`Fetched transactions for user ${userId}`);
    res.json(transactions);
  } catch (error) {
    logger.error(
      `Error fetching transactions for user ${userId}: ${error.message}`
    );
    res.status(500).json({ message: "Server Error" });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { userId, bookId, dueDate } = req.body;

    // Check if the book is available
    const book = await Book.findById(bookId);
    if (!book || !book.availability) {
      logger.warn(
        `Attempt to borrow unavailable book ${bookId} by user ${userId}`
      );
      return res.status(400).json({ message: "Book is not available" });
    }

    // Create a new transaction
    const transaction = new Transaction({
      user: userId,
      book: bookId,
      dueDate,
      transactionType: "borrowed",
    });
    await transaction.save();

    // Update the book's availability status
    book.availability = false;
    await book.save();

    logger.info(`Book ${bookId} borrowed by user ${userId}`);
    res.status(201).json({ message: "Book borrowed successfully" });
  } catch (error) {
    logger.error(
      `Error borrowing book ${bookId} by user ${userId}: ${error.message}`
    );
    res.status(500).json({ message: "Server Error" });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Create a new transaction
    const transaction = new Transaction({
      user: userId,
      book: bookId,
      transactionType: "returned",
    });
    await transaction.save();

    // Update the book's availability status
    const book = await Book.findById(bookId);
    book.availability = true;
    await book.save();

    logger.info(`Book ${bookId} returned by user ${userId}`);
    res.status(201).json({ message: "Book returned successfully" });
  } catch (error) {
    logger.error(
      `Error returning book ${bookId} by user ${userId}: ${error.message}`
    );
    res.status(500).json({ message: "Server Error" });
  }
};
