"use client";
import { useState, useRef, useEffect } from "react";
import type React from "react";

import { Send, Paperclip, Mic } from "lucide-react";
import FileAttachmentPreview from "./file-attachment-preview";

interface ChatInputBoxProps {
  onSend?: (msg: string) => void;
  onAttachment?: (file: File) => void;
  onVoiceMessage?: () => void;
  onTyping?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  onSend,
  onAttachment,
  onVoiceMessage,
  onTyping,
  placeholder = "Type your message...",
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() !== "" && onSend) {
      onSend(message);
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
    if (file) {
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewFile({
            file,
            preview: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      } else {
        // For non-images, just store the file
        setPreviewFile({
          file,
          preview: "",
        });
      }

      // If attachment handler is provided, call it
      if (onAttachment) {
        onAttachment(file);
      }
    }
    // Reset the input to allow selecting the same file again
    if (e.target) e.target.value = "";
  };

  const clearFilePreview = () => {
    setPreviewFile(null);
  };

  // Handle typing notification
  useEffect(() => {
    if (message.trim() && onTyping) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      onTyping();
      typingTimeoutRef.current = setTimeout(() => {
        typingTimeoutRef.current = null;
      }, 1000);
    }
  }, [message, onTyping]);

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

      {/* File preview */}
      {previewFile && (
        <div className="mb-2">
          <FileAttachmentPreview
            url={previewFile.preview || "/placeholder.svg?height=40&width=40"}
            fileName={previewFile.file.name}
            fileType={previewFile.file.type}
            fileSize={previewFile.file.size}
            onRemove={clearFilePreview}
            isPreview={true}
          />
        </div>
      )}

      <div
        className={`flex items-center p-2 transition-all duration-200 ${
          isFocused ? "bg-slate-800/50" : "bg-slate-800/30"
        } rounded-xl border ${
          isFocused ? "border-purple-500/30" : "border-slate-700"
        }`}
      >
        {/* Attachment button */}
        <button
          onClick={handleAttachmentClick}
          disabled={disabled}
          className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
          title="Attach file"
        >
          <Paperclip className="text-slate-400 w-5 h-5" />
        </button>

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
          className="flex-1 text-slate-200 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none bg-transparent"
          maxLength={500}
        />

        {/* Voice message or send button */}
        {message.trim() ? (
          <button
            onClick={handleSend}
            disabled={disabled}
            className="p-2 rounded-full hover:bg-purple-500/20 transition-colors"
            title="Send"
          >
            <Send className="text-purple-400 w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onVoiceMessage}
            disabled={disabled}
            className="p-2 rounded-full hover:bg-purple-500/20 transition-colors"
            title="Record voice message"
          >
            <Mic className="text-purple-400 w-5 h-5" />
          </button>
        )}
      </div>

      {/* Character counter */}
      {isFocused && (
        <div className="absolute bottom-full right-0 mb-1 text-xs text-slate-400">
          {message.length}/500
        </div>
      )}
    </div>
  );
};

export default ChatInputBox;
