const expressAsyncHandler = require('express-async-handler');
const Answer=require('../Models/answer');
const statusCodes=require('http-status-codes');

const validator=require('validator');
const CustomError = require('../utils/customError');
const Question = require('../Models/question');
const addAnswer=expressAsyncHandler(async(req,res)=>{
    
    const {answeredTo,answeredBy,content}= req.body;
    if(!answeredTo || !answeredBy || !content){
       throw new CustomError("Bad Request-Empty Fields",statusCodes.BAD_REQUEST);
    }

    if(!validator.isMongoId(answeredTo) || !validator.isMongoId(answeredBy) ){
        throw new Error("Incorrect Object Id ",statusCodes.BAD_REQUEST);
    }
    
    const answer=await Answer.create(req.body);
    const question=await Question.updateOne({_id:answeredTo},{$push:{answeredBy:answeredBy}});
  
    res.status(statusCodes.CREATED).json({success:true,data:answer});

})

module.exports={addAnswer};