const { send } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const UserDetails = require("../models/User");
const auth = async (req,res,next)=>{

    const token =req.header('auth-token');
        if(!token) return res.status(401).send("Access-Denied");
        try{
            const verified = jwt.verify(token,"mynameisuniljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
           req.user = verified;

            next();
            
           
    
        }
        catch(e){
            res.status(400).send("Invalid Token");
        } 

}
module.exports = auth;
