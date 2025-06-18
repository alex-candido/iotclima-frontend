import {
  type NextAuthOptions
} from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { login, refreshAccessToken } from '@/actions/auth-actions';
import { API_MESSAGES } from '@/data/messages';
import { UserGroup } from '@/types/next-auth.d';

export const authOptions: NextAuthOptions ={
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
              id: String(authResponse.user.pk),
              email: authResponse.user.email,
              name: authResponse.user.username,
              username: authResponse.user.username,
              groupNames: authResponse.user.group_names.map(g => g as UserGroup),
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
        const customUser = user as {
          accessToken: string;
          refreshToken: string;
          username: string;
          groupNames: UserGroup[];
          id: string | number;
          email: string;
          name: string;
        };

        token.accessToken = customUser.accessToken;
        token.refreshToken = customUser.refreshToken;
        token.user = {
          id: customUser.id,
          email: customUser.email,
          username: customUser.username,
          groupNames: customUser.groupNames,
        };
        token.groupNames = customUser.groupNames;
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
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  debug: process.env.NODE_ENV === 'development',
};


