import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@exampl.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // メールアドレス認証
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL as string}/api/signin`,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        );

        const res = await response.json();
        const user = res.user;
        if (response.ok && res.user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session: ({ session, token }) => {
      token.accessToken;
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
};
