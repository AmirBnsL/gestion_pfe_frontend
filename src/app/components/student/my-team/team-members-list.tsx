"use client"

import { useState } from "react"
import { Avatar } from "../../ui/avatar"
import { Button } from "../../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { MessageSquare, UserPlus, Bell, Check, X } from "lucide-react"
import type { TeamMember } from "./my-project-data"
import { AddMemberModal } from "./add-member-modal"

interface TeamMembersListProps {
  members: TeamMember[]
}

// Mock data for pending requests
const pendingRequests = [
  {
    id: "req-1",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Frontend Developer",
    requestDate: "2025-04-01T10:30:00.000Z",
  },
  {
    id: "req-2",
    name: "Emily Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Backend Developer",
    requestDate: "2025-04-02T14:15:00.000Z",
  },
]

export function TeamMembersList({ members }: TeamMembersListProps) {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [requests, setRequests] = useState(pendingRequests)

  const handleAcceptRequest = (requestId: string) => {
    // In a real app, you would make an API call here
    setRequests(requests.filter((req) => req.id !== requestId))
    // Then add the member to the team
  }

  const handleDeclineRequest = (requestId: string) => {
    // In a real app, you would make an API call here
    setRequests(requests.filter((req) => req.id !== requestId))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-200">Team Members</h3>
        <Button
          onClick={() => setIsAddMemberModalOpen(true)}
          variant="outline"
          size="sm"
          className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Member</span>
        </Button>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid grid-cols-2 w-full bg-[#161A35]/50 border border-[#2A2F52] p-1 rounded-lg mb-4">
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300"
          >
            Members
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300 relative"
          >
            Requests
            {requests.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                {requests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-0">
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border border-slate-700">
                    <img src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-200 text-sm">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Message</span>
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="mt-0">
          <div className="space-y-3">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border border-slate-700">
                      <img src={request.avatar || "/placeholder.svg"} alt={request.name} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-200 text-sm">{request.name}</p>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                        <p className="text-xs text-slate-400">{request.role}</p>
                        <span className="hidden xs:inline text-slate-500 text-xs">•</span>
                        <p className="text-xs text-slate-500">Requested: {formatDate(request.requestDate)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleAcceptRequest(request.id)}
                      size="sm"
                      className="h-8 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleDeclineRequest(request.id)}
                      size="sm"
                      variant="outline"
                      className="h-8 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Bell className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400">No pending requests</p>
                <p className="text-xs text-slate-500 mt-1">
                  When students request to join your team, they'll appear here
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <AddMemberModal isOpen={isAddMemberModalOpen} onClose={() => setIsAddMemberModalOpen(false)} />
    </div>
  )
}
