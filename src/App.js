import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Header from "./components/other/Header";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        {<Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/complete-profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
