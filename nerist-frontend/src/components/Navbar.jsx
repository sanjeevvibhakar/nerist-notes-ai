import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-white/70 backdrop-blur-xl transition-all">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group transition-all duration-300 active:scale-95">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg group-hover:rotate-12 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900">
            NERIST<span className="text-blue-600">Portal</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link to="/" className={`hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600' : ''}`}>Library</Link>
            <Link to="/forum" className={`hover:text-blue-600 transition-colors ${isActive('/forum') ? 'text-blue-600' : ''}`}>Community</Link>
            <Link to="/about" className={`hover:text-blue-600 transition-colors ${isActive('/about') ? 'text-blue-600' : ''}`}>About</Link>
          </div>

          <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
            {token ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin" className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold hover:bg-yellow-100 transition-all border border-yellow-200">
                    Admin
                  </Link>
                )}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Contributor</span>
                  <span className="text-sm font-bold text-gray-800 leading-none">{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
