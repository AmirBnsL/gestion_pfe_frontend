'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { jwtDecode,JwtPayload } from "jwt-decode";

const API_URL = "http://localhost:8080/api"


// --- Type Definitions ---
export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Student" | "Teacher"
  createdAt: string
  updatedAt: string
}

export interface ExtendedJwtPayload extends JwtPayload {
  role: "admin" | "student" | "teacher"
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



export interface BackendSuccessResponse<T> {
  data: T
}


export async function handleLogout() {
  (await cookies()).delete('jwt')
  redirect("/login");
}


// --- Generic Fetch Function ---
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<BackendSuccessResponse<T> > {
  const url = `${API_URL}${endpoint}`
  const cookieStore = await cookies() // No await needed
  const token = cookieStore.get('jwt')?.value
  console.log(options.body)
  // Use Headers object for better type safety
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Add Authorization header if token exists
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers, // Pass the Headers object
    })

    const contentType = response.headers.get("content-type")
    const isJson = contentType && contentType.includes("application/json")
    const data = isJson ? await response.json() : await response.text()

    console.log("Response Data:", data, "URL:", url, "Options:", options);
    return data as BackendSuccessResponse<T>
  } catch (error) {
    console.error("Fetch Error:", error, "URL:", url, "Options:", options);
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected network error occurred")
  }
}

// --- Exported API Functions ---

// User Endpoints
export async function getAllUsers(): Promise<User[]> {
  return (await fetchApi<User[]>("/user")).data;
}

export async function createUser(userData: Partial<User>): Promise<User> {
  return (await fetchApi<User>("/user", {
    method: "POST",
    body: JSON.stringify(userData),
  })).data;
}

export async function deleteUser(userId: string): Promise<void> {
  return (await fetchApi<void>(`/user/${userId}`, {
    method: "DELETE",
  })).data;
}

// Authentication Endpoints
export async function login(credentials: FormData){

  const rawFormData = {
    email: credentials.get('email'),
    password: credentials.get('password'),

  }
  const res = await fetchApi<string>("/login", {
    method: "POST",
    body: JSON.stringify(rawFormData),
  });


  if (res.data) {
    (await cookies()).set('jwt', res.data, { // No await needed
      path: '/',
      maxAge: 2 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    });
  } else {
    console.warn("Login response did not contain expected token in 'data' field.");
  }
  const cookie = await cookies() // No await needed
  const role = jwtDecode<ExtendedJwtPayload>(cookie.get('jwt')?.value || '')?.role;

  if (role === "admin") {
    redirect("/admin/dashboard")
  } else if (role === "teacher") {
    redirect("/teacher")
  } else if (role === "student") {
    redirect("/student/project-overview")
  }
}

export async function testAuthorization(): Promise<{ message: string }> {
  return (await fetchApi<{ message: string }>("/test-authorization")).data;
}

export async function getProfile(): Promise<User> {
  return (await fetchApi<User>("/profile")).data;
}

export async function logout(): Promise<void> {
  (await cookies()).delete('jwt'); // No await needed
  // Optionally call a backend logout endpoint if it exists
  // await fetchApi<void>('/logout', { method: 'POST' });
  return Promise.resolve();
}

// Project Endpoints
export async function getAllProjects(): Promise<Project[]> {
  return (await fetchApi<Project[]>("/projects")).data;
}

export async function getProjectById(projectId: string): Promise<Project> {
  return (await fetchApi<Project>(`/projects/${projectId}`)).data;
}

export async function createProject(projectData: Partial<Project>): Promise<Project> {
  return (await fetchApi<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  })).data;
}

export async function updateProject(projectId: string, projectData: Partial<Project>): Promise<Project> {
  return (await fetchApi<Project>(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(projectData),
  })).data;
}

export async function deleteProject(projectId: string): Promise<void> {
  return (await fetchApi<void>(`/projects/${projectId}`, {
    method: "DELETE",
  })).data;
}
