import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './pages/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import Dashboard2 from './pages/Dashboard2';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/device/:id" element={<Dashboard2 />} />
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}

export default App;
