const mongoose=require('mongoose');

const answerSchema=mongoose.Schema({

    content:{
        type:String,
        required:[true,"Content field can't be empty"]
    },
    answeredBy:{
     type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
    },
    answeredTo:{
     type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question' 
    },
    
    likedBy:{
        type:[{ type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' }],
        default:[]
     },
},{timestamps:true})

module.exports=mongoose.model('Answer',answerSchema);