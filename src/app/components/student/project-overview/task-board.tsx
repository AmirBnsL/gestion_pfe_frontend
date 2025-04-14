"use client"

import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { projectOverviewData } from "./project-overview-data"

export function TaskBoard() {
  const { tasks } = projectOverviewData

  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    review: tasks.filter((task) => task.status === "review"),
    completed: tasks.filter((task) => task.status === "completed"),
  }

  // Get priority color based on task priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* To Do Column */}
      <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">To Do</h3>
            <Badge variant="outline" className="bg-slate-500/20 text-slate-300 border-slate-500/30">
              {tasksByStatus.todo.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {tasksByStatus.todo.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-md bg-[#1A1F3D]/50 border border-[#2A2F52] hover:border-purple-500/50 transition-colors cursor-pointer"
              >
                <h4 className="text-sm font-medium mb-1">{task.title}</h4>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-slate-400">Due {formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                    <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                      {task.assignedTo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-400">{task.assignedTo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* In Progress Column */}
      <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">In Progress</h3>
            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {tasksByStatus["in-progress"].length}
            </Badge>
          </div>
          <div className="space-y-2">
            {tasksByStatus["in-progress"].map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-md bg-[#1A1F3D]/50 border border-[#2A2F52] hover:border-purple-500/50 transition-colors cursor-pointer"
              >
                <h4 className="text-sm font-medium mb-1">{task.title}</h4>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-slate-400">Due {formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                    <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                      {task.assignedTo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-400">{task.assignedTo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Column */}
      <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Review</h3>
            <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
              {tasksByStatus.review.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {tasksByStatus.review.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-md bg-[#1A1F3D]/50 border border-[#2A2F52] hover:border-purple-500/50 transition-colors cursor-pointer"
              >
                <h4 className="text-sm font-medium mb-1">{task.title}</h4>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-slate-400">Due {formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                    <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                      {task.assignedTo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-400">{task.assignedTo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Column */}
      <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Completed</h3>
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              {tasksByStatus.completed.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {tasksByStatus.completed.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-md bg-[#1A1F3D]/50 border border-[#2A2F52] hover:border-purple-500/50 transition-colors cursor-pointer"
              >
                <h4 className="text-sm font-medium mb-1">{task.title}</h4>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-slate-400">Due {formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                    <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                      {task.assignedTo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-400">{task.assignedTo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
