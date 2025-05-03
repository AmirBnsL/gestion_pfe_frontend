"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { ChevronDown, ChevronUp, Clock, Edit, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import type { Sprint, Task, TeamMember } from "./my-project-data"
import { TaskItem } from "./task-item"

interface SprintItemProps {
  sprint: Sprint
  onEdit: () => void
  onDelete: () => void
  onStatusChange: (status: string) => void
  onCreateTask: () => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  teamMembers: TeamMember[]
}

export function SprintItem({
  sprint,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  teamMembers,
}: SprintItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Going":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Not Started":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateProgress = () => {
    if (sprint.tasks.length === 0) return 0
    const completedTasks = sprint.tasks.filter((task) => task.status === "Closed").length
    return Math.round((completedTasks / sprint.tasks.length) * 100)
  }

  const progress = calculateProgress()

  return (
    <Card className="bg-slate-800/50 border border-slate-700 overflow-hidden">
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center space-x-4">
          <div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-slate-200">{sprint.title}</h3>
            <p className="text-sm text-slate-400">{sprint.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-400">
              {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
            </span>
          </div>

          <Select
            value={sprint.status || "Not Started"}
            onValueChange={onStatusChange}
            onClick={(e) => e.stopPropagation()}
          >
            <SelectTrigger
              className={`w-32 h-8 text-xs border ${getStatusColor(sprint.status || "Not Started")}`}
              onClick={(e) => e.stopPropagation()}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="On Going">On Going</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <CardContent className="border-t border-slate-700 p-4 pt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-slate-300">Progress</h4>
              <span className="text-xs text-slate-400">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-slate-300">Tasks</h4>
            <Button
              size="sm"
              className="h-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm shadow-purple-900/20"
              onClick={(e) => {
                e.stopPropagation()
                onCreateTask()
              }}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add task
            </Button>
          </div>

          <div className="space-y-3">
            {sprint.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
                teamMembers={teamMembers}
              />
            ))}

            {sprint.tasks.length === 0 && (
              <div className="text-center py-4">
                <p className="text-slate-400 text-sm">No tasks created yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
