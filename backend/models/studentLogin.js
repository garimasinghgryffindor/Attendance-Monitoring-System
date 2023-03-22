const mongoose = require('mongoose');

const attendanceTemplate = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    presentOrNot: {
        type: Boolean,
        default: false
    }
});

const studentLoginModelTemplate = new mongoose.Schema({
    fName: {
        type: String,
        requird: true
    },
    lName: {
        type: String,
        required: true
    },
    studentID: {
        type: Number,
        require: true,
        unique: true
    },
    section: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true,
        match: [/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/ , 'Please enter a valid url!']
    },
    attendance: {
        type: [attendanceTemplate]
    }
});

module.exports = mongoose.model('Student' , studentLoginModelTemplate);