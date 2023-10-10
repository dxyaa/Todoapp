import React, { createContext, useContext, useState } from 'react';
type LoginUser = {
  username: string;
  password: string;
  todos: never[]; // Adjust this based on your requirements
};
type usercontextType = {
  user: LoginUser | null;
  login: (userData: LoginUser) => void;
  logout: () => void;
};

const usercontext = createContext<usercontextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(usercontext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode; // Define children as React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginUser | null>(null);

  const login = (userData: LoginUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <usercontext.Provider value={{ user, login, logout }}>
      {children}
    </usercontext.Provider>
  );
};
