"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { timeSlots, studentGroups, availableRooms, availableJudges, type ScheduleSlot } from "./presentation-data"

interface ScheduleTableProps {
  onSave: (schedule: ScheduleSlot[], status: "draft" | "published") => void
  onCancel: () => void
}

export function ScheduleTable({ onSave, onCancel }: ScheduleTableProps) {
  const [date, setDate] = useState("")
  const [academicYear, setAcademicYear] = useState("")
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([])

  const updateScheduleSlot = (timeSlotId: string, groupId: string, field: "room" | "judges", value: string) => {
    setSchedule((prev) => {
      const existing = prev.find((s) => s.timeSlotId === timeSlotId && s.groupId === groupId)
      if (existing) {
        return prev.map((s) =>
          s.timeSlotId === timeSlotId && s.groupId === groupId
            ? { ...s, [field]: field === "judges" ? [value] : value }
            : s,
        )
      } else {
        return [
          ...prev,
          {
            timeSlotId,
            groupId,
            room: field === "room" ? value : "",
            judges: field === "judges" ? [value] : [],
          },
        ]
      }
    })
  }

  const getScheduleSlot = (timeSlotId: string, groupId: string) => {
    return schedule.find((s) => s.timeSlotId === timeSlotId && s.groupId === groupId)
  }

  const handleSave = (status: "draft" | "published") => {
    onSave(schedule, status)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Presentation Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="academicYear">Academic Year</Label>
          <Input
            id="academicYear"
            placeholder="e.g., 2024–25"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-700">
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
              <tr key={timeSlot.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                <td className="p-4 text-slate-300 font-medium">
                  {timeSlot.startTime}–{timeSlot.endTime}
                </td>
                {studentGroups.map((group) => {
                  const slot = getScheduleSlot(timeSlot.id, group.id)
                  return (
                    <td key={group.id} className="p-4">
                      <div className="space-y-2">
                        <Select
                          value={slot?.room || ""}
                          onValueChange={(value) => updateScheduleSlot(timeSlot.id, group.id, "room", value)}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue placeholder="Select room" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableRooms.map((room) => (
                              <SelectItem key={room} value={room}>
                                {room}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={slot?.judges[0] || ""}
                          onValueChange={(value) => updateScheduleSlot(timeSlot.id, group.id, "judges", value)}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue placeholder="Select judge" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableJudges.map((judge) => (
                              <SelectItem key={judge} value={judge}>
                                {judge}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => handleSave("draft")}>
          Save Draft
        </Button>
        <Button onClick={() => handleSave("published")}>Publish</Button>
      </div>
    </div>
  )
}
