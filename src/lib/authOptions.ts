import bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prismadb';
import { randomUUID } from 'crypto';
import { put } from '@vercel/blob';

const prismaAdapter = PrismaAdapter(prisma);

//@ts-ignore
prismaAdapter.createUser = async (data) => {
  const uuid = randomUUID();
  const avatar = await fetch(data.image!).then((res) => res.blob());

  const imageUrl = await put('avatar/' + uuid + '.png', avatar, {
    access: 'public',
    addRandomSuffix: false,
  }).then((res) => res.url as string);

  data.image = imageUrl;
  return prisma.user.create({
    //@ts-ignore
    data: {
      ...data,
      id: uuid.toString(),
    },
  });
};

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.NEXTAUTH_SECRET,
  adapter: prismaAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // メールアドレス認証
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email;
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword!,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        id: token.id,
      };
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
