const mongoose = require("mongoose");
require("dotenv").config();
const dataBase = async () => {
  await mongoose.connect(process.env.DATABASE);
  console.log("DataBase Connect...");
};

module.exports = dataBase;
