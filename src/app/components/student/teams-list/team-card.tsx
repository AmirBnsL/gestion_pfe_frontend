"use client"

import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Lock, Unlock, Info, Users } from "lucide-react"
import { Team } from "@/app/components/student/teams-list/teamTypes"
import { Parameter } from "@/app/components/parameters/parameters-types"
import { requestToJoinTeam } from "./teamActions"
import React from "react"

interface TeamCardProps {
  team: Team
  onViewDetails: () => void
  parameter: Parameter
}

export function TeamCard({ team, onViewDetails, parameter }: TeamCardProps) {
  const isFull = team.members.length >= parameter.maxTeamSize
  const isAvailable = !isFull
  const [isJoining, setIsJoining] = React.useState(false)
  const [joinError, setJoinError] = React.useState<string | null>(null)
  const [joinSuccess, setJoinSuccess] = React.useState<string | null>(null)

  const handleRequestJoin = async () => {
    setJoinError(null)
    setJoinSuccess(null)
    setIsJoining(true)
    try {
      const res = await requestToJoinTeam(team.id)
      setJoinSuccess(res?.message || "Request sent!")
    } catch (err: any) {
      setJoinError(typeof err === "string" ? err : "Failed to send join request.")
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 text-white">{team.name}</h3>
            <p className="text-slate-400 text-sm line-clamp-1">{team.specialty}</p>
          </div>
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

        <div className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-slate-400" />
          <div className="text-sm">
            <span className={isFull ? "text-amber-400 font-medium" : "text-slate-300"}>
              {team.members.length}/{parameter.maxTeamSize} Members
            </span>
          </div>
        </div>

        {/* Team Leader */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8 border border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
            <AvatarImage src={"/placeholder.svg"} alt={team.teamLeader.lastname + team.teamLeader.lastname} />
            <AvatarFallback className="bg-slate-700 text-slate-300">
              {team.teamLeader.firstname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium line-clamp-1 text-slate-200">
              {team.teamLeader.firstname + " " + team.teamLeader.lastname}
            </p>
            <p className="text-xs text-slate-400">Team Leader</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-[#1A1F3D]/80 flex justify-between items-center border-t border-[#2A2F52] relative z-10">
        {isAvailable ? (
          <div className="flex flex-col gap-1">
            <Button
              onClick={handleRequestJoin}
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
              disabled={isJoining}
            >
              {isJoining ? "Requesting..." : "Request to Join"}
            </Button>
            {joinError && <span className="text-xs text-red-400">{joinError}</span>}
            {joinSuccess && <span className="text-xs text-green-400">{joinSuccess}</span>}
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic">
            {isFull ? "Team is full" : "Team is not accepting members"}
          </div>
        )}


      </CardFooter>
    </Card>
  )
}