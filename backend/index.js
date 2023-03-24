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
const axios = require('axios')

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
        imgUrl : req.body.imgUrl,
    });

    newStudent.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    });

});

app.get("/getAllStudents", function(req, res) {
    studentLoginModelCopy.find().then(val => res.send(val));
});


app.get("/getAttendance/:studentID/:startTime/:endTime/:subjectCode", function(req, res) {
    studentLoginModelCopy.findOne({studentID: req.params.studentID, "attendance" : {$elemMatch : {startTime: req.params.startTime, endTime: req.params.endTime, subjectCode: req.params.subjectCode}}}).then(val => {res.send(val); console.log(val);});
}); 


app.get("/getImage/:studentID", function(req, res) {
    studentLoginModelCopy.findOne({studentID: req.params.studentID}).then(val=> {res.send(val.imgUrl); console.log(val.imgUrl);});
});


app.patch("/markTodaysAttendance", function(req, res) {
    var students;
    
    const url = "http://localhost:4000/getAllStudents";

    axios.get(url)
    .then(function(result) {
        students = result.data;
        const currDate = new Date("2023-03-06");
        const currDay = currDate.getDay();

        let day;
        switch(currDay) {
            case 0: day = "Sunday";
            break;
            case 1: day = "Monday";
            break;
            case 2: day = "Tuesday";
            break;
            case 3: day = "Wednesday";
            break;
            case 4: day = "Thursday";
            break;
            case 5: day = "Friday";
            break;
            case 6: day = "Saturday";
            break;
            default: day = "";
        }

        for(let i = 0 ; i<students.length ; i++) {
            const studentSection = students[i].section;
            const studentID = students[i].studentID;
            const url2 = "http://localhost:4000/getTimeTable";

            axios.post(url2, {section: studentSection})
            .then(function(res2) {
                var result2 = res2.data.timeTable;
                result2 = result2.filter(function(x) {
                    return x.day === day;
                });
                result2 = result2[0];
                result2 = result2.dayTimeTable;

                for(let j=0 ; j<result2.length ; j++) {
                    var startTime = result2[j].startTime;
                    startTime = new Date(startTime).setDate(currDate.getDate());
                    startTime = new Date(startTime).setMonth(currDate.getMonth());
                    startTime = new Date(startTime).setFullYear(currDate.getFullYear());
                    var endTime = result2[j].endTime;
                    endTime = new Date(endTime).setDate(currDate.getDate());
                    endTime = new Date(endTime).setMonth(currDate.getMonth());
                    endTime = new Date(endTime).setFullYear(currDate.getFullYear());

                    //console.log(startTime);
                    //console.log(endTime);

                    var subjectCode = result2[j].subjectCode;
                    studentLoginModelCopy.updateOne(
                        {studentID: studentID, },
                        {$push: {"attendance" : {"startTime": startTime, "endTime": endTime, "subjectCode": subjectCode, "presentOrNot": false}}},
                        {upsert: true}
                    )
                    .catch(error => {
                        res.json(error)
                    });
                }

            });
        }

        //console.log(students);
        //res.send(students);
    });
    res.send("Done updating the attendance!!");

});


app.patch("/markAttendance/:studentID/:startTime/:endTime/:subjectCode", function(req, res) {

    studentLoginModelCopy.updateOne(
        {studentID: req.params.studentID, attendance : {$elemMatch : {startTime: req.params.startTime, endTime: req.params.endTime, subjectCode: req.params.subjectCode}}}, 
        {$set: {"attendance.$.presentOrNot": true}}
    ).then(val => {res.send(val);})
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

app.post("/getStudentTimeTable", function(req, res) {
    const studentID = req.body.studentID;
    //2019-03-10T08:00:00
    const currDate = new Date("2023-03-06T00:00:00");
    var nextDay = new Date(currDate);
    nextDay = nextDay.setDate(nextDay.getDate() + 1);

    studentLoginModelCopy.find(
        {
            studentID: studentID,
            attendance: {$elemMatch: {startTime: {$gt: currDate}, endTime: {$lt: nextDay}}}
        }
    ).then(result => {
        result = result[0];
        res.send(result.attendance);
        console.log(result.attendance);
    });
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






