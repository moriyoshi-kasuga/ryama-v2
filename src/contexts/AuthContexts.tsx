'use client';
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
import { supabase } from '@/lib/supabase';
import Loading from '@/components/loading';

export type Profile = {
  id: string;
  name: string;
  avatar_url: string;
};

export type AuthCtx = {
  session: Session | null;
  profile: Profile | null;
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
};

const AuthContext = createContext<AuthCtx>({} as AuthCtx);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  //session処理の実行中は画面を表示しないようにする
  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          const { data: profile }: { data: Profile | null } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (profile) {
            setProfile(profile);
          }
          setSession(session);
        }
        setLoading(false);
      }
    })();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') {
        setSession(null);
        setProfile(null);
      }
    });
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  };

  const google = async () => {
    return await supabase.auth.signInWithOAuth({ provider: 'google' });
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
    return await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          avatar_url:
            'https://ui-avatars.com/api/?background=random&size=96&format=png&name=' +
            name,
        },
      },
    });
  };

  const logout = async () => {
    return await supabase.auth.signOut();
  };

  const exposed: AuthCtx = {
    session,
    profile,
    loading,
    setLoading,
    signup,
    login,
    google,
    logout,
  };
  if (loading) {
    return (
      <div className="page-center">
        <Loading className="loading" title="Loading" />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
