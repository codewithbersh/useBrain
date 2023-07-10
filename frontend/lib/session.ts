import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSession } from "next-auth/react";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export async function getCurrentUserClient() {
  const session = await getSession();
  return session?.user;
}
