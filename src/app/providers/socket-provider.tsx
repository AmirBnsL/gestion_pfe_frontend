"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; // ✅ import io properly
import { socketService } from "@/app/lib/socket-service";

// Define the socket type based on `io`
type SocketType = ReturnType<typeof io>;

// Context value interface
interface SocketContextType {
  socket: SocketType | null;
  announcementsSocket: SocketType | null;
  isConnected: boolean;
  isAnnouncementsConnected: boolean;
  error: string | null;
}

// Create the context
const SocketContext = createContext<SocketContextType>({
  socket: null,
  announcementsSocket: null,
  isConnected: false,
  isAnnouncementsConnected: false,
  error: null,
});

// Custom hook to use the socket context
export const useSocketContext = () => useContext(SocketContext);

// Provider component
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<SocketType | null>(null); // ✅ use SocketType
  const [announcementsSocket, setAnnouncementsSocket] =
    useState<SocketType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAnnouncementsConnected, setIsAnnouncementsConnected] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize socket service
    const { mainSocket, announcementsSocket } = socketService.initialize();

    setSocket(mainSocket);
    setAnnouncementsSocket(announcementsSocket);

    // Event listeners for main socket
    const onConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onError = (err: Error) => {
      setError(err.message);
    };

    // Event listeners for announcements socket
    const onAnnouncementsConnect = () => {
      setIsAnnouncementsConnected(true);
    };

    const onAnnouncementsDisconnect = () => {
      setIsAnnouncementsConnected(false);
    };

    mainSocket.on("connect", onConnect);
    mainSocket.on("disconnect", onDisconnect);
    mainSocket.on("connect_error", onError);

    announcementsSocket.on("connect", onAnnouncementsConnect);
    announcementsSocket.on("disconnect", onAnnouncementsDisconnect);

    // Clean up on unmount
    return () => {
      mainSocket.off("connect", onConnect);
      mainSocket.off("disconnect", onDisconnect);
      mainSocket.off("connect_error", onError);

      announcementsSocket.off("connect", onAnnouncementsConnect);
      announcementsSocket.off("disconnect", onAnnouncementsDisconnect);

      socketService.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        announcementsSocket,
        isConnected,
        isAnnouncementsConnected,
        error,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
