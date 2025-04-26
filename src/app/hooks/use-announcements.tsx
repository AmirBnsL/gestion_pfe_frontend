"use client";

import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client"; // ✅ Correct import
// Don't import { Socket } directly — we create our own SocketType
type SocketType = ReturnType<typeof io>;

interface UseAnnouncementsOptions {
  serverUrl?: string;
  autoConnect?: boolean;
}

interface Announcement {
  message: string;
  timestamp: Date;
}

export function useAnnouncements({
  serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080",
  autoConnect = true,
}: UseAnnouncementsOptions = {}) {
  const [socket, setSocket] = useState<SocketType | null>(null); // ✅ use SocketType
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Initialize socket connection
  useEffect(() => {
    if (!autoConnect) return;

    const socketOptions = {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    };

    console.log(`Connecting to announcements at: ${serverUrl}/announcements`);
    const socketInstance = io(`${serverUrl}/announcements`, socketOptions);

    socketInstance.on("connect", () => {
      console.log("Announcements socket connected:", socketInstance.id);
      setIsConnected(true);
      setError(null);
    });

    socketInstance.on("connect_error", (err: Error) => {
      console.error("Announcements connection error:", err);
      setError(`Connection error: ${err.message}`);
      setIsConnected(false);
    });

    socketInstance.on("disconnect", (reason: string) => {
      console.log("Announcements socket disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on("announcement", (data: Announcement) => {
      console.log("Received announcement:", data);
      setAnnouncements((prev) => [...prev, data]);
    });

    socketInstance.on("error", (data: { message: string }) => {
      console.error("Announcements error:", data.message);
      setError(data.message);
    });

    setSocket(socketInstance);

    return () => {
      console.log("Cleaning up announcements socket connection");
      socketInstance.disconnect();
    };
  }, [serverUrl, autoConnect]);

  // Publish an announcement
  const publishAnnouncement = useCallback(
    (message: string, isAdmin = false) => {
      if (!socket || !isConnected) {
        setError("Socket not connected");
        return false;
      }

      console.log(`Publishing announcement: ${message}, isAdmin: ${isAdmin}`);
      socket.emit("publishAnnouncement", { message, isAdmin });
      return true;
    },
    [socket, isConnected]
  );

  // Clear announcements
  const clearAnnouncements = useCallback(() => {
    setAnnouncements([]);
  }, []);

  return {
    socket,
    isConnected,
    error,
    announcements,
    publishAnnouncement,
    clearAnnouncements,
  };
}
