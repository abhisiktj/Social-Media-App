const validator=require('validator')
const Question=require('../Models/question');
const User=require('../Models/user');
const expressAsyncHandler=require('express-async-handler');
const statusCodes=require('http-status-codes');
const CustomError=require('../utils/customError');

const addQuestion=expressAsyncHandler(async(req,res)=>{
     const{
       title,desc,askedBy
     }=req.body

     if(!validator.isMongoId(askedBy))
      throw new CustomError("Asker's Id invalid",statusCodes.BAD_REQUEST)

     const user=await user.find({_id:askedBy});
     
     if(!user)
      throw new CustomError("Question Asked by an unregisterd user",statusCodes.BAD_REQUEST);

    const question=await Question.create(req.body);
    res.status(statusCodes.CREATED).json({sucess:true,data:question});
})



const getQuestionById=expressAsyncHandler(async(req,res)=>{
    const id=req.params.id;
    if(!validator.isMongoId(id))
      throw new CustomError("Invalid Question Id",statusCodes.BAD_REQUEST)
    const question=await Question.findById({_id:id});

    if(!question)
      throw new CustomError("No Question found for this id",statusCodes.NOT_FOUND);
    
      res.status(statusCodes.OK).json(question);
})

const updateQuestionLikes=expressAsyncHandler(async(req,res)=>{
    const id=req.body.id;
    const likes=req.body.likes;
    if(!validator.isMongoId(id))
      throw new CustomError("Invalid Question Id",statusCodes.BAD_REQUEST);
    
      let question=await Question.findOneAndUpdate({_id:id},{likes},{new:true});
      if(!question){
        throw new CustomError("No Question Exist for given id",statusCodes.NOT_FOUND);
      }

      
      res.status(statusCodes.CREATED).json({
        success:true,
        data:question

      })
})


const getAllQuestion=expressAsyncHandler(async()=>{

  const page=Number(req.query.page) || 1;
  const limit=Number(req.query.limit) || 2;

  const skip= (page-1)*limit;

  const questions=await Question.find({}).sort({createdAt:desc}).skip(skip);
    
  if(!questions){
    throw new Error("No Question Available",statusCodes.NOT_FOUND);
  }
  res.status(statusCodes.OK).json({success:true,data:questions});

})

const getQuestionsByUserId=expressAsyncHandler(async()=>{

  const page=Number(req.query.page) || 1;
  const limit=Number(req.query.limit) || 2;

  const skip=(page-1)*limit;
  const userId=req.params.id;
  if(!validator.isMongoId(userId))
     throw new CustomError("Invalid User Id",statusCodes.BAD_REQUEST);

    const questions=await Question.find({askedBy:userId}).sort({createdAt:desc}).skip(skip);

    if(!questions){
        throw new CustomError("No Questions Available",statusCodes.NOT_FOUND)
    }
    res.status(statusCodes.OK).json({
      success:true,
       data:questions
    })

})
module.exports={
    addQuestion,
    getQuestionById,
    updateQuestionLikes,
    getAllQuestion,
    getQuestionsByUserId
}