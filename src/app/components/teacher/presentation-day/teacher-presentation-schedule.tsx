"use client"

import { Button } from "@/app/components/ui/button"
import { FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { PresentationSlot } from "@/app/components/admin/presentation/presentation-data"

export function TeacherPresentationSchedule({ slots, date }: { slots: PresentationSlot[], date: string }) {
  const router = useRouter()
  console.log("Slots:", slots)
    console.log("Date:", date)
  return (
      <div className="min-h-screen p-6">
        <div>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <p className="text-slate-400">{date}</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/teacher/notes")}>
              <FileText className="h-4 w-4 mr-2" />
              Review Submissions
            </Button>
          </div>
          <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="text-left p-4 text-white font-semibold">Time Slot</th>
                  <th className="text-left p-4 text-white font-semibold">Team</th>
                  <th className="text-left p-4 text-white font-semibold">Room</th>
                  <th className="text-left p-4 text-white font-semibold">Judges</th>
                </tr>
                </thead>
                <tbody>
                {slots.map(slot => (
                    <tr key={slot.id} className="border-b border-slate-700 hover:bg-purple-500/10 transition-colors duration-200">
                      <td className="p-4 text-slate-300 font-medium">
                        {slot.startTime}–{slot.endTime}
                      </td>
                      <td className="p-4 text-white font-medium">
                        {slot.team?.name ?? "—"}
                      </td>
                      <td className="p-4 text-white font-medium">
                        {slot.room}
                      </td>
                      <td className="p-4 text-slate-400 text-sm">
                        {slot.judges?.map(j => j.user?.name ?? j.firstname + j.lastname).join(", ") || "—"}
                      </td>
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