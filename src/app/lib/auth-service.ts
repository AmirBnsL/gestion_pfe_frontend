import { apiClient, type LoginCredentials, type User } from "./api-client"

// Event for auth state changes
const AUTH_CHANGE_EVENT = "auth-change"

// Function to emit auth change event
function emitAuthChange(isAuthenticated: boolean, user: User | null) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(AUTH_CHANGE_EVENT, {
      detail: { isAuthenticated, user },
    })
    window.dispatchEvent(event)
  }
}

// Auth service with cookie-based authentication
export const authService = {
  // Login user
  async login(credentials: LoginCredentials) {
    try {
      const response = await apiClient.auth.login(credentials)

      // The API should set the HTTP-only cookie automatically
      // We just need to update the UI state
      emitAuthChange(true, response.user)

      return {
        success: true,
        user: response.user,
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }
    }
  },

  // Logout user
  async logout() {
    try {
      // Call a logout endpoint if your API has one
      // This should clear the HTTP-only cookie on the server

      // For now, we'll just update the UI state
      emitAuthChange(false, null)

      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }
    }
  },

  // Get current user profile
  async getCurrentUser() {
    try {
      const user = await apiClient.auth.getProfile()
      return user
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      const user = await this.getCurrentUser()
      return !!user
    } catch (error) {
      return false
    }
  },

  // Subscribe to auth changes
  onAuthChange(callback: (isAuthenticated: boolean, user: User | null) => void) {
    if (typeof window !== "undefined") {
      const handler = (event: Event) => {
        const customEvent = event as CustomEvent
        callback(customEvent.detail.isAuthenticated, customEvent.detail.user)
      }

      window.addEventListener(AUTH_CHANGE_EVENT, handler)

      // Return unsubscribe function
      return () => {
        window.removeEventListener(AUTH_CHANGE_EVENT, handler)
      }
    }

    return () => {} // Empty unsubscribe for SSR
  },

  // Check if user has a specific role
  hasRole(user: User | null, role: "Admin" | "Teacher" | "Student") {
    return user?.role === role
  },

  // Check if user is admin
  isAdmin(user: User | null) {
    return this.hasRole(user, "Admin")
  },

  // Check if user is teacher
  isTeacher(user: User | null) {
    return this.hasRole(user, "Teacher")
  },

  // Check if user is student
  isStudent(user: User | null) {
    return this.hasRole(user, "Student")
  },
}
