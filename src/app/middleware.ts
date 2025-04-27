import { NextResponse , NextRequest } from "next/server"

import { cookies } from "next/headers"
import { ExtendedJwtPayload } from "./lib/api-client"
import { jwtDecode } from "jwt-decode"
const ADMIN_PATHS = ["/admin/dashboard"]
const TEACHER_PATHS = ["/teacher"]
const STUDENT_PATHS = ["/student/project-overview"]
const publicRoutes = ["/landing", "/login"]
const protectedRoutes = [ADMIN_PATHS, TEACHER_PATHS, STUDENT_PATHS , ADMIN_PATHS].flat()


 
export default async function middleware(req: NextRequest) {
 
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
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
    if (userRole === "admin" && !ADMIN_PATHS.includes(path)) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
    } else if (userRole === "teacher" && !TEACHER_PATHS.includes(path)) {
      return NextResponse.redirect(new URL('/teacher', req.nextUrl))
    } else if (userRole === "student" && !STUDENT_PATHS.includes(path)) {
      return NextResponse.redirect(new URL('/student/project-overview', req.nextUrl))
    }
  }
 
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

