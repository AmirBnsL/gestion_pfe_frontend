"use client";
import React, { useState, useRef } from "react";
import { Send, Paperclip, Mic } from "lucide-react"; // Additional icons

interface ChatInputBoxProps {
  onSend?: (msg: string) => void;
  onAttachment?: (file: File) => void;
  onVoiceMessage?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  onSend,
  onAttachment,
  onVoiceMessage,
  placeholder = "Type your message...",
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend?.(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachment) {
      onAttachment(file);
    }
    // Reset the input to allow selecting the same file again
    if (e.target) e.target.value = "";
  };

  // Auto-resize input based on content (for multi-line if needed)
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*, video/*, audio/*, .pdf, .doc, .docx"
      />

      <div
        className={`flex items-center p-2 transition-all duration-200 ${
          isFocused ? "bg-gray-700/30" : "bg-gray-700/20"
        } rounded-2xl`}
      >
        {/* Attachment button */}
        <button
          onClick={handleAttachmentClick}
          disabled={disabled}
          className="p-2 rounded-full hover:bg-gray-300/20 transition-colors"
          title="Attach file"
        >
          <Paperclip className="text-white w-5 h-5" />
        </button>

        {/* Emoji picker (placeholder - would integrate with a library like emoji-picker-react) */}

        {/* Main input */}
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 text-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none bg-transparent"
        />

        {/* Voice message or send button */}
        {message.trim() ? (
          <button
            onClick={handleSend}
            disabled={disabled}
            className="p-2 rounded-full hover:bg-blue-500/20 transition-colors"
            title="Send"
          >
            <Send className="text-blue-400 w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onVoiceMessage}
            disabled={disabled}
            className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
            title="Record voice message"
          >
            <Mic className="text-red-400 w-5 h-5" />
          </button>
        )}
      </div>

      {/* Character counter (optional) */}
      {isFocused && (
        <div className="absolute bottom-full right-0 mb-1 text-xs text-gray-400">
          {message.length}/500
        </div>
      )}
    </div>
  );
};

export default ChatInputBox;
