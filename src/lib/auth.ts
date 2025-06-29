import {
  getServerSession
} from 'next-auth';

import { authOptions } from "@/config/next-auth";

export const getSession = () => {
  return getServerSession(authOptions);
};

export async function authenticateUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("Unauthorized user.");
  }

  return session.user;
}
