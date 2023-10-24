const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const user = mongoose.model('user')
const bcrypt = require("bcrypt")
const jwt= require('jsonwebtoken');
const requireLogin = require("../middlewares/requireLogin")
router.get('/',(req,res)=>{
    res.send("Hello");
});
router.post('/signup',(req,res)=>{
    const {name, username, email, password} = req.body;
    if(!name || !username || !email || !password)
    {
        res.status(422).json({error:"Please fill all the the fields"});
    }
    else{
        user.findOne({$or: [{username:username},{email:email}]}).then((usr)=>{
            if(usr)
            {
                res.status(422).json({error:"user is already exist"});
            }
            else
            {
                bcrypt.hash(password,9).then((hashedPassword)=>{
                    const userdata = new user({
                        name, username, email, password:hashedPassword
                    });
                    userdata.save().then(()=>{
                        res.json({message:"Registration Succussfully"});
                    }).catch((error)=>{
                        console.log(error)
                    })
                }).catch((error)=>{
                    res.status(54).json({error:"Internal Error Please try later"})
                })
               
            }
        });
}
})
router.post('/signin',(req,res)=>{
    const {email,password} =req.body;
    if(!email || !password)
    {
       return res.json({error:"Please fill Email and Password"})
    }
    else{
        user.findOne({email:email}).then((data)=>{
            if(!data)
            {
                return res.status(422).json({error:"Invalid Credential"})
            }else
            {
                bcrypt.compare(password,data.password).then((result)=>{
                    if(result)
                    {
                        const token = jwt.sign({_id:data._id},process.env.jwtKeys);
                        console.log(token)
                        res.json({message:`${token}`})
                        //  res.status(200).json({message:"logined Succussfully"})
                    }
                    else
                    {
                        res.status(403).json({error:"Please Enter Valid Credential"})
                    }
                })
            }
        })
    }
})
module.exports= router;