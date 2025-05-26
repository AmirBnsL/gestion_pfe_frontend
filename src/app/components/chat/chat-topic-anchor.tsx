"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface Topic {
  id: string;
  name: string;
  unreadCount?: number;
}

interface ChatTopicAnchorProps {
  topics: Topic[];
  onSelectTopic?: (topicId: string) => void;
  selectedTopicId?: string;
}

const ChatTopicAnchor: React.FC<ChatTopicAnchorProps> = ({
  topics,
  onSelectTopic,
  selectedTopicId = "general",
}) => {
  const [activeTopic, setActiveTopic] = useState<string>(selectedTopicId);

  const handleTopicClick = (topicId: string) => {
    setActiveTopic(topicId);
    if (onSelectTopic) {
      onSelectTopic(topicId);
    }
  };

  return (
    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-medium text-slate-200 mb-4">Chat Topics</h3>
      <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex space-x-2 min-w-max">
          {topics.map((topic) => (
            <Button
              key={topic.id}
              variant={activeTopic === topic.id ? "default" : "outline"}
              className={`relative ${
                activeTopic === topic.id
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              onClick={() => handleTopicClick(topic.id)}
            >
              {topic.name}
              {topic.unreadCount && topic.unreadCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 bg-red-500 text-white border-none"
                  variant="outline"
                >
                  {topic.unreadCount}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(124, 58, 237, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(124, 58, 237, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ChatTopicAnchor;
