"use client"

import { motion } from "framer-motion"
import { BookOpen, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import type { AcademicYear } from "./pending-approval-types"

interface AcademicYearCardsProps {
  academicYears: { year: AcademicYear; count: number }[]
  onSelectYear: (year: AcademicYear) => void
}

export default function AcademicYearCards({ academicYears, onSelectYear }: AcademicYearCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {academicYears.map((item, index) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
          onClick={() => onSelectYear(item.year)}
        >
          <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
                  {item.year}
                </CardTitle>
                <Badge className="bg-purple-500/20 text-purple-300">{item.count} Students</Badge>
              </div>
              <CardDescription className="text-slate-400">Click to view groups</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <BookOpen className="h-4 w-4 text-purple-400" />
                  <span>Academic Year</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>{item.count} Students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
