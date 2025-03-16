"use client"

import { motion } from "framer-motion"

export function StudentsDistribution() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-1/4 w-1/2 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-sm"></div>

      <h2 className="text-lg font-semibold mb-4">Students Distribution</h2>

      <div className="flex justify-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.circle
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.65 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#a855f7"
              strokeWidth="20"
              strokeDasharray="251.2"
              strokeDashoffset="0"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              transform="rotate(-90 50 50)"
            />
            <motion.circle
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.35 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#818cf8"
              strokeWidth="20"
              strokeDasharray="251.2"
              strokeDashoffset="163.28"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">65%</span>
            <span className="text-xs text-slate-400">PPE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

