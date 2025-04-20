import React, { useState } from "react";
import Link from "next/link";
import TestDialog from "./create-topic-chart"; // Import your CreateTopicChart component
// Replace this with your actual component when you create it

interface ChatTopicAnchorProps {
  topics: { id: string; name: string }[];
}

const ChatTopicAnchor: React.FC<ChatTopicAnchorProps> = ({ topics }) => {
  const [showCreateTopic, setShowCreateTopic] = useState(false);

  const toggleCreateTopic = () => setShowCreateTopic((prev) => !prev);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 p-2 bg-transparent">
        {topics.map((topic) => (
          <React.Fragment key={topic.id}>
            <Link
              href={`/chat/${topic.id}`}
              className="px-4 py-2 rounded-xl bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors font-medium"
            >
              {topic.name}
            </Link>
            {/* Render "+" button after the last topic */}
            {topic.id === topics[topics.length - 1].id && (
              <button
                onClick={toggleCreateTopic}
                className="px-4 py-2 rounded-xl bg-green-100 text-green-800 hover:bg-green-200 transition-colors font-medium"
              >
                +
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Conditional rendering of the CreateTopicChart component */}
      {showCreateTopic && <TestDialog />}
    </div>
  );
};

export default ChatTopicAnchor;
