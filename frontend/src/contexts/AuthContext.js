import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../utils/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('journeyq_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, serviceType) => {
    try {
      // Mock login - in real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const userData = {
        ...mockUser,
        email,
        serviceType
      };
      
      setUser(userData);
      localStorage.setItem('journeyq_user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (formData) => {
    try {
      // Mock signup - in real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        serviceType: formData.serviceType,
        businessName: formData.businessName,
        phone: formData.phone,
        address: formData.address,
        profileImage: null,
        rating: 0,
        totalReviews: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      setUser(userData);
      localStorage.setItem('journeyq_user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('journeyq_user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('journeyq_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};