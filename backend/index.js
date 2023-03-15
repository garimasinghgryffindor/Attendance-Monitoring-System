const express = require("express");
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors');
dotenv.config();


// for multimedia
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// DB connectivity d
mongoose.connect(process.env.DATABASE_ACCESS);


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))


//import models
const studentLoginModelCopy = require("./models/studentLogin");
const teacherLoginModelCopy = require("./models/teacherLogin");
const sectionModelCopy = require('./models/sections');


app.post("/addStudent", function(req, res) {

    const newStudent = new studentLoginModelCopy({
        fName : req.body.fName,
        lName : req.body.lName,
        studentID : Number(req.body.studentID),
        section: req.body.section,
        password : req.body.password,
    });

    newStudent.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    });

});


app.post("/addTeacher", function(req, res) {

    const newTeacher = new teacherLoginModelCopy({
        fName : req.body.fName,
        lName : req.body.lName,
        teacherID : req.body.teacherID,
        imgUrl : req.body.imgUrl,
    });

    newTeacher.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    });

});

app.post("/section", function(req, res) {

    const newSection = new sectionModelCopy({
        section: req.body.section,
        timeTable: req.body.timeTable
    });

    newSection.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
});

app.post("/getTimeTable", function(req, res) {
    const section = req.body.section;
    sectionModelCopy.findOne({section: section}).then(val => {res.send(val); console.log(val);});
});


app.post("/loginStudent" , function(req, res) {
    studentLoginModelCopy.findOne({studentID: req.body.studentID, password: req.body.password}).then(val => {res.send(val); console.log(val);});
});

app.post("/getStudentData", function(req, res) {
    studentLoginModelCopy.findOne({studentID: req.body.studentID}).then(val => {res.send(val); console.log(val);});
});

app.listen(4000 , function() {
    console.log("Server successfully connected on port 4000.");
});


