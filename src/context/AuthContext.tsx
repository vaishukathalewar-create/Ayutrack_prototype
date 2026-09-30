import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Language, UserProfile } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string;
  userRole: UserRole;
  userEmail: string;
  userProfile: UserProfile;
  login: (role: UserRole, email?: string, name?: string, remember?: boolean) => void;
  signup: (profile: UserProfile, password?: string) => boolean;
  updateProfile: (profile: Partial<UserProfile>) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  authView: 'login' | 'signup';
  setAuthView: (view: 'login' | 'signup') => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
}

export const ROLE_DEFAULT_USERS: Record<UserRole, UserProfile> = {
  'Research Head': {
    name: 'Prof. (Dr.) Balram Bhargava',
    email: 'research.head@aiia.gov.in',
    mobile: '+91 98101 23456',
    organization: 'All India Institute of Ayurveda (AIIA), New Delhi',
    designation: 'Director & Chief Research Scientist',
    role: 'Research Head',
    language: 'en'
  },
  'Doctor / Principal Investigator': {
    name: 'Prof. (Dr.) Tanuja Nesari',
    email: 'pi.tanuja@aiia.gov.in',
    mobile: '+91 98202 34567',
    organization: 'All India Institute of Ayurveda (AIIA), New Delhi',
    designation: 'Lead Principal Investigator (Clinical Research)',
    role: 'Doctor / Principal Investigator',
    language: 'en'
  },
  'Data Entry Operator': {
    name: 'Sunil Verma (CRC-II)',
    email: 'deo.sunil@trials.aiia.gov.in',
    mobile: '+91 98303 45678',
    organization: 'Clinical Trials Centre, AIIA',
    designation: 'Clinical Research Coordinator - Grade II',
    role: 'Data Entry Operator',
    language: 'en'
  },
  'Ayush Officer': {
    name: 'Dr. Rajesh Kotecha',
    email: 'officer.national@ayush.gov.in',
    mobile: '+91 98404 56789',
    organization: 'Ministry of Ayush, Government of India',
    designation: 'National Trial Oversight Officer',
    role: 'Ayush Officer',
    language: 'en'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    return localStorage.getItem('ayutrack_remember_me') === 'true';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('ayutrack_auth');
    return storedAuth === 'true';
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    const storedRole = localStorage.getItem('ayutrack_role') as UserRole;
    return storedRole || 'Research Head';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const storedCurrent = localStorage.getItem('ayutrack_current_user');
    if (storedCurrent) {
      try {
        return JSON.parse(storedCurrent);
      } catch (e) {
        // fallback
      }
    }
    const storedProfile = localStorage.getItem('ayutrack_user_profile');
    if (storedProfile) {
      try {
        return JSON.parse(storedProfile);
      } catch (e) {
        // fallback
      }
    }
    const storedRole = (localStorage.getItem('ayutrack_role') as UserRole) || 'Research Head';
    return ROLE_DEFAULT_USERS[storedRole] || ROLE_DEFAULT_USERS['Research Head'];
  });

  const currentUser = userProfile.name;
  const userEmail = userProfile.email;

  useEffect(() => {
    localStorage.setItem('ayutrack_auth', String(isAuthenticated));
    localStorage.setItem('ayutrack_role', userRole);
    localStorage.setItem('ayutrack_user_profile', JSON.stringify(userProfile));
    localStorage.setItem('ayutrack_current_user', JSON.stringify(userProfile));
    localStorage.setItem('ayutrack_remember_me', String(rememberMe));
    if (userProfile.language) {
      localStorage.setItem('ayutrack_language', userProfile.language);
      localStorage.setItem('ayutrack_lang', userProfile.language);
    }
  }, [isAuthenticated, userRole, userProfile, rememberMe]);

  const login = (role: UserRole, email?: string, name?: string, remember: boolean = true) => {
    // Check if user exists in ayutrack_users
    let existingProfile: UserProfile | undefined;
    const usersStr = localStorage.getItem('ayutrack_users');
    if (usersStr && email) {
      try {
        const users: UserProfile[] = JSON.parse(usersStr);
        existingProfile = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      } catch (e) {}
    }

    const base = ROLE_DEFAULT_USERS[role] || ROLE_DEFAULT_USERS['Research Head'];
    const updated: UserProfile = existingProfile ? {
      ...existingProfile,
      role: role || existingProfile.role
    } : {
      ...base,
      email: email || base.email,
      name: name || base.name,
      role
    };

    setUserRole(updated.role);
    setUserProfile(updated);
    setIsAuthenticated(true);
    setRememberMe(remember);

    // Sync preferredLanguage to ayutrack_language
    if (updated.language) {
      localStorage.setItem('ayutrack_language', updated.language);
      localStorage.setItem('ayutrack_lang', updated.language);
    }
  };

  const signup = (profile: UserProfile): boolean => {
    setUserRole(profile.role);
    setUserProfile(profile);

    // Save to ayutrack_users list
    const existingUsersStr = localStorage.getItem('ayutrack_users') || localStorage.getItem('ayutrack_registered_users');
    let users: UserProfile[] = [];
    if (existingUsersStr) {
      try { users = JSON.parse(existingUsersStr); } catch (e) {}
    }
    const filtered = users.filter(u => u.email.toLowerCase() !== profile.email.toLowerCase());
    filtered.push(profile);
    localStorage.setItem('ayutrack_users', JSON.stringify(filtered));
    localStorage.setItem('ayutrack_registered_users', JSON.stringify(filtered));

    if (profile.language) {
      localStorage.setItem('ayutrack_language', profile.language);
      localStorage.setItem('ayutrack_lang', profile.language);
    }
    return true;
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...partial };
      if (partial.language) {
        localStorage.setItem('ayutrack_language', partial.language);
        localStorage.setItem('ayutrack_lang', partial.language);
      }
      return updated;
    });
  };

  const switchRole = (role: UserRole) => {
    setUserRole(role);
    const newProfile = {
      ...ROLE_DEFAULT_USERS[role],
      language: userProfile.language
    };
    setUserProfile(newProfile);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthView('login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        userRole,
        userEmail,
        userProfile,
        login,
        signup,
        updateProfile,
        switchRole,
        logout,
        authView,
        setAuthView,
        rememberMe,
        setRememberMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
