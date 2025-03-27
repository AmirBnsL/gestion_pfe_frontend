"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"

interface CompletionRateItem {
  month: string
  value: number
}

interface ProjectCompletionRateProps {
  data: CompletionRateItem[]
}

function ProjectCompletionRate({ data }: ProjectCompletionRateProps) {
  // Memoize derived values to avoid recalculations on each render
  const average = useMemo(() => {
    return Math.round(data.reduce((acc, curr) => acc + curr.value, 0) / data.length)
  }, [data])

  const highest = useMemo(() => Math.max(...data.map(r => r.value)), [data])

  const growth = useMemo(() => data[data.length - 1].value - data[0].value, [data])

  const pathData = useMemo(() => {
    // Assumes data always contains 6 items
    if (data.length < 6) return ""
    const scale = 100 / (data.length - 1)
    return `M 0,${100 - data[0].value * 0.8} 
                ${scale},${100 - data[1].value * 0.8} 
                ${2 * scale},${100 - data[2].value * 0.8} 
                ${3 * scale},${100 - data[3].value * 0.8} 
                ${4 * scale},${100 - data[4].value * 0.8} 
                ${5 * scale},${100 - data[5].value * 0.8}`
  }, [data])

  return (
    <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          Project Completion Rate
        </span>
        <span className="ml-auto text-sm text-slate-400">Last 6 months</span>
      </h2>

      <div className="h-48 flex items-end justify-between gap-2 relative">
        {/* Glowing background line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="completionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            d={pathData}
            fill="none"
            stroke="url(#completionGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
          />
        </svg>

        {data.map((rate, i) => (
          <div key={i} className="flex flex-col items-center relative z-10 w-full">
            <div className="relative">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${rate.value * 0.8}%` }}
                transition={{ duration: 1, delay: 0.9 + i * 0.1 }}
                className="w-8 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-sm relative group/bar"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                <div className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-b from-purple-400/50 to-transparent blur-sm"></div>

                {/* Value tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#161A35] border border-[#2A2F52] px-2 py-1 rounded text-xs opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                  {rate.value}%
                </div>

                {/* Animated pulse dot at top */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                />
              </motion.div>

              {/* Reflection effect */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${rate.value * 0.2}%` }}
                transition={{ duration: 1, delay: 0.9 + i * 0.1 }}
                className="w-8 bg-gradient-to-b from-purple-400/30 to-transparent rounded-b-sm opacity-50 transform scale-y-[-1] origin-top"
              />
            </div>
            <span className="text-xs text-slate-400 mt-2">{rate.month}</span>
          </div>
        ))}

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => (
          <div
            key={value}
            className="absolute w-full h-px bg-[#2A2F52]/50 flex items-center"
            style={{ bottom: `${value * 0.8}%` }}
          >
            <span className="text-xs text-slate-500 absolute -left-6">{value}%</span>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#2A2F52]">
        <div className="text-center">
          <div className="text-xs text-slate-400">Average</div>
          <div className="text-lg font-bold text-purple-400">{average}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-400">Highest</div>
          <div className="text-lg font-bold text-green-400">{highest}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-400">Growth</div>
          <div className="text-lg font-bold text-blue-400">+{growth}%</div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProjectCompletionRate)
