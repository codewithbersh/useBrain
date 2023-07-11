import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  //   {
  //     "id": "4b81f972-cd90-4cfe-8305-ea847d1428ac",
  //     "email": "admin@example.com",
  //     "first_name": "admin",
  //     "last_name": "admin",
  //     "nickname": ""
  // }

  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        const { id_token: accessToken } = account;
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/google/",
          {
            access_token: accessToken,
          }
        );

        const access_token = response.data.access;
        account.access_token = access_token;

        const user_response = await axios.get(
          "http://127.0.0.1:8000/api/users/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const { id, email, first_name, last_name, nickname } =
          user_response.data[0];

        account.user_info = {
          id: id,
          email: email,
          first_name: first_name,
          last_name: last_name,
          nickname: nickname,
        };

        // console.log("User response data: ", user_response.data);
        // console.log("User response data access: ", user_response.data.access);

        return true;
      }

      return false;
    },

    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
          user_info: account.user_info,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          user_info: token.user_info,
        });
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
