// Authentication service to handle API calls to your external auth provider

interface LoginCredentials {
    email: string
    password: string
  }
  
  interface AuthResponse {
    success: boolean
    token?: string
    user?: {
      id: string
      email: string
      firstname: string
      lastname: string
      role :string
    }
    error?: string
  }
  
  // Replace this URL with your actual external API endpoint
  const API_URL = "http://localhost:3000"
  
  export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Login failed",
        }
      }
  
      // Store the token in localStorage
      if (data.token) {
        localStorage.setItem("auth_token", data.token)
      }
  
      return {
        success: true,
        token: data.token,
        user: data.user,
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: "An unexpected error occurred",
      }
    }
  }
  
  export function logout(): void {
    localStorage.removeItem("auth_token")
    // Redirect to login page
    window.location.href = "/login"
  }
  
  export function getToken(): string | null {
    return typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  }
  
  export function isAuthenticated(): boolean {
    return !!getToken()
  }
  
  // Function to get the auth header for authenticated requests
  export function getAuthHeader(): Record<string, string> {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
  
  