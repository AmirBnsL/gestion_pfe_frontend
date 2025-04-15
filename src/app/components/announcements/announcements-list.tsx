"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Trash } from "lucide-react"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"

interface AnnouncementsListProps {
  announcements: any[]
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  const renderedRows = useMemo(() => {
    if (announcements.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="p-4 text-center text-slate-400">
            No announcements found
          </td>
        </tr>
      )
    }

    return announcements.map((announcement, index) => (
      <motion.tr
        key={announcement.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
        className="border-b border-slate-800 hover:bg-slate-800/50"
      >
        <td className="p-4 font-medium">{announcement.name}</td>
        <td className="p-4 text-sm">{announcement.datePosted}</td>
        <td className="p-4 text-sm">{announcement.audience}</td>
        <td className="p-4">
          <Badge
            className={`
              ${announcement.priorityLevel === "low" ? "bg-green-500/20 text-green-300" : ""}
              ${announcement.priorityLevel === "medium" ? "bg-amber-500/20 text-amber-300" : ""}
              ${announcement.priorityLevel === "high" ? "bg-orange-500/20 text-orange-300" : ""}
              ${announcement.priorityLevel === "urgent" ? "bg-red-500/20 text-red-300" : ""}
            `}
          >
            {announcement.priorityLevel.charAt(0).toUpperCase() + announcement.priorityLevel.slice(1)}
          </Badge>
        </td>
        <td className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
              <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                <Trash className="h-4 w-4 mr-2 text-red-400" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </motion.tr>
    ))
  }, [announcements])

  return (
    <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4 text-left text-sm font-medium text-slate-300">Name</th>
              <th className="p-4 text-left text-sm font-medium text-slate-300">Date Posted</th>
              <th className="p-4 text-left text-sm font-medium text-slate-300">Audience</th>
              <th className="p-4 text-left text-sm font-medium text-slate-300">Priority Level</th>
              <th className="p-4 text-left text-sm font-medium text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {renderedRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}
