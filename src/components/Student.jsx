import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Sketch from "react-p5";
import Webcam from 'react-webcam'

import TimeTable from "./TimeTable";
import "./Student.css"
import { set } from 'mongoose';


function Student(props) {
    let navigate = useNavigate();
    const studentID = props.studentID;
    const [section, setSection] = useState("");
    const [timeTable, setTimeTable] = useState([]);
    const [clicked, setClicked] = useState(false);
    //const [imageCaptured, setImageCaptured] = useState(false);
    const [picture, setPicture] = useState('')
    //const [verified, setVerified] = useState(false);
    const [subIndex, setSubIndex] = useState(0);


    const webcamRef = React.useRef(null);
    const videoConstraints = {
        width: 400,
        height: 400,
        facingMode: 'user',
    };


    function openTheWebCam() {
        setClicked(true);
    }

    function closeTheWebCam() {
        setClicked(false);
    }

    //function imageHasBeenCaptured() {
    //    setImageCaptured(true);
    //}


    //function imageHasNotBeenCaptured() {
    //    setImageCaptured(false);
    //}



    function setClickedIndex(idx) {
        setSubIndex(idx);
    }




    // marking attendance here
    async function markAttendance() {
        let url = "http://localhost:4000/markAttendance/"+studentID+"/"+timeTable[subIndex].startTime+"/"+timeTable[subIndex].endTime+"/"+timeTable[subIndex].subjectCode;
        console.log("MARKING ATTENDANCE URL");
        console.log(url);
        await axios.patch(url);
        console.log(props.studentID);
        console.log(props.startTime);
        console.log(props.endTime);
    }





    // facial verification function
    async function facialVerification() {


        // getting the original image
        //const url4="http://localhost:4000/getImage/"+studentID;

        //const originalImageUrl = await axios.get(url4);

        //console.log("Getting url in front end");
        //console.log(originalImageUrl.data);
        // getting the original image ends here



       // verification over here


       const data = picture;
       const options = {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
           },
           body: JSON.stringify(data)
       };

       const url5 = "http://localhost:5000/verify";

       axios.post(url5, {'image64':data, 'studentID':studentID.toString()}, options).then(function(res) {
           console.log("Match result");
           console.log(res.data);
           console.log(res.data.identified);
           if(res.data.identified==='true') {
                //setVerified(true);
                //console.log("I am here!!! ayyyyyyaaayyyyy");
                markAttendance();
           }
       });
       
    //   verified && 

   }



    const capture = React.useCallback(async () => {
        const image64 = await webcamRef.current.getScreenshot();
        console.log(image64);
        setPicture(image64);
        console.log(picture);
        
    });
    setInterval(capture, 100);



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
                setClickedIndex={setClickedIndex}
                openTheWebCam={openTheWebCam}
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
                <br/>
                <br/>
                <br/>
                {clicked && <div><Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    width={400}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                /><br/><button onClick={closeTheWebCam}>Close the Camera</button> 
                <br/><button onClick={async (e) => {e.preventDefault(); capture(); facialVerification();}} >Capture</button></div>}
                <br/><br/>
                {picture == '' ? null: <img src={picture}/>}
            </center>
        </div>

    </div>
  )
}

export default Student