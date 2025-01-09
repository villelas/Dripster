import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/SignIn/Login';
import SetDripstername from './pages/SignIn/SetDripstername';
import AvatarCreation from './pages/SignIn/avatarcreation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/set-dripstername" element={<SetDripstername />} />
        <Route path="/avatarcreation" element={<AvatarCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
