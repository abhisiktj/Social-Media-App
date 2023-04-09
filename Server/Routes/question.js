const express=require('express');
const {addQuestion, getQuestionById, updateQuestionLikes, getAllQuestion, getQuestionsByUserId,deleteQuestionById,getAnswersByQuestionId
}=require('../Controllers/question');
const auth=require('../Middleware/auth');

const router=express.Router();


router.get('/',getAllQuestion);
router.get('/user/:id',getQuestionsByUserId);
router.get('/:id',getQuestionById);
router.get('/answers/:id',getAnswersByQuestionId);


router.delete('/:id',auth,deleteQuestionById);
router.post('/add',auth,addQuestion);
router.patch('/updatelikes/:id',auth,updateQuestionLikes);



module.exports=router;