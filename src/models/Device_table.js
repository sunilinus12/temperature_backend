const mongoose = require("mongoose");

const device_schema = new mongoose.Schema({
    device_name:{
        type:String,

    },
    email:{
        type:String,
    }

});

const Device_table = new mongoose.model("device_table",device_schema);

module.exports =Device_table;

