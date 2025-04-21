"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import ChatInputBox from "./chat-input-box";
import { Card, CardContent } from "@/app/components/ui/card";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
  avatar: string;
  isSentByUser: boolean;
}

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const id = "123";

  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem(`chat-${id}`);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        try {
          const res = await fetch("/mock-discussion.json");
          const data = await res.json();
          setMessages(data);
        } catch (error) {
          console.error("Failed to load mock data:", error);
          // Set some default messages if fetch fails
          setMessages([
            {
              sender: "System",
              text: "Welcome to the chat! Start a conversation.",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              avatar: "/placeholder.svg?height=40&width=40",
              isSentByUser: false,
            },
          ]);
        }
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`chat-${id}`, JSON.stringify(messages));
    }
  }, [messages, id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = (message: string) => {
    if (message.trim()) {
      const newMessage: Message = {
        sender: "You",
        text: message,
        timestamp: getCurrentTime(),
        avatar: "/placeholder.svg?height=40&width=40",
        isSentByUser: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsResponding(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "Assistant",
            text: "Thanks for your message! This is a simulated response.",
            timestamp: getCurrentTime(),
            avatar: "/placeholder.svg?height=40&width=40",
            isSentByUser: false,
          },
        ]);
        setIsResponding(false);
      }, 1000);
    }
  };

  const handleAttachment = (file: File) => {
    // Handle file attachment
    const newMessage: Message = {
      sender: "You",
      text: `[Attachment: ${file.name}]`,
      timestamp: getCurrentTime(),
      avatar: "/placeholder.svg?height=40&width=40",
      isSentByUser: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleVoiceMessage = () => {
    // Handle voice message initiation
    console.log("Voice message recording started");
  };

  return (
    <Card className="h-[600px] bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-slate-200">Chat</h3>
          <div className="text-xs text-slate-400">Topic: General</div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((message, index) => (
            <ChatMessage
              key={`${id}-${index}`}
              avatarUrl={message.avatar}
              name={message.sender}
              message={message.text}
              timestamp={message.timestamp}
              isSentByUser={message.isSentByUser}
            />
          ))}
          {isResponding && (
            <div className="flex items-start space-x-3 p-2">
              <div className="flex-shrink-0">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Assistant avatar"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
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
            onVoiceMessage={handleVoiceMessage}
            disabled={isResponding}
            placeholder="Type your message..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
