"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, Users, FolderOpen, ArrowRight } from "lucide-react"

interface YearData {
  id: string
  year: string
  totalTeams: number
  totalProjects: number
  status: string
}

interface YearCardProps {
  year: YearData
}

export function YearCard({ year }: YearCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/admin/project-distribution/${year.id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              {year.year}
            </CardTitle>
            <Badge className={`${getStatusColor(year.status)}`}>{year.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{year.totalTeams}</p>
                <p className="text-xs text-gray-400">Teams</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{year.totalProjects}</p>
                <p className="text-xs text-gray-400">Projects</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Project Assignment</span>
              <span className="text-white">{Math.round((year.totalProjects / year.totalTeams) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((year.totalProjects / year.totalTeams) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
              />
            </div>
          </div>

          {/* View Details */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
            <span className="text-gray-400 text-sm">View distribution details</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
