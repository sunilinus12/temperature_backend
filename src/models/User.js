const mongoose = require("mongoose");
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    email: {

        type: String,   
        required: true,

        unique:true,
        
       
       
    }
    ,username:{
        type:String,
        required:true,
       
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
        
    }
})

const UserDetails = new mongoose.model("UserDetail",UserSchema);
module.exports=UserDetails;