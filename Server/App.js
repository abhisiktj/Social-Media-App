require('dotenv').config();
const express=require('express');
const connect  = require('./Db/connect')
const cloudinary=require('cloudinary');

const {notFound, errorHandler}=require('./Middleware/error');
const userRouter=require('./Routes/user');

const app=express();
app.use(express.json());
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

app.use('/user',userRouter);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000 
const start=async()=>{
    try{
         await connect(process.env.MONGO_URI);
         app.listen(port,()=>{
            console.log(`Server Started on ${port}`);

         })
    }
    catch(error){
        console.log(error);
    }
}
start();