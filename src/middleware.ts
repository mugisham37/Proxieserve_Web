import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ACCESS_COOKIE = "proxiserve_access";
const REFRESH_COOKIE = "proxiserve_refresh";

function parseJwtRole(token: string | null): string | null {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const padded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(padded)) as Record<string, unknown>;
    return typeof payload.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

function roleHome(role: string | null): string {
  if (role === "staff:admin") return "/admin/analytics";
  if (role === "staff:agent") return "/agent";
  return "/dashboard";
}

function redirect(url: string, request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(url, request.url));
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value ?? null;
  const role = parseJwtRole(accessToken);
  const hasRefresh = request.cookies.has(REFRESH_COOKIE);
  const isAuthenticated = role !== null || hasRefresh;

  // /verify — must be authenticated to reach (pre-email-verification state)
  if (pathname === "/verify") {
    if (!isAuthenticated) {
      const url = `/login?next=${encodeURIComponent(`${pathname}${search}`)}`;
      return redirect(url, request);
    }
    return NextResponse.next();
  }

  // /staff/2fa — only accessible when NOT fully authenticated (pre-2FA state)
  if (pathname === "/staff/2fa") {
    if (role !== null) return redirect(roleHome(role), request);
    return NextResponse.next();
  }

  // Guest-only pages — redirect authenticated users to their role home
  const guestOnly = ["/login", "/signup", "/forgot-password", "/reset-password", "/claim", "/staff/login"];
  if (guestOnly.includes(pathname)) {
    if (role !== null) return redirect(roleHome(role), request);
    return NextResponse.next();
  }

  // Admin routes — require staff:admin
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) return redirect("/staff/login", request);
    if (role !== "staff:admin") return redirect(roleHome(role), request);
    return NextResponse.next();
  }

  // Agent routes — require staff:agent
  if (pathname.startsWith("/agent")) {
    if (!isAuthenticated) return redirect("/staff/login", request);
    if (role !== "staff:agent") return redirect(roleHome(role), request);
    return NextResponse.next();
  }

  // Client routes — require client role
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/app") ||
    pathname.startsWith("/settings")
  ) {
    if (!isAuthenticated) return redirect("/login", request);
    if (role !== "client") return redirect(roleHome(role), request);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/verify",
    "/staff/2fa",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/claim",
    "/staff/login",
    "/admin/:path*",
    "/agent/:path*",
    "/dashboard/:path*",
    "/app/:path*",
    "/settings/:path*",
  ],
};
