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
        console.log(err)
        return res.json({ message: err })
    })
});
router.get("/allposts", requireLogin, (req, res) => {
    post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy","_id name")
        .then(posts => res.json(posts))
        .catch(err => res.json({ error: err }))
})
router.get("/myposts", requireLogin, (req, res) => {
    post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy","_id name")
        .then((posts) => { res.json(posts) })
        .catch((err) => { res.json({ error: err }) })
})
router.put("/like", requireLogin, (req, res) => {
    if(req.body.postId)
    {
        post.findByIdAndUpdate(req.body.postId, {
            $addToSet: { likes: req.user._id }
        },{ new: true 
        }).populate("postedBy","_id name")
        .then((result)=>{
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
        }).populate("postedBy","_id name")
        .then((result)=>{
            res.status(200).json(result)
        }).catch((err)=>console.log(err))
    }else{
        return res.json({message:"Please Add All Fields"})
    }
})
router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        comment:req.body.comment,
        postedBy:req.user._id
    }
    if(comment.comment){
        post.findByIdAndUpdate(req.body.postId,{
            $addToSet:{comments:comment}
        },{new:true}).populate("postedBy","_id name")
        .populate("comments.postedBy","_id name").then((data)=>{
            res.json(data)
        }).catch((err)=>{
          console.log(err)
        })
    }
})
router.delete('/deletePost/:postId',requireLogin,async(req,res)=>{
try {
    const postId= req.params.postId
    const fetchedPost= await post.findById(postId);
    if(!fetchedPost){
        return res.status(404).json({error:"Post not Found"})
    }
    else
    {
        if(fetchedPost.postedBy._id.toString()==req.user._id.toString()){
            post.deleteOne({_id:postId}).then((msg)=>{
                res.json({message:"Post Deleted"})
            })
        }
        else{
            return res.status(401).json({error:"Unauthorized Access"})
        }
    }
} catch (error) {
    // return res.status(404).json({error:"Post not Found"})
    console.log(error)
}

})
module.exports = router;