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
    imgName: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
        required: true
    }
});

module.exports = mongoose.model('Teacher', teacherLoginModelTemplate);