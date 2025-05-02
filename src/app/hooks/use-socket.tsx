"use client";

import { useState, useEffect, useCallback } from "react";
import { useSocketContext } from "@/app/providers/socket-provider";
import { socketService } from "@/app/lib/socket-service";

interface Message {
  id: string;
  sender: string;
  senderId?: string;
  message: string;
  timestamp: string;
  room: string;
  readBy?: string[];
  attachments?: Array<{
    id?: string;
    url: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }>;
}

interface RoomUser {
  id: string;
  isTyping: boolean;
}

export function useSocket() {
  const {
    socket,
    announcementsSocket,
    isConnected,
    error: connectionError,
  } = useSocketContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [announcements, setAnnouncements] = useState<
    { message: string; sender?: string; timestamp: Date | string }[]
  >([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({});
  const [roomUsers, setRoomUsers] = useState<RoomUser[]>([]);
  const [error, setError] = useState<string | null>(connectionError);

  // Listen for chat messages
  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = (data: {
      id?: string;
      sender: string;
      senderId?: string;
      message: string;
      timestamp: string;
      attachments?: Array<{
        id?: string;
        url: string;
        fileName: string;
        fileType: string;
        fileSize: number;
      }>;
    }) => {
      const newMessage: Message = {
        id: data.id || `msg-${Date.now()}`,
        sender: data.sender || "Unknown",
        senderId: data.senderId,
        message: data.message,
        timestamp: data.timestamp || new Date().toISOString(),
        room: currentRoom || "",
        attachments: data.attachments || [],
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    const handleSystemMessage = (message: string) => {
      const newMessage: Message = {
        id: `system-${Date.now()}`,
        sender: "System",
        message: message,
        timestamp: new Date().toISOString(),
        room: currentRoom || "",
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    const handleRoomHistory = (
      history: Array<{
        id: string;
        senderName: string;
        sender: string;
        message: string;
        timestamp: string;
        room: string;
        read: string[];
        attachments?: Array<{
          id?: string;
          url: string;
          fileName: string;
          fileType: string;
          fileSize: number;
        }>;
      }>
    ) => {
      // Format history messages to match our Message interface
      const formattedHistory = history.map((msg) => ({
        id: msg.id,
        sender: msg.senderName,
        senderId: msg.sender,
        message: msg.message,
        timestamp: msg.timestamp,
        room: msg.room,
        readBy: msg.read,
        attachments: msg.attachments,
      }));
      setMessages(formattedHistory);
    };

    const handleUserTyping = (data: {
      userId: string;
      userName: string;
      isTyping: boolean;
    }) => {
      if (data.isTyping) {
        setTypingUsers((prev) => ({ ...prev, [data.userId]: data.userName }));
      } else {
        setTypingUsers((prev) => {
          const updated = { ...prev };
          delete updated[data.userId];
          return updated;
        });
      }
    };

    const handleMessagesRead = (data: {
      userId: string;
      userName: string;
      messageIds: string[];
    }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          data.messageIds.includes(msg.id)
            ? {
                ...msg,
                readBy: [...(msg.readBy || []), data.userId],
              }
            : msg
        )
      );
    };

    const handleRoomUsers = (users: RoomUser[]) => {
      setRoomUsers(users);
    };

    const handleError = (err: { message: string }) => {
      setError(err.message);
      console.error("Socket error:", err.message);
    };

    // Register event listeners using the socketService methods
    const unsubscribeChatMessage =
      socketService.onChatMessage(handleChatMessage);
    const unsubscribeSystemMessage =
      socketService.onSystemMessage(handleSystemMessage);
    const unsubscribeRoomHistory =
      socketService.onRoomHistory(handleRoomHistory);
    const unsubscribeUserTyping = socketService.onUserTyping(handleUserTyping);
    const unsubscribeMessagesRead =
      socketService.onMessagesRead(handleMessagesRead);
    const unsubscribeRoomUsers = socketService.onRoomUsers(handleRoomUsers);
    const unsubscribeError = socketService.onError(handleError);

    return () => {
      // Clean up listeners
      unsubscribeChatMessage();
      unsubscribeSystemMessage();
      unsubscribeRoomHistory();
      unsubscribeUserTyping();
      unsubscribeMessagesRead();
      unsubscribeRoomUsers();
      unsubscribeError();
    };
  }, [socket, currentRoom]);

  // Listen for announcements
  useEffect(() => {
    if (!announcementsSocket) return;

    const handleAnnouncement = (data: {
      message: string;
      sender?: string;
      timestamp: Date | string;
    }) => {
      setAnnouncements((prev) => [...prev, data]);
    };

    const unsubscribeAnnouncement =
      socketService.onAnnouncement(handleAnnouncement);

    return () => {
      unsubscribeAnnouncement();
    };
  }, [announcementsSocket]);

  // Update error state when connection error changes
  useEffect(() => {
    setError(connectionError);
  }, [connectionError]);

  // Join a chat room
  const joinRoom = useCallback(
    (roomId: string, userId: string) => {
      if (!socket) return false;

      const success = socketService.joinRoom(userId, roomId);
      if (success) {
        setCurrentRoom(roomId);
      }
      return success;
    },
    [socket]
  );

  // Leave a chat room
  const leaveRoom = useCallback(
    (roomId: string, userId: string) => {
      if (!socket) return false;

      const success = socketService.leaveRoom(userId, roomId);
      if (success) {
        setCurrentRoom(null);
        setMessages([]);
        setRoomUsers([]);
      }
      return success;
    },
    [socket]
  );

  // Send a message
  const sendMessage = useCallback(
    (message: string, sender: string, roomId: string) => {
      if (!socket || !currentRoom) return false;

      return socketService.sendMessage(sender, message, roomId);
    },
    [socket, currentRoom]
  );

  // Send typing indicator
  const sendTypingIndicator = useCallback(
    (roomId: string) => {
      if (!socket || !currentRoom) return false;

      return socketService.sendTypingIndicator(roomId);
    },
    [socket, currentRoom]
  );

  // Mark messages as read
  const markMessagesAsRead = useCallback(
    (messageIds: string[], roomId: string) => {
      if (!socket || !currentRoom) return false;

      return socketService.markMessagesAsRead(messageIds, roomId);
    },
    [socket, currentRoom]
  );

  // Upload file
  const uploadFile = useCallback(
    (file: File, roomId: string) => {
      if (!socket || !currentRoom)
        return Promise.reject(new Error("Not connected to room"));

      return socketService.uploadFile(file, roomId);
    },
    [socket, currentRoom]
  );

  // Publish an announcement
  const publishAnnouncement = useCallback(
    (message: string, isAdmin = false) => {
      if (!announcementsSocket) return false;

      return socketService.publishAnnouncement(message, isAdmin);
    },
    [announcementsSocket]
  );

  return {
    isConnected,
    error,
    messages,
    announcements,
    typingUsers,
    roomUsers,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendTypingIndicator,
    markMessagesAsRead,
    uploadFile,
    publishAnnouncement,
    currentRoom,
  };
}
