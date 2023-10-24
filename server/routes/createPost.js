const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const post = mongoose.model('post');
const requireLogin = require("../middlewares/requireLogin")
// Route
router.post("/createPost",requireLogin,(req,res)=>{
const {title, body} = req.body;
if(!title || !body){
    return res.status(422).json({error: "Please add all the fields"});
}
req.user
const Post = new post({
    title,
    body,
    postedBy: req. user
});
Post.save().then((result)=>{
    return res.json({post:result})
}).catch(err=>{
    console.log(err)
})
});
module.exports= router;