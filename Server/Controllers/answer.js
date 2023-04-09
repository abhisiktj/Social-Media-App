const expressAsyncHandler = require('express-async-handler');
const Answer=require('../Models/answer');
const statusCodes=require('http-status-codes');

const validator=require('validator');
const CustomError = require('../utils/customError');
const Question = require('../Models/question');
const User = require('../Models/user');


const addAnswer=expressAsyncHandler(async(req,res)=>{
    
    const answeredBy=req.user._id;
    const answeredTo=req.params.id; 

    const content= req.body.content;
    if(!answeredTo || !answeredBy || !content){
       throw new CustomError("Bad Request-Empty Fields",statusCodes.BAD_REQUEST);
    }

    if(!validator.isMongoId(answeredTo) || !validator.isMongoId(`${answeredBy}`) ){
        throw new Error("Incorrect Object Id ",statusCodes.BAD_REQUEST);
    }
    const user=await User.findById(answeredBy);
    if(!user){
        throw new CustomError("User Doesnt Exist");
    }

    let question=await Question.findById(answeredTo);
    if(!question){
        throw new CustomError("No Question Exist for Given Id");
    }
    
    const answer=await Answer.create({
        answeredBy,answeredTo,content
    });
    question=await Question.updateOne({_id:answeredTo},{$push:{answeredBy:answeredBy}});
  
    res.status(statusCodes.CREATED).json({success:true,data:answer});

})


const updateAnswerLikes=expressAsyncHandler(async(req,res)=>{
    const id=req.params.id;
    const userId=req.user._id;

    if(!validator.isMongoId(id) || !validator.isMongoId(`${userId}`))
      throw new CustomError("Invalid Id",statusCodes.BAD_REQUEST);
    
      let answer=await Answer.findById(id);
      if(!answer){
        throw new CustomError("No Answer Exist for given id",statusCodes.NOT_FOUND);
      }

      let user=await User.findById(userId);

      if(!user){
        throw new CustomError("No User Exist for given id",statusCodes.NOT_FOUND);
      }

      if(answer.likedBy.includes(userId)){
         answer=await Answer.updateOne({_id:id},{$pull:{likedBy:userId}});
      }
      else{
         answer=await Answer.updateOne({_id:id},{$push:{likedBy:userId}});
      }

      
      res.status(statusCodes.CREATED).json({
        success:true,
        data:answer
      })
})


module.exports={
    addAnswer,
    updateAnswerLikes
};