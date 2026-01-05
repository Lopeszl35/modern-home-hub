import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id_usuario: string;
  nome: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user para desenvolvimento
const MOCK_USER: User = {
  id_usuario: 'user-123',
  nome: 'Usuário Teste',
  email: 'usuario@teste.com',
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carregamento do usuário
    // TODO: Integrar com autenticação real
    const loadUser = async () => {
      try {
        setLoading(true);
        // Por enquanto, usar mock user
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(MOCK_USER);
      } catch (err) {
        setError('Erro ao carregar usuário');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}
