import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('ecosprout_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const userWithDefaults = {
      ...userData,
      trustScore: userData.trustScore || 85,
      isVerified: userData.isVerified || false,
      ecoPoints: userData.ecoPoints || 1250,
      co2Saved: userData.co2Saved || 45.2,
      waterSaved: userData.waterSaved || 1200,
      itemsSold: userData.itemsSold || 12,
      badges: userData.badges || ['eco-warrior', 'trusted-seller']
    };
    setUser(userWithDefaults);
    localStorage.setItem('ecosprout_user', JSON.stringify(userWithDefaults));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecosprout_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('ecosprout_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};