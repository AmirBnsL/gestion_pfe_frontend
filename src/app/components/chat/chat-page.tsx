"use client";
import type React from "react";
import { useState, useEffect } from "react";
import ChatBox from "./chat-box";
import dynamic from "next/dynamic";
import ChatTopicAnchor from "./chat-topic-anchor";
import TeamMembersChart from "./team-members-chart";
import { useSocket } from "@/app/hooks/use-socket";
import { chatApi } from "@/app/lib/chat-api-client";

// This would come from your API in a real application
const projectData = {
  supervisor: {
    id: "sup1",
    name: "Dr. Sarah Johnson",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  teamMembers: [
    {
      id: "tm1",
      name: "Alex Chen",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "tm2",
      name: "Maria Garcia",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "tm3",
      name: "James Wilson",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "tm4",
      name: "Aisha Patel",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
};

// This would come from your API in a real application
const initialTopics = [
  { id: "general", name: "General" },
  { id: "support", name: "Support" },
  { id: "feedback", name: "Feedback" },
  { id: "updates", name: "Updates" },
  { id: "announcements", name: "Announcements" },
  { id: "events", name: "Events" },
  { id: "resources", name: "Resources" },
  { id: "community", name: "Community" },
  { id: "collaboration", name: "Collaboration" },
];

// Particle background (optional for visual consistency with dashboard)
const ParticleBackground = dynamic(
  () => import("@/app/components/ui/particle-background"),
  { loading: () => null }
);

const CommunicationPage: React.FC = () => {
  // In a real app, this would come from your authentication context
  const userId = "user-123"; // This should match the ID from your JWT token
  const userName = "Current User"; // This should be fetched from your user profile

  // State for the selected topic/room
  const [selectedTopic, setSelectedTopic] = useState("general");
  const [topics, setTopics] = useState(initialTopics);

  // Socket connection for real-time updates
  const { isConnected } = useSocket();

  // Function to handle topic selection
  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  // Fetch unread counts for each topic
  useEffect(() => {
    if (!isConnected) return;

    // Function to update unread counts
    const updateUnreadCounts = async () => {
      try {
        const updatedTopics = await Promise.all(
          topics.map(async (topic) => {
            try {
              const unreadCount = await chatApi.getUnreadCount(topic.id);
              return { ...topic, unreadCount };
            } catch (error) {
              console.error(
                `Error fetching unread count for ${topic.id}:`,
                error
              );
              return topic;
            }
          })
        );

        setTopics(updatedTopics);
      } catch (error) {
        console.error("Error updating unread counts:", error);
      }
    };

    // Initial update
    updateUnreadCounts();

    // Set up interval to periodically check for unread messages
    const intervalId = setInterval(updateUnreadCounts, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-[#0F1022] text-white relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse" />
      <div
        className="fixed top-3/4 right-1/4 w-1/3 h-1/3 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed bottom-1/4 left-1/3 w-1/4 h-1/4 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Particle overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleBackground />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-7xl">
          {/* Topics anchor - full width */}
          <div className="mb-6">
            <ChatTopicAnchor
              topics={topics}
              onSelectTopic={handleTopicSelect}
              selectedTopicId={selectedTopic}
            />
          </div>

          {/* Horizontal layout for ChatBox and TeamMembersChart */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ChatBox - takes more space */}
            <div className="lg:w-2/3">
              <ChatBox
                userId={userId}
                userName={userName}
                roomId={selectedTopic}
                avatarUrl="/placeholder.svg?height=40&width=40"
              />
            </div>

            {/* TeamMembersChart - takes less space */}
            <div className="lg:w-1/3">
              <TeamMembersChart projectData={projectData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
