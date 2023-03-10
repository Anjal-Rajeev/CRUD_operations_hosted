const express = require('express')
const router = express.Router()

const studentModel = require('../models/student')           // requiring student model


// create a student
router.post('/create-student', async (req, res) => {
    try {
        console.log(req.body.data)
        let data = req.body.data
        let newStudent = await new studentModel(data)       // checking the incoming data with student schema
        await newStudent.save()                             // saving the new data to db
        res.json({ "status": "success" }).status(200)

    } catch (error) {

        console.log("error from create-student ", error);
        res.json({ "status": "error" }).status(500)
    }

})


// edit an existing student
router.put('/edit-student/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body.data);
        let id = req.params.id
        let data = req.body.data
        await studentModel.findByIdAndUpdate({ _id: id }, data)  // updating given data 
        res.json({ "status": "success" }).status(200)

    } catch (error) {

        console.log("error from edit-student ", error);
        res.json({ "status": "error" }).status(500)
    }
})


// get all students
router.get('/all-students', async(req, res)=>{
    try {
        let data = await studentModel.find()                     // finds all data from db 
        res.send(data).status(200)
        console.log(data);

    } catch (error) {

        console.log("error from all-students ", error);
        res.json({ "status": "error" }).status(500) 
    }
    
})


// get single student
router.get('/single-student/:id', async(req, res)=>{
    try {
        let id = req.params.id
        let data = await studentModel.findOne({_id : id})         // finding single data from db using id that coming from url
        console.log(data);
        res.send(data).status(200)

    } catch (error) {

        console.log("error from single-student ", error);
        res.json({ "status": "error" }).status(500)
    }
})


// delete student
router.delete('/delete-student/:id', async(req, res)=>{
    try {
        let id = req.params.id
        await studentModel.findByIdAndDelete({_id:id})            // deleting single data from db by passing id
        res.json({ "status": "success" }).status(200)

    } catch (error) {

        console.log("error from delete-student ", error);
        res.json({ "status": "error" }).status(500)
    }
})



module.exports = router
