const expressAsyncHandler=require('express-async-handler');
const CustomError=require('../utils/customError')
const statusCodes=require('http-status-codes');

const notFound=expressAsyncHandler(async(req,res)=>{
    throw new CustomError('URL Not Available',statusCodes.NOT_FOUND);
});


const errorHandler=async(error,req,res,next)=>{
  console.log(req.path);
console.log(error);

   if(error instanceof CustomError){
   
    res.status(error.statusCode).json({success:false,message:error.message});
   }

res.status(statusCodes.INTERNAL_SERVER_ERROR).json({success:false,message:"Internal Server Error"})
  }
module.exports={notFound,errorHandler}