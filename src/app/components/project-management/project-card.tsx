"use client"

import { motion } from "framer-motion"
import { Check, Eye, Trash } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"

interface ProjectCardProps {
  project: any
  onView: () => void
  onApprove: () => void
  onDelete: () => void
  delay?: number
}

export function ProjectCard({ project, onView, onApprove, onDelete, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors pr-16">
          {project.name}
        </h3>
        <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 capitalize">{project.status}</Badge>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Leader:</span>
          <span className="text-slate-300">{project.leader}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Supervisor:</span>
          <span className="text-slate-300">{project.supervisor}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Category:</span>
          <span className="text-slate-300">{project.category}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Submitted:</span>
          <span className="text-slate-300">{project.submittedDate}</span>
        </div>
      </div>

      <div className="flex justify-between gap-2 pt-2 border-t border-slate-800 relative z-10">
        <Button onClick={onView} className="flex-1 bg-indigo-600/80 hover:bg-indigo-700 text-white">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button onClick={onApprove} className="flex-1 bg-green-600/80 hover:bg-green-700 text-white">
          <Check className="h-4 w-4 mr-1" />
          Approve
        </Button>
        <Button onClick={onDelete} className="flex-1 bg-red-600/80 hover:bg-red-700 text-white">
          <Trash className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </motion.div>
  )
}

