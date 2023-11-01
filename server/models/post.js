const mongoose= require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    picUrl:{
        type:String,
        required:true,
        default:'no-pic'
    },
    body:{
        type:String,
        required:true
    },
    postedBy:{
    type: ObjectId,
    required:true,
    ref: 'user'
    },
    likes:[{type:ObjectId, ref:'user',unique:true}],
    comments:[{
        comment:{type:String},
        postedBy:{type:ObjectId, ref:'user'}
    }]
    
})
mongoose.model('post',postSchema);