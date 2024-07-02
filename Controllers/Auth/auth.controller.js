const userModel = require("../../Models/Auth/userSignup");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer");
const otpgenretor=require("otp-generator");
require("dotenv").config();
let {NODEMAILERPASS,NODEMAILEREMAIL}=process.env;
let otp;
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:NODEMAILEREMAIL,
      pass:NODEMAILERPASS
    }, 
    tls: {
        rejectUnauthorized: false
    }
  })

const Auth = async(req, res) => {
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
}

const forgetEmailVerify=async(req,res)=>{
    try{
        let {email}=req.body;
        // let data=await userModel.findOne({email:email})
        if(email){
                // OTP Genret
            otp=otpgenretor.generate(6,{
                specialChars:false,
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
            })
            const mailoptions={
                from:NODEMAILEREMAIL,
                to:email,
                subject:"reset password",
                html: `
                <p>Dear User,</p>
                <p>We received a request to reset the password associated with your account. Please use the following One-Time Password (OTP) to proceed with resetting your password:</p>
                <h2>${otp}</h2>
                <p>To reset your password, follow these steps:</p>
                <ol>
                    <li>Visit the <a href="http://127.0.0.1:5501/Frontend/Views/FrogetPassword.html">password reset page</a>.</li>
                    <li>Enter your email address and the OTP provided above.</li>
                    <li>Create a new password for your account.</li>
                </ol>
                <p>Please note that the OTP is valid for only a limited period of time and can be used only once. If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
                <p>For security reasons, please do not share this OTP with anyone.</p>
                <p>If you encounter any issues or need further assistance, feel free to reach out to our support team at support@example.com.</p>
                <p>Thank you,<br>Your Company Name</p>
                <p><small>This is an automated message. Please do not reply to this email.</small></p>
            `
            }
            console.log(mailoptions)
             transport.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(info);
                }
                res.status(200).json({data:"data"})
             })
        }else{
            res.status(200).json({msg:"Not Match Email..."})
        }
    }catch(error){
        res.status(500).json({msg:error})
    }
}

const OTPverify=async(req,res)=>{
    try{
    // let Verif=req.body.data
    
    // let myotp=''
    
    // for(let i=0;i<Verif.length;i++){
    //     myotp+=Verif[i]
    // }

    if(otp==req.body.userOTP){
        res.status(200).json({msg:"Otp Verify !"})
    }
    else{
        res.status(400).json({msg:"Otp Not Verify !"})
    }
    }catch(error){
        console.log("OTPverify",error);
    }
}

const FrogetPassword=async(req,res)=>{
    try{
     let {id}=req.params
     let {password}=req.body
     if(id){
         bcrypt.hash(password,5,async(err,hash)=>{
             if(err){   
                 console.log(err)
             }else{
                 let obj={password:hash}
                 let data=await UserSingup.findByIdAndUpdate(id,obj)
                 res.status(200).json({msg:"successful Froget Password..."})
             }
         })
     }
    }catch(error){
        res.status(500).json({error:error})
    }
 
 }

module.exports={Auth,forgetEmailVerify,OTPverify,FrogetPassword}