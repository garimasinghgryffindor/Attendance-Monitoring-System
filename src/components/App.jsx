import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing components
import Form from "./Form";
import Header from "./Header";
import Footer from "./Footer";
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
                <Header/>
                <Form 
                    onLogin={loginTheUser}
                    setStudentID={loginStudentWithID}
                />
                <Footer/>
              </div>
            }
          ></Route>


          <Route
            path="/afterLogin"
            element={
               <div>
                    <Header/>
                    {isLogin && <Student studentID={studentID}/>}
                    {!isLogin && <h1>User not logged in !</h1>}
                    <Footer/>
              </div>
            }
          ></Route>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
