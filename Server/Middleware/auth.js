const CustomError=require("../utils/customError.js");

const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const expressAsyncHandler=require('express-async-handler');
const statusCodes=require('http-status-codes');


const auth = expressAsyncHandler(async (req, res, next) => {

  
  const { authorization } = req.headers;

  if (!authorization || ! authorization.startsWith("Bearer")) {
    throw new CustomError("Authorization  Header Incorrect",statusCodes.BAD_REQUEST);
  }
    
      const token = authorization.split(" ")[1];
      try{
      const { userId } = jwt.verify(token, process.env.JWT_SECRETKEY);
      req.user = await User.findById(userId)
      //console.log(req.user);
      next();
      }
      catch(error){
        throw new CustomError("Unauthorized",statusCodes.UNAUTHORIZED);
      }

  });

module.exports=auth;