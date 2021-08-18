const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {MONGOURI} = require('./config/keys')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')


mongoose.connect(MONGOURI,{
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
app.use(userRoutes)

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log('App listening on port 5000!');
});