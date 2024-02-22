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
// import NotFound from "./components/NotFound"; // Import your NotFound component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in based on local storage
    const storedIsLoggedIn = localStorage.getItem("isLogin") === "true";
    setIsLoggedIn(storedIsLoggedIn);

    // Check if the screen size is mobile
    const isMobileScreen = window.innerWidth <= 768; // Adjust as per your needs
    setIsMobile(isMobileScreen);

    // Event listener for window resize to update isMobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust as per your needs
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = () => {
    // Your login logic here
    // For example, you might call an authentication API
    // and set isLoggedIn to true upon successful login.
    setIsLoggedIn(true);
    // Store the login state in local storage
    localStorage.setItem("isLogin", "true");
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
              <Route path="/message" element={<Message />} />
              {/* <Route path="*" element={<NotFound />} /> Wildcard route */}
            </Routes>
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  onLogin={handleLogin}
                  isMobile={isMobile} // Pass isMobile prop to Login component
                />
              }
            />
            {/* <Route path="*" element={<NotFound />} /> Wildcard route */}
          </Routes>
        )}
      </BrowserRouter>
      {isMobile &&  (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-75 rounded-lg p-8">
            <p className="text-white text-center">For better performance, please use this application on a desktop.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
