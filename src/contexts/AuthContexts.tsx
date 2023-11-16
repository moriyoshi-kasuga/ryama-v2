'use client';
import { supabase } from '@/lib/supabase';
import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react';
import {
  AuthError,
  AuthResponse,
  AuthTokenResponse,
  OAuthResponse,
  Session,
} from '@supabase/supabase-js';

type AuthCtx = {
  session: Session | null;
  loading: boolean;
  setLoading: any;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthTokenResponse>;
  signup: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  google: () => Promise<OAuthResponse>;
  logout: () => Promise<{ error: AuthError | null }>;
} | null;

const AuthContext = createContext<AuthCtx>(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = supabase.auth;

  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  //session処理の実行中は画面を表示しないようにする
  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session },
      } = await auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
        setLoading(false);
      }
    })();
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') {
        setSession(null);
      }
    });
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return await auth.signInWithPassword({ email: email, password: password });
  };

  const google = async () => {
    return await auth.signInWithOAuth({ provider: 'google' });
  };

  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    return await auth.signUp({
      email: email,
      password: password,
      options: { data: { name: name } },
    });
  };

  const logout = async () => {
    return await auth.signOut();
  };

  const exposed: AuthCtx = {
    session,
    loading,
    setLoading,
    signup,
    login,
    google,
    logout,
  };
  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <Loading />
  //     </div>
  //   );
  // }
  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
