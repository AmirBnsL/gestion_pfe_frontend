"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { TeamCard } from "./team-card"
import { TeamDetailsPanel } from "./team-details-panel"
import { supervisionsData } from "./supervisions-data"

export function MySupervisionsView() {
  const [expandedYears, setExpandedYears] = useState(new Set(["2024"]))
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const toggleYear = (year) => {
    const newExpanded = new Set(expandedYears)
    if (newExpanded.has(year)) {
      newExpanded.delete(year)
    } else {
      newExpanded.add(year)
    }
    setExpandedYears(newExpanded)
  }

  const handleViewDetails = (team) => {
    setSelectedTeam(team)
    setIsPanelOpen(true)
  }

  return (
    <div className="space-y-6">
      {supervisionsData.map((yearData, yearIndex) => (
        <motion.div
          key={yearData.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: yearIndex * 0.1 }}
          className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden"
        >
          {/* Year Header */}
          <Button
            variant="ghost"
            onClick={() => toggleYear(yearData.year)}
            className="w-full p-4 justify-between hover:bg-slate-700/30 text-left"
          >
            <span className="text-lg font-semibold text-white">Academic Year {yearData.year}</span>
            <motion.div animate={{ rotate: expandedYears.has(yearData.year) ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </motion.div>
          </Button>

          {/* Year Content */}
          {expandedYears.has(yearData.year) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4"
            >
              {yearData.projects.map((project, projectIndex) => (
                <div key={project.id} className="mb-6 last:mb-0">
                  <h3 className="text-md font-medium text-purple-300 mb-4 px-2">{project.title}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.teams.map((team, teamIndex) => (
                      <TeamCard
                        key={team.id}
                        team={team}
                        project={project}
                        onViewDetails={handleViewDetails}
                        delay={projectIndex * 0.1 + teamIndex * 0.05}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}

      <TeamDetailsPanel team={selectedTeam} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </div>
  )
}
