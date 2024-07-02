const { Router } = require("express");
const { Auth, forgetEmailVerify, OTPverify, FrogetPassword } = require("../../Controllers/Auth/auth.controller");

const userRouter = Router();

userRouter.post("/auth",Auth);
userRouter.post("/emailVerify",forgetEmailVerify);
userRouter.post("/otpVerify",OTPverify);
userRouter.post("/frogetPassword/:id",FrogetPassword);

module.exports = userRouter;
