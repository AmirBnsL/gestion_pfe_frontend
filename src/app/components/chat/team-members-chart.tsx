"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { MessageSquare, UserPlus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Supervisor {
  id: string;
  name: string;
  avatar?: string;
}

interface ProjectData {
  supervisor: Supervisor;
  teamMembers: TeamMember[];
}

interface TeamMembersChartProps {
  projectData: ProjectData;
}

const TeamMembersList = ({ members }: { members: TeamMember[] }) => {
  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div key={member.id} className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 border border-slate-700">
            <img
              src={member.avatar || "/placeholder.svg?height=32&width=32"}
              alt={member.name}
            />
          </Avatar>
          <div>
            <p className="text-sm font-medium text-slate-200">{member.name}</p>
            <p className="text-xs text-slate-400">{member.role}</p>
          </div>
        </div>
      ))}
      {members.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-2">
          No team members yet
        </p>
      )}
    </div>
  );
};

export default function TeamMembersChart({
  projectData,
}: TeamMembersChartProps) {
  return (
    <Card className="h-[600px] bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6 overflow-y-auto h-full">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200">Supervisor</h3>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-purple-500/50">
                <img
                  src={
                    projectData.supervisor.avatar ||
                    "/placeholder.svg?height=48&width=48"
                  }
                  alt={projectData.supervisor.name}
                />
              </Avatar>
              <div>
                <p className="font-medium text-slate-200">
                  {projectData.supervisor.name}
                </p>
                <p className="text-sm text-slate-400">Supervisor</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Supervisor
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-200">
                Team Members
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <UserPlus className="h-4 w-4" />
                <span className="sr-only">Add team member</span>
              </Button>
            </div>
            <TeamMembersList members={projectData.teamMembers} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
