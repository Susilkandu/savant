const jwt = require('jsonwebtoken')
const jwtKeys= process.env.jwtKeys
const mongoose = require("mongoose")
const User = mongoose.model("user") 


module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)
    {   
        return res.status(401).json({error:"You must have do Login For post in"});
    }
    const token = authorization;

        jwt.verify(token,process.env.jwtKeys,(err,payload)=>{
            if(err){
                return res.status(401).json({error:"You must have  logged in"});
            }
            const {_id}= payload;
            User.findById(_id).then(userdata=>{
                req.user= userdata
                next();
            })
        })
    
}