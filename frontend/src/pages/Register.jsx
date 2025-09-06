import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Leaf, Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';

const Register = () => {
  const { register } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      alert('Registration failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };


  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-primary-600 rounded-2xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Join ecoSprout</h1>
              <p className="text-gray-600 mt-2">Start your sustainable marketplace journey</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3 p-4 bg-gradient-to-r from-primary-50 to-trust-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <span className="text-sm text-gray-700">Build your trust score by trading</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <span className="text-sm text-gray-700">Earn eco points and badges</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <span className="text-sm text-gray-700">Connect with verified sellers</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-4">
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
                    className={`block p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.role === 'buyer'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Buyer</div>
                    <div className="text-sm text-gray-500 mt-1">Browse & purchase items</div>
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
                    className={`block p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.role === 'seller'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Seller</div>
                    <div className="text-sm text-gray-500 mt-1">List & sell items</div>
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
                    className={`block p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      formData.role === 'both'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Both</div>
                    <div className="text-sm text-gray-500 mt-1">Buy & sell items</div>
                  </label>
                </div>
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
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength === 1 ? 'bg-red-500' :
                          passwordStrength === 2 ? 'bg-orange-500' :
                          passwordStrength === 3 ? 'bg-trust-500' :
                          passwordStrength === 4 ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;