import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
    access_token: string;
    user_info: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      nickname: string;
    };
  }
}
