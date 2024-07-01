const { Router } = require("express");
const router = Router();

const userRouter = require("./Auth/userAuthRouter");

router.use("/auth", userRouter);

module.exports = router;
