
const mongoose=require("mongoose");
const { Schema } = mongoose;
const postSchema=new Schema({
    filename:{
        type:String
    },
    filepath:{
        type:String
    },
    text:{
        type:String,
        required:true
    },
    user:{ 
        type:mongoose.Schema.Types.ObjectId,    
        ref:'user'
    },
    approvalstatus:{
        type:Number,
        default:1
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Posts=new mongoose.model('posts',postSchema);
module.exports=Posts;