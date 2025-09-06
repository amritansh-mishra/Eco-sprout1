import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/authService.js';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated and get current user
    const initializeUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          const response = await authService.getCurrentUser();
          if (response.success) {
            setUser(response.user);
          }
        } catch (error) {
          console.error('Failed to get current user:', error);
          setError(error.message);
          // Token might be invalid, clear it
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    initializeUser();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      if (response.success) {
        setUser(response.user);
        return { success: true, user: response.user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.register(userData);
      
      if (response.success) {
        setUser(response.user);
        return { success: true, user: response.user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  const updateUser = async (updates) => {
    try {
      setError(null);
      
      const response = await authService.updateProfile(updates);
      
      if (response.success) {
        setUser(response.user);
        return { success: true, user: response.user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      updateUser, 
      isLoading, 
      error,
      clearError,
      isAuthenticated: !!user
    }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserProvider;