"use client"

import { Button } from "@/app/components/ui/button"
import { FileText } from "lucide-react"
import { timeSlots, studentGroups } from "@/app/components/admin/presentation/presentation-data"
import { useRouter } from "next/navigation"

const mockSchedule = [
  { timeSlotId: "1", groupId: "1", room: "Room 101", judges: ["Dr. Smith"] },
  { timeSlotId: "2", groupId: "2", room: "Room 102", judges: ["Prof. Johnson"] },
  { timeSlotId: "3", groupId: "3", room: "Lab A", judges: ["Dr. Williams"] },
  { timeSlotId: "4", groupId: "4", room: "Lab B", judges: ["Prof. Brown"] },
]

export function TeacherPresentationSchedule() {
  const router = useRouter()

  const getScheduleSlot = (timeSlotId: string, groupId: string) => {
    return mockSchedule.find((s) => s.timeSlotId === timeSlotId && s.groupId === groupId)
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="">
        <div className="mb-8 flex justify-between items-center">
          <div>
            
            <p className="text-slate-400">May 30, 2025 - Academic Year 2024–25</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/teacher/notes")}>
            <FileText className="h-4 w-4 mr-2" />
            Review Submissions
          </Button>
        </div>

        <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="text-left p-4 text-white font-semibold">Time Slot</th>
                  {studentGroups.map((group) => (
                    <th key={group.id} className="text-left p-4 text-white font-semibold min-w-[200px]">
                      {group.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot) => (
                  <tr
                    key={timeSlot.id}
                    className="border-b border-slate-700 hover:bg-purple-500/10 transition-colors duration-200"
                  >
                    <td className="p-4 text-slate-300 font-medium">
                      {timeSlot.startTime}–{timeSlot.endTime}
                    </td>
                    {studentGroups.map((group) => {
                      const slot = getScheduleSlot(timeSlot.id, group.id)
                      return (
                        <td key={group.id} className="p-4">
                          {slot ? (
                            <div className="space-y-1">
                              <div className="text-white font-medium">{slot.room}</div>
                              <div className="text-slate-400 text-sm">{slot.judges.join(", ")}</div>
                            </div>
                          ) : (
                            <div className="text-slate-500">—</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
