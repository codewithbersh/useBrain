export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lesson/:path*",
    "/settings/:path*",
    "/explore/:path*",
    "/play/:path*",
  ],
};
