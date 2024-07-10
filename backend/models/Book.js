const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
