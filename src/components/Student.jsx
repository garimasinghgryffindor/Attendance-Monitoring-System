import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import TimeTable from "./TimeTable";
import "./Student.css"


function Student(props) {
    let navigate = useNavigate();
    const studentID = props.studentID;
    const [section, setSection] = useState("");
    const [timeTable, setTimeTable] = useState([]);

    const url = "http://localhost:4000/getStudentData";

    axios
    .post(url, {studentID: props.studentID})
    .then(function(res) {
        setSection(res.data.section);
    })



    function createTimeTable(tt, index) {
        return (
            <TimeTable 
                studentID={studentID}
                subjectCode={tt.subjectCode}
                startTime={tt.startTime}
                endTime={tt.endTime}
                marked={tt.presentOrNot}
                index={index}
            />
        );
    }


    //creating the current day time table for the current section


    const currDate = new Date("2023-03-06")

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


    const url2 = "http://localhost:4000/getStudentTimeTable";
    var result;

    axios
    .post(url2, {studentID: studentID})
    .then(function(res) {
        //setTimeTable(res.data.timeTable);
        //res = res[currDay];
        result = res.data

        //console.log("HERE ARE THE RESULTS.");
        //console.log(result);
        setTimeTable(result);
        //console.log(result);
    });



  return (
    <div>
        <h1>User has successfully logged in!!</h1>
        <h2>{studentID}</h2>
        <h3>Section {section}</h3>
        <br/>
        <br/>

        <div>
            <center>
                <table className="timeTable" cellpadding="50px">
                    {timeTable.map(createTimeTable)}
                </table>
            </center>
        </div>

    </div>
  )
}

export default Student