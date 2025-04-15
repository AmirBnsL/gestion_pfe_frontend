"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import type { Task, TeamMember } from "./my-project-data"

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask: (task: Omit<Task, "id">) => void
  sprintId: string
  teamMembers: TeamMember[]
  editingTask?: Task
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
  sprintId,
  teamMembers,
  editingTask,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState(editingTask?.title || "")
  const [description, setDescription] = useState(editingTask?.description || "")
  const [assignedTo, setAssignedTo] = useState(editingTask?.assignedTo || "")

  const handleSubmit = () => {
    if (!title) return

    onCreateTask({
      title,
      description,
      assignedTo,
      status: "Active",
      comments: [],
      attachments: [],
    })

    setTitle("")
    setDescription("")
    setAssignedTo("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-900 border border-slate-800 text-slate-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            {editingTask ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="taskTitle" className="text-sm font-medium text-slate-300">
              Task Title
            </label>
            <Input
              id="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="bg-slate-800 border-slate-700 text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="taskDescription" className="text-sm font-medium text-slate-300">
              Task Description
            </label>
            <Textarea
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="min-h-[100px] bg-slate-800 border-slate-700 text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="assignedTo" className="text-sm font-medium text-slate-300">
              Assigned To
            </label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20"
          >
            {editingTask ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
