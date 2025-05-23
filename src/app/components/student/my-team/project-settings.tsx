"use client"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { MessageSquare, UserPlus } from "lucide-react"
import { TeamMembersList } from "./team-members-list"
import { projectData } from "./my-project-data" // Assuming this might be replaced later
import { Team } from "@/app/components/student/teams-list/teamTypes";


export function ProjectSettings({ team }: { team: Team }) {

  // Use project details from the team prop
  const projectTitle = team.project?.title || "No Project Assigned";
  const projectDescription = team.project?.description || "No project description available.";
  // Use supervisor and members from team prop if available, otherwise fallback to placeholder data
  const supervisor = team.project?.supervisor || projectData.supervisor; // Adjust based on actual Team structure
  const teamMembers = team.members || projectData.teamMembers; // Adjust based on actual Team structure

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
                    {/* Use supervisor data from team prop */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ "/placeholder.svg"} alt={supervisor.specialization} />
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-200">name</p>
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

              {/* Team Members Section */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-200">Team Members</h3>
                  {/* Keep Add member button for potential future use, or remove if not needed */}
                  <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="sr-only">Add team member</span>
                  </Button>
                </div>
                {/* Use team members data from team prop */}
                <TeamMembersList members={teamMembers} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}