import React , {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { redirect } from "react-router-dom";

import formatAMPM from './formatAMPM'
import "./TimeTable.css"

function TimeTable(props) {
    
    const [allowedLocation , setAllowedLocation] = useState(false);

    var bg = props.index %2 === 0 ? "lightgreen" : "lightcoral";
    var allowed = false;



    // marking attendance here
    async function markAttendance() {
        let url = "http://localhost:4000/markAttendance/"+props.studentID+"/"+props.startTime+"/"+props.endTime+"/"+props.subjectCode;
        console.log(url);
        await axios.patch(url);
        console.log(props.studentID);
        console.log(props.startTime);
        console.log(props.endTime);
    }


    // getting the location of the user and comparing it with the location of the univerisity
    navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        var GraphicLatitude = 30.27;
        var GraphicLongitude = 77.99;

        if(Math.abs(latitude - GraphicLatitude) < 0.01 && Math.abs(longitude - GraphicLongitude) < 0.01) {
            setAllowedLocation(true);
        }
    });

    //{
    //    graphic era coordinates=> 30.26  77.99
    //}

    

    if(new Date().getHours() >= new Date(props.startTime).getHours() && new Date().getHours() <= new Date(props.endTime).getHours()) {
        allowed = true;
    }

    var allowedStylings = allowed && allowedLocation? null : "grey";



  return (
    <div>
        <tr className="table-rows" style={{backgroundColor: bg}}>
            <th>{props.subjectCode}</th>
            <td>{formatAMPM(props.startTime)}</td>
            <td>{formatAMPM(props.endTime)}</td>
            <td>{allowed && allowedLocation ? <p className="markingLink" onClick={markAttendance}>Mark Attendance</p> : <Link style={{color: allowedStylings, textDecoration: "dashed"}} to="/afterLogin">Mark Attendance</Link>}</td>
            <td>{props.marked ? <img className="marked" src="Images/check.png" /> : <img className="marked" src="Images/close.png"/>}</td>
        </tr>
    </div>
  );

}

export default TimeTable;