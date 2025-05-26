"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { MessageSquare, Phone, Video, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status?: "online" | "offline" | "away" | "busy";
}

interface Supervisor {
  id: string;
  name: string;
  avatar: string;
  status?: "online" | "offline" | "away" | "busy";
}

interface ProjectData {
  supervisor: Supervisor;
  teamMembers: TeamMember[];
}

interface TeamMembersChartProps {
  projectData: ProjectData;
}

const TeamMembersChart: React.FC<TeamMembersChartProps> = ({ projectData }) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Function to get status color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-500"; // offline or unknown
    }
  };

  const handleStartChat = (memberId: string) => {
    // In a real app, this would open a direct message with the team member
    console.log(`Starting chat with member ${memberId}`);
    // You could navigate to a direct message room or open a modal
  };

  return (
    <Card className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-slate-200">
          Project Team
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Supervisor section */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">
            Supervisor
          </h4>
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-purple-500/30">
                <AvatarImage
                  src={projectData.supervisor.avatar || "/placeholder.svg"}
                  alt={projectData.supervisor.name}
                />
                <AvatarFallback>
                  {projectData.supervisor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-slate-200">
                  {projectData.supervisor.name}
                </p>
                <div className="flex items-center mt-1">
                  <span
                    className={`h-2 w-2 rounded-full ${getStatusColor(
                      projectData.supervisor.status
                    )} mr-2`}
                  ></span>
                  <span className="text-xs text-slate-400">
                    {projectData.supervisor.status || "offline"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                onClick={() => handleStartChat(projectData.supervisor.id)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Team members section */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">
            Team Members
          </h4>
          <div className="space-y-2">
            {projectData.teamMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  selectedMember === member.id
                    ? "bg-purple-900/20 border-purple-500/30"
                    : "bg-slate-800/50 border-slate-700/50"
                } transition-colors duration-200 hover:bg-slate-800`}
                onClick={() => setSelectedMember(member.id)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                    />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-200">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className={`h-2 w-2 rounded-full ${getStatusColor(
                      member.status
                    )} mr-1`}
                  ></span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full hover:bg-slate-700"
                      >
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-slate-800 border-slate-700"
                    >
                      <DropdownMenuItem
                        className="text-slate-200 hover:bg-slate-700 cursor-pointer"
                        onClick={() => handleStartChat(member.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-slate-200 hover:bg-slate-700 cursor-pointer">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-slate-200 hover:bg-slate-700 cursor-pointer">
                        <Video className="h-4 w-4 mr-2" />
                        Video
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembersChart;
