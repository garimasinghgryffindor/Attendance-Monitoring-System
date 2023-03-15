const mongoose = require('mongoose');

const teacherLoginModelTemplate = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    teacherID: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
        required: true,
        match: [/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/ , 'Please enter a valid url!']
    }
});

module.exports = mongoose.model('Teacher', teacherLoginModelTemplate);