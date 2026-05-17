// src/contexts/AuthContext.tsx
import { User } from '@supabase/supabase-js';
import { AuthService } from '../features/auth/services/authService';
import { UserLoginEntity } from '../features/auth/models/UserLoginEntity';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRegistrationEntity } from '../features/auth/models/UserRegistrationEntity';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: UserLoginEntity) => Promise<void>;
  register: (credentials: UserRegistrationEntity) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const authService = new AuthService(); // Instanciado fora para não recriar

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Idealmente, você adicionaria um useEffect aqui para checar se já existe uma sessão ativa no Supabase ao abrir o app

  const login = async (credentials: UserLoginEntity) => {
    setIsLoading(true);
    // Usando o método público que você criou!
    const loggedUser = await authService.authenticateUser(credentials); 
    if (loggedUser) {
      setUser(loggedUser);
    }
    setIsLoading(false);
  };

  const register = async (userData: UserRegistrationEntity): Promise<boolean> => {
    setIsLoading(true);
    
    // Chama o seu service
    await authService.registerUser(userData); 
    
    setIsLoading(false);
    // Como o seu AuthService lida com os alertas de erro internamente, 
    // podemos retornar true para avisar a UI que o fluxo terminou.
    // (Num cenário ideal, o authService retornaria uma confirmação de sucesso ou erro)
    return true; 
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);