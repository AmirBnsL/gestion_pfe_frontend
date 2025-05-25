"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Mail, User, GraduationCap } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import {Project} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";

export function RequestsModal({ proposal, isOpen, onClose }:{ proposal: Project, isOpen: boolean, onClose: () => void }) {
  const [supervisorRequests, setSupervisorRequests] = useState(proposal?.supervisorInvites || [])
  const [studentRequests, setStudentRequests] = useState(proposal?.teamJoinProjectRequests || [])
  console.log(supervisorRequests)
  if (!proposal) return null

  const handleSupervisorAction = (requestId, action) => {
    setSupervisorRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: action === "accept" ? "accepted" : "rejected" } : req,
      ),
    )
  }

  const handleStudentAction = (requestId, action) => {
    setStudentRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: action === "accept" ? "accepted" : "rejected" } : req,
      ),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#161A35] border-[#2A2F52] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Requests for &#34;{proposal.title}&#34;
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="supervisors" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
            <TabsTrigger
              value="supervisors"
              className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
            >
              Supervisor Requests
              {supervisorRequests.filter((req) => req.status === "pending").length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-orange-500/20 text-orange-300">
                  {supervisorRequests.filter((req) => req.status === "pending").length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
            >
              Student Requests
              {studentRequests.filter((req) => req.status === "pending").length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-orange-500/20 text-orange-300">
                  {studentRequests.filter((req) => req.status === "pending").length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="supervisors" className="mt-6">
            <div className="space-y-4">
              {supervisorRequests.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No supervisor requests yet</p>
                </div>
              ) : (
                supervisorRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 group/card relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" />
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            {request.supervisor.user.email
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover/card:text-purple-200 transition-colors">
                            {request.supervisor.user.email}
                          </h4>
                          <p className="text-sm text-slate-400 mb-2">
                            {request.supervisor.rank} • {request.supervisor.role}
                          </p>
                          <p className="text-sm text-slate-300 mb-3">{request.message}</p>

                          <div className="flex items-center gap-4 text-xs text-slate-400">

                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {request.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSupervisorAction(request.id, "accept")}
                              className="bg-green-600/20 hover:bg-green-600/30 text-green-300 border-green-500/50"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSupervisorAction(request.id, "reject")}
                              className="bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Badge
                            variant={request.status === "accepted" ? "default" : "secondary"}
                            className={
                              request.status === "accepted"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }
                          >
                            {request.status}
                          </Badge>
                        )}

                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-purple-300">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <div className="space-y-4">
              {studentRequests.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No student requests yet</p>
                </div>
              ) : (
                studentRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 group/card relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" />
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            {request.team.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <h4 className={"font-semibold text-white group-hover/card:text-purple-200 transition-colors"}>{request.team.name}</h4>
                          <p className="text-sm text-slate-300 mb-3">{request.team.specialty}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {request.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStudentAction(request.id, "accept")}
                              className="bg-green-600/20 hover:bg-green-600/30 text-green-300 border-green-500/50"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStudentAction(request.id, "reject")}
                              className="bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Badge
                            variant={request.status === "accepted" ? "default" : "secondary"}
                            className={
                              request.status === "accepted"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }
                          >
                            {request.status}
                          </Badge>
                        )}

                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-purple-300">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
