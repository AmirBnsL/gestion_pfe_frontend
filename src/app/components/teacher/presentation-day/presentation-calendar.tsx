"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for presentations by date
const presentationData = {
  "2025-05-15": { count: 8, hasPresentation: true },
  "2025-05-22": { count: 6, hasPresentation: true },
  "2025-05-30": { count: 12, hasPresentation: true },
  "2025-06-05": { count: 4, hasPresentation: true },
  "2025-06-12": { count: 10, hasPresentation: true },
}

export function PresentationCalendar() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)) // May 2025
  const today = new Date()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const handleDayClick = (date: Date) => {
    const dateKey = formatDateKey(date)
    if (presentationData[dateKey]?.hasPresentation) {
      // Navigate to the specific day's presentation schedule
      router.push(`/teacher/presentation-day/${dateKey}`)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="min-h-screen p-6">
      <div className="">
        <div className="mb-8">
          <h4 className="text-xl font-bold text-white mb-2">Presentation Calendar</h4>
          <p className="text-slate-400">Click on a date to view the presentation schedule</p>
        </div>

        <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

          {/* Calendar Header */}
          <div className="p-6 border-b border-[#2A2F52]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-purple-400" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                  className="bg-[#1E2142] border-[#2A2F52] text-white hover:bg-purple-500/20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                  className="bg-[#1E2142] border-[#2A2F52] text-white hover:bg-purple-500/20"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-slate-400 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-20"></div>
                }

                const dateKey = formatDateKey(date)
                const presentationInfo = presentationData[dateKey]
                const hasPresentation = presentationInfo?.hasPresentation
                const isCurrentDay = isToday(date)

                return (
                  <div
                    key={index}
                    onClick={() => hasPresentation && handleDayClick(date)}
                    className={`
                      h-20 p-2 rounded-lg border transition-all duration-200 relative
                      ${
                        hasPresentation
                          ? "bg-[#1E2142]/80 border-purple-500/50 cursor-pointer hover:bg-purple-500/20 hover:border-purple-400"
                          : "bg-[#0F1629]/40 border-[#2A2F52]/30"
                      }
                      ${isCurrentDay ? "ring-2 ring-blue-400" : ""}
                    `}
                  >
                    <div className="flex flex-col h-full">
                      <div className={`text-sm font-medium ${isCurrentDay ? "text-blue-400" : "text-white"}`}>
                        {date.getDate()}
                      </div>
                      {hasPresentation && (
                        <div className="mt-auto">
                          <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full text-center">
                            {presentationInfo.count} presentations
                          </div>
                        </div>
                      )}
                      {isCurrentDay && <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full"></div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500/50 rounded border border-purple-500/50"></div>
                <span>Presentation Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
