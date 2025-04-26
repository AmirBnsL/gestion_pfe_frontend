"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

import type { User } from "@/app/lib/api-client"
import { getCurrentUser, isAdmin, isStudent, isTeacher, loogin, loogout, onAuthChange } from "../lib/auth-service"

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
    // 1) placeholder for the unsubscribe fn
    let unsubscribe: () => void = () => {}
  
    // 2) IIFE so we can await inside
    ;(async () => {
      setIsLoading(true)
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setIsAuthenticated(!!currentUser)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication error")
      } finally {
        setIsLoading(false)
      }
  
      // 3) subscribe and capture the sync unsubscribe
      unsubscribe = await onAuthChange((isAuth, updatedUser) => {
        setIsAuthenticated(isAuth)
        setUser(updatedUser)
      })
    })()
  
    // 4) return a *synchronous* cleanup
    return () => {
      unsubscribe()
    }
  }, [])  // <-- still only run on mount/unmount
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await loogin({ email, password })

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
      await loogout()
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
    isAdmin: () => isAdmin(user),
    isTeacher: () => isTeacher(user),
    isStudent: () => isStudent(user),
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
