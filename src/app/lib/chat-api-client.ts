"use client";

import axios from "axios";

// Base URL for API requests - adjust this to match your backend URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Create axios instance with default config
const chatApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token in requests
chatApiClient.interceptors.request.use(
  (config) => {
    // Get JWT token from cookies
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((row) => row.startsWith("jwt="));
    const token = jwtCookie ? jwtCookie.split("=")[1] : null;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions for chat
export const chatApi = {
  // Get messages for a room
  getMessages: async (roomId: string, limit = 50, offset = 0) => {
    try {
      const response = await chatApiClient.get(
        `/chat/messages/${roomId}?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  // Get unread message count for a room
  getUnreadCount: async (roomId: string): Promise<number> => {
    try {
      const response = await chatApiClient.get<{ count: number }>(
        `/chat/messages/unread/${roomId}`
      );
      return response.data.count;
    } catch (error) {
      console.error("Error fetching unread count:", error);
      throw error;
    }
  },

  // Upload file
  uploadFile: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await chatApiClient.post("/chat/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },
};

export default chatApiClient;
