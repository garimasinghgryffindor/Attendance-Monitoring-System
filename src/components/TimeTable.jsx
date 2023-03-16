import React , {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

import formatAMPM from './formatAMPM'
import "./TimeTable.css"

function TimeTable(props) {
    
    const [allowedLocation , setAllowedLocation] = useState(false);

    var bg = props.index %2 === 0 ? "lightgreen" : "lightcoral";
    var allowed = false;


    // getting the location of the user and comparing it with the location of the univerisity
    navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        var GraphicLatitude = 30.26;
        var GraphicLongitude = 77.99;

        if(Math.abs(latitude - GraphicLatitude) < 0.01 && Math.abs(longitude - GraphicLongitude) < 0.01) {
            setAllowedLocation(true);
            console.log("I am not getting triggered!");
        }
    });


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
            <td>{allowed && allowedLocation ? <a href="https://student.geu.ac.in/">Mark Attendance</a> : <Link style={{color: allowedStylings, textDecoration: "dashed"}} to="/afterLogin">Mark Attendance</Link>}</td>
        </tr>
    </div>
  )
}

export default TimeTable;