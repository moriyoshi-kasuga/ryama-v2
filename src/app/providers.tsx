'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useContext, createContext, useEffect, useState } from 'react';
import {
  AuthError,
  AuthResponse,
  AuthTokenResponse,
  OAuthResponse,
  Session,
} from '@supabase/supabase-js';
import { getSiteURL } from '@/utils/utils';
import { Profiles } from '@/lib/schema';
import { supabase } from '@/lib/supabase';

export type AuthCtx = {
  session: Session | null;
  profile: Profiles | null;
  loading: boolean;
  signin: ({
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
  signOut: () => Promise<{ error: AuthError | null }>;
};

const AuthContext = createContext<AuthCtx>({} as AuthCtx);
const useAuth = () => useContext(AuthContext);

const Providers = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profiles | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }: { data: Profiles | null }) => {
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
        .then(({ data: profile }: { data: Profiles | null }) => {
          setProfile(profile);
        });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signin = async ({ email, password }: { email: string; password: string }) => {
    return await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  };

  const google = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getSiteURL('workspace'),
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

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  const exposed: AuthCtx = {
    session,
    profile,
    loading,
    signup,
    signin,
    google,
    signOut,
  };
  return (
    <ThemeProvider attribute='class'>
      <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
    </ThemeProvider>
  );
};

export { useAuth, Providers };
