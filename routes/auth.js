const express = require("express");
const router = express.Router();
const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireAuth = require("../middleware/requireAuth");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", //
    pass: "",
  },
});

router.post("/signup", async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);
  if (!email || !name || !password) {
    res.status(422).json({ error: "Please add all the fields" });
  } else {
    const candidate = await User.findOne({ email: email });
    if (candidate) {
      return res.status(422).json({ error: "This email already in use" });
    } else {
      const salt = await bcrypt.genSaltSync(10);
      const password = await req.body.password;
      const user = new User({
        email: email,
        password: bcrypt.hashSync(password, salt),
        name: name,
        pic: pic,
      });
      try {
        await user.save();
        const { _id, name, email, pic } = user;
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        //   transporter.sendMail({
        //     to: user.email,
        //     from: "ankurbarve29@gmail.com",
        //     subject: "signup success",
        //     html: "<h1>welcome to instagram</h1>",
        //   }, (err, data) => {
        //     if (err) {
        //         return log('Error occurs');
        //     }
        //     return log('Email sent!!!');
        // });
        res.json({
          message: "Saved Successfully",
          token,
          user: { _id, name, email, pic },
        });
      } catch (e) {
        console.log(err);
        res.status(500).json({
          err: err,
        });
      }
    }
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email or password" });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(password, user.password)
      .then((isUser) => {
        if (isUser) {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = user;
          res.json({
            token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => console.log(err));
  });
});
router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    console.log(req.body);
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(422).json({ error: "User does not exists" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
      //   const msg={
      //     to: user.email,
      //     from: "ankurbarve29@gmail.com",
      //     subject: "reset password",
      //     html: `<p>You requested for password reset</p>
      //     <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
      //     `,
      //   };
      //   transporter.sendMail(msg, (err, data) => {
      //     if (err) {
      //         return log('Error occurs');
      //     }
      //     return log('Email sent!!!');
      // });
        res.json({ message: "check your email" });
      });
    });
  });
});
router.post('/new-password',(req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
})
module.exports = router;
