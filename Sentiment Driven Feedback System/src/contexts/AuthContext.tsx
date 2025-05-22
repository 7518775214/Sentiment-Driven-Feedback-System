import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
type UserType = 'student' | 'admin' | null;
type InstitutionType = 'school' | 'college' | null;

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  institutionId: string;
  institutionName: string;
  userType: UserType;
  institutionType: InstitutionType;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  institutionType: InstitutionType;
  login: (username: string, password: string, userType: UserType, institutionType: InstitutionType, institutionId: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  resetPassword: (username: string, mobileNumber: string) => Promise<boolean>;
  verifyResetCode: (code: string) => Promise<boolean>;
  setNewPassword: (password: string, confirmPassword: string) => Promise<boolean>;
}

// Mock data storage
let mockUsers: Array<{
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  institutionId: string;
  institutionName: string;
  userType: UserType;
  institutionType: InstitutionType;
}> = [
  {
    id: '1',
    username: 'student1',
    password: 'password',
    fullName: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '1234567890',
    institutionId: '1',
    institutionName: 'Springfield High School',
    userType: 'student',
    institutionType: 'school',
  },
  {
    id: '2',
    username: 'college_student1',
    password: 'password',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    mobileNumber: '0987654321',
    institutionId: '3',
    institutionName: 'State University',
    userType: 'student',
    institutionType: 'college',
  },
  {
    id: '101',
    username: 'admin1',
    password: 'admin123',
    fullName: 'Admin User',
    email: 'admin@school.com',
    mobileNumber: '5555555555',
    institutionId: '1',
    institutionName: 'Springfield High School',
    userType: 'admin',
    institutionType: 'school',
  },
  {
    id: '102',
    username: 'college_admin1',
    password: 'admin123',
    fullName: 'College Admin',
    email: 'admin@college.com',
    mobileNumber: '6666666666',
    institutionId: '3',
    institutionName: 'State University',
    userType: 'admin',
    institutionType: 'college',
  },
];

export const mockInstitutions = [
  { id: '1', name: 'Springfield High School', type: 'school' },
  { id: '2', name: 'Riverside Academy', type: 'school' },
  { id: '3', name: 'State University', type: 'college' },
  { id: '4', name: 'City College', type: 'college' },
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resetUsername, setResetUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('sentiFeedbackUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    username: string,
    password: string,
    userType: UserType,
    institutionType: InstitutionType,
    institutionId: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) =>
            u.username === username &&
            u.password === password &&
            u.userType === userType &&
            u.institutionType === institutionType &&
            (institutionId === '' || u.institutionId === institutionId)
        );

        if (foundUser) {
          const { password: _, mobileNumber: __, ...userWithoutSensitiveData } = foundUser;
          setUser(userWithoutSensitiveData);
          setIsAuthenticated(true);
          localStorage.setItem('sentiFeedbackUser', JSON.stringify(userWithoutSensitiveData));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if username already exists
        const existingUser = mockUsers.find(
          (u) => u.username === userData.username
        );

        if (existingUser) {
          resolve(false);
          return;
        }

        // Create new user
        const newUser = {
          id: String(mockUsers.length + 1),
          ...userData,
          mobileNumber: '', // Add required fields
        };

        mockUsers.push(newUser);
        resolve(true);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sentiFeedbackUser');
    navigate('/');
  };

  const resetPassword = async (username: string, mobileNumber: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.username === username && u.mobileNumber === mobileNumber
        );

        if (foundUser) {
          setResetUsername(username);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const verifyResetCode = async (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code.length === 6 && /^\d+$/.test(code)) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const setNewPassword = async (password: string, confirmPassword: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === confirmPassword && resetUsername) {
          const userIndex = mockUsers.findIndex(u => u.username === resetUsername);
          if (userIndex !== -1) {
            mockUsers[userIndex].password = password;
            setResetUsername(null);
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const value = {
    user,
    isAuthenticated,
    userType: user?.userType || null,
    institutionType: user?.institutionType || null,
    login,
    register,
    logout,
    resetPassword,
    verifyResetCode,
    setNewPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};