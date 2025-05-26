"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, Users, Clock } from "lucide-react"
import type { PresentationDay } from "./presentation-data"

interface PresentationDayCardProps {
  presentationDay: PresentationDay
  onClick: () => void
}

export function PresentationDayCard({ presentationDay, onClick }: PresentationDayCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">{presentationDay.date}</h3>
            </div>
            <Badge
              variant={presentationDay.status === "published" ? "default" : "secondary"}
              className={presentationDay.status === "published" ? "bg-green-600" : "bg-yellow-600"}
            >
              {presentationDay.status}
            </Badge>
          </div>

          <p className="text-slate-300 mb-4">{presentationDay.academicYear}</p>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{presentationDay.slots.length} groups</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{presentationDay.slots.length} slots</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
