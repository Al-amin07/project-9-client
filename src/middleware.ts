import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
import { getCurrentUser } from "./services/auth";
import { JwtPayload as BaseJwtPayload } from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  role?: string;
}

const authRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  admin: [/^\/admin/, /^\/profile/],
  user: [/^\/user/, /^\/profile/, /^\/createpost/],
};

type NormalizedRole = "admin" | "user";

// Normalize DB role to middleware role
const normalizeRole = (role: string): NormalizedRole | null => {
  if (role === "ADMIN") return "admin";
  if (role === "USER" || role === "PREMIUM") return "user";
  return null;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("accessToken")?.value;
  const user: JwtPayload | null = token ? await getCurrentUser() : null;

  // Allow public routes
  if (authRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Handle /createpost for all logged-in users
  if (pathname === "/createpost" || pathname === "/profile") {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    } else {
      return NextResponse.next();
    }
  }

  const normalizedRole = user?.role ? normalizeRole(user.role as string) : null;

  if (user && normalizedRole && roleBasedRoutes[normalizedRole]) {
    const allowedRoutes = roleBasedRoutes[normalizedRole] || [];
    console.log(
      "allowed",
      normalizedRole,
      allowedRoutes,
      pathname,
      user,
      allowedRoutes.some((regex) => pathname.match(regex))
    );
    if (allowedRoutes.some((regex) => pathname.match(regex))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.redirect(
    new URL(`/login?redirect=${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/createpost",
    "/profile",
    "/admin/:path*",
    "/user/:path*",
  ],
};
