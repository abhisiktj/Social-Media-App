const expressAsyncHandler = require("express-async-handler");
const fs = require("fs").promises;
const fs2 = require("fs");
const cloudinary = require("cloudinary");
const User = require("../Models/user");
const CustomError = require("../utils/customError");
const statusCodes = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator=require('validator');

const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new CustomError("Provide required fields", statusCodes.BAD_REQUEST);
  }
  const response = await fetch(
    `https://api.dicebear.com/6.x/pixel-art/png?seed=${username}`
  );
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(`./temp/${username}.png`, buffer);

  const result = await cloudinary.v2.uploader.upload(`./temp/${username}.png`, {
    folder: "AskIt/User",
    use_filename: true,
  });
  fs2.unlinkSync(`./temp/${username}.png`);
  const profilephoto = result.secure_url;

  //Generating Hashed Password
  const salting = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salting);

  await User.create({
    username,
    email,
    password:hashPassword,
    profilephoto,
  });

  const saved_user = await User.findOne({ username });

  const token = jwt.sign(
    { userId: saved_user._id },
    process.env.JWT_SECRETKEY,
    { expiresIn: "30d" }
  );

  res.status(statusCodes.CREATED).json({
    success: true,
    data: {
      user: {
        id:saved_user._id,
        username:saved_user.username,
        email:saved_user.email,
        profilephoto:saved_user.profilephoto
      },
      token: token,
    },
  });
});

const getUserNameAndPic=expressAsyncHandler(async(req,res)=>{
    const id=req.params.id;
    if(!validator.isMongoId(id)){
        throw new CustomError("Invalid id of user",statusCodes.BAD_REQUEST);
    }
    const user=await User.find({_id:id});
    if(user.length===0){
        throw new CustomError("User not found",statusCodes.NOT_FOUND);
    }
  
    
    res.status(statusCodes.OK).json({success:true,data:{
        username:user[0].username,
        profilephoto:user[0].profilephoto
    }});
})

const getUserById=expressAsyncHandler(async(req,res)=>{
  const id=req.params.id;
  if(!validator.isMongoId(id)){
      throw new CustomError("Invalid id of user",statusCodes.BAD_REQUEST);
  }

  const user=await User.find({_id:id});
    if(!user){
        throw new CustomError("User not found for given id",statusCodes.NOT_FOUND);
    }
   
    res.status(statusCodes.CREATED).json({
      success: true,
      data: {
        user: {
          id:user[0]._id,
          username:user[0].username,
          email:user[0].email,
          profilephoto:user[0].profilephoto
        },
      },
    });
  });

const getDetailsForSearch=expressAsyncHandler(async(req,res)=>{
    const searchText=req.body.searchText;

   console.log(searchText);

   if(searchText===""){
    res.status(statusCodes.OK).json({
      success:true,
      data:[]
    })
   }
   else{
    const users=await User.find({}).select("-password");

    if(!users){
      res.status(statusCodes.OK).json({
        success:true,
        data:[]
      })
    }
    else{
    const filterdUsers=[...users].filter((user)=>{

      return user?.username?.includes(searchText);
    })
    res.status(statusCodes.OK).json({success:true,data:filterdUsers});
  }
  }
})
const deleteAll=expressAsyncHandler(async(req,res)=>{ 
  const users=await User.deleteMany({});
  res.send("Deleted");
})



module.exports={
  registerUser,
  getUserNameAndPic,
  getUserById,
  deleteAll,
  getDetailsForSearch
};