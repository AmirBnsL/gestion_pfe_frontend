import React, { useState, useEffect, useRef } from "react";

interface ChatMessageProps {
  avatarUrl?: string;
  name?: string;
  message?: string;
  timestamp?: string;
  isSentByUser?: boolean;
  onMessageChange?: (newMessage: string) => void;
  editable?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  avatarUrl = "/api/placeholder/40/40",
  name = "John Doe",
  message = "Hello, how are you today?",
  timestamp = "10:45 AM",
  isSentByUser = false,
  onMessageChange,
  editable = false,
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState("90%");
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const containerClasses = isSentByUser
    ? "flex items-end justify-end space-x-2 space-x-reverse"
    : "flex items-start space-x-2";

  const messageBubbleStyle = {
    borderRadius: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: isSentByUser
      ? "rgba(100, 65, 236, 0.12)"
      : "rgba(255, 255, 255, 0.05)",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    maxWidth: maxWidth,
    wordBreak: "break-word" as const,
  };

  const messageTextColor = isSentByUser ? "text-indigo-200" : "text-gray-200";

  useEffect(() => {
    if (messageRef.current && message) {
      const lineCount = (message.match(/\n/g) || []).length + 1;
      const avgCharsPerLine = message.length / lineCount;

      if (avgCharsPerLine > 60 || lineCount > 5) {
        setMaxWidth("min(90%, 600px)");
      } else if (avgCharsPerLine > 40 || lineCount > 3) {
        setMaxWidth("min(90%, 450px)");
      } else {
        setMaxWidth("min(90%, 300px)");
      }
    }
  }, [message]);

  const handleSaveEdit = () => {
    if (editedMessage.length <= 500 && onMessageChange) {
      onMessageChange(editedMessage);
    }
    setIsEditing(false);
  };

  return (
    <div className={`${containerClasses} px-2 py-1 w-full group`}>
      {/* Avatar */}
      {!isSentByUser && (
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-10 h-10 rounded-full object-cover shadow-md flex-shrink-0"
        />
      )}

      {/* Message content */}
      <div
        ref={messageRef}
        style={messageBubbleStyle}
        className={`p-3 transition-all duration-200 relative ${
          isSentByUser ? "ml-2" : "mr-2"
        }`}
      >
        {!isSentByUser && (
          <p className="text-sm font-semibold text-white">{name}</p>
        )}

        {isEditing ? (
          <div className="relative">
            <textarea
              value={editedMessage}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setEditedMessage(e.target.value);
                }
              }}
              className={`w-full mt-1 ${messageTextColor} bg-transparent resize-none focus:outline-none`}
              rows={3}
              autoFocus
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">
                {editedMessage.length}/500
              </span>
              <button
                onClick={handleSaveEdit}
                className="px-2 py-1 text-xs bg-blue-500 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <p
              className={`mt-1 ${messageTextColor} whitespace-pre-line break-words`}
            >
              {message}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400 mt-2">{timestamp}</p>
              {editable && isSentByUser && (
                <button
                  onClick={() => {
                    setEditedMessage(message);
                    setIsEditing(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-white transition-opacity"
                >
                  Edit
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Avatar for sent messages */}
      {isSentByUser && (
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-10 h-10 rounded-full object-cover shadow-md flex-shrink-0"
        />
      )}
    </div>
  );
};

export default ChatMessage;
