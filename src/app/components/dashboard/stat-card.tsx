"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { ChevronUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  change: string
  positive: boolean
  delay: number
}

function StatCard({ title, value, description, change, positive, delay }: StatCardProps) {
  // Memoize the random counter so it's computed only once
  const randomToday = useMemo(() => Math.floor(Math.random() * 10) + 1, [])

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

      <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2 mb-1">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
        >
          {value}
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
          className="text-sm text-purple-400 font-medium"
        >
          +{randomToday} today
        </motion.span>
      </div>
      <p className="text-xs text-slate-400 mb-2">{description}</p>

      <div className={`text-xs flex items-center gap-1 ${positive ? "text-green-400" : "text-red-400"}`}>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: positive ? 0 : 180 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          <ChevronUp className="h-3 w-3" />
        </motion.div>
        <span>{change}</span>
      </div>

      {/* Decorative element */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-xl"
      />
    </motion.div>
  )
}

export default React.memo(StatCard)
