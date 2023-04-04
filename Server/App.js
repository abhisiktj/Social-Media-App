require('dotenv').config();
const express=require('express');
const connect  = require('./Db/connect')


const app=express();
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