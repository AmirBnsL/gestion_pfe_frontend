"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import ChatInputBox from "./chat-input-box";
import { Card, CardContent } from "@/app/components/ui/card";
import { useSocket } from "@/app/hooks/use-socket";
import { Badge } from "@/app/components/ui/badge";
import { AlertCircle, Users, ArrowUp } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface ChatBoxProps {
  userId: string;
  userName: string;
  roomId: string;
  avatarUrl?: string;
}

interface Message {
  id: string;
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [page, setPage] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

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
    isLoading,
    loadMoreMessages,
  } = useSocket();

  // Join room on component mount
  useEffect(() => {
    if (isConnected && roomId) {
      joinRoom(roomId);
    }

    return () => {
      if (isConnected && roomId) {
        leaveRoom(roomId);
      }
    };
  }, [isConnected, roomId, joinRoom, leaveRoom]);

  // Convert socket messages to UI messages
  useEffect(() => {
    if (messages.length > 0) {
      const formattedMessages = messages.map((msg) => ({
        id: msg.id,
        sender: msg.sender === "System" ? "System" : msg.sender,
        senderId: msg.senderId,
        text: msg.message,
        timestamp:
          typeof msg.timestamp === "string"
            ? msg.timestamp
            : new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [localMessages]);

  // Track scroll position to show/hide scroll-to-bottom button
  useEffect(() => {
    const handleScroll = () => {
      if (messagesContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          messagesContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom);
      }
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
    if (message.trim() && isConnected && currentRoom) {
      // Make sure we're sending to the current room
      const sent = sendMessage(message, currentRoom);

      if (sent) {
        // Add message to local state immediately for better UX
        const newMessage: Message = {
          id: `local-${Date.now()}`,
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
    if (currentRoom) {
      sendTypingIndicator(currentRoom);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null;
    }, 3000);
  };

  const handleAttachment = async (file: File) => {
    if (!currentRoom) return;

    try {
      await uploadFile(file, currentRoom);
      // The actual message will come from the server
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleLoadMoreMessages = async () => {
    if (isLoading || !hasMoreMessages) return;

    const nextPage = page + 1;
    const limit = 20;
    const offset = nextPage * limit;

    const success = await loadMoreMessages(offset, limit);
    if (success) {
      setPage(nextPage);
    } else {
      setHasMoreMessages(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar relative"
        >
          {isLoading && page === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400 text-sm">Loading messages...</p>
            </div>
          ) : localMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400 text-sm">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            <>
              {hasMoreMessages && (
                <div className="py-2 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLoadMoreMessages}
                    disabled={isLoading}
                    className="text-slate-400 hover:text-slate-300"
                  >
                    {isLoading ? "Loading..." : "Load older messages"}
                  </Button>
                </div>
              )}

              {localMessages.map((message) => (
                <ChatMessage
                  key={`${message.id}-${message.timestamp}`}
                  avatarUrl={message.avatar}
                  name={message.sender}
                  message={message.text}
                  timestamp={message.timestamp}
                  isSentByUser={message.isSentByUser}
                  editable={message.isSentByUser}
                  attachments={message.attachments}
                  onMessageChange={(newMessage) => {
                    // Here you would implement message editing
                    // This would require additional backend support
                    console.log("Message edited:", newMessage);
                  }}
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
            </>
          )}

          {showScrollButton && (
            <Button
              className="absolute bottom-2 right-2 rounded-full p-2 bg-purple-600 hover:bg-purple-700 shadow-lg"
              size="icon"
              onClick={scrollToBottom}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          )}
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
