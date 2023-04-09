const express=require('express');
const router=express.Router();
const auth=require('../Middleware/auth');
const {addAnswer,updateAnswerLikes}=require('../Controllers/answer');


router.post('/add/:id',auth,addAnswer);
router.patch('/updatelikes/:id',auth,updateAnswerLikes);
module.exports=router;