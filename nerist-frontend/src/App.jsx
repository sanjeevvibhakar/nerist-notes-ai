import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminUploadPage from './pages/AdminUploadPage';
import ForumPage from './pages/ForumPage';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<AdminUploadPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
