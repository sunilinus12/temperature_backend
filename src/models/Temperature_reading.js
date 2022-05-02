const mongoose = require("mongoose");

const Temperature_Schema = new mongoose.Schema({
  
    
    created_on:{
        // timestam: { type: Date, default: Date.now},
        type:Date,
        default:Date.now,
    },
    skin_temperature:{
        type:String,
        
    },
    core_temperature:{
        type:String,

    },
    Device_name:{
        type:String,
    }


})

const temperatureReadings = new mongoose.model("family_details",Temperature_Schema);
module.exports=temperatureReadings;
