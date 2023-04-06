const expressAsyncHandler = require('express-async-handler');
const Answer=require('../Models/answer');
const statusCodes=require('http-status-codes');

const validator=require('validator');
const CustomError = require('../utils/customError');
const addAnswer=expressAsyncHandler(async()=>{
    
    const {answeredTo,answeredBy,content}= req.body;
    if(!answeredTo || !answeredBy || !content){
       throw new CustomError("Bad Request",statusCodes.BAD_REQUEST);
    }

    if(!validator.isMongoid(answeredBy) || !validator.isMongoid(answeredBy) ){
        throw new Error("Incorrect Object Id ",statusCodes.BAD_REQUEST);
    }
    const answer=await Answer.create(req.body);

    res.status(statusCodes.CREATED).json({success:true,data:answer});

})

module.exports={addAnswer};