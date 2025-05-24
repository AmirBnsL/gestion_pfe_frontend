"use client"

import { motion } from "framer-motion"
import { MessageCircle, Eye } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export function TeamCard({ team, project, onViewDetails, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 group/card relative overflow-hidden"
    >
      {/* Overlay with pointer-events-none so it doesn't block clicks */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-white group-hover/card:text-purple-200 transition-colors">{team.name}</h4>
          <p className="text-sm text-slate-400 mt-1">{project.title}</p>
        </div>

        <div className="text-xs text-slate-400">
          <span className="text-purple-300">{team.currentSprint}</span> • {team.currentTask}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-purple-300 hover:bg-purple-600/20 p-2"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(team)}
              className="text-slate-400 hover:text-purple-300 hover:bg-purple-600/20 p-2"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-slate-500">{team.members.length} members</div>
        </div>
      </div>
    </motion.div>
  )
}