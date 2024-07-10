const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  dueDate: { type: Date, required: true },
  transactionType: {
    type: String,
    required: true,
    enum: ["borrowed", "returned"],
  },
  userDetails: {
    name: String,
    email: String,
  },
  bookDetails: {
    title: String,
    author: String,
    image: String,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
