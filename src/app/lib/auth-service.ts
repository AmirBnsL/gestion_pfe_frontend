"use server"

import { cookies } from "next/headers"
import { apiClient, type LoginCredentials, type User } from "./api-client"

// Event for auth state changes
const AUTH_CHANGE_EVENT = "auth-change"

// Function to emit auth change event
async function emitAuthChange(isAuthenticated: boolean, user: User | null) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(AUTH_CHANGE_EVENT, {
      detail: { isAuthenticated, user },
    })
    window.dispatchEvent(event)
  }
}

// Login user
export async function loogin(credentials: LoginCredentials) {
  try {
    const response = await apiClient.auth.login(credentials)
    await emitAuthChange(true, response.user)
    return { success: true, user: response.user }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

// Logout user
export async function loogout() {
  try {
    await emitAuthChange(false, null)
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

// Get user profile from cookie and API
export async function getProfile() {
  try {
    const cookieStore = cookies()
    const tokenCookie = (await cookieStore).get("jwt")
    const token = tokenCookie?.value || ""
    console.log(token)
    return await fetchApi<User>("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    throw error
  }
}

// Get current user profile via getProfile
export async function getCurrentUser() {
  try {
    return await getProfile()
  } catch {
    console.error("Error getting current user")
    return null
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  try {
    const user = await getCurrentUser()
    return !!user
  } catch {
    return false
  }
}

// Subscribe to auth changes
export async function onAuthChange(
  callback: (isAuthenticated: boolean, user: User | null) => void
) {
  if (typeof window !== "undefined") {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent
      callback(customEvent.detail.isAuthenticated, customEvent.detail.user)
    }
    window.addEventListener(AUTH_CHANGE_EVENT, handler)
    return async () => window.removeEventListener(AUTH_CHANGE_EVENT, handler)
  }
  return async () => {}
}

// Role checks
export async function hasRole(
  user: User | null,
  role: "Admin" | "Teacher" | "Student"
) {
  return user?.role === role
}

export async function isAdmin(user: User | null) {
  return hasRole(user, "Admin")
}

export async function isTeacher(user: User | null) {
  return hasRole(user, "Teacher")
}

export async function isStudent(user: User | null) {
  return hasRole(user, "Student")
}

// NOTE: Next.js "use server" files can only export async functions.
// Remove any object exports (e.g., authService) and import these functions directly:
// import { login, logout, getProfile, getCurrentUser, ... } from "./auth-service";

// Helper fetchApi stub (replace with your real import)
async function fetchApi<T>(endpoint: string, options: RequestInit): Promise<T> {
  throw new Error("Function not implemented.")
}
