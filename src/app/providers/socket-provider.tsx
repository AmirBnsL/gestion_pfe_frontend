"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type React from "react";

import { socketService } from "@/app/lib/socket-service";
import type { Socket } from "socket.io-client";

interface SocketContextType {
  socket: typeof Socket | null;
  isConnected: boolean;
  error: string | null;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  error: null,
});

export const useSocketContext = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SocketContextType>({
    socket: null,
    isConnected: false,
    error: null,
  });

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const { socket } = await socketService.initialize();

        const onConnect = () =>
          setState((prev) => ({ ...prev, isConnected: true, error: null }));
        const onDisconnect = () =>
          setState((prev) => ({ ...prev, isConnected: false }));
        const onError = (err: Error) =>
          setState((prev) => ({ ...prev, error: err.message }));

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("connect_error", onError);

        setState({
          socket,
          isConnected: socket.connected,
          error: null,
        });

        return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
          socket.off("connect_error", onError);
          socketService.disconnect();
        };
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error
              ? error.message
              : "Failed to initialize socket",
        }));
      }
    };

    initializeSocket();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={state}>{children}</SocketContext.Provider>
  );
}
