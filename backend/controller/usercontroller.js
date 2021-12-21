const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const path = require('path');
//db model
const User = require("../model/User");
const Posts = require("../model/Posts");
const Friends=require("../model/Friends");

const findIdFromToken = (token) => {   //get user db id from token
    return jwt.verify(token, secret_key).id;
}
const userPostFileLocation=process.env.BASE_FILE_URL+process.env.USERPOST_FILE_LOCATION+"/";
const userDpLocation=process.env.BASE_FILE_URL+process.env.USERPOST_PROFILE_PIC_LOCATION+"/";
module.exports.userprofile = async (req, res) => {
    const user_token = req.query.token;
    if (!user_token) {
        return res.status(404).json({
            data: "you are not login"
        });
    }
    try {
        const user_id = findIdFromToken(user_token);
        const user = await User.findById(user_id);
        res.json({
            data: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}
module.exports.user_post = async (req, res) => {
   try {
        const { text, token } = req.query;
        const user_id = findIdFromToken(token);
        let userPosts = new Posts({
            text: text,
            user: user_id
        });
        if(req.file){
            userPosts.filename=req.file.filename;
            userPosts.filepath=userPostFileLocation+req.file.filename;
        }
        await userPosts.save();
        res.status(200).json({
            data: "posted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });   
    }
  
}

module.exports.user_own_posts = async (req, res) => {
    const user_id = findIdFromToken(req.query.token);
    try {
        const result = await Posts.find({ user: user_id}).sort({date: -1});
        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }

}
module.exports.fetch_all_posts=async (req,res) =>{
    const user_id = findIdFromToken(req.query.token);
    try{
    const result = await Posts.find().sort({date: -1}).populate('user');
    const allusers = await User.find({ _id: { $ne: user_id } }).sort({date: -1}).limit(5);
    const logeddinUser=await User.findById(user_id).select({name:1,profile_pic:1,_id:0}); 
    const userCount=await User.count({ _id: { $ne: user_id } });  //means id!=user_id
    // const singleUserPost= await Posts.find({user:user_id}).select({filepath:1,_id:0}).sort({date: -1});
   
        res.status(200).json({
            data:result,
            users:allusers,
            singleuser:logeddinUser,
            usercount:userCount
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}
module.exports.update_profile_pic=async(req,res)=>{
    try {
        const user_id = findIdFromToken(req.query.token);
        if(req.file){
            const dpPath=userDpLocation+req.file.filename;
            const update=await User
                        .updateOne({_id:user_id},{       //where id =
                        $set:{profile_pic:dpPath},        
                        })
        }
        res.status(200).json({
            status:true,
            data:"update_pic"
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
        
    }

}
module.exports.user_name_list=async (req,res)=>{
    try {
        const user_id = findIdFromToken(req.query.token);
        const allusers = await User.find({ _id: { $ne: user_id } }).select({name:1,profile_pic:1}).sort({date: -1});
        const ownProfile= await User.find({ _id:  user_id });
        // console.log(allusers)
        res.status(200).json({
            status:true,
            data:allusers,
            profile:ownProfile
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}
module.exports.search_profile=async(req,res)=>{
    try {
        const result=await User.find({name:{ $regex: '.*' + req.query.profile + '.*' } });
        res.status(200).json({
            result:result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}
module.exports.people_profile=async(req,res)=>{ 
    try {
        const user_profile=await User.find({ _id:  req.query.id });
        const user_post=await Posts.find({ user: req.query.id  }).sort({date: -1}).populate('user');


        let arr = [];
        for (let i = 0; i < user_profile[0].friends.length; i++) {
        arr.push(user_profile[0].friends[i]);
        }
        let muFriends = await User.find({_id: {$in:arr}});
        // console.log(muFriends)
        res.status(200).json({
            profile:user_profile,
            post:user_post,
            mutual:muFriends
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}
module.exports.friend_req=async(req,res)=>{
    try {
        const rec_id = req.body.params.rec_id;//recipant id
        const req_id=findIdFromToken(req.body.params.req_data);// requester id
       
        const doc_req = await Friends.findOneAndUpdate(  //requester
            { requester: req_id, recipient: rec_id },
            { $set: { status: 1 }},
            { upsert: true, new: true }
        )
        const doc_rec = await Friends.findOneAndUpdate(  //recipant
            { recipient: rec_id, requester: req_id },
            { $set: { status: 2 }},
            { upsert: true, new: true }
        )
        res.status(200).json({
            status:true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}

module.exports.pending_req=async(req,res)=>{
    try {
       
        const recipiant_id=findIdFromToken(req.query.rec_data);
        const pendingFriends=await Friends.find({ recipient: recipiant_id ,status:'2'  }).sort({date: -1});
        
        if(pendingFriends.length==0){
            return res.status(200).json({
                status:false
            });
        }else{
            let arr = [];
            for (let i = 0; i < pendingFriends.length; i++) {
            arr.push(pendingFriends[i].requester);
            }
            let allFriends = await User.find({_id: {$in:arr}}); //query for each element of an array
            // console.log(allFriends);
            return res.status(200).json({
                friends:allFriends,
                status:true
            });
            
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}
module.exports.accept_req=async (req,res)=>{
    try {
        const req_id=req.body.params.req_id;
        
        const rec_id=findIdFromToken(req.body.params.token);
        

        const doc_req= await Friends.findOneAndUpdate(
            { requester: req_id, recipient: rec_id },
            { $set: { status: 3 }}
        )
        const doc_rec= await Friends.findOneAndUpdate(
            { recipient: rec_id, requester: req_id },
            { $set: { status: 3 }}
        )
         const updateUser_req = await User.findOneAndUpdate( //requester
            { _id: req_id },
            { $push: { friends: doc_req.recipient }}
        )
        const updateUser_rec = await User.findOneAndUpdate( //recipant
            { _id: rec_id },
            { $push: { friends: doc_rec.requester }}
         )
        
        res.status(200).json({
            request:"accept",
            status:true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}
module.exports.decline_req=async (req,res)=>{
    try {
        const req_id=req.body.params.req_id;
        const rec_id=findIdFromToken(req.body.params.token);
        const doc_req = await Friends.findOneAndRemove(
            { requester: req_id, recipient: rec_id }
        )
        const doc_rec = await Friends.findOneAndRemove(
            { recipient: rec_id, requester: req_id }
        )
        res.status(200).json({
            request:"decline",
            status:true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }

}
module.exports.friend_list=async (req,res)=>{
    try {
        const id=findIdFromToken(req.query.token);
        const  result=await User.findById(id).select({friends:1,_id:0}); 
        let friends_id = [];
        for (let i = 0; i < result.friends.length; i++) {
            friends_id.push(result.friends[i]);
        }
        let allFriends = await User.find({_id: {$in:friends_id}});
        res.status(200).json({
            friends:allFriends
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "interna server error"
        });
    }
}

