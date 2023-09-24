const express =require('express')
const connectToMongodb = require('./config/db.js');
const app =express()
connectToMongodb();

app.listen(8000,()=>{
    console.log('server is running on 8000')
})