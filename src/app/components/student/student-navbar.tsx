"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import Image from "next/image"

export function StudentNavbar() {
  const pathname = usePathname()

  // Get the page title based on the current path
  const getPageTitle = () => {
    switch (pathname) {
      case "/student":
        return "Project Overview"
      case "/student/teams-list":
        return "Teams List"
      case "/student/my-project":
        return "My Team"
      case "/student/chat":
        return "Chat & Communication"
      case "/student/profile":
        return "My Profile"
      case "/student/project-overview":
        return "Project Overview"
      default:
        if (pathname.includes("project-overview")) return "Project Overview"
        if (pathname.includes("teams-list")) return "Teams List"
        if (pathname.includes("my-project")) return "My Project"
        if (pathname.includes("chat")) return "Chat & Communication"
        return "Student Dashboard"
    }
  }

  return (
    <div className="space-y-6 mb-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
          {getPageTitle()}
        </h1>

        <div className="flex items-center gap-4">

          <div className="relative">
            <Bell className="h-5 w-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-slate-900"></span>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Student Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
