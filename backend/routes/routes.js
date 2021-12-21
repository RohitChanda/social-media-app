const express=require("express");
const router=new express.Router();
const authcontroller=require('../controller/authcontroller')
const usercontroller=require('../controller/usercontroller'); 
// const {fetchuser}=require("../middleware/fetchuser");   //middleware
const upload=require("../middleware/uploadfile");  //middleware for file upload
const updatePic=require("../middleware/updateprofilepic");  //middleware for dp update

//auth routes---------------------
router.post('/api/signup',authcontroller.signup);
router.post('/api/signin',authcontroller.signin);
// router.post('/api/index',fetchuser,controller.index);
// -------------------------


router.get('/api/userprofile',usercontroller.userprofile);
router.get('/api/ownposts',usercontroller.user_own_posts);
// router.post('/api/userpost',upload.single('file'),usercontroller.user_post);
router.post('/api/userpost',upload.single('file'),usercontroller.user_post);
router.get('/api/fetchallposts',usercontroller.fetch_all_posts);
router.post('/api/updateprofilepic',updatePic.single('file'),usercontroller.update_profile_pic);
router.get('/api/usernamelist',usercontroller.user_name_list);
router.get('/api/searchprofile',usercontroller.search_profile);
router.get('/api/peopleprofile',usercontroller.people_profile);
router.post('/api/friendreq',usercontroller.friend_req);
router.get('/api/pendingreq',usercontroller.pending_req);
router.post('/api/acceptreq',usercontroller.accept_req);
router.post('/api/declinereq',usercontroller.decline_req);
router.get('/api/friendlist',usercontroller.friend_list);

module.exports=router;  