const mongoose = require('mongoose');

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
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student' , studentLoginModelTemplate);