"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { MessageSquare } from "lucide-react"

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: "Sarah chiwawa",
    role: "Team Lead",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah chiwawa",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Sarah chiwawa",
    role: "Designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sarah chiwawa",
    role: "Data Scientist",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Sarah chiwawa",
    role: "Researcher",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TeamMembers() {
  return (
    <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          Team Members
        </CardTitle>
        <Button variant="outline" size="sm" className="bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white">
          <MessageSquare className="h-4 w-4 mr-2" /> Message Team
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-slate-700 text-slate-300">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-slate-400">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Send Message</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
