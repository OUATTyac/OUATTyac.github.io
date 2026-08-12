import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, loginWithGoogle, logout as firebaseLogout } from '../lib/firebase';

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: () => Promise<void>;
  loginWithPasscode: (code: string) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = sessionStorage.getItem('yac_admin_session');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const adminObj: AdminUser = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || 'Yacouba OUATTARA',
          photoURL: currentUser.photoURL
        };
        setUser(adminObj);
        sessionStorage.setItem('yac_admin_session', JSON.stringify(adminObj));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const firebaseUser = await loginWithGoogle();
    if (firebaseUser) {
      const adminObj: AdminUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'Yacouba OUATTARA',
        photoURL: firebaseUser.photoURL
      };
      setUser(adminObj);
      sessionStorage.setItem('yac_admin_session', JSON.stringify(adminObj));
    }
  };

  const loginWithPasscode = (code: string): boolean => {
    const validCodes = ['2026', 'admin2026', 'ouattara2026', '0000', '1234'];
    if (validCodes.includes(code.trim())) {
      const adminObj: AdminUser = {
        uid: 'local-admin-yacouba',
        email: 'ouattara.yacouba03@ufhb.edu.ci',
        displayName: 'Yacouba OUATTARA (Admin)',
      };
      setUser(adminObj);
      sessionStorage.setItem('yac_admin_session', JSON.stringify(adminObj));
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
    } catch {
      // Ignore firebase logout error
    }
    sessionStorage.removeItem('yac_admin_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithPasscode, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

