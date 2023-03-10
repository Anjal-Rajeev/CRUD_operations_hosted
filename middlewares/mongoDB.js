const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL    

mongoose.connect(MONGO_URL)                // connecting database using connection string 
.then(()=>{
    console.log('---------mongoDB connected successfully---------');    
})
.catch((error)=>{
    console.log(error.message);
})