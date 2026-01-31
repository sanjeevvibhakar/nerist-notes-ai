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
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md w-full bg-white/80 p-8 rounded-2xl shadow-2xl shadow-blue-900/10 z-10 border border-white/50 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Access your NERIST study materials & AI tools</p>
        </div>

        {error && <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl mb-6 text-center text-sm font-medium">{error}</div>}

        <div className="space-y-5">
          <div>
            <label className="text-gray-700 text-xs font-bold ml-1 mb-1 block uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-gray-700 text-xs font-bold ml-1 mb-1 block uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition transform hover:-translate-y-0.5 font-bold shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Sign In
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-700 border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition transform hover:-translate-y-0.5 font-bold flex items-center justify-center gap-3 shadow-sm hover:shadow-md active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-8 text-xs text-center text-gray-400 font-bold">
          Nerist Study Portal • Powered by Gemini AI
        </p>
      </div>
    </div>
  );
};


export default Login;