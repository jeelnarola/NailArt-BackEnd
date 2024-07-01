const mongoose = require("mongoose");

const userSignup = new mongoose.Schema({
  firstName: String,
  secondName: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("authSignup", userSignup);
module.exports = userModel;
