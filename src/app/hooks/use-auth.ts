"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import type { User } from "@/app/lib/api-client"
import { getCurrentUser, isAdmin, isStudent, isTeacher, loogin, loogout, onAuthChange } from "../lib/auth-service"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check authentication status on mount
  useEffect(() => {
    setIsLoading(true)
  
    // 1) Kick off auth check
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setIsAuthenticated(!!currentUser)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication error")
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  
    // 2) Subscribe to auth changes, capture the cleanup
    let unsubscribe: () => void = () => {}
    ;(async () => {
      unsubscribe = await onAuthChange((isAuth, updatedUser) => {
        setIsAuthenticated(isAuth)
        setUser(updatedUser)
      })
    })()
  
    // 3) Return a synchronous cleanup
    return () => {
      unsubscribe()
    }
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await loogin({ email, password })

      if (result.success) {
        // Redirect based on user role
        if (await isAdmin(result.user)) {
          router.push("/admin/dashboard")
        } else if (await isTeacher(result.user)) {
          router.push("/teacher/dashboard")
        } else if (await isStudent(result.user)) {
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
      await loogout()
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
    isAdmin: () => isAdmin(user),
    isTeacher: () => isTeacher(user),
    isStudent: () => isStudent(user),
  }
}
