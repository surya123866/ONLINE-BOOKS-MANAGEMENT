const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
