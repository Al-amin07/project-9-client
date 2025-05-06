import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  console.log("middleware", request.nextUrl.pathname);
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/createpost",
    "/admin/:path*",
    "/user/:path*",
  ],
};
