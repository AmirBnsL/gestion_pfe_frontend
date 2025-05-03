"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Textarea } from "../../ui/textarea"
import { Avatar } from "../../ui/avatar"
import { MessageSquare, UserPlus } from "lucide-react"
import { TeamMembersList } from "./team-members-list"
import { projectData } from "./my-project-data"

export function ProjectSettings() {
  const [projectTitle, setProjectTitle] = useState(projectData.title)
  const [projectDescription, setProjectDescription] = useState(projectData.description)
  const [selectedProject, setSelectedProject] = useState(projectData.id)

  const handleSaveChanges = () => {
    // Save changes logic would go here
    console.log("Saving changes:", { projectTitle, projectDescription, selectedProject })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                Project Settings
              </h2>
              <p className="text-slate-400 text-sm">Update your project details and settings</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="projectTitle" className="text-sm font-medium text-slate-300">
                  Project Title
                </label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    {projectData.availableProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium text-slate-300">
                  Project
                </label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    {projectData.availableProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="projectDescription" className="text-sm font-medium text-slate-300">
                  Project Description
                </label>
                <Textarea
                  id="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Enter the full details of your project"
                  className="min-h-[120px] bg-slate-800 border-slate-700 text-slate-200"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveChanges}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20"
            >
              Save changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-200">Supervisor</h3>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border-2 border-purple-500/50">
                  <img src={projectData.supervisor.avatar || "/placeholder.svg"} alt={projectData.supervisor.name} />
                </Avatar>
                <div>
                  <p className="font-medium text-slate-200">{projectData.supervisor.name}</p>
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
              <TeamMembersList members={projectData.teamMembers} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
