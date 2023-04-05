const mongoose=require('mongoose');

const userSchema=mongoose.Schema({

    email:{
        type:String,
        required:[true,"email field is empty"],
        unique:true
    },
    username:{
        type:String,
        required:[true,"username field is empty"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password field is empty"]
    },
    profilephoto:{
        type:String,
        required:[true,"Profile photo"]
    }

},{timestamps:true})



module.exports=mongoose.model("User",userSchema);