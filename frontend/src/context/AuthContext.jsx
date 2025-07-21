import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('sehatsathi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login with backend
  const login = async (email, password) => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('sehatsathi_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Connection failed' };
    }
  };

  // Signup with backend
  const signup = async (name, email, password) => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(`${apiBase}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('sehatsathi_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Connection failed' };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sehatsathi_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};