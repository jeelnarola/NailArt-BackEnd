const { Router } = require("express");
const userRouter = Router();

userRouter.get("/signup", (req, res) => {
  res.send({ msg: "hello" });
});

module.exports = userRouter;
