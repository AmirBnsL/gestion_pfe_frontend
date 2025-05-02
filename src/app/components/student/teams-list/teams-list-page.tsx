"use client"

import { useMemo, useState, Suspense,use } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Plus, Search } from "lucide-react"
import { type Team } from "./teams-list-data"
import {Parameter} from "@/app/components/parameters/parameters-types";



const TeamCard = dynamic(() => import("./team-card").then(mod => mod.TeamCard), { ssr: false })
const TeamDetailsModal = dynamic(() => import("./team-details-modal").then(mod => mod.TeamDetailsModal), { ssr: false })
const CreateTeamModal = dynamic(() => import("./create-team-modal").then(mod => mod.CreateTeamModal), { ssr: false })

export default function TeamsListPage({teams,parameters}:{teams:Promise<Team[]>,parameters:Promise<Parameter>}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const teamsData = use(teams);
  const thisYearsParameters = use(parameters)
  console.log({thisYearsParameters})
  const filteredTeams = useMemo(() => {
    return teamsData.filter(
      (team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.project.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleViewDetails = (team: Team) => {
    setSelectedTeam(team)
    setIsDetailsModalOpen(true)
  }

  const handleRequestJoin = (team: Team) => {
    alert(`Request to join ${team.name} sent!`)
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          Teams List
        </h1>

        <div className="flex w-full sm:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#1A1F3D] border-[#2A2F52] text-white focus-visible:ring-purple-500 focus-visible:ring-offset-[#161A35]"
            />
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2"
            disabled={!thisYearsParameters?.allowTeamCreation}
          >
            <Plus className="h-4 w-4" />
            Create New Team
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeams.map((team) => (
          <Suspense fallback={<div className="h-40 bg-muted rounded-lg animate-pulse" />} key={team.id}>
            <TeamCard
              team={team}
              onViewDetails={() => handleViewDetails(team)}
              onRequestJoin={() => handleRequestJoin(team)}
            />
          </Suspense>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1A1F3D] mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-200">No teams found</h3>
          <p className="text-slate-400 mt-2 max-w-md mx-auto">
            We couldn&#39;t find any teams matching your search. Try adjusting your search terms or create a new team.
          </p>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Create New Team
          </Button>
        </div>
      )}

      <Suspense fallback={null}>
        <TeamDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          team={selectedTeam}
          onRequestJoin={() => {
            if (selectedTeam) {
              handleRequestJoin(selectedTeam)
              setIsDetailsModalOpen(false)
            }
          }}
        />

        <CreateTeamModal parameter={thisYearsParameters} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </Suspense>
    </div>
  )
}
