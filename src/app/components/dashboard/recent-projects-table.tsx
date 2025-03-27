"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Project {
  name: string
  subtitle: string
  team: string
  department: string
  supervisor: string
}

interface RecentProjectsTableProps {
  projects: Project[]
  isLoaded: boolean
}

export default function RecentProjectsTable({ projects, isLoaded }: RecentProjectsTableProps) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-1/4 w-1/2 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-sm"></div>

      <h2 className="text-lg font-semibold mb-4 flex justify-between">
        Recent Projects
        <span className="text-xs text-slate-400">Latest completed and ongoing projects</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-800">
              <th className="pb-2 font-medium">Project</th>
              <th className="pb-2 font-medium">Team name</th>
              <th className="pb-2 font-medium">Department</th>
              <th className="pb-2 font-medium">Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                className="group/row"
              >
                <td className="py-3 pr-4">
                  <div>
                    <div className="font-medium group-hover/row:text-purple-300 transition-colors">{project.name}</div>
                    <div className="text-xs text-slate-400">{project.subtitle}</div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-sm">{project.team}</td>
                <td className="py-3 pr-4 text-sm">{project.department}</td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt={project.supervisor}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm">{project.supervisor}</div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

