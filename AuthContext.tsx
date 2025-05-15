import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/types';
import { mockUsers } from '../utils/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  ticketNumber: string;
  setTicketNumber: (ticket: string) => void;
  validateAndLogin: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string>('');

  const validateAndLogin = (): boolean => {
    // In a real app, this would check against a backend API
    if (ticketNumber.trim() === '') return false;
    
    const user = mockUsers.find((u) => u.ticketNumber === ticketNumber);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setTicketNumber('');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        ticketNumber,
        setTicketNumber,
        validateAndLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};