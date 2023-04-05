const expressAsyncHandler=require('express-async-handler');
const notFound=expressAsyncHandler(async(req,res)=>{
  const error=new Error("Route does not exist");
  error.statuscode=404;
  throw error;
})

const errorHandler=async(error,req,res,next)=>{
console.log(error);
    if(error.code===11000){
        error.message=`Duplicate ${Object.keys(error.keyPattern)[0]}`
        error.statuscode=403;
    }

error.message=error.message || "Internal Server Error"
error.statuscode=error.statuscode || 500

  res.status(error.statuscode).json({
    success:false,
    message:error.message
  })
}

module.exports={notFound,errorHandler};