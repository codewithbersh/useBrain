import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAccessToken, getUserInfo } from "@/lib/auth-api";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        const { id_token } = account;

        if (id_token) {
          const accessToken = await getAccessToken(id_token);
          account.accessToken = accessToken;
          if (accessToken) {
            const info = await getUserInfo(accessToken);
            account.info = {
              id: info.id,
              email: info.email,
              firstName: info.first_name,
              lastName: info.last_name,
              nickname: info.nickname,
            };
          }
        }

        return true;
      }

      return false;
    },

    async jwt({ token, account, user, trigger, session }) {
      if (account) {
        token = Object.assign({}, token, {
          accessToken: account.accessToken,
          info: account.info,
        });
      }
      if (trigger === "update") {
        token = Object.assign({}, token, {
          info: session,
        });
        return token;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (session) {
        session.user = {
          ...session.user,
          accessToken: token.accessToken as string,
          info: token.info as {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            nickname: string;
          },
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
