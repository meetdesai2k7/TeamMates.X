import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skills: string[];
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  interests: string[];
  bio?: string;
  joinedTeams: string[];
  createdOpportunities: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  skills: string[];
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  interests: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demonstration
const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning'],
  experience: 'intermediate',
  interests: ['Web Development', 'AI/ML', 'Startups'],
  bio: 'Passionate developer looking to collaborate on innovative projects.',
  joinedTeams: ['opp-2'],
  createdOpportunities: ['opp-1'],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      skills: data.skills,
      experience: data.experience,
      interests: data.interests,
      joinedTeams: [],
      createdOpportunities: [],
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
