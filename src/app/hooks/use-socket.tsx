"use client";

import { useState, useEffect, useCallback } from "react";
import { useSocketContext } from "@/app/providers/socket-provider";
import { socketService } from "@/app/lib/socket-service";

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  room: string;
}

export function useSocket() {
  const { socket, announcementsSocket, isConnected, error } =
    useSocketContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [announcements, setAnnouncements] = useState<
    { message: string; timestamp: Date }[]
  >([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  // Listen for chat messages
  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = ({
      sender,
      message,
    }: {
      sender: string;
      message: string;
    }) => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        sender,
        message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        room: currentRoom || "",
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    const handleSystemMessage = (systemMessage: string) => {
      const newMessage: Message = {
        id: `system-${Date.now()}`,
        sender: "System",
        message: systemMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        room: currentRoom || "",
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    // Register event listeners
    const removeChatListener = socketService.onChatMessage(handleChatMessage);
    const removeSystemListener =
      socketService.onSystemMessage(handleSystemMessage);

    return () => {
      removeChatListener();
      removeSystemListener();
    };
  }, [socket, currentRoom]);

  // Listen for announcements
  useEffect(() => {
    if (!announcementsSocket) return;

    const handleAnnouncement = (data: {
      title: string;
      content: string;
      date: string;
    }) => {
      const announcement = {
        message: data.content,
        timestamp: new Date(data.date),
      };
      setAnnouncements((prev) => [...prev, announcement]);
    };

    // Register event listener
    const removeListener = socketService.onAnnouncement(handleAnnouncement);

    return () => {
      removeListener();
    };
  }, [announcementsSocket]);

  // Join a chat room
  const joinRoom = useCallback((roomId: string, userId: string) => {
    const success = socketService.joinRoom(userId, roomId);
    if (success) {
      setCurrentRoom(roomId);
    }
    return success;
  }, []);

  // Leave a chat room
  const leaveRoom = useCallback((roomId: string, userId: string) => {
    const success = socketService.leaveRoom(userId, roomId);
    if (success) {
      setCurrentRoom(null);
      setMessages([]);
    }
    return success;
  }, []);

  // Send a message
  const sendMessage = useCallback(
    (message: string, sender: string, roomId: string) => {
      if (!currentRoom) return false;
      return socketService.sendMessage(sender, message, roomId);
    },
    [currentRoom]
  );

  // Publish an announcement
  const publishAnnouncement = useCallback(
    (message: string, isAdmin = false) => {
      return socketService.publishAnnouncement(message, isAdmin);
    },
    []
  );

  return {
    isConnected,
    error,
    messages,
    announcements,
    joinRoom,
    leaveRoom,
    sendMessage,
    publishAnnouncement,
    currentRoom,
  };
}
