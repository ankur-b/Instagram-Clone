const jwt = require('jsonwebtoken')
const {JWT_SEC} = require('../config/keys')
const User = require('../models/user')
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"You must be logged in."})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SEC,async (err,payload)=>{
        if(err){
            return res.status(401).send({error:"You must be logged in."})
        }
        const { _id } = payload;
        const user = await User.findById(_id);
        req.user = user;
        next()
    })
}