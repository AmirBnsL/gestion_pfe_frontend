"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Users, Star, Eye } from "lucide-react"

interface WishlistTableProps {
  year: string
}

// Sample wishlist data
const wishlistData = [
  {
    id: "team-1",
    teamName: "Code Crusaders",
    members: ["Alice Johnson", "Bob Smith", "Carol Davis"],
    preferences: [
      { rank: 1, project: "E-Commerce Platform Development", status: "Available" },
      { rank: 2, project: "AI-Powered Chatbot System", status: "Assigned" },
      { rank: 3, project: "Mobile Health Tracking App", status: "Available" },
    ],
    assignedProject: null,
  },
  {
    id: "team-2",
    teamName: "Tech Titans",
    members: ["David Wilson", "Eva Brown", "Frank Miller"],
    preferences: [
      { rank: 1, project: "Blockchain Voting System", status: "Available" },
      { rank: 2, project: "IoT Smart Home Controller", status: "Available" },
      { rank: 3, project: "Cybersecurity Monitoring Tool", status: "Assigned" },
    ],
    assignedProject: "Blockchain Voting System",
  },
  {
    id: "team-3",
    teamName: "Digital Dynamos",
    members: ["Grace Lee", "Henry Taylor", "Ivy Chen"],
    preferences: [
      { rank: 1, project: "Virtual Reality Learning Platform", status: "Available" },
      { rank: 2, project: "Data Visualization Dashboard", status: "Available" },
      { rank: 3, project: "E-Commerce Platform Development", status: "Available" },
    ],
    assignedProject: null,
  },
  {
    id: "team-4",
    teamName: "Innovation Squad",
    members: ["Jack Anderson", "Kate Thompson"],
    preferences: [
      { rank: 1, project: "AI-Powered Chatbot System", status: "Assigned" },
      { rank: 2, project: "Mobile Health Tracking App", status: "Available" },
      { rank: 3, project: "Data Visualization Dashboard", status: "Available" },
    ],
    assignedProject: "Mobile Health Tracking App",
  },
]

export function WishlistTable({ year }: WishlistTableProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Assigned":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTeamInitials = (teamName: string) => {
    return teamName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Team Project Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wishlistData.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-700/50 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500">
                    <AvatarFallback className="text-white font-semibold">
                      {getTeamInitials(team.teamName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">{team.teamName}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Users className="w-3 h-3" />
                      {team.members.length} members
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {team.assignedProject && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Assigned</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                    className="text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Team Members:</p>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((member, memberIndex) => (
                    <Badge key={memberIndex} variant="outline" className="text-gray-300 border-gray-600">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Preferences */}
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Project Preferences:</p>
                {team.preferences.map((preference, prefIndex) => (
                  <div key={prefIndex} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-purple-400 text-sm font-semibold">{preference.rank}</span>
                      </div>
                      <span className="text-white">{preference.project}</span>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(preference.status)}`}>{preference.status}</Badge>
                  </div>
                ))}
              </div>

              {/* Assigned Project */}
              {team.assignedProject && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-semibold mb-1">Assigned Project:</p>
                  <p className="text-white">{team.assignedProject}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
