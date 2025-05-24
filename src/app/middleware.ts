

import { NextResponse , NextRequest } from "next/server"

import { cookies } from "next/headers"
import { ExtendedJwtPayload } from "./lib/api-client"
import { jwtDecode } from "jwt-decode"
const ADMIN_PATHS = ["/admin"]
const TEACHER_PATHS = ["/teacher"]
const STUDENT_PATHS = ["/student"]
const publicRoutes = ["/landing", "/login"]
const protectedRoutes = [...ADMIN_PATHS, ...TEACHER_PATHS, ...STUDENT_PATHS ]

export function isProtectedRouteTester(path:string, protectedRoutes:string[]) {
  if (!path || !Array.isArray(protectedRoutes)) {
    throw new Error("Invalid arguments passed to isProtectedRoute");
  }

  return protectedRoutes.some((protectedPath) => path.startsWith(protectedPath));
}
 
export default async function middleware(req: NextRequest) {
  console.log("Middleware is running fo");
 
  const path = req.nextUrl.pathname

  const isProtectedRoute = isProtectedRouteTester(path,protectedRoutes)
  const isPublicRoute = publicRoutes.includes(path)
 

  const cookiestore = await cookies()
  const authCookie = cookiestore.get("jwt")

  // const isAuthenticated = !!authCookie?.value
  const tokenData = authCookie ? jwtDecode<ExtendedJwtPayload>(authCookie.value) : null;
  const userRole = tokenData?.role



  if (isProtectedRoute && !userRole) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }


  if (isProtectedRoute && userRole) {
    if (userRole === "admin" && isProtectedRouteTester(path,ADMIN_PATHS)) {
      return NextResponse.next();
    } else if (userRole === "teacher" && isProtectedRouteTester(path,TEACHER_PATHS)) {
      return NextResponse.next();
    } else if (userRole === "student" && isProtectedRouteTester(path,STUDENT_PATHS)) {
      return NextResponse.next();
    } else {
      // Unauthorized access: redirect or block
      return NextResponse.redirect(new URL('/unauthorized', req.url)); // or another appropriate action
    }
  }
 
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

