"use client"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { MessageSquare, UserPlus } from "lucide-react"
import {TeamMembersList} from "./team-members-list"

const dummySupervisor = {
  avatarUrl: "/placeholder.svg",
  name: "Dr. John Doe",
  specialization: "Software Engineering",
}

const dummyTeamMembers = [
  {
    id: "1",
    joinedAt: "2024-05-01",
    student: {
      firstname: "Alice",
      lastname: "Smith",
      job: "Developer"
    }
  },
  {
    id: "2",
    joinedAt: "2024-05-02",
    student: {
      firstname: "Bob",
      lastname: "Johnson",
      job: "Designer"
    }
  }
]

const dummyProject = {
  title: "AI-powered Project Management Tool",
  description: "A web application that leverages AI to help teams manage projects efficiently by automating task assignments and tracking progress.",
  supervisor: dummySupervisor,
  teamMembers: dummyTeamMembers
}

export function ProjectSettings() {
  const projectTitle = dummyProject.title
  const projectDescription = dummyProject.description
  const supervisor = dummyProject.supervisor
  const teamMembers = dummyProject.teamMembers

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Project Details Card */}
      <Card className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent mb-1">
                Project Details
              </h2>
              <p className="text-slate-400 text-sm">Information about the assigned project.</p>
            </div>
            <div className="space-y-4">
              {/* Display Project Title */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-300">
                  Project Title
                </h3>
                <p className="text-slate-200">{projectTitle}</p>
              </div>

              {/* Display Project Description */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-300">
                  Project Description
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {projectDescription}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supervisor and Team Members Card */}
      <Card className="col-span-1 bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Supervisor Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-200">Supervisor</h3>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border-2 border-purple-500/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={supervisor.avatarUrl} alt={supervisor.name} />
                </Avatar>
                <div>
                  <p className="font-medium text-slate-200">{supervisor.name}</p>
                  <p className="text-sm text-slate-400">{supervisor.specialization}</p>
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

            {/* Team Members Section */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-200">Team Members</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="sr-only">Add team member</span>
                </Button>
              </div>
              <TeamMembersList members={teamMembers} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}