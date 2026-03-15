import { NextResponse, type NextRequest } from "next/server";
import { authClient } from "@/lib/auth";

/**
 * Middleware to handle route protection and redirection.
 * Optimized to run under 100ms by focusing on session validation.
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define route types
  const isRootRoute = pathname === "/";
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isPublicAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  // Fetch session with cookie headers for server-side validation
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  });

  const hasSession = !!session;

  // 1. Handle Root Route (/)
  if (isRootRoute) {
    if (hasSession) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Handle Protected Routes (/dashboard/*)
  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Handle Public Auth Routes (/login, /signup)
  // Redirect to dashboard if already logged in
  if (isPublicAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

/**
 * Configure which routes trigger the middleware.
 * Includes the root route, dashboard, and auth pages.
 */
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};
