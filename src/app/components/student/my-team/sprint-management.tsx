"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Card, CardContent } from "../../ui/card"
import { Plus } from "lucide-react"
import { SprintItem } from "./sprint-item"
import { CreateSprintModal } from "./create-sprint-modal"
import { CreateTaskModal } from "./create-task-modal"
import { projectData } from "./my-project-data"
import type { Sprint, Task } from "./my-project-data"

export function SprintManagement() {
  const [sprints, setSprints] = useState<Sprint[]>(projectData.sprints)
  const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false)
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const [currentSprint, setCurrentSprint] = useState<Sprint | null>(null)
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null)

  const handleCreateSprint = (newSprint: Omit<Sprint, "id" | "tasks">) => {
    const sprint: Sprint = {
      id: `sprint-${Date.now()}`,
      tasks: [],
      ...newSprint,
    }
    setSprints([...sprints, sprint])
    setIsCreateSprintModalOpen(false)
  }

  const handleEditSprint = (updatedSprint: Sprint) => {
    setSprints(sprints.map((sprint) => (sprint.id === updatedSprint.id ? updatedSprint : sprint)))
    setEditingSprint(null)
  }

  const handleDeleteSprint = (sprintId: string) => {
    setSprints(sprints.filter((sprint) => sprint.id !== sprintId))
  }

  const handleCreateTask = (sprintId: string, newTask: Omit<Task, "id">) => {
    const task: Task = {
      id: `task-${Date.now()}`,
      ...newTask,
    }

    setSprints(
      sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return {
            ...sprint,
            tasks: [...sprint.tasks, task],
          }
        }
        return sprint
      }),
    )

    setIsCreateTaskModalOpen(false)
    setCurrentSprint(null)
  }

  const handleEditTask = (sprintId: string, updatedTask: Task) => {
    setSprints(
      sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return {
            ...sprint,
            tasks: sprint.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
          }
        }
        return sprint
      }),
    )
  }

  const handleDeleteTask = (sprintId: string, taskId: string) => {
    setSprints(
      sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return {
            ...sprint,
            tasks: sprint.tasks.filter((task) => task.id !== taskId),
          }
        }
        return sprint
      }),
    )
  }

  const handleSprintStatusChange = (sprintId: string, status: string) => {
    setSprints(
      sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return {
            ...sprint,
            status,
          }
        }
        return sprint
      }),
    )
  }

  return (
    <div>
      <Card className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                Sprint Management
              </h2>
              <p className="text-slate-400 text-sm">Manage your sprint details and settings</p>
            </div>
            <Button
              onClick={() => setIsCreateSprintModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create new sprint
            </Button>
          </div>

          <div className="space-y-4">
            {sprints.map((sprint) => (
              <SprintItem
                key={sprint.id}
                sprint={sprint}
                onEdit={() => setEditingSprint(sprint)}
                onDelete={() => handleDeleteSprint(sprint.id)}
                onStatusChange={(status) => handleSprintStatusChange(sprint.id, status)}
                onCreateTask={() => {
                  setCurrentSprint(sprint)
                  setIsCreateTaskModalOpen(true)
                }}
                onEditTask={(task) => handleEditTask(sprint.id, task)}
                onDeleteTask={(taskId) => handleDeleteTask(sprint.id, taskId)}
                teamMembers={projectData.teamMembers}
              />
            ))}

            {sprints.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400">No sprints created yet.</p>
                <Button
                  onClick={() => setIsCreateSprintModalOpen(true)}
                  variant="outline"
                  className="mt-4 border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first sprint
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <CreateSprintModal
        isOpen={isCreateSprintModalOpen}
        onClose={() => setIsCreateSprintModalOpen(false)}
        onCreateSprint={handleCreateSprint}
        editingSprint={editingSprint}
        onEditSprint={handleEditSprint}
      />

      {currentSprint && (
        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={() => {
            setIsCreateTaskModalOpen(false)
            setCurrentSprint(null)
          }}
          onCreateTask={(task) => handleCreateTask(currentSprint.id, task)}
          sprintId={currentSprint.id}
          teamMembers={projectData.teamMembers}
        />
      )}
    </div>
  )
}
