"use client";
import type React from "react";
import { useState, useEffect } from "react";
import ChatBox from "./chat-box";
import dynamic from "next/dynamic";
import ChatTopicAnchor from "./chat-topic-anchor";
import TeamMembersChart from "./team-members-chart";
import { useSocket } from "@/app/hooks/use-socket";
import { Badge } from "@/app/components/ui/badge";
import { Bell } from "lucide-react";

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
  // Mock user data - in a real app, this would come from authentication
  const userId = "user123";
  const userName = "Current User";
  const roomId = "general";
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const { announcements, isConnected } = useSocket();
  const [hasNewAnnouncement, setHasNewAnnouncement] = useState(false);

  // Check for new announcements
  useEffect(() => {
    if (announcements.length > 0) {
      setHasNewAnnouncement(true);
    }
  }, [announcements]);

  // Reset new announcement indicator when announcements are viewed
  useEffect(() => {
    if (showAnnouncements) {
      setHasNewAnnouncement(false);
    }
  }, [showAnnouncements]);

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
          {/* Header with announcements button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">
              Project Communication
            </h1>
            <button
              onClick={() => setShowAnnouncements(!showAnnouncements)}
              className="relative p-2 rounded-full hover:bg-slate-800/50 transition-colors"
            >
              <Bell className="h-6 w-6 text-slate-300" />
              {hasNewAnnouncement && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Announcements panel */}
          {showAnnouncements && (
            <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-slate-200">
                  Announcements
                </h3>
                <Badge
                  variant="outline"
                  className={
                    isConnected
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }
                >
                  {isConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {announcements.length === 0 ? (
                  <p className="text-slate-400 text-sm">
                    No announcements yet.
                  </p>
                ) : (
                  announcements.map((announcement, index) => (
                    <div
                      key={index}
                      className="p-3 bg-slate-700/30 border border-slate-600/50 rounded-md"
                    >
                      <p className="text-slate-200">{announcement.message}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(announcement.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Topics anchor - full width */}
          <div className="mb-6">
            <ChatTopicAnchor topics={topics} />
          </div>

          {/* Horizontal layout for ChatBox and TeamMembersChart */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ChatBox - takes more space */}
            <div className="lg:w-2/3">
              <ChatBox
                userId={userId}
                userName={userName}
                roomId={roomId}
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
