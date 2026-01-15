import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminUploadPage from './pages/AdminUploadPage';
import ForumPage from './pages/ForumPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar'; // Assuming Navbar should be global or per page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<AdminUploadPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
