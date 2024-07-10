const logger = require("../logger");
const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  logger.info("Fetching all books");
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBooksByName = async (req, res) => {
  const { name } = req.query;

  const regexPattern = new RegExp(name, "i");
  logger.info(`Using RegExp pattern: ${regexPattern}`);
  const books = await Book.find({ name: regexPattern });

  try {
    // Validate name parameter if needed

    // Perform case-insensitive search using RegExp
    const books = await Book.find({ name: new RegExp(name, "i") });

    // Handle case where no books are found
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    // Return the found books
    res.json(books);
  } catch (error) {
    // Log any errors encountered
    logger.error(`Error fetching books by name: ${error.message}`);
    // Handle internal server error
    res.status(500).json({ message: "Internal server error" });
  }
};
