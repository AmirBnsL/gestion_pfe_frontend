"use client"

import { motion } from "framer-motion"

interface ProjectDataItem {
  completed: number
  inProgress: number
}

interface ProjectsOverviewChartProps {
  data: ProjectDataItem[]
  years: string[]
}

export default function ProjectsOverviewChart({ data, years }: ProjectsOverviewChartProps) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

      <h2 className="text-lg font-semibold mb-4 flex justify-between">
        Projects Overview
        <span className="text-xs text-slate-400">Project status distribution per years</span>
      </h2>

      <div className="h-64 relative">
        <div className="absolute inset-0 flex items-end justify-between">
          {years.map((year, i) => (
            <div key={year} className="flex flex-col items-center w-1/6">
              <div className="relative h-52 w-16 flex flex-col-reverse">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data[i].completed}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-b-sm relative group"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-b from-purple-400/50 to-transparent blur-sm"></div>
                </motion.div>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data[i].inProgress}%` }}
                  transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                  className="w-full bg-gradient-to-t from-violet-300 to-violet-200 rounded-t-sm relative group"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -bottom-3 left-0 right-0 h-3 bg-gradient-to-t from-violet-300/50 to-transparent blur-sm"></div>
                </motion.div>
              </div>
              <span className="text-xs text-slate-400 mt-2">{year}</span>
            </div>
          ))}
        </div>

        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map((value) => (
          <div
            key={value}
            className="absolute w-full h-px bg-slate-800 flex items-center"
            style={{ bottom: `${value}%` }}
          >
            <span className="text-xs text-slate-500 absolute -left-6">{value}</span>
            <div className="w-full h-px bg-slate-800/50"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

