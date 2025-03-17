"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Download } from "lucide-react"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

interface ProjectDetailsModalProps {
  project: any
  onClose: () => void
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1E2142] border-[#2A2F52] text-white max-w-3xl p-0 overflow-hidden max-h-[90vh]">
        <div className="bg-[#252A4A] p-6 border-b border-[#2A2F52]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Project Overview</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-slate-400 mt-1">View detailed information about this Project</p>
        </div>

        <div className="p-6">
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-[#161A35]/50 border border-[#2A2F52] p-1 rounded-lg">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300"
              >
                Files
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-[400px] overflow-hidden"
              >
                <TabsContent value="details" className="mt-0 h-full overflow-y-auto pr-2">
                  <div className="space-y-6">
                    <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6">
                      <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                      <p className="text-slate-300">{project.description}</p>
                    </div>

                    <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6">
                      <h3 className="text-lg font-semibold mb-3">Team members</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {project.teamMembers.map((member: string) => (
                          <li key={member} className="text-slate-300">
                            {member}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6">
                      <h3 className="text-lg font-semibold mb-3">Project Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-400">Leader</p>
                          <p className="text-slate-300">{project.leader}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Supervisor</p>
                          <p className="text-slate-300">{project.supervisor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Category</p>
                          <p className="text-slate-300">{project.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Submitted Date</p>
                          <p className="text-slate-300">{project.submittedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="mt-0 h-full overflow-y-auto pr-2">
                  <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6">
                    <h3 className="text-lg font-semibold mb-3">Project Files</h3>
                    <div className="space-y-3">
                      {project.files.map((file: any) => (
                        <div
                          key={file.name}
                          className="flex items-center justify-between p-3 bg-[#1A1F3D] rounded-lg border border-[#2A2F52] hover:bg-[#252A4A] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-300">{file.name}</p>
                              <p className="text-xs text-slate-400">
                                {file.size} • Uploaded on {file.uploadedOn}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

