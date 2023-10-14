import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes

import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Route to the Login component */}
          <Route path="/signup" element={<SignUp />} /> {/* Route to the SignUp component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
