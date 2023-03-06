import React, { useState } from "react";
import Form from "./Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

    const [isLogin , setUserLogin] = useState(false);

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
                />
              </div>
            }
          ></Route>


          <Route
            path="/afterLogin"
            element={
               <div>
                <h1>User has successfully logged in!!</h1>
              </div>
            }
          ></Route>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
