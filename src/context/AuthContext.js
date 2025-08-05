import React, { createContext, useContext, useEffect, useState } from 'react';
import commonHttp from '../service/commonHttp';

const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { token, profile }
  const [loading, setLoading] = useState(true);

  // Load token & fetch profile on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUserProfile(token);
    else setLoading(false);
  }, []);

  // 🔹 Fetch profile using token
  const fetchUserProfile = async (token) => {
    try {
      const res = await commonHttp.get('user/profile'); // token is auto-attached
      setUser({ token, profile: res.data.user });
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login function
  const updateOnlogin = async (token) => {
    localStorage.setItem('token', token);
    await fetchUserProfile(token);
  };

  // 🔹 Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateOnlogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
