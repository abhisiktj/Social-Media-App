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

     const user=await User.find({_id:askedBy});
     
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
    const id=req.params.id;
    const userId=req.body.userId;

    if(!validator.isMongoId(id) || !validator.isMongoId(userId))
      throw new CustomError("Invalid Id",statusCodes.BAD_REQUEST);
    
      let question=await Question.findById(id);
      let user=await User.findById(userId);

      if(!question){
        throw new CustomError("No Question Exist for given id",statusCodes.NOT_FOUND);
      }

      
      if(!user){
        throw new CustomError("No User Exist for given id",statusCodes.NOT_FOUND);
      }

      if(question.likedBy.includes(userId)){
        question=await Question.updateOne({_id:id},{$pull:{likedBy:userId}});
      }
      else{
         question=await Question.updateOne({_id:id},{$push:{likedBy:userId}});
      }

      
      res.status(statusCodes.CREATED).json({
        success:true,
        data:question
      })
})


const getAllQuestion=expressAsyncHandler(async(req,res)=>{

  const page=parseInt(req.query.page) || 1;
  const limit=parseInt(req.query.size) || 2;
   const skip=(page-1)*limit;
  const questions=await Question.find({}).sort({createdAt:-1}).skip(skip).limit(limit);
    
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