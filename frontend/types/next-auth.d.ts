import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      accessToken: string;
      info: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        nickname: string;
      };
    };
  }
}
