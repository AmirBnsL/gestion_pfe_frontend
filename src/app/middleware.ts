import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {ExtendedJwtPayload} from "@/app/lib/api-client";
import {jwtDecode} from "jwt-decode"

// Define the paths that should be protected
const ADMIN_PATHS = ["/admin/dashboard"]
const TEACHER_PATHS = ["/teacher"]
const STUDENT_PATHS = ["/student/project-overview"]
const AUTH_PATHS = ["/login"]
const PUBLIC_PATHS = ["/", "/landing", "/about", "/contact"]

// Function to check if a path starts with any of the given prefixes
function pathStartsWith(path: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => path.startsWith(prefix))
}

// Middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for static assets, api routes, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check if the user is authenticated by looking for the auth cookie
  const authCookie = request.cookies.get("jwt")
  const isAuthenticated = !!authCookie?.value

  // If not authenticated and trying to access protected routes, redirect to landing page
  if (!isAuthenticated) {
    if (
      pathStartsWith(pathname, ADMIN_PATHS) ||
      pathStartsWith(pathname, TEACHER_PATHS) ||
      pathStartsWith(pathname, STUDENT_PATHS)
    ) {
      return NextResponse.redirect(new URL("/landing", request.url))
    }

    // Allow access to public paths and auth paths
    return NextResponse.next()
  }

  // If authenticated, check role-based access
  // We need to decode the JWT token to get the user's role
  try {
    // This is a simplified example - in a real app, you'd verify the JWT
    const tokenData = jwtDecode<ExtendedJwtPayload>(authCookie.value) // Assuming jwtDecode is a function that decodes the JWT
    const userRole = tokenData.role

    // Check role-based access
    if (pathStartsWith(pathname, ADMIN_PATHS) && userRole !== "admin") {
      return NextResponse.redirect(new URL("/landing", request.url))
    }

    if (pathStartsWith(pathname, TEACHER_PATHS) && userRole !== "teacher") {
      return NextResponse.redirect(new URL("/landing", request.url))
    }

    if (pathStartsWith(pathname, STUDENT_PATHS) && userRole !== "student") {
      return NextResponse.redirect(new URL("/landing", request.url))
    }

    // If authenticated and trying to access auth pages, redirect to appropriate dashboard
    if (pathStartsWith(pathname, AUTH_PATHS)) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      } else if (userRole === "teacher") {
        return NextResponse.redirect(new URL("/teacher", request.url))
      } else if (userRole === "student") {
        return NextResponse.redirect(new URL("/student/project-overview", request.url))
      }
    }

    // Allow access for authenticated users with correct role
    return NextResponse.next()
  } catch (error) {
    // If token parsing fails, treat as unauthenticated
    console.error("Error parsing auth token:", error)

    // Clear the invalid cookie
    const response = NextResponse.redirect(new URL("/landing", request.url))
    response.cookies.delete("auth-token")

    return response
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
