import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary text-xl font-bold">SentiFeedback</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Home
            </Link>
            
            {!isAuthenticated ? (
              <>
                <Link
                  to="/school/login"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    location.pathname.includes('/school') 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  School
                </Link>
                <Link
                  to="/college/login"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    location.pathname.includes('/college') 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  College
                </Link>
                <Link
                  to="/company"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    location.pathname.includes('/company') 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Company
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname === '/' 
                  ? 'border-primary text-primary bg-primary-light bg-opacity-10' 
                  : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {!isAuthenticated ? (
              <>
                <Link
                  to="/school/login"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location.pathname.includes('/school') 
                      ? 'border-primary text-primary bg-primary-light bg-opacity-10' 
                      : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  School
                </Link>
                <Link
                  to="/college/login"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location.pathname.includes('/college') 
                      ? 'border-primary text-primary bg-primary-light bg-opacity-10' 
                      : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  College
                </Link>
                <Link
                  to="/company"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location.pathname.includes('/company') 
                      ? 'border-primary text-primary bg-primary-light bg-opacity-10' 
                      : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Company
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;