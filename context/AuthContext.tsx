import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // In a real app, we would validate the token with api.auth.me()
          // For this mock, we'll just restore the user if we have one saved or use mock
          const savedUser = localStorage.getItem('user_data');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
             // Fallback to a mock fetch if no local data but token exists
             // const userData = await api.auth.me();
             // setUser(userData);
          }
        } catch (error) {
          console.error("Auth init failed", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.auth.login(email, password);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.auth.register(data);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.auth.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};