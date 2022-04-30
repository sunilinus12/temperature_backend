const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn.js");
app.use(express.json());

var jwt = require('jsonwebtoken');


const UserDetails = require('./models/User');





// home

app.get("/", (req, res) => {
    res.send("hello");
})

// creating a user
app.post("/register", async (req, res) => {
    // const user = new UserDetails(req.body);
    // user.save().then(()=>{
    //     res.send(`hello ${user.name} your data is saved in db`);
    // }).catch((e)=>{
    //     res.send("error: is "+e);
    // })

    try {

        const user = new UserDetails(req.body);

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
app.post('/login', async (req, res) => {
    try {

        
        const un =  req.body.username;
        const getOne = await UserDetails.findOne({'username':un});

        if(getOne){
            if(getOne.password===req.body.password){
                res.status(200).send(`${getOne.username} welcome`)
                console.log("login user is : "+getOne.username)

                const token = await jwt.sign({_id:getOne._id},"mynameisuniljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",{
                    expiresIn:"2 seconds"
                });
                console.log("\nid is :\t"+getOne._id+"\n token is "+token);

                const userverify = await jwt.verify(token,"mynameisuniljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                console.log(userverify);

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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
