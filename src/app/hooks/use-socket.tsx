"use client";
import { useState, useEffect, useCallback } from "react";
import { useSocketContext } from "@/app/providers/socket-provider";
import { socketService } from "@/app/lib/socket-service";
import { chatApi } from "@/app/lib/chat-api-client";

interface Message {
  id: string;
  sender: string;
  senderId?: string;
  message: string;
  timestamp: string;
  room: string;
  readBy?: string[];
  attachments?: Array<{
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
  const { socket, isConnected, error: connectionError } = useSocketContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({});
  const [roomUsers, setRoomUsers] = useState<RoomUser[]>([]);
  const [error, setError] = useState<string | null>(connectionError);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for chat events
  useEffect(() => {
    if (!socket) return;

    const handleChatMessage = (data: {
      id?: string;
      sender: string;
      senderId?: string;
      message: string;
      timestamp: string;
      attachments?: Array<{
        url: string;
        fileName: string;
        fileType: string;
        fileSize: number;
      }>;
    }) => {
      setMessages((prev) => [
        ...prev,
        {
          ...data,
          id: data.id || `msg-${Date.now()}`,
          room: currentRoom || "",
          timestamp: data.timestamp || new Date().toISOString(),
        } as Message,
      ]);
    };

    const handleRoomHistory = (history: Message[]) => {
      setMessages(history);
    };

    const handleUserTyping = (data: {
      userId: string;
      userName: string;
      isTyping: boolean;
    }) => {
      setTypingUsers((prev) => {
        const updatedTypingUsers = { ...prev };
        if (data.isTyping) {
          updatedTypingUsers[data.userId] = data.userName;
        } else {
          delete updatedTypingUsers[data.userId];
        }
        return updatedTypingUsers;
      });
    };

    const handleMessagesRead = (data: {
      userId: string;
      messageIds: string[];
    }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          data.messageIds.includes(msg.id)
            ? { ...msg, readBy: [...(msg.readBy || []), data.userId] }
            : msg
        )
      );
    };

    const handleRoomUsers = (users: RoomUser[]) => {
      setRoomUsers(users);
    };

    const unsubscribeChat = socketService.onChatMessage(handleChatMessage);
    const unsubscribeHistory = socketService.onRoomHistory(handleRoomHistory);
    const unsubscribeTyping = socketService.onUserTyping(handleUserTyping);
    const unsubscribeRead = socketService.onMessagesRead(handleMessagesRead);
    const unsubscribeUsers = socketService.onRoomUsers(handleRoomUsers);

    return () => {
      unsubscribeChat();
      unsubscribeHistory();
      unsubscribeTyping();
      unsubscribeRead();
      unsubscribeUsers();
    };
  }, [socket, currentRoom]);

  // Update error state
  useEffect(() => {
    setError(connectionError);
  }, [connectionError]);

  // Join a chat room
  const joinRoom = useCallback(
    async (roomId: string) => {
      if (!socket || !roomId) return false;
      setIsLoading(true);

      try {
        // Join room via socket
        const success = socketService.joinRoom(roomId);

        if (success) {
          setCurrentRoom(roomId);

          // Fetch initial messages via REST API as a fallback
          try {
            const initialMessages = (await chatApi.getMessages(
              roomId
            )) as Message[];
            if (initialMessages && initialMessages.length > 0) {
              setMessages(initialMessages);
            }
          } catch (err) {
            console.error(
              "Failed to fetch initial messages via REST API:",
              err
            );
            // Socket will still provide history, so we don't need to set an error
          }

          setTypingUsers({});
        }

        setIsLoading(false);
        return success;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to join room");
        setIsLoading(false);
        return false;
      }
    },
    [socket]
  );

  // Leave a chat room
  const leaveRoom = useCallback(
    (roomId: string) => {
      if (!socket || !roomId) return false;

      try {
        const success = socketService.leaveRoom(roomId);
        if (success) {
          setCurrentRoom(null);
          setMessages([]);
          setRoomUsers([]);
          setTypingUsers({});
        }
        return success;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to leave room");
        return false;
      }
    },
    [socket]
  );

  // Send a message
  const sendMessage = useCallback(
    (message: string, roomId: string) => {
      if (!socket || !currentRoom || !message) return false;

      try {
        return socketService.sendMessage(message, roomId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
        return false;
      }
    },
    [socket, currentRoom]
  );

  // Send typing indicator
  const sendTypingIndicator = useCallback(
    (roomId: string) => {
      if (!socket || !currentRoom) return false;

      try {
        return socketService.sendTypingIndicator(roomId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to send typing indicator"
        );
        return false;
      }
    },
    [socket, currentRoom]
  );

  // Mark messages as read
  const markMessagesAsRead = useCallback(
    (messageIds: string[], roomId: string) => {
      if (!socket || !currentRoom || !Array.isArray(messageIds)) return false;

      try {
        return socketService.markMessagesAsRead(messageIds, roomId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to mark messages as read"
        );
        return false;
      }
    },
    [socket, currentRoom]
  );

  // Upload file
  const uploadFile = useCallback(
    async (file: File, roomId: string) => {
      if (!socket || !currentRoom)
        return Promise.reject(new Error("Not connected to room"));

      try {
        // First try to upload via socket
        return await socketService.uploadFile(file, roomId);
      } catch (socketErr) {
        console.error("Socket file upload failed, trying REST API:", socketErr);

        // Fallback to REST API if socket upload fails
        try {
          const uploadResult = (await chatApi.uploadFile(file)) as {
            url?: string;
          };

          // If REST upload succeeds, send a message with the attachment
          if (uploadResult && uploadResult.url) {
            socketService.sendMessage(`[File: ${file.name}]`, roomId);
            return true;
          }
          throw new Error("File upload failed");
        } catch (restErr) {
          setError(
            restErr instanceof Error ? restErr.message : "Failed to upload file"
          );
          throw restErr;
        }
      }
    },
    [socket, currentRoom]
  );

  // Load more messages (pagination)
  const loadMoreMessages = useCallback(
    async (offset = 0, limit = 50) => {
      if (!currentRoom) return false;

      setIsLoading(true);
      try {
        const olderMessages = (await chatApi.getMessages(
          currentRoom,
          limit,
          offset
        )) as Message[];
        if (olderMessages && olderMessages.length > 0) {
          if (Array.isArray(olderMessages)) {
            setMessages((prev) => [...olderMessages, ...prev]);
          } else {
            console.error(
              "Expected olderMessages to be an array, but got:",
              olderMessages
            );
          }
        }
        setIsLoading(false);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load more messages"
        );
        setIsLoading(false);
        return false;
      }
    },
    [currentRoom]
  );

  return {
    isConnected,
    error,
    messages,
    typingUsers,
    roomUsers,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendTypingIndicator,
    markMessagesAsRead,
    uploadFile,
    currentRoom,
    isLoading,
    loadMoreMessages,
  };
}
