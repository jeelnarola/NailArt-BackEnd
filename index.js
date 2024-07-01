const express = require("express");
const cors = require("cors");
const dataBase = require("./Configs/dataBase");
const router = require("./Routers/router");
const app = express();
require("dotenv").config();
let { PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(cors());

app.listen(PORT, () => {
  console.log("Server Start", PORT);
  dataBase();
});
