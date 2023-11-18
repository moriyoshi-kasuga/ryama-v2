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
import { getURL } from '@/utils/utils';

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }: { data: Profile | null }) => {
            setProfile(profile);
          });
      }
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setProfile(null);
        return;
      }
      supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
        .then(({ data: profile }: { data: Profile | null }) => {
          setProfile(profile);
        });
    });
    return () => {
      subscription.unsubscribe();
    };
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
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL('workspace'),
      },
    });
  };

  const signup = ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    return supabase.auth.signUp({
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
  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
