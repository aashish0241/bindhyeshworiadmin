import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddEvent from "./components/addEvent/addEvent";
import AddTeacher from "./components/addTeacher/addTeacher";
import Admin from "./components/admin/Admin";
import Dashboard from "./components/admin/Dashboard";
import GetEvent from "./components/getEvent/getEvent";
import GetTeacher from "./components/getTeacher/getTeacher";
import Login from "./components/login/login";
import Logout from "./components/logout/logout";
import "./input.css";
import Register from "./components/login/register";
import AddStudy from "./components/addStudy/addStudy";
import StudyTable from "./components/addStudy/getStudy";
import Message from "./components/message/message";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in based on local storage
    const storedIsLoggedIn = localStorage.getItem("isLogin") === "true";
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleLogin = () => {
    // Your login logic here
    // For example, you might call an authentication API
    // and set isLoggedIn to true upon successful login.
    setIsLoggedIn(true);
    // Store the login state in local storage
    localStorage.setItem("isLogin", "true");
  };

  const handleLogout = () => {
    // Your logout logic here
    // For example, you might clear the authentication token
    // and set isLoggedIn to false.
    setIsLoggedIn(false);
    // Clear the login state from local storage
    localStorage.removeItem("isLogin");
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <>
            <Admin />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addteacher" element={<AddTeacher />} />
              <Route path="/teacher" element={<GetTeacher />} />
              <Route path="/addevent" element={<AddEvent />} />
              <Route path="/event" element={<GetEvent />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addstudy" element={<AddStudy />} />
              <Route path="/study" element={<StudyTable />} />
              <Route path="/message" element={<Message/>} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
