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
import { Profiles } from '@/lib/schema';
import { useRouter } from 'next/navigation';
import { createClientSupabase } from '@/lib/supabase/client';
import { getSiteURL } from '@/utils/utils';
import { Toaster } from 'react-hot-toast';

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
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profiles | null>(null);

  const supabase = createClientSupabase();

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
      if (_event === 'SIGNED_OUT') {
        setProfile(null);
        router.push('/signin');
        return;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        redirectTo: getSiteURL('auth/callback?next=/workspace'),
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
    <ThemeProvider attribute='class' enableSystem={true}>
      <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
      <Toaster />
    </ThemeProvider>
  );
};

export { useAuth, Providers };
