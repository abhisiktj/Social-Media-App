
const mongoose =require('mongoose');

const questionSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'Question Requires a title']
    },
    desc:{
        type:String,
    },
    askedBy:{ 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required:true
   },

   likes:{
    type:Number,
    default:0
   },
   
   answeredBY:
    [{ type: Schema.Types.ObjectId, 
        ref: 'User' }]
   ,
},{timestamps:true})


module.exports=mongoose.model(questionSchema,Question);