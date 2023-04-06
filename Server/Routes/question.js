const express=require('express');
const {addQuestion, getQuestionById, updateQuestionLikes, getAllQuestion, getQuestionsByUserId}=require('../Controllers/question');

const router=express.Router();

router.get('/',getAllQuestion);
router.get('/user/:id',getQuestionsByUserId);
router.get('/:id',getQuestionById);
router.post('/add',addQuestion);
router.patch('/updatelikes/:id',updateQuestionLikes);



module.exports=router;