const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn.js");
app.use(express.json());
const bycrypt = require("bcryptjs");
const auth = require("./middleware/verify");
var jwt = require('jsonwebtoken');


const UserDetails = require('./models/User');
const configDetails = require("./models/Config");
const Device_table = require("./models/Device_table");
const temperatureReadings = require("./models/Temperature_reading");
const familyDetails = require("./models/Family_Table")
const bcrypt = require("bcryptjs/dist/bcrypt");





// home

app.get("/", (req, res) => {
    res.send("hello");
})

// creating a user
app.post("/register", async (req, res) => {


    try {

        // password hashing
        const salt =await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password,salt);
        const user = new UserDetails({
            name:req.body.name,
            email:req.body.email,
            username:req.body.username,
            password:hashpassword,
            confirmpassword:hashpassword,
            phone_no:req.body.phone_no
        });

        const sub_std = await user.save();
        res.status(201).send("data saved");
        console.log(sub_std);

    } catch (error) {

        res.status(400).send(error.message);
        console.log(error);
    }

})
// find all
app.get('/users', async (req, res) => {

    try {

        const getAll = await UserDetails.find({});
        res.status(201).send(getAll);
        console.log(getAll);

    } catch (error) {

        res.status(400).send(error.message);

    }

})

//get login
app.post('/login',auth,async (req, res) => {
    try {

        
        const un =  req.body.username;
        const getOne = await UserDetails.findOne({'username':un});
        
        if(getOne){
          
            const validpass= await bcrypt.compare(req.body.password,getOne.password);
            if(!validpass){
                res.status(200).send('invalid details');
            }
            else{
                res.send("login user is : "+getOne.username)
                const token = await jwt.sign({_id:getOne._id},"mynameisuniljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                console.log("\nid is :\t"+getOne._id+"\n token is "+token);
                // res.header('auth-token',token).send(token);
                // console.log(req.user);
            }
        }
        else{
            res.status(200).send("username or password invalid");
        }
        // console.log(getOne.email);

        // res.send(getOne);



    } catch (error) {
        res.status(400).send(error.message);
    }
})

// find by id students data
app.get('/users/:id',async (req,res)=>{
    try {
        const _id = req.params.id;
        const data = await UserDetails.findById(_id);
        console.log(data);
        if(!data){
            return res.status(404).send("issues");

        }
        else{
            res.send(data);
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// update using id
app.patch('/users/:id',async(req,res)=>{
    try {

        const _id = req.params.id;
        const up = await UserDetails.findByIdAndUpdate(_id,req.body,{
            new:true
        });
      
        res.send(up);
    } catch (error) {
        res.status(400).send("invlaid id");
    }
})
// delete any elements
app.delete('/users/:id',async(req,res)=>{
    try {
        
        const del = await UserDetails.findByIdAndDelete(req.params.id);
        if(!del){
            return res.status(400).send("server error");
        }
        else{
            res.send(`${del.name} deleted successfully`);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})



//#################################### routes for config table


//add
app.post("/config", async(req,res)=>{

    try {
       
        const user = new configDetails({
           email:req.body.email,
           lastupdate:req.body.lastupdate,
           device_name:req.body.device_name

        });

        const sub_std = await user.save();
        res.status(201).send("data saved in config");
        console.log(sub_std);

    } catch (error) {

        res.status(400).send(error.message);
        console.log(error);
    }

})
// app.get('/config/:email',async (req,res)=>{
//     try {
//         const _id = req.params.email;
//         const data = await configDetails.find({"email":_id});
//         console.log(data);
//         if(!data){
//             return res.status(404).send("issues");

//         }
//         else{
//             res.send(data);
//         }
        
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// })
//delete
app.delete('/config/:email',async(req,res)=>{
    try {
        
        const email = req.params.email;
        const del = await configDetails.deleteOne({"email":email});
        if(!del){
            return res.status(400).send("server error");
        }
        else{
            res.send(` deleted successfully`);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})

// update 
app.patch('/config/:email',async(req,res)=>{
    try {

        const email = req.params.email;
        const up = await configDetails.findOneAndUpdate(email,req.body,{
            new:true
        });
      
        res.send(up);
    } catch (error) {
        res.status(400).send("invlaid id");
    }
})


//#################################### routes for 


//add
app.post("/device", async(req,res)=>{

    try {
       
        const user = new Device_table({
           email:req.body.email,
           device_name:req.body.device_name,
          

        });

        const sub_std = await user.save();
        res.status(201).send("data saved in device table");
        console.log(sub_std);

    } catch (error) {

        res.status(400).send(error.message);
        console.log(error);
    }

})


// update 
app.patch('/device/:email',async(req,res)=>{
    try {

        const email = req.params.email;
        const up = await Device_table.findOneAndUpdate(email,req.body,{
            new:true
        });
      
        res.send(up);
    } catch (error) {
        res.status(400).send("invlaid id");
    }
})


//delete
app.delete('/device/:email',async(req,res)=>{
    try {
        
        const email = req.params.email;
        const del = await Device_table.deleteOne({"email":email});
        if(!del){
            return res.status(400).send("server error");
        }
        else{
            res.send(` deleted successfully`);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})



//#################################### routes for temperature


//add
app.post("/temperature", async(req,res)=>{

    try {
       
        const user = new temperatureReadings({
           skin_temperature:req.body.skin_temperature,
           core_temperature:req.body.core_temperature,
           Device_name:req.body.Device_name,
           email:req.body.email

        });

        const sub_std = await user.save();
        res.status(201).send("data saved in temperature table");
        console.log(sub_std);

    } catch (error) {

        res.status(400).send(error.message);
        console.log(error);
    }

})



// update 
app.patch('/temperature/:email',async(req,res)=>{
    try {

        const email = req.params.email;
        const up = await temperatureReadings.findOneAndUpdate(email,req.body,{
            new:true
        });
      
        res.send(up);
    } catch (error) {
        res.status(400).send("invlaid id");
    }
})


//delete
app.delete('/temperature/:email',async(req,res)=>{
    try {
        
        const email = req.params.email;
        const del = await temperatureReadings.deleteOne({"email":email});
        if(!del){
            return res.status(400).send("server error");
        }
        else{
            res.send(` deleted successfully`);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})




//#################################### routes for family members


//add
app.post("/family", async(req,res)=>{

    try {
       
        const user = new familyDetails({
           name:req.body.name,
           age:req.body.age,
           gender:req.body.gender,
           weight:req.body.weight,
           photo_src:req.body.photo_src,
           email:req.body.email,

         
        });

 
        const sub_std = await user.save();
        res.status(201).send("data saved in family table");
        console.log(sub_std);

    } catch (error) {

        res.status(400).send(error.message);
        console.log(error);
    }

})


// update 
app.patch('/family/:email',async(req,res)=>{
    try {

        const email = req.params.email;
        const up = await familyDetails.findOneAndUpdate(email,req.body,{
            new:true
        });
      
        res.send(up);
    } catch (error) {
        res.status(400).send("invlaid id");
    }
})


//delete
app.delete('/family/:email',async(req,res)=>{
    try {
        
        const email = req.params.email;
        const del = await familyDetails.deleteOne({"email":email});
        if(!del){
            return res.status(400).send("server error");
        }
        else{
            res.send(` deleted successfully`);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
