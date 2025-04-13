"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Card } from "../../components/ui/card"

// Sample tasks data
const todoTasks = [
  {
    id: 1,
    title: "web nishida.exe",
    assignee: {
      name: "Sarah chiwawa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "Oct 5",
  },
  {
    id: 2,
    title: "web nishida.exe",
    assignee: {
      name: "Sarah chiwawa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "Oct 7",
  },
]

const completedTasks = [
  {
    id: 3,
    title: "web nishida.exe",
    assignee: {
      name: "Sarah chiwawa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "Oct 3",
  },
  {
    id: 4,
    title: "web nishida.exe",
    assignee: {
      name: "Sarah chiwawa",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "Oct 1",
  },
]

export function TaskBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* To Do Column */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          To Do
        </h3>
        <div className="space-y-3">
          {todoTasks.map((task) => (
            <Card
              key={task.id}
              className="p-4 bg-[#1A1F3D] border border-[#2A2F52] shadow-[0_4px_15px_rgba(0,0,0,0.2)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-6 w-6 mr-2 border border-slate-700">
                      <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                      <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                        {task.assignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-400">{task.assignee.name}</span>
                  </div>
                </div>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">{task.dueDate}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Column */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          Completed
        </h3>
        <div className="space-y-3">
          {completedTasks.map((task) => (
            <Card
              key={task.id}
              className="p-4 bg-[#1A1F3D] border border-[#2A2F52] shadow-[0_4px_15px_rgba(0,0,0,0.2)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-6 w-6 mr-2 border border-slate-700">
                      <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                      <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                        {task.assignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-400">{task.assignee.name}</span>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{task.dueDate}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
