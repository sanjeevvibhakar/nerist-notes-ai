import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // In a real app, send user.accessToken to backend to verify and get JWT
      // For Hackathon speed, we'll simulate a login if Firebase succeeds

      console.log("Google User:", user);
      localStorage.setItem('token', "google-session-token"); // Mock token
      localStorage.setItem('username', user.displayName);
      localStorage.setItem('isAdmin', "false"); // Google users are students by default

      navigate('/');
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Google Sign-In failed. Please check your Firebase config.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('auth/login/', {
        username,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      // Check if admin
      try {
        const statusRes = await axios.get('auth/status/', {
          headers: { Authorization: `Token ${token}` }
        });
        const isAdmin = statusRes.data.is_admin;
        localStorage.setItem('isAdmin', isAdmin);
        localStorage.setItem('user', JSON.stringify({ username, isAdmin })); // For legacy checks
      } catch (err) {
        console.error("Failed to check status", err);
      }

      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Nerist Portal</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition font-semibold"
          >
            Login
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Use <b>student / student123</b> or <b>admin / admin123</b>
        </p>
      </div>
    </div>
  );
};

export default Login;