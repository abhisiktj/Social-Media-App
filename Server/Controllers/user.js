

const expressAsyncHandler=require('express-async-handler');
const fs=require('fs').promises;
const fs2=require('fs');
const cloudinary=require('cloudinary');
const User=require('../Models/user');
const CustomError=require('../utils/customError');
const statusCodes=require('http-status-codes');
const validator=require('validator');

const registerUser=expressAsyncHandler(async(req,res)=>{

    const {username,email,password}=req.body;
    if(!username || !email || !password){
        throw new CustomError("Provide required fields",statusCodes.BAD_REQUEST);
    }
    const response=await fetch(`https://api.dicebear.com/6.x/pixel-art/png?seed=${username}`);
    const blob=await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
   await fs.writeFile(`./temp/${username}.png`, buffer);
  
   const result=await cloudinary.v2.uploader.upload(`./temp/${username}.png`,{
    folder:'AskIt/User',
    use_filename:true
})
fs2.unlinkSync(`./temp/${username}.png`)
const profilephoto=result.secure_url;

const user=await User.create({
    username,email,password,profilephoto
})
 

res.status(statusCodes.CREATED).json({
    success:true,
    data:user
})
 
});

const getUserNameAndPic=expressAsyncHandler(async(req,res)=>{
    const id=req.params.id;
    if(!validator.isMongoId(id)){
        throw new CustomError("Invalid id of user",statusCodes.BAD_REQUEST);
    }
    const user=await User.find({_id:id});
    if(!user){
        throw new CustomError("User not found",statusCodes.NOT_FOUND);
    }
console.log(user);
    res.status(statusCodes.OK).json({success:true,data:{
        username:user[0].username,
        profilephoto:user[0].profilephoto
    }});
})

module.exports={registerUser,getUserNameAndPic};