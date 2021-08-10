const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SecretKey = require("../secret_key");
const requireAuth = require("../middleware/requireAuth");
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/signup", async(req, res) => {
  const { name, email, password,pic } = req.body;
  console.log(req.body)
  if (!email || !name || !password) {
    res.status(422).json({ error: "Please add all the fields" });
  }
  else{
    const candidate = await User.findOne({email:email})
    if (candidate) {
      return res.status(422).json({ error: "This email already in use" });
    }
    else{
      const salt = await bcrypt.genSaltSync(10);
      const password = await req.body.password
      const user = new User({
          email: email,
          password: bcrypt.hashSync(password, salt),
          name: name,
          pic:pic
      });
      try{
        await user.save()
        const {_id,name,email} = user
        const token = jwt.sign({ userId: user._id }, SecretKey);
        res.json({ message: "Saved Successfully",token,user:{_id,name,email} });
      }catch(e){
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
          const token = jwt.sign({ _id: user._id }, SecretKey);
          const {_id,name,email,followers,following,pic} = user
          res.json({ token,user:{_id,name,email,followers,following,pic} });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => console.log(err));
  });
});
module.exports = router;
