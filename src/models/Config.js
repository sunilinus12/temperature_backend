const mongoose = require('mongoose');
const config_schema = new mongoose.Schema({
    email:{
        type:String,
    },
    lastupdate:{
        type:Date,
        default:Date.now,
    },
    device_name:{
        type:String,

    }

});

const configDetails = new mongoose.model("config_table",config_schema);

module.exports = configDetails;