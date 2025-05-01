"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import type { AcademicYear } from "./pending-approval-types"

interface GroupCardsProps {
  academicYear: AcademicYear
  groups: { group: number; count: number; specialty: string }[]
  onSelectGroup: (group: number) => void
  onBack: () => void
}

export default function GroupCards({ academicYear, groups, onSelectGroup, onBack }: GroupCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-800/50 border-slate-700 hover:bg-slate-700"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Years
        </Button>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          {academicYear} - Groups
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {groups.map((item, index) => (
          <motion.div
            key={item.group}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
            onClick={() => onSelectGroup(item.group)}
          >
            <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-sm"></div>

              <CardHeader className="pb-2 pt-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold text-white">Group {item.group}</CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-300">{item.count} Students</Badge>
                </div>
                <CardDescription className="text-slate-400 line-clamp-1">{item.specialty}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>Click to view students</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
