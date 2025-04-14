"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Lock, Unlock, Users, Mail, MessageSquare } from "lucide-react"
import type { Team } from "./teams-list-data"

interface TeamDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  team: Team | null
  onRequestJoin: () => void
}

export function TeamDetailsModal({ isOpen, onClose, team, onRequestJoin }: TeamDetailsModalProps) {
  if (!team) return null

  const isFull = team.currentMembers >= team.maxMembers
  const isAvailable = team.isOpen && !isFull

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#161A35]/95 backdrop-blur-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
              Team Overview
            </DialogTitle>
            <Badge
              variant={isAvailable ? "outline" : "secondary"}
              className={`flex items-center gap-1 ${
                isAvailable
                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                  : "bg-slate-700/50 text-slate-300 border-slate-600/50"
              }`}
            >
              {isAvailable ? (
                <>
                  <Unlock className="h-3 w-3" />
                  <span>Open</span>
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  <span>{isFull ? "Full" : "Closed"}</span>
                </>
              )}
            </Badge>
          </div>
          <p className="text-slate-400 mt-1">
            {team.name} - {team.project}
          </p>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Project Details</h3>
            <p className="text-sm text-slate-300">{team.description}</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-400">Team Members</h3>
              <div className="text-sm">
                <span className={isFull ? "text-amber-400 font-medium" : "text-slate-300"}>
                  {team.currentMembers}/{team.maxMembers} Members
                </span>
              </div>
            </div>

            <div className="border border-[#2A2F52] rounded-md divide-y divide-[#2A2F52] bg-[#1A1F3D]/50">
              {team.members.map((member) => (
                <div key={member.id} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-slate-700 text-slate-300">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-200">{member.name}</p>
                        {member.id === team.leader.id && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                          >
                            Team Leader
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{member.role}</p>
                    </div>
                  </div>

                  {member.id === team.leader.id && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-[#1F2347]"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Contact</span>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="sm:mr-auto bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
          >
            Close
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
            >
              <MessageSquare className="h-4 w-4" />
              Message Team
            </Button>

            {isAvailable && (
              <Button
                onClick={onRequestJoin}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Users className="h-4 w-4" />
                Request to Join
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
