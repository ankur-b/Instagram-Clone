const express = require('express')
const mongoose = require('mongoose')
const mongouri = require('./db')
const app = express()
mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useCreateIndex:true
})
mongoose.connection.on('connected',()=>{
    console.log("Dtabase Connected");
})
mongoose.connection.on('error',(err)=>{
    console.log("Error",err);
})
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});