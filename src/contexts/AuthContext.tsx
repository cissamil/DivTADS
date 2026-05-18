// src/contexts/AuthContext.tsx
import { User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from '../features/auth/models/UserData';
import { UserLoginEntity } from '../features/auth/models/UserLoginEntity';
import { UserRegistrationEntity } from '../features/auth/models/UserRegistrationEntity';
import { AuthService } from '../features/auth/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  userData: UserData | null;
  login: (credentials: UserLoginEntity) => Promise<void>;
  register: (credentials: UserRegistrationEntity) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const authService = new AuthService(); // Instanciado fora para não recriar

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    const checkActiveSession = async () => {
      

      const {data: {session}} = await authService.getCurrentSession();

      if(session?.user){
        setUser(session.user);
        
        const profile = await authService.getUserProfile(session.user.id);

        if(profile){
          setUserData(profile);
        }
      }

      setIsLoading(false);
    }
    checkActiveSession();
  }, [])

  // Idealmente, você adicionaria um useEffect aqui para checar se já existe uma sessão ativa no Supabase ao abrir o app

  const login = async (credentials: UserLoginEntity) => {
    setIsLoading(true);
    // Usando o método público que você criou!
    const loggedUser = await authService.authenticateUser(credentials); 
    if (loggedUser) {
      setUser(loggedUser);

      const profile = await authService.getUserProfile(loggedUser.id);

      if(profile){
        setUserData(profile);
      }
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


  const logout = async () =>{
    setIsLoading(true);

    await authService.signOut();

    setUser(null);
    setUserData(null);
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, userData, isLoading, login, register, logout,  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);