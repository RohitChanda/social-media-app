require("../db/db"); 
const User=require("../model/User");//db model
// const { body, validationResult } = require('express-validator');  //npm validator
const bcrypt=require("bcrypt");


const jwt=require("jsonwebtoken");
const secret_key=process.env.SECRET_KEY;
const token_age=3*24*60*60;
const generateToken=(id)=>{return jwt.sign({id},secret_key,{expiresIn:token_age});}  //jwt.sign ->syncc function

module.exports.signup=async(req,res)=>{
    try 
    {
        const {name,email,password,year}=req.body.formvalue;

        const salt=await bcrypt.genSalt(10);
        const new_password=await bcrypt.hash(password,salt);
        

        const insertUser=new User({
            name:name.toLowerCase(),
            email:email.toLowerCase(),
            password:new_password,
            year:year
        });

        const user=await insertUser.save();
        const user_id=user._id;
        const token=generateToken(user_id);
        res.status(200).json({
            success: true,
            data: "signup",
        });
        
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json([{
            res:error
            
        }]);
    }
}
module.exports.signin=async(req,res)=>{
    try {
        const {email,password}=req.body.formvalue;
       
        const user=await User.findOne({email:email});
        // console.log(user);
        if(!user){
           return res.json({
                data:"unregister email"
            });
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({
                data:"password incorrect"
            });
        } 
        const token=generateToken(user._id);
        // res.cookie("jwt",token,{httpOnly:true   });
        return res.json({data:"login",
                        token:token});
    } catch (error) {
        console.log(error);
        res.status(500).json([{
            res:error
        }]);
    }

    // res.json([obj]);
}
