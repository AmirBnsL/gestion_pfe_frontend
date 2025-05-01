"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Home, MessageSquare, Users, LogOut,Settings2 } from "lucide-react"
import { handleLogout } from "@/app/lib/api-client"


export function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  // Navigation items with their paths and icons - specific to student section
  const navItems = [
    { icon: Home, path: "/student/project-overview", label: "Project Overview" },
    { icon: Users, path: "/student/teams-list", label: "Teams List" },
    { icon: BookOpen, path: "/student/my-project", label: "My Project" },
    { icon: MessageSquare, path: "/student/chat", label: "Chat & Communication" }
  ]


  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-20 min-h-screen bg-slate-900/80 backdrop-blur-sm border-r border-slate-800 flex flex-col items-center py-6 gap-8 shadow-[5px_0_15px_rgba(0,0,0,0.2)] fixed left-0 top-0 z-50"
    >
      <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <span className="text-white font-bold">S</span>
      </div>

      <div className="flex flex-col gap-6">
        {navItems.map((item) => (
          <SidebarIcon
            key={item.path}
            icon={<item.icon className="h-6 w-6" />}
            active={pathname === item.path || pathname.startsWith(`${item.path}/`)}
            href={item.path}
            tooltip={item.label}
          />
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <SidebarIcon
          icon={<Users className="h-6 w-6" />}
          active={pathname === "/student/profile"}
          href="/student/profile"
          tooltip="My Profile"
        />
        <button
          onClick={handleLogout}
          className="relative group"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 rounded-lg flex items-center justify-center bg-[#161A35] text-slate-400 hover:bg-[#1F2347] hover:text-white transition-all duration-300"
          >
            <LogOut className="h-6 w-6" />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-lg bg-purple-500/0 group-hover:bg-purple-500/20 transition-all duration-300"></div>
          </motion.div>
          {/* Tooltip */}
          <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Logout
          </div>
        </button>
      </div>
    </motion.div>
  )
}

interface SidebarIconProps {
  icon: React.ReactNode
  active?: boolean
  href: string
  tooltip?: string
}

function SidebarIcon({ icon, active = false, href, tooltip }: SidebarIconProps) {
  return (
    <Link href={href} className="relative group">
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

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </Link>
  )
}