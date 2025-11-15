import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './UIComponents';
import { Menu, X, BookOpen, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-600 text-white p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                <BookOpen size={20} strokeWidth={3} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                Tutorly
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/instructors" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Find Tutors
              </Link>
              <Link to="/subjects" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Subjects
              </Link>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="text-sm font-medium text-gray-900 hover:text-primary-600">
                    Dashboard
                  </Link>
                  <div className="h-8 w-[1px] bg-gray-200"></div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-gray-900">{user?.first_name}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{user?.role}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                      {user?.first_name[0]}
                    </div>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1">
                    <LogOut size={16} className="rotate-180" /> Login
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/instructors" className="block px-3 py-3 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-primary-600">
                Find Tutors
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-3 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-primary-600">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 rounded-md hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link to="/login">
                    <Button variant="outline" className="w-full justify-center">Log in</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full justify-center">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
               <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="bg-primary-600 text-white p-1 rounded">
                  <BookOpen size={16} strokeWidth={3} />
                </div>
                <span className="text-lg font-bold text-gray-900">Tutorly</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                Empowering learners worldwide to master new skills with the help of expert tutors.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-primary-600">English Tutors</Link></li>
                <li><Link to="#" className="hover:text-primary-600">Spanish Tutors</Link></li>
                <li><Link to="#" className="hover:text-primary-600">Math Tutors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-primary-600">Who we are</Link></li>
                <li><Link to="#" className="hover:text-primary-600">How it works</Link></li>
                <li><Link to="#" className="hover:text-primary-600">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#" className="hover:text-primary-600">Help Center</Link></li>
                <li><Link to="#" className="hover:text-primary-600">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-primary-600">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Tutorly Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;