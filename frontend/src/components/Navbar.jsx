import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { 
  Leaf, 
  User, 
  Menu, 
  X, 
  Plus,
  LogOut,
  Shield,
  Award
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };


  return (
    <nav className="fixed top-0 w-full glass-effect z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary-600 rounded-lg group-hover:bg-primary-700 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Leaf className="h-6 w-6 text-white group-hover:animate-wiggle" />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">ecoSprout</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && (user.role === 'seller' || user.role === 'both') && (
              <Link to="/create" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 group">
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>Sell</span>
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden sm:flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ₹{getTrustColor(user.trustScore)} text-white text-xs`}>
                        <Shield className="h-3 w-3" />
                        <span>{user.trustScore}</span>
                      </div>
                      {user.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ₹{getTrustColor(user.trustScore)} text-white text-xs`}>
                              <Shield className="h-3 w-3" />
                              <span>Trust: {user.trustScore}</span>
                            </div>
                            {user.isVerified && (
                              <span className="text-blue-600 text-xs flex items-center">
                                <span className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-white mr-1">✓</span>
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Award className="h-4 w-4 text-gray-500" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            {user && (user.role === 'seller' || user.role === 'both') && (
              <Link
                to="/create"
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell Item
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;