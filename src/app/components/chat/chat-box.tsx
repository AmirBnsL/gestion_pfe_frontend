"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import ChatInputBox from "./chat-input-box";
import { Card, CardContent } from "@/app/components/ui/card";
import { useSocket } from "@/app/hooks/use-socket";
import { Badge } from "@/app/components/ui/badge";
import { AlertCircle, Users } from "lucide-react";

interface ChatBoxProps {
  userId: string;
  userName: string;
  roomId: string;
  avatarUrl?: string;
}

interface Message {
  sender: string;
  senderId?: string;
  text: string;
  timestamp: string;
  avatar: string;
  isSentByUser: boolean;
  attachments?: Array<{
    url: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }>;
}

const ChatBox = ({
  userId,
  userName,
  roomId,
  avatarUrl = "/placeholder.svg?height=40&width=40",
}: ChatBoxProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    isConnected,
    error,
    messages,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendTypingIndicator,
    uploadFile,
    markMessagesAsRead,
    typingUsers,
    roomUsers,
    currentRoom,
  } = useSocket();

  // Join room on component mount
  useEffect(() => {
    if (isConnected && roomId) {
      joinRoom(roomId, userId);
    }

    return () => {
      if (isConnected && roomId) {
        leaveRoom(roomId, userId);
      }
    };
  }, [isConnected, roomId, userId, joinRoom, leaveRoom]);

  // Convert socket messages to UI messages
  useEffect(() => {
    if (messages.length > 0) {
      const formattedMessages = messages.map((msg) => ({
        sender: msg.sender === "System" ? "System" : msg.sender,
        senderId: msg.senderId,
        text: msg.message,
        timestamp: msg.timestamp,
        avatar:
          msg.sender === "System"
            ? "/placeholder.svg?height=40&width=40"
            : avatarUrl,
        isSentByUser: msg.senderId === userId || msg.sender === userName,
        attachments: msg.attachments,
      }));

      setLocalMessages(formattedMessages);
    }
  }, [messages, userId, userName, avatarUrl]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  // Mark messages as read when they appear
  useEffect(() => {
    if (messages.length > 0 && currentRoom) {
      const unreadMessageIds = messages
        .filter((msg) => !(msg.readBy || []).includes(userId))
        .map((msg) => msg.id);

      if (unreadMessageIds.length > 0) {
        markMessagesAsRead(unreadMessageIds, currentRoom);
      }
    }
  }, [messages, currentRoom, userId, markMessagesAsRead]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSend = (message: string) => {
    if (message.trim() && isConnected) {
      const sent = sendMessage(message, userName, roomId);

      if (sent) {
        // Add message to local state immediately for better UX
        const newMessage: Message = {
          sender: userName,
          senderId: userId,
          text: message,
          timestamp: getCurrentTime(),
          avatar: avatarUrl,
          isSentByUser: true,
        };

        setLocalMessages((prev) => [...prev, newMessage]);
      }

      // Clear typing indicator
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  };

  const handleTyping = () => {
    // Send typing indicator to server
    sendTypingIndicator(roomId);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null;
    }, 3000);
  };

  const handleAttachment = async (file: File) => {
    try {
      await uploadFile(file, roomId);
      // The actual message will come from the server
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Get typing users excluding the current user
  const activeTypingUsers = Object.entries(typingUsers)
    .filter(([id]) => id !== userId)
    .map(([, name]) => name);

  // Get active users count
  const activeUsersCount = roomUsers.length;

  return (
    <Card className="h-[600px] bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-slate-200">
            Chat Room: {roomId}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-slate-400 mr-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{activeUsersCount}</span>
            </div>
            {isConnected ? (
              <Badge
                variant="outline"
                className="bg-green-500/20 text-green-300 border-green-500/30"
              >
                Connected
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-red-500/20 text-red-300 border-red-500/30"
              >
                Disconnected
              </Badge>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500/30 rounded-md flex items-center text-red-300">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {localMessages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400 text-sm">
                No messages yet. Start the conversation!
              </p>
            </div>
          )}

          {localMessages.map((message, index) => (
            <ChatMessage
              key={`${index}-${message.timestamp}`}
              avatarUrl={message.avatar}
              name={message.sender}
              message={message.text}
              timestamp={message.timestamp}
              isSentByUser={message.isSentByUser}
            />
          ))}

          {activeTypingUsers.length > 0 && (
            <div className="flex items-start space-x-3 p-2">
              <div className="flex-shrink-0">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User typing"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-sm text-slate-400 mb-1">
                  {activeTypingUsers.length === 1
                    ? `${activeTypingUsers[0]} is typing...`
                    : `${activeTypingUsers.join(", ")} are typing...`}
                </p>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800">
          <ChatInputBox
            onSend={handleSend}
            onAttachment={handleAttachment}
            onTyping={handleTyping}
            disabled={!isConnected || !currentRoom}
            placeholder={
              !isConnected
                ? "Connecting to chat server..."
                : !currentRoom
                ? "Joining room..."
                : "Type your message..."
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
