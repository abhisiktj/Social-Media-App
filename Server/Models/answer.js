const mongoose=require('mongoose');

const answerSchema=mongoose.Schema({

    content:{
        type:String,
        required:[true,'']
    },
    answeredBy:{
     type: Schema.Types.ObjectId, 
    ref: 'User' 
    },
    answeredTo:{
     type: Schema.Types.ObjectId, 
    ref: 'Question' 
    }
})

module.exports=mongoose.model('Answer',answerSchema);