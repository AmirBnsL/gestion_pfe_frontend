"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "@/app/lib/auth-service"
import type { User } from "@/app/lib/api-client"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<boolean>
  isAdmin: () => boolean
  isTeacher: () => boolean
  isStudent: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
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
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout error")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
