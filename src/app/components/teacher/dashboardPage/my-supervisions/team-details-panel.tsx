"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Upload, FileText, ImageIcon, Video } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"

export function TeamDetailsPanel({ team, isOpen, onClose }) {
  const [activeColumn, setActiveColumn] = useState("members")

  if (!team) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh] bg-[#161A35] border-[#2A2F52] text-white p-0">
        <DialogHeader className="p-6 border-b border-slate-700">
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {team.name} - Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-full">
          {/* Column Switcher */}
          <div className="w-48 bg-slate-800/30 border-r border-slate-700 p-4">
            <div className="space-y-2">
              <Button
                variant={activeColumn === "members" ? "default" : "ghost"}
                onClick={() => setActiveColumn("members")}
                className="w-full justify-start text-sm"
              >
                Team & Sprints
              </Button>
              <Button
                variant={activeColumn === "tasks" ? "default" : "ghost"}
                onClick={() => setActiveColumn("tasks")}
                className="w-full justify-start text-sm"
              >
                Tasks & Files
              </Button>
              <Button
                variant={activeColumn === "files" ? "default" : "ghost"}
                onClick={() => setActiveColumn("files")}
                className="w-full justify-start text-sm"
              >
                Uploaded Files
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeColumn === "members" && (
                <motion.div
                  key="members"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Team Members */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Team Members</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {team.members.map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback className="bg-slate-700 text-slate-300">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-slate-400">{member.role}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sprint Overview */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Sprint Overview</h3>
                    <div className="space-y-3">
                      {team.sprints.map((sprint, index) => (
                        <motion.div
                          key={sprint.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-white">{sprint.title}</h4>
                            <Badge variant={sprint.status === "completed" ? "default" : "secondary"}>
                              {sprint.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-400 mb-2">
                            {sprint.startDate} - {sprint.endDate}
                          </div>
                          {sprint.status === "active" && <Progress value={sprint.progress} className="w-full h-2" />}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeColumn === "tasks" && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Current Sprint Tasks */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Current Sprint Tasks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["To Do", "In Progress", "Done"].map((status) => (
                        <div key={status} className="space-y-3">
                          <h4 className="font-medium text-slate-300 text-center p-2 bg-slate-800/50 rounded-lg">
                            {status}
                          </h4>
                          <div className="space-y-2">
                            {team.tasks
                              .filter(
                                (task) =>
                                  task.status.toLowerCase().replace(" ", "") === status.toLowerCase().replace(" ", ""),
                              )
                              .map((task, index) => (
                                <motion.div
                                  key={task.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                                >
                                  <div className="font-medium text-white text-sm mb-1">{task.title}</div>
                                  <div className="text-xs text-slate-400">{task.assignee}</div>
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upload/Download Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">File Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 border-dashed">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-400 mb-3">Upload files for review</p>
                          <Button variant="outline" size="sm">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <div className="text-center">
                          <Download className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-400 mb-3">Download submitted files</p>
                          <Button variant="outline" size="sm">
                            Download All
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeColumn === "files" && (
                <motion.div
                  key="files"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-purple-300">Uploaded Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.uploadedFiles.map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 group/file"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {file.type === "document" && <FileText className="h-8 w-8 text-blue-400" />}
                            {file.type === "image" && <ImageIcon className="h-8 w-8 text-green-400" />}
                            {file.type === "video" && <Video className="h-8 w-8 text-purple-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white text-sm group-hover/file:text-purple-300 transition-colors">
                              {file.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              {file.size} • {file.uploadDate}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">by {file.uploadedBy}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
