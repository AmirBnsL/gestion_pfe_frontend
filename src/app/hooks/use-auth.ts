"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginUser, logout, isAuthenticated, getToken } from "@/app/lib/auth-service"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface LoginCredentials {
  email: string
  password: string
}

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isAuth, setIsAuth] = useState<boolean>(false)

  // Check authentication status on mount
  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [])

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      if (data.success) {
        setIsAuth(true)
        // Invalidate any user-related queries
        queryClient.invalidateQueries({ queryKey: ["user"] })
        // Redirect to dashboard
        router.push("/dashboard")
      }
    },
  })

  // Logout function
  const handleLogout = () => {
    logout()
    setIsAuth(false)
    // Clear any user-related queries
    queryClient.clear()
    // Redirect to login
    router.push("/login")
  }

  return {
    login: loginMutation.mutate,
    logout: handleLogout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || loginMutation.data?.error,
    isAuthenticated: isAuth,
    getToken,
  }
}

