"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/app/lib/auth-service"
import type { User } from "@/app/lib/api-client"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
        setIsAuthenticated(!!currentUser)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication error")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Subscribe to auth changes
    const unsubscribe = authService.onAuthChange((isAuth, updatedUser) => {
      setIsAuthenticated(isAuth)
      setUser(updatedUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authService.login({ email, password })

      if (result.success) {
        // Redirect based on user role
        if (authService.isAdmin(result.user)) {
          router.push("/admin/dashboard")
        } else if (authService.isTeacher(result.user)) {
          router.push("/teacher/dashboard")
        } else if (authService.isStudent(result.user)) {
          router.push("/student/project-overview")
        }
        return true
      } else {
        setError(result.error || "Login failed")
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login error")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)

    try {
      await authService.logout()
      router.push("/landing")
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout error")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    isAdmin: () => authService.isAdmin(user),
    isTeacher: () => authService.isTeacher(user),
    isStudent: () => authService.isStudent(user),
  }
}
