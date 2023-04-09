
const express=require('express');
const router=express.Router();
const {registerUser, getUserNameAndPic,getUserById,deleteAll,getDetailsForSearch, loginUser,getUserByUsername}=require('../Controllers/user');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/:id/getusernamepic',getUserNameAndPic);
router.post('/getdetailsforsearch',getDetailsForSearch);
router.get('/:id',getUserById);
router.get('/username/:username',getUserByUsername)
router.delete('/deleteall',deleteAll);

module.exports=router;