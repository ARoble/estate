const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A first name is required"],
  },
  secondName: {
    type: String,
    required: [true, "A second name is required"],
  },
  email: {
    type: String,
    required: [true, "A email is required"],
  },
  phone: {
    type: Number,
    required: [true, "A phone number is required"],
  },
  location: {
    type: String,
    required: [true, "A location is required"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
