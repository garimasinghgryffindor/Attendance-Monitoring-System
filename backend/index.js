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


app.post("/addStudent", function(req, res) {

    const newStudent = new studentLoginModelCopy({
        fName : req.body.fName,
        lName : req.body.lName,
        studentID : Number(req.body.studentID),
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


//app.post("/addTeacher", upload.single("file"), async function(req, res) {

//    try {

//        const

//        let obj = {

//            img: {
//                data: req.img.buffer,
//                contentType: req.img.mimetype
//            },
//            imgName: req.body.imgName
//        };

//    }
//    catch (error) {
//        console.log(error);
//        res.status(500).send("Server Error");
//    }

//    const newTeacher = new teacherLoginModelCopy({
//        fName : req.body.fName,
//        lName : req.body.lName,
//        studentID : Number(req.body.studentID),
//        password : req.body.password,
//    });

//    newStudent.save()
//    .then(data => {
//        res.json(data)
//    })
//    .catch(error => {
//        res.json(error)
//    });

//});


app.post("/loginStudent" , function(req, res) {
    studentLoginModelCopy.findOne({studentID: req.body.studentID, password: req.body.password}).then(val => {res.send(val); console.log(val);});
});

app.listen(4000 , function() {
    console.log("Server successfully connected on port 4000.");
});


