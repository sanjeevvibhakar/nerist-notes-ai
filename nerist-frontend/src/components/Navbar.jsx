import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // We check existing of token to determine if logging in
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide hover:text-gray-200 transition">
          NERIST<span className="text-yellow-400">Portal</span>
          <span className="ml-2 text-xs font-normal bg-blue-900 px-2 py-0.5 rounded opacity-80">v1.0</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Library</Link>
          <Link to="/forum" className="hover:text-yellow-300 transition">Forum</Link>

          {token ? (
            // Logged In State
            <div className="flex items-center gap-4 border-l pl-4 border-blue-600">
              {isAdmin && (
                <Link to="/admin" className="text-green-300 hover:text-green-100 transition">
                  Dashboard
                </Link>
              )}
              <span className="text-gray-300 font-light">Hi, {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs transition"
              >
                Logout
              </button>
            </div>
          ) : (
            // Logged Out State
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-white text-gray-200 transition">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;