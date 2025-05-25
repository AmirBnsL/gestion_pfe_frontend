"use client"
import { motion } from "framer-motion"
import { MessageCircle, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import {Project} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";

export function ViewTeamsModal({ proposal, isOpen, onClose }:{proposal: Project | null, isOpen: boolean, onClose: () => void}) {
  if (!proposal) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#161A35] border-[#2A2F52] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {proposal.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
            <TabsTrigger
              value="teams"
              className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
            >
              Teams
            </TabsTrigger>
            <TabsTrigger
              value="supervisors"
              className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
            >
              Supervisors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
                    <th className="pb-3 font-medium">Team Name</th>
                    <th className="pb-3 font-medium">Team Leader</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proposal?.team?.map((team, index) => (
                    <motion.tr
                      key={team.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group/row border-b border-slate-800/50"
                    >
                      <td className="py-4">
                        <div className="font-medium group-hover/row:text-purple-300 transition-colors">{team.name}</div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-slate-700 text-slate-300">
                              {team.teamLeader.firstname
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{team.teamLeader.firstname + ' ' + team.teamLeader.lastname}</span>
                        </div>
                      </td>

                      <td className="py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-purple-300 hover:bg-purple-600/20"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="supervisors" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
                    <th className="pb-3 font-medium">Supervisor</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Rank</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proposal.supervisedBy?.map((supervisor, index) => (
                    <motion.tr
                      key={supervisor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group/row border-b border-slate-800/50"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-slate-700 text-slate-300">
                              {supervisor.user.email
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium group-hover/row:text-purple-300 transition-colors">
                            {supervisor.user.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{supervisor.role}</td>
                      <td className="py-4 text-sm text-slate-400">{supervisor.rank}</td>
                      <td className="py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-slate-700/50 border-slate-600 hover:bg-purple-600/20 hover:border-purple-500/50 text-slate-300 hover:text-purple-300"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
