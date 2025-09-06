import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Leaf, Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'buyer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-trust-100 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-md w-full relative">
        <div className="card p-8 space-y-6 animate-fade-in-up">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-primary-600 rounded-2xl animate-float">
                <Leaf className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your trusted ecoSprout account</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-primary-50 to-trust-50 rounded-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-5 w-5 text-primary-600 animate-pulse-glow" />
              </div>
              <div className="text-sm font-medium text-gray-900">Secure Login</div>
              <div className="text-xs text-gray-600">256-bit encryption</div>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-heartbeat">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">Verified Users</div>
              <div className="text-xs text-gray-600">Trusted community</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in-up">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                Forgot password?
              </Link>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Login as
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <input
                    type="radio"
                    id="buyer"
                    name="role"
                    value="buyer"
                    checked={formData.role === 'buyer'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="buyer"
                    className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.role === 'buyer'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">Buyer</div>
                    <div className="text-xs text-gray-500 mt-1">Browse & buy</div>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="seller"
                    name="role"
                    value="seller"
                    checked={formData.role === 'seller'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="seller"
                    className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.role === 'seller'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">Seller</div>
                    <div className="text-xs text-gray-500 mt-1">List & sell</div>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="both"
                    name="role"
                    value="both"
                    checked={formData.role === 'both'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="both"
                    className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.role === 'both'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">Both</div>
                    <div className="text-xs text-gray-500 mt-1">Buy & sell</div>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="text-center p-3 bg-trust-50 rounded-lg">
            <p className="text-xs text-trust-700 mb-2">
              Demo Accounts (use any password):
            </p>
            <div className="text-xs text-trust-600 space-y-1">
              <p><strong>Buyer:</strong> buyer@test.com</p>
              <p><strong>Seller:</strong> seller@test.com</p>
              <p><strong>Both:</strong> admin@test.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;