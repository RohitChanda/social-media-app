const mongoose=require("mongoose");
const { Schema } = mongoose;
const validator=require("validator");
// const bcrypt=require("bcrypt");
// const saltRounds=10;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new error("email is invalid");
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    profile_pic:{
        type:String,
        default:null
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'friends'}],
    date:{
        type:Date,
        default:Date.now
    }
});
const User=new mongoose.model('user',userSchema);
module.exports=User;