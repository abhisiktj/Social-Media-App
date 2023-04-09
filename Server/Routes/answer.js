const express=require('express');
const router=express.Router();
const auth=require('../Middleware/auth');
const {addAnswer,updateAnswerLikes,deleteAnswer, deleteAnswerById}=require('../Controllers/answer');


router.post('/add/:id',auth,addAnswer);
router.patch('/updatelikes/:id',auth,updateAnswerLikes);
router.delete('/:id',auth,deleteAnswerById);
module.exports=router;