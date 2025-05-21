
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define user roles
export type UserRole = 'admin' | 'staff' | 'public';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  division?: string;
}

// Auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Auth context interface
interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo (replace with API calls in production)
const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@dsk.gov.lk', role: 'admin' },
  { id: '2', name: 'Staff Member', email: 'staff@dsk.gov.lk', role: 'staff', department: 'Administrative Division' },
  { id: '3', name: 'S.L.Farhana', email: 'public@dsk.gov.lk', role: 'public' },
];

// Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('dsk_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('dsk_user');
        setState({ ...state, isLoading: false });
      }
    } else {
      setState({ ...state, isLoading: false });
    }
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call with 1s delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd validate credentials with your backend
    const user = MOCK_USERS.find(u => u.email === email && u.role === role);
    
    if (user) {
      // Store user in local storage for session persistence
      localStorage.setItem('dsk_user', JSON.stringify(user));
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('dsk_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
