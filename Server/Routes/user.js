
const express=require('express');
const router=express.Router();
const {registerUser, getUserNameAndPic}=require('../Controllers/user');

router.post('/register',registerUser);
router.get('/:id/getusernamepassword',getUserNameAndPic);

module.exports=router;