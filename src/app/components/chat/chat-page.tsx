"use client";
import type React from "react";
import ChatBox from "./chat-box";
import dynamic from "next/dynamic";
import ChatTopicAnchor from "./chat-topic-anchor";
import TeamMembersChart from "./team-members-chart";

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

const topics = [
  { id: "1", name: "General" },
  { id: "2", name: "Support" },
  { id: "3", name: "Feedback" },
  { id: "4", name: "Updates" },
  { id: "5", name: "Announcements" },
  { id: "6", name: "Events" },
  { id: "7", name: "Resources" },
  { id: "8", name: "Community" },
  { id: "9", name: "Collaboration" },
];

// Particle background (optional for visual consistency with dashboard)
const ParticleBackground = dynamic(
  () => import("@/app/components/ui/particle-background"),
  { loading: () => null }
);

const CommunicationPage: React.FC = () => {
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
            <ChatTopicAnchor topics={topics} />
          </div>

          {/* Horizontal layout for ChatBox and TeamMembersChart */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ChatBox - takes more space */}
            <div className="lg:w-2/3">
              <ChatBox />
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
