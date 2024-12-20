'use client';

import LoadingIndicator from '@/components/loading-indicator';
import {useError} from '@/hooks/use-error';
import {firebaseApp} from '@/lib/firebase-config';
import {debugLog} from '@/lib/log';
import {type User, getAuth, onAuthStateChanged} from 'firebase/auth';
import {type ReactNode, createContext, useEffect, useState} from 'react';

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const {setError} = useError();

  useEffect(() => console.debug(`Init Firebase App ${firebaseApp.name}`), []);

  useEffect(() => {
    const auth = getAuth();
    debugLog('Subscribe to auth state changes');
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser ?? null);
        debugLog('Auth state:', currentUser);
      },
      (err) => {
        setError('Firebase Auth State Error', err.message);
      },
    );

    return () => unsubscribe();
  }, [setError]);

  if (user === undefined) return <LoadingIndicator />;

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};
