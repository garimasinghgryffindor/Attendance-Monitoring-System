const mongoose = require("mongoose");

const timeTableSchemaTemplate = new mongoose.Schema({
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
    teacherID: {
        type: String,
        required: true
    }
});

const dayWiseTimeTableSchemaTemplate = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    dayTimeTable: {
        type: [timeTableSchemaTemplate],
        required: true
    }
});

const sectionSchemaTemplate = new mongoose.Schema({
    section: {
        type: String,
        required: true
    },
    timeTable: {
        type: [dayWiseTimeTableSchemaTemplate],
        required: true
    }
});

module.exports = mongoose.model('Section', sectionSchemaTemplate);