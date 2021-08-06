const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireAuth = require("../middleware/requireAuth");

router.get("/posts", requireAuth, (req, res) => {
  Post.find()
    .populate("postedBy", "id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", requireAuth, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({ title, body, photo: pic, postedBy: req.user });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/mypost", requireAuth, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => console.log(err));
});
router.put("/like", requireAuth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err,result)=>{
    if(err){
      return json.status(422).json({error:err})
    }else{
      res.json(result)
    }
  })
});
router.put("/unlike", requireAuth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err,result)=>{
    if(err){
      return json.status(422).json({error:err})
    }else{
      res.json(result)
    }
  })
});
module.exports = router;
