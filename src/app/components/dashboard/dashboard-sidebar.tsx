"use client"

import { motion } from "framer-motion"
import { BarChart, HelpCircle, MessageSquare, Settings, Users } from "lucide-react"

export function DashboardSidebar() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-20 min-h-screen bg-slate-900/80 backdrop-blur-sm border-r border-slate-800 flex flex-col items-center py-6 gap-8 shadow-[5px_0_15px_rgba(0,0,0,0.2)]"
    >
      <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <span className="text-white font-bold">logo</span>
      </div>

      <div className="flex flex-col gap-6">
        <SidebarIcon icon={<BarChart className="h-6 w-6" />} active />
        <SidebarIcon icon={<HelpCircle className="h-6 w-6" />} />
        <SidebarIcon icon={<Users className="h-6 w-6" />} />
        <SidebarIcon icon={<MessageSquare className="h-6 w-6" />} />
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <SidebarIcon icon={<Settings className="h-6 w-6" />} />
      </div>
    </motion.div>
  )
}

function SidebarIcon({ icon, active = false }) {
  return (
    <div className={`relative group`}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300
          ${
            active
              ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              : "bg-[#161A35] text-slate-400 hover:bg-[#1F2347] hover:text-white"
          }`}
      >
        {icon}

        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 rounded-lg bg-purple-500/0 group-hover:bg-purple-500/20 transition-all duration-300 
          ${active ? "bg-purple-500/20" : ""}`}
        ></div>

        {/* Pulse effect for active icon */}
        {active && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-0 rounded-lg bg-purple-500/20 blur-sm"
          />
        )}
      </motion.div>

      {/* Active indicator */}
      {active && (
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 h-5 w-1 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.7)]"
        />
      )}
    </div>
  )
}

