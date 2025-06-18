// src/types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

export enum UserGroup {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  OPERATOR = "OPERATOR",
  OWNER = "OWNER",
  VIEWER = "VIEWER",
}

declare module "next-auth" {
  interface Session {
    accessToken?: string | null;
    refreshToken?: string | null;
    user?: {
      id?: string | number;
      email?: string;
      username?: string;
      groupNames?: UserGroup[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken?: string | null;
    refreshToken?: string | null;
    id?: string | number;
    email?: string;
    username?: string;
    groupNames?: UserGroup[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string | null;
    refreshToken?: string | null;
    groupNames?: UserGroup[];
    user?: {
      id?: string | number;
      email?: string;
      username?: string;
      groupNames?: UserGroup[];
    };
  }
}
