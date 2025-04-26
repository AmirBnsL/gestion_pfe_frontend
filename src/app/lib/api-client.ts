



const API_URL = "http://localhost:8080/api"

// Types for API responses
export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Student" | "Teacher"
  createdAt: string
  updatedAt: string
}

export interface Admin {
  id: string
  userId: string
}

export interface Student {
  id: string
  userId: string
  department: string
  studentId: string
}

export interface Teacher {
  id: string
  userId: string
  specialization: string
}

export interface Project {
  id: string
  title: string
  description: string
  status: "Pending" | "Approved" | "Rejected"
  createdBy: string // userId
  supervisorId: string // teacherId
  teamId?: string
  deadline: string // datetime
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  data: any
  token: string
  user: User
}

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`

  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // This is important for cookies
    })

    // Check if the response is JSON
    const contentType = response.headers.get("content-type")
    const isJson = contentType && contentType.includes("application/json")

    // Parse the response
    const data = isJson ? await response.json() : await response.text()

    // Handle API errors
    if (!response.ok) {
      const errorMessage = isJson && data.message ? data.message : "An error occurred"

      throw new Error(errorMessage)
    }

    return data as T
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred")
  }
}

// API client with methods for all endpoints
export const apiClient = {
  // User endpoints
  users: {
    // Get all users (admin only)
    getAll: () => fetchApi<User[]>("/user"),

    // Create a new user
    create: (userData: Partial<User>) =>
      fetchApi<User>("/user", {
        method: "POST",
        body: JSON.stringify(userData),
      }),

    // Delete a user (admin only)
    delete: (userId: string) =>
      fetchApi<void>(`/user/${userId}`, {
        method: "DELETE",
      }),
  },

  // Authentication endpoints
  auth: {
    // Login with email and password
    login: (credentials: LoginCredentials) =>
      fetchApi<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })
      .then(res => {
        // store the raw JWT into a cookie called "jwt"
        //  - max-age=7200 makes it live for 2 hours
        //  - secure + samesite=lax are recommended defaults
        document.cookie = `jwt=${res.data}; path=/; max-age=${2 * 60 * 60}; secure; samesite=lax`;
        
        return res;
      }),
  
    // Test authorization (admin only)
    testAuthorization: () =>
      fetchApi<{ message: string }>("/test-authorization"),
  
    // Get current user profile
    // getProfile: async () => {
    //   const cookieStore = await cookies()
    //   const token = cookieStore.get('jwt')
    //   console.log(token)
    //   return fetchApi<User>("/profile", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // },
    // Logout (client-side only, no API call needed)
    logout: () => {
      // just clear the cookie
      document.cookie = "jwt=; path=/; max-age=0";
      return Promise.resolve();
    },
  },

  // You can add more endpoints for projects, teams, etc. as needed
  projects: {
    // These are placeholder methods - implement based on your API
    getAll: () => fetchApi<Project[]>("/projects"),

    getById: (projectId: string) => fetchApi<Project>(`/projects/${projectId}`),

    create: (projectData: Partial<Project>) =>
      fetchApi<Project>("/projects", {
        method: "POST",
        body: JSON.stringify(projectData),
      }),

    update: (projectId: string, projectData: Partial<Project>) =>
      fetchApi<Project>(`/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(projectData),
      }),

    delete: (projectId: string) =>
      fetchApi<void>(`/projects/${projectId}`, {
        method: "DELETE",
      }),
  },
}
