const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const post = mongoose.model('post');
const requireLogin = require("../middlewares/requireLogin")
// Route
router.post("/createPost",requireLogin,(req,res)=>{
const {picUrl, body} = req.body;
if(!picUrl || !body){
    return res.status(422).json({error: "Please add all the fields"});
}
req.user
const Post = new post({
    picUrl,
    body,
    postedBy: req.user
});
Post.save().then((result)=>{
    return res.json({message:"Posted Succussfully"})
}).catch(err=>{
    return res.json({message:err})
})
});
module.exports= router;