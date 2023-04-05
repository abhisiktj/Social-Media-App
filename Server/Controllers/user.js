

const expressAsyncHandler=require('express-async-handler');
const fs=require('fs').promises;
const fs2=require('fs');
const cloudinary=require('cloudinary');
const User=require('../Models/user');

const registerUser=expressAsyncHandler(async(req,res)=>{

    const {username,email,password}=req.body;
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
 

res.status(201).json({
    success:true,
})
 
});

module.exports={registerUser};