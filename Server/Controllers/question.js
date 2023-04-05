const validator=require('validator')
const Question=require('../Models/question');
const expressAsyncHandler=require('express-async-handler');

const addQuestion=expressAsyncHandler(async(req,res)=>{
     const{
       title,desc,askedBy
     }=req.body

     if(!validator.isMongoId(askedBy))
      throw new Error("Asker's Id invalid")

     const user=await user.find({_id:askedBy});
     
     if(!user)
      throw new Error("Question Asked by an unregisterd user");

    const question=await Question.create(req.body);
    res.status(201).json({sucess:true,data:question});
})

const getQuestionById=expressAsyncHandler(async(req,res)=>{
    const id=req.params.id;
    if(!validator.isMongoId(id))
      throw new Error("Invalid Question Id")
    const question=await Question.findById({_id:id});

    if(!question)
      throw new Error("No Question found for this id");
    
      res.status(ok).json(question);
})

const updateQuestionLikes=expressAsyncHandler(async(req,res)=>{
    const id=req.body.id;
    const likes=req.body.likes;
    if(!validator.isMongoId(id))
      throw new Error("Invalid Question Id");
    
      let question=await Question.findOneAndUpdate({_id:id},{likes},{new:true});
      if(!question){
        throw new Error("No Question Exist for given id");
      }

      
      res.status(200).json({
        success:true,
        data:question

      })
})

module.exports={
    addQuestion,
    getQuestionById,
    updateQuestionLikes
}