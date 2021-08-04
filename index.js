const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
const mongouri = require('./db')

const app = express()

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')

mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("Dtabase Connected");
})
mongoose.connection.on('error',(err)=>{
    console.log("Error",err);
})
app.use(express.json());
//app.use(cors())
app.use(authRoutes);
app.use(postRoutes)
app.listen(5000, () => {
    console.log('App listening on port 5000!');
});