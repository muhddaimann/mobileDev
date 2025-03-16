import React, { createContext, useState, ReactNode } from 'react';
import { AuthUser, AuthContextType, authenticateUser } from '@/contexts/api/auth';
import { useRouter } from 'expo-router';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  const login = (username: string, password: string) => {
    const authenticatedUser = authenticateUser(username, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      router.push('/(tabs)');
    }
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
