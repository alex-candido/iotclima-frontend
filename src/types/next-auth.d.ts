// src/types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string | null; 
    refreshToken?: string | null; 
    user?: {
      id?: string | number;
      email?: string;
      username?: string;
      groupNames?: string[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken?: string | null; 
    refreshToken?: string | null; 
    id?: string | number;
    email?: string;
    username?: string;
    groupNames?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string | null; 
    refreshToken?: string | null; 
    groupNames?: string[];
    user?: {
      id?: string | number;
      email?: string;
      username?: string;
      groupNames?: string[];
    };
  }
}