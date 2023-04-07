
const express=require('express');
const router=express.Router();
const {registerUser, getUserNameAndPic,getUserById,deleteAll,getDetailsForSearch}=require('../Controllers/user');

router.post('/register',registerUser);
router.get('/:id/getusernamepic',getUserNameAndPic);
router.post('/getdetailsforsearch',getDetailsForSearch);
router.get('/:id',getUserById);
router.delete('/deleteall',deleteAll);
module.exports=router;