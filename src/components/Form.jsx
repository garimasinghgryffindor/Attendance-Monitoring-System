import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import axios from 'axios';

function Form(props) {
    let navigate = useNavigate();

    const [studentID, setStudentID] = useState();
    const [password, setPassword] = useState();

   function onSubmit(event) {

        event.preventDefault();

        let url = "http://localhost:4000/loginStudent"
        
        console.log(url);

        axios
        .post(url, {studentID: studentID, password: password})
        .then(function(res) {
            if(!res.data) {
                console.log("User not found!")
                setStudentID("");
                setPassword("");
                navigate('/');
            } else {
                console.log("Result DATA:");
                console.log(res.data);
                props.onLogin();
                navigate('/afterLogin');
            }
        })
        .catch(function(err) {
            console.log(err);
        });

    }

  function changeStudentID(event) {
    setStudentID(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }
 
  return (
    <div className="form-student">
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="inputStudentId">Student ID</label>
          <input
            type="text"
            name="studentID"
            onChange={changeStudentID}
            value={studentID}
            className="form-control"
            id="inputStudentId"
            placeholder="Enter Student ID"
            autoComplete="off"
            required
            autoFocus
          />
    
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            onChange={changePassword}
            value={password}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            autoComplete="nope"
            required
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Form;
