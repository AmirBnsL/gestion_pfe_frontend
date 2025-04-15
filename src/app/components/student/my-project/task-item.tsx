"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Avatar } from "../../../components/ui/avatar"
import { Edit, MessageSquare, Paperclip, Trash2 } from "lucide-react"
import type { Task, TeamMember } from "./my-project-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

interface TaskItemProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  teamMembers: TeamMember[]
}

export function TaskItem({ task, onEdit, onDelete, teamMembers }: TaskItemProps) {
  const [status, setStatus] = useState(task.status || "Active")

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // Update task status logic would go here
  }

  const assignedMember = teamMembers.find((member) => member.id === task.assignedTo)

  return (
    <div className="p-3 bg-slate-900/50 border border-slate-700 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h5 className="font-medium text-slate-200">{task.title}</h5>
        <div className="flex items-center space-x-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`w-24 h-7 text-xs ${
                status === "Active"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-green-500/20 text-green-400 border-green-500/30"
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
            onClick={onEdit}
          >
            <Edit className="h-3.5 w-3.5" />
            <span className="sr-only">Edit</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-3">{task.description}</p>

      <div className="flex items-center justify-between">
        {assignedMember ? (
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6 border border-slate-700">
              <img src={assignedMember.avatar || "/placeholder.svg"} alt={assignedMember.name} />
            </Avatar>
            <span className="text-xs text-slate-300">{assignedMember.name}</span>
          </div>
        ) : (
          <span className="text-xs text-slate-500">Unassigned</span>
        )}

        <div className="flex items-center space-x-2">
          {task.attachments && task.attachments.length > 0 && (
            <div className="flex items-center text-xs text-slate-400">
              <Paperclip className="h-3.5 w-3.5 mr-1" />
              <span>{task.attachments.length}</span>
            </div>
          )}

          {task.comments && task.comments.length > 0 && (
            <div className="flex items-center text-xs text-slate-400">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
