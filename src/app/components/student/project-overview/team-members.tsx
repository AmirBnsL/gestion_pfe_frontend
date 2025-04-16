"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { projectOverviewData } from "./project-overview-data"

export default function TeamMembers() {
  const { teamMembers } = projectOverviewData

  return (
    <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          Team Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center p-4 rounded-lg bg-[#1A1F3D]/50 border border-[#2A2F52] hover:border-purple-500/50 transition-colors"
            >
              <Avatar className="h-16 w-16 mb-3 border-2 border-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="bg-slate-700 text-slate-300">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-center">{member.name}</h3>
              <p className="text-sm text-slate-400 text-center">{member.role}</p>
              {member.id === teamMembers[0].id && (
                <Badge className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30">Team Leader</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
