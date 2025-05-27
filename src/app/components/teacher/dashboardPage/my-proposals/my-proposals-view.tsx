"use client"

import { useState,use } from "react"
import { motion } from "framer-motion"
import { Eye, Users, UserPlus } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { ViewTeamsModal } from "./view-teams-modal"
import { RequestsModal } from "./requests-modal"
import {ProjectStatus, Teacher} from "@/app/components/pending-approval/pending-approval-types";
import {Project} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";

export function MyProposalsView({proposedProjects,availableSupervisorsPromise}: {proposedProjects: Promise<Project[]>,availableSupervisorsPromise : Promise<Teacher[]> }) {
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [isViewTeamsModalOpen, setIsViewTeamsModalOpen] = useState(false)
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false)
  const proposals = use(proposedProjects)


  const handleViewTeams = (proposal) => {
    setSelectedProposal(proposal)
    setIsViewTeamsModalOpen(true)
  }

  const handleViewRequests = (proposal) => {
    setSelectedProposal(proposal)
    setIsRequestsModalOpen(true)
  }



  return (
    <div className="space-y-4">
      {proposals.map((proposal, index) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 group/card relative overflow-hidden"
        >
          {/* FIX: pointer-events-none added here */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>

          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white group-hover/card:text-purple-200 transition-colors mb-2">
                {proposal.title}
              </h3>
              <p className="text-slate-400 text-sm mb-3 line-clamp-2">{proposal.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {proposal.team.length} teams working
                </span>
                <span>•</span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    proposal.status === ProjectStatus.PROPOSED ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  Status: {proposal.status}
                </span>
                {(proposal.supervisorInvites?.length > 0 || proposal.teamJoinProjectRequests?.length > 0) && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">
                      {(proposal.supervisorInvites?.length || 0) + (proposal.teamJoinProjectRequests?.length || 0)} pending
                      requests
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewTeams(proposal)}
                className="bg-slate-700/50 border-slate-600 hover:bg-purple-600/20 hover:border-purple-500/50 text-slate-300 hover:text-purple-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Teams
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewRequests(proposal)}
                className="bg-slate-700/50 border-slate-600 hover:bg-blue-600/20 hover:border-blue-500/50 text-slate-300 hover:text-blue-300"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Requests
                {(proposal.supervisorInvites?.length || 0) + (proposal.teamJoinProjectRequests?.length || 0) > 0 && (
                  <span className="ml-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {(proposal.supervisorInvites?.length || 0) + (proposal.teamJoinProjectRequests?.length || 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      ))}

      <ViewTeamsModal
        proposal={selectedProposal}
        isOpen={isViewTeamsModalOpen}
        onClose={() => setIsViewTeamsModalOpen(false)}
      />

      {selectedProposal && (
        <RequestsModal
            availableSupervisorsPromise={availableSupervisorsPromise}
          proposal={selectedProposal}
          isOpen={isRequestsModalOpen}
          onClose={() => setIsRequestsModalOpen(false)}
        />
      )}
    </div>
  )
}
