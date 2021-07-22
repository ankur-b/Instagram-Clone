const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SecretKey = require('../secret_key')
const requireAuth = require('../middleware/requireAuth')
router.get("/", requireAuth,(req, res) => {
  res.send("hello world");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(422).json({ error: "This email already in use" });
    } else {
      bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
          email: email,
          password: hashPassword,
          name: name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
});

router.post("/signin",(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please provide email or password"})
    }
    User.findOne({email:email}).then((user)=>{
        if(!user){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,user.password).then(isUser=>{
            if(isUser){
                const token = jwt.sign({_id:user._id},SecretKey)
                //res.json({message:"Successfully Signed in"})
                res.json({token})
            }else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        }).catch(err=>console.log(err))
    })
})
module.exports = router;
