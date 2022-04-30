const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://linus_admin:linus@cluster0.ynl4j.mongodb.net/temperature",{
  
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection is successful for db.");
}).catch((e)=>{
    console.log("error:\t"+e);
})