const mongoose = require("mongoose");

const userSignup = new mongoose.Schema({
  firstName: String,
  secondName: String,
  email: String,
  password: String,
  role:{type:String,
    enum:['user','admin'],
    default:'user',
  }
});

const userModel = mongoose.model("allUser", userSignup);
module.exports = userModel;
