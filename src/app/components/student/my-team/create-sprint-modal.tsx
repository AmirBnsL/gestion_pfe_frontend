"use client"

import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import type { Sprint } from "./my-project-data"

interface CreateSprintModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateSprint: (sprint: Omit<Sprint, "id" | "tasks">) => void
  editingSprint?: Sprint | null
  onEditSprint?: (sprint: Sprint) => void
}

export function CreateSprintModal({
  isOpen,
  onClose,
  onCreateSprint,
  editingSprint,
  onEditSprint,
}: CreateSprintModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    if (editingSprint) {
      setTitle(editingSprint.title)
      setDescription(editingSprint.description)
      setStartDate(formatDateForInput(editingSprint.startDate))
      setEndDate(formatDateForInput(editingSprint.endDate))
    } else {
      resetForm()
    }
  }, [editingSprint, isOpen])

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setStartDate("")
    setEndDate("")
  }

  const handleSubmit = () => {
    if (!title || !startDate || !endDate) return

    if (editingSprint && onEditSprint) {
      onEditSprint({
        ...editingSprint,
        title,
        description,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      })
    } else {
      onCreateSprint({
        title,
        description,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        status: "Not Started",
      })
    }

    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-900 border border-slate-800 text-slate-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            {editingSprint ? "Edit Sprint" : "Create New Sprint"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-slate-400">Add a new sprint to organize your project tasks.</p>

          <div className="space-y-2">
            <label htmlFor="sprintTitle" className="text-sm font-medium text-slate-300">
              Sprint Title
            </label>
            <Input
              id="sprintTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a team name"
              className="bg-slate-800 border-slate-700 text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-slate-300">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the full details of your Sprint"
              className="min-h-[100px] bg-slate-800 border-slate-700 text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium text-slate-300">
                Start Date
              </label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium text-slate-300">
                End Date
              </label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-200"
              />
            </div>
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
            {editingSprint ? "Save Changes" : "Create Sprint"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
