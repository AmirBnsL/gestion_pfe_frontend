"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { CalendarIcon, Clock } from "lucide-react"
import { projectOverviewData } from "./project-overview-data"

export function DeadlinesCalendar() {
  const { deadlines } = projectOverviewData

  // Sort deadlines by date
  const sortedDeadlines = [...deadlines].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get deadline type color
  const getDeadlineTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "submission":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "meeting":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  // Check if a deadline is upcoming (within the next 7 days)
  const isUpcoming = (dateString: string) => {
    const today = new Date()
    const deadlineDate = new Date(dateString)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 7
  }

  return (
    <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          Deadlines & Important Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedDeadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                isUpcoming(deadline.date)
                  ? "bg-purple-500/10 border border-purple-500/30"
                  : "bg-[#1A1F3D]/50 border border-[#2A2F52]"
              } hover:border-purple-500/50 transition-colors`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#161A35] mt-1">
                {deadline.type === "meeting" ? (
                  <Clock className="h-5 w-5 text-purple-400" />
                ) : (
                  <CalendarIcon className="h-5 w-5 text-purple-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{deadline.title}</h3>
                  <Badge variant="outline" className={`${getDeadlineTypeColor(deadline.type)}`}>
                    {deadline.type}
                  </Badge>
                  {isUpcoming(deadline.date) && (
                    <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30">
                      Upcoming
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-400 mt-1">{formatDate(deadline.date)}</p>
                <p className="text-sm text-slate-300 mt-1">{deadline.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
