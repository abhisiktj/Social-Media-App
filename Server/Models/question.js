
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
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required:true
   },

   likes:{
    type:Number,
    default:0
   },

   answeredBy:{
    type:[{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }],
    default:[]
    }
   ,
},{timestamps:true})


module.exports=mongoose.model("Question",questionSchema);