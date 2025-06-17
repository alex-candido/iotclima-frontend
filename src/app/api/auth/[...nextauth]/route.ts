// src/app/api/auth/[...nextauth]/route.ts

import { login, refreshAccessToken } from '@/actions/auth-actions';
import { API_MESSAGES } from '@/constants/messages';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null; 
        }

        try {
          const authResponse = await login({ 
            email: credentials.email, 
            password: credentials.password 
          });

          if (authResponse.access && authResponse.refresh && authResponse.user) {
            return {
              id: String(authResponse.user.id),
              email: authResponse.user.email,
              username: authResponse.user.username,
              groupNames: authResponse.user.group_names,
              accessToken: authResponse.access,
              refreshToken: authResponse.refresh,
            };
          } else {
            return null;
          }
        } catch (error: any) {
          console.error(API_MESSAGES.AUTH.LOGIN_FAILED_API_CLIENT, error.response?.data || error.message);
          return null; 
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.user = user;
        token.groupNames = (user as any).groupNames;
      }

      if (!token.accessToken && token.refreshToken) {
        console.log(API_MESSAGES.AUTH.ATTEMPT_REFRESH_TOKEN);
        try {
          const refreshedTokens = await refreshAccessToken(token.refreshToken as string);
          token.accessToken = refreshedTokens.access; 
          console.log(API_MESSAGES.AUTH.TOKEN_REFRESH_SUCCESS);
        } catch (refreshError) {
          console.error(API_MESSAGES.AUTH.TOKEN_REFRESH_FAILED, refreshError);
          token.accessToken = null; 
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
