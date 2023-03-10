const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = new express()    // creating an instance of express

const path = require('path');                // for hosting
app.use(express.static('./dist/frontend'));  // for hosting 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(logger('dev'))


require('dotenv').config()
require('./middlewares/mongoDB')    // database connection


const PORT = process.env.PORT || 3000   


const studentApi = require('./routes/studentApi')  // api calls with "/student" in it will be redirect to studentApi 
app.use('/api/student', studentApi) 
  


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
}); 


app.listen(PORT, ()=>{
    console.log(`---------Server running on PORT ${PORT}--------`);
}) 