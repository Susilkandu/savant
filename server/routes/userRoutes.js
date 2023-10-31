const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const post = mongoose.model('post');
const requireLogin = require("../middlewares/requireLogin")
// Route
router.post("/createPost", requireLogin, (req, res) => {
    const { picUrl, body } = req.body;
    if (!picUrl || !body) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    req.user
    const Post = new post({
        picUrl,
        body,
        postedBy: req.user
    });
    Post.save().then((result) => {
        return res.json({ message: "Posted Succussfully" })
    }).catch(err => {
        return res.json({ message: err })
    })
});
router.get("/allposts", requireLogin, (req, res) => {
    post.find()
        .populate("postedBy", "_id name")
        .then(posts => res.json(posts))
        .catch(err => res.json({ error: err }))
})
router.get("/myposts", requireLogin, (req, res) => {
    post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then((posts) => { res.json(posts) })
        .catch((err) => { res.json({ error: err }) })
})
router.put("/like", requireLogin, (req, res) => {
    if(req.body.postId)
    {
        post.findByIdAndUpdate(req.body.postId, {
            $addToSet: { likes: req.user._id }
        },{ new: true 
        }).then((result)=>{
            res.status(200).json(result)
        }).catch((err)=>console.log(err))
    }else{
            return res.json({message:"Please Add All Fields"})
    }
})
router.put("/unlike", requireLogin, (req, res) => {
    if(req.body.postId)
    {
        post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        },{ new: true 
        }).then((result)=>{
            res.status(200).json(result)
        }).catch((err)=>console.log(err))
    }else{
        return res.json({message:"Please Add All Fields"})
    }
})
module.exports = router;