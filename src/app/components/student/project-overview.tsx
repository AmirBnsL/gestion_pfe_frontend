"use client"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { CalendarIcon, Clock, Mail, MessageSquare, Upload } from "lucide-react"
import { TeamMembers } from "../../components/student/team-members"
import { TaskBoard } from "../../components/student/task-board"
import { SubmissionHistory } from "../../components/student/submission-history"
import { DeadlinesCalendar } from "../../components/student/deadlines-calendar"

export function ProjectOverview() {
  // Project completion percentage
  const projectProgress = 68

  // Project status options
  const statusOptions = {
    ongoing: { label: "Ongoing", color: "bg-blue-500" },
    submitted: { label: "Submitted", color: "bg-yellow-500" },
    approved: { label: "Approved", color: "bg-green-500" },
    needsRevision: { label: "Needs Revision", color: "bg-red-500" },
  }

  // Current project status
  const currentStatus = statusOptions.ongoing

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - 2/3 width on desktop */}
      <div className="lg:col-span-2 space-y-6">
        {/* Project Details Section */}
        <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
                  Smart City Traffic Management System
                </CardTitle>
                <p className="text-slate-400 mt-1">
                  An IoT-based solution for optimizing traffic flow in urban areas using machine learning algorithms.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <Badge className={`${currentStatus.color} text-white px-3 py-1 text-sm`}>{currentStatus.label}</Badge>
                <div className="flex items-center text-sm text-slate-400">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Last updated: 2 hours ago
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Project Progress</span>
                <span className="text-sm font-medium">{projectProgress}%</span>
              </div>
              <Progress value={projectProgress} className="h-2 bg-slate-700" indicatorClassName="bg-purple-500" />
            </div>
          </CardContent>
        </Card>

        {/* Team Members Section */}
        <TeamMembers />

        {/* Tabs for Task Board and Submission History */}
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md bg-[#161A35]/50 border border-[#2A2F52] p-1 rounded-lg">
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300"
            >
              Task Management
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300"
            >
              Submission History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="mt-4">
            <TaskBoard />
          </TabsContent>
          <TabsContent value="submissions" className="mt-4">
            <SubmissionHistory />
          </TabsContent>
        </Tabs>

        {/* Deadlines & Important Dates */}
        <DeadlinesCalendar />
      </div>

      {/* Sidebar - 1/3 width on desktop */}
      <div className="space-y-6">
        {/* Supervisor Information */}
        <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
              Supervisor Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16 border border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Sarah chiwawa" />
                <AvatarFallback className="bg-slate-700 text-slate-300">SC</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">Sarah chiwawa</h3>
                <p className="text-slate-400 text-sm">Associate Professor, Computer Science</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-500/20 text-green-300 border-green-500/30 flex items-center gap-1"
                >
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Available Now
                </Badge>
              </div>

              <div className="text-sm">
                <p className="font-medium">Office Hours:</p>
                <p className="text-slate-400">Mon, Wed: 2:00 PM - 4:00 PM</p>
                <p className="text-slate-400">Fri: 10:00 AM - 12:00 PM</p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <Mail className="h-4 w-4" />
                  Email Supervisor
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
                >
                  <MessageSquare className="h-4 w-4" />
                  Request Meeting
                </Button>
              </div>
            </div>

            <div className="mt-6 border-t border-[#2A2F52] pt-4">
              <h4 className="font-medium mb-2">Recent Feedback</h4>
              <div className="bg-[#1A1F3D] p-3 rounded-md text-sm border border-[#2A2F52]">
                <p>
                  "Good progress on the data collection module. Please focus on improving the algorithm efficiency for
                  the next milestone."
                </p>
                <p className="text-xs text-slate-400 mt-2">Received: 3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Upload className="h-4 w-4" />
              Submit New Document
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
            >
              <MessageSquare className="h-4 w-4" />
              Message Team
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
            >
              <CalendarIcon className="h-4 w-4" />
              Schedule Team Meeting
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
