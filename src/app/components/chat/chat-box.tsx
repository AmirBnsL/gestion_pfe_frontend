"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./chat-message";
import ChatInputBox from "./chat-input-box"; // Import the new component

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
        const res = await fetch("/mock-discussion.json");
        const data = await res.json();
        setMessages(data);
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
        avatar: "/api/placeholder/40/40",
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
            avatar: "/api/placeholder/40/40",
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
      avatar: "/api/placeholder/40/40",
      isSentByUser: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleVoiceMessage = () => {
    // Handle voice message initiation
    console.log("Voice message recording started");
  };

  return (
    <div className="mx-auto mt-10 flex flex-col h-[600px] w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur-lg ">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                src="/api/placeholder/40/40"
                alt="Assistant avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="p-3 rounded-lg bg-gray-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 🧃 Replaced with the new ChatInputBox component */}
      <div className="mt-4 px-4 pt-4 border-t border-gray-200">
        <ChatInputBox
          onSend={handleSend}
          onAttachment={handleAttachment}
          onVoiceMessage={handleVoiceMessage}
          disabled={isResponding}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatBox;
