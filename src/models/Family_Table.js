const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    age: {

        type: String,   
        required: true,      
       
    }
    ,gender:{
        type:String,
        required:true,        
    },
    weight:{
        type:String,
        required:true,
    },
    photo_src:{
        type:String,
        required:true,
        
    },
    created_on:{
        // timestam: { type: Date, default: Date.now},
        type:Date,
        default:Date.now,
    },
    email:{
        type:String
    }

})

const familyDetails = new mongoose.model("family_detail",FamilySchema);
module.exports=familyDetails;
