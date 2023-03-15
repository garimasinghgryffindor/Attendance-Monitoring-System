import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing components
import Form from "./Form";
import Student from "./Student";


function App() {

    const [isLogin , setUserLogin] = useState(false);

    const [studentID, setStudentID] = useState("");

    function loginStudentWithID(id) {
        setStudentID(id);
    }

    function loginTheUser() {
        setUserLogin(true);
    }

  return (
    <Router>
      <div className="app">
        <Routes>


          <Route
            path="/"
            element={
              <div>
                <Form 
                    onLogin={loginTheUser}
                    setStudentID={loginStudentWithID}
                />
              </div>
            }
          ></Route>


          <Route
            path="/afterLogin"
            element={
               <div>
                    {isLogin && <Student studentID={studentID}/>}
                    {!isLogin && <h1>User not logged in !</h1>}
              </div>
            }
          ></Route>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
