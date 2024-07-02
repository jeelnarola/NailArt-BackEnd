const { Router } = require("express");
const userModel = require("../../Models/Auth/userSignup");

const bcrypt = require("bcrypt");
const userRouter = Router();

userRouter.post("/auth", async (req, res) => {
  try {
    let {firstName,secondName, email, password,role,auth} = req.body;
    let emailFind = await userModel.findOne({ email: email });
    console.log(emailFind)
    if(auth=='signup'){
      if (emailFind) {
        res.status(200).json({ msg: "already existing user" });
      } else {
        bcrypt.hash(password, 5, async (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            let registerObj = {firstName,secondName,email,password: hash,role };
            let data = await userModel.create(registerObj);
            res.status(200).json({msg: "successful user registration",data:data });
          }
        });
      }
    }else if(auth=='login'){
      if(emailFind.email!==email){
        res.status(200).json({ msg: "user existing !" });
      }else{
        bcrypt.compare(password,emailFind.password,(err,done)=>{
          if(err){
            res.status(400).json({msg:err})
          }
          if(done){
            res.status(200).send({msg:'Successful Login.',data:emailFind})
          }else{
            res.status(400).send("worng password !")
          }
        })
      }
    }
    else{
      res.status(400).json({msg:"Auth Worng..."})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error" });
  }
});

module.exports = userRouter;
