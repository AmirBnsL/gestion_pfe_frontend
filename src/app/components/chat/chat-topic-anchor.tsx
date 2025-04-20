import React from "react";
import Link from "next/link";

interface ChatTopicAnchorProps {
  topics: { id: string; name: string }[];
}

const ChatTopicAnchor: React.FC<ChatTopicAnchorProps> = ({ topics }) => {
  return (
    <div className="chat-topic-anchor">
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={`/chat/${topic.id}`}
          className="chat-topic-link"
        >
          {topic.name}
        </Link>
      ))}
    </div>
  );
};

export default ChatTopicAnchor;
