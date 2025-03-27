"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Deadline {
  name: string
  subtitle: string
  status: string
  daysLeft: string
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[]
  isLoaded: boolean
}

export default function UpcomingDeadlines({ deadlines, isLoaded }: UpcomingDeadlinesProps) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 blur-sm"></div>

      <h2 className="text-lg font-semibold mb-4 flex justify-between">
        Upcoming Deadlines
        <span className="text-xs text-slate-400">Projects due in the next 7 days</span>
      </h2>

      <div className="space-y-4">
        {deadlines.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 group/card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
            <div
              className={`absolute top-0 left-0 w-1 h-full ${project.status === "NEW" ? "bg-red-500" : "bg-green-500"}`}
            ></div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-white group-hover/card:text-purple-200 transition-colors">
                {project.name}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  project.status === "NEW" ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="text-xs text-slate-400 mb-3">{project.subtitle}</div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-slate-700 border border-slate-600 overflow-hidden shadow-[0_0_5px_rgba(0,0,0,0.2)]">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="User"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-xs text-slate-400">
                <span className="text-red-400">{project.daysLeft}</span> days left
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

