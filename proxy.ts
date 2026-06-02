import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ACCESS_COOKIE = "proxiserve_access";
const REFRESH_COOKIE = "proxiserve_refresh";

const guestOnlyRoutes = new Set([
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/claim",
  "/staff/login",
]);

function hasAuthCookie(request: NextRequest): boolean {
  return request.cookies.has(ACCESS_COOKIE) || request.cookies.has(REFRESH_COOKIE);
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAuthenticated = hasAuthCookie(request);

  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (pathname === "/verify") {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (pathname === "/staff/2fa") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (guestOnlyRoutes.has(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/verify",
    "/staff/2fa",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/claim",
    "/staff/login",
  ],
};
