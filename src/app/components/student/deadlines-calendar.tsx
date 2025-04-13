"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { CalendarIcon } from "lucide-react"

// Sample deadlines data
const deadlines = [
  {
    id: 1,
    title: "Team Meeting with Supervisor",
    date: "Oct 10, 2023",
    time: "10:00 AM",
    type: "meeting",
    isNext: true,
  },
  {
    id: 2,
    title: "ppp.docx is for lab prep ppp.docx has to be ppp.docx",
    date: "Oct 15, 2023",
    type: "submission",
  },
  {
    id: 3,
    title: "ppp.docx is for lab prep ppp.docx has to be ppp.docx",
    date: "Oct 20, 2023",
    type: "submission",
  },
  {
    id: 4,
    title: "ppp.docx is for lab prep ppp.docx has to be ppp.docx",
    date: "Oct 25, 2023",
    type: "submission",
  },
  {
    id: 5,
    title: "ppp.docx is for lab prep ppp.docx has to be ppp.docx",
    date: "Oct 30, 2023",
    type: "submission",
  },
]

export function DeadlinesCalendar() {
  return (
    <Card className="bg-[#161A35]/60 backdrop-blur-md border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
      <CardHeader>
        <CardTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
          Deadlines & Important Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`p-4 rounded-lg border ${
                deadline.isNext ? "bg-[#1A1F3D] border-[#2A2F52]" : "bg-[#1A1F3D]/50 border-[#2A2F52]/50"
              } relative overflow-hidden group/deadline`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover/deadline:opacity-100 transition-opacity duration-500"></div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 relative z-10">
                <div>
                  {deadline.isNext && (
                    <Badge className="mb-2 bg-purple-500/20 text-purple-300 border-purple-500/30">NEXT EVENT</Badge>
                  )}
                  <h4 className="font-medium">{deadline.title}</h4>
                  <div className="flex items-center mt-1">
                    <CalendarIcon className="h-3.5 w-3.5 mr-1 text-slate-400" />
                    <span className="text-xs text-slate-400">
                      {deadline.date} {deadline.time && `• ${deadline.time}`}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white mt-2 md:mt-0"
                >
                  Remind
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
