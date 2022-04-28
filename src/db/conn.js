const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/temperature",{
  
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection is successful for db.");
}).catch((e)=>{
    console.log("error:\t"+e);
})