import { getAuthHeader } from "./auth-service"

// Replace with your actual API URL
const API_URL = "http://localhost:3000"

// Generic fetch function for API requests
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`

  // Merge default headers with provided options
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Handle non-JSON responses
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json()

    // Handle API errors
    if (!response.ok) {
      throw new Error(data.message || "An error occurred")
    }

    return data
  }

  // For non-JSON responses
  if (!response.ok) {
    throw new Error("An error occurred")
  }

  return response.text() as unknown as T
}

// Convenience methods
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { method: 'GET', ...options }),
  
  post: <T>(endpoint: string, data?: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  put: <T>(endpoint: string, data?: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  delete: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { method: 'DELETE', ...options }),
};

