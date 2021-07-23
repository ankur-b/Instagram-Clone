const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireAuth = require("../middleware/requireAuth");

router.get("/posts", (req, res) => {
  Post.find()
    .populate("postedBy","id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", requireAuth, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({ title, body, postedBy: req.user });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get('/mypost',requireAuth,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>console.log(err))
})
module.exports = router;
