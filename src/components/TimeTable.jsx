import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

import formatAMPM from './formatAMPM'
import "./TimeTable.css"

function timeTable(props) {
    
    var bg = props.index %2 === 0 ? "lightgreen" : "lightcoral";
    var allowed = false;
    const currTime = new Date();
    if(new Date().getHours() >= new Date(props.startTime).getHours() && new Date().getHours() <= new Date(props.endTime).getHours()) {
        allowed = true;
    }

    var allowedStylings = allowed ? null : "grey";
    console.log(new Date());
    console.log(new Date(props.startTime))
    console.log(allowed);

  return (
    <div>
        <tr className="table-rows" style={{backgroundColor: bg}}>
            <th>{props.subjectCode}</th>
            <td>{formatAMPM(props.startTime)}</td>
            <td>{formatAMPM(props.endTime)}</td>
            <td>{allowed ? <a href="https://student.geu.ac.in/">Mark Attendance</a> : <Link style={{color: allowedStylings, textDecoration: "dashed"}} to="/afterLogin">Mark Attendance</Link>}</td>
        </tr>
    </div>
  )
}

export default timeTable