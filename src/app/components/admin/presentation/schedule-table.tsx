"use client"

import { useState, use } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import {PresentationDay, type PresentationSlot} from "./presentation-data"
import { Team } from "@/app/components/student/teams-list/teamTypes"
import {AcademicYear} from "@/app/components/parameters/parameters-types";
import {Teacher} from "@/app/components/pending-approval/pending-approval-types";

const availableRooms = [
  "Room A",
  "Room B",
  "Room C",
  "Room D",
]

const timeSlots = [
  { id: 1, startTime: "09:00", endTime: "10:00" },
  { id: 2, startTime: "10:00", endTime: "11:00" },
  { id: 3, startTime: "11:00", endTime: "12:00" },
  { id: 4, startTime: "13:00", endTime: "14:00" },
  { id: 5, startTime: "14:00", endTime: "15:00" },
]

interface ScheduleTableProps {
  onSave: (schedule: PresentationSlot[],
           status: "draft" | "published",
           date: string,
           academicYear: string) => void
  onCancel: () => void,
  teamsPromise: Promise<Team[]>,
  judgesPromise: Promise<Teacher[]>
  presentationDay?: PresentationDay | null
}


export function ScheduleTable({ onSave, onCancel, teamsPromise, judgesPromise,presentationDay }: ScheduleTableProps) {
  const [date, setDate] = useState(presentationDay?.date || "")
  const teams = use(teamsPromise)
  const judges = use(judgesPromise)


  const [academicYear, setAcademicYear] = useState(presentationDay?.academicYear || "")
  const [schedule, setSchedule] = useState<PresentationSlot[]>(presentationDay?.slots || [])
  const [isEditing, setIsEditing] = useState(!presentationDay)
  console.log({schedule})
  // Form state
  const [selectedTeam, setSelectedTeam] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [selectedJudge, setSelectedJudge] = useState<string>("")

  // Add a new presentation slot
  const handleAddSlot = () => {
    if (!selectedTeam || !selectedTimeSlot || !selectedRoom || !selectedJudge) return
    const team = teams.find(t => t.id === Number(selectedTeam))
    const judge = judges.find(j => j.id == parseInt(selectedTeam))
    const slotInfo = timeSlots.find(ts => ts.id === Number(selectedTimeSlot))
    if (!team || !judge || !slotInfo) return

    setSchedule(prev => [
      ...prev,
      {
        id: slotInfo.id,
        startTime: slotInfo.startTime,
        endTime: slotInfo.endTime,
        team,
        room: selectedRoom,
        judges: [judge],
      } as PresentationSlot,
    ])
    setSelectedTeam("")
    setSelectedTimeSlot("")
    setSelectedRoom("")
    setSelectedJudge("")
  }

  // Remove a slot
  const handleRemoveSlot = (index: number) => {
    setSchedule(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = (status: "draft" | "published") => {
    console.log("Saving schedule:", schedule, status, date, academicYear)
    onSave(schedule, status, date, academicYear)
  }

  // Group schedule by time slot for display
  const slotsByTime = timeSlots.map(ts => ({
    ...ts,
    slots: schedule.filter(s => s.id === ts.id),
  }))

  return (
      <div className="space-y-6">
        <div className="flex justify-end">
          {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="secondary">
                Modify
              </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Presentation Date</Label>
            <Input
                id="date"
                type="date"
                value={Date.parse(date) ? new Date(date).toISOString().split("T")[0] : ""}
                onChange={(e) => setDate(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
                readOnly={!isEditing} // Disable editing if already set
            />
          </div>
          <div>
            <Label htmlFor="academicYear" >Academic Year</Label>
            <Select value={academicYear} onValueChange={setAcademicYear} disabled={!isEditing}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white min-w-[150px]">
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(AcademicYear).map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Add Slot Form */}
        <div className="p-4 bg-slate-800 rounded-lg flex flex-wrap gap-4 items-end">
          <div>
            <Label>Team</Label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam} disabled={!isEditing}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white min-w-[150px]">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map(team => (
                    <SelectItem key={team.id} value={String(team.id)}>
                      {team.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Time Slot</Label>
            <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot} disabled={!isEditing}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white min-w-[150px]">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent >
                {timeSlots.map(ts => (
                    <SelectItem key={ts.id} value={String(ts.id)} disabled={!isEditing}>
                      {ts.startTime}–{ts.endTime}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Room</Label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom} disabled={!isEditing}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white min-w-[120px]">
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map(room => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Judge</Label>
            <Select value={selectedJudge} onValueChange={setSelectedJudge} disabled={!isEditing} >
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white min-w-[150px]">
                <SelectValue placeholder="Select judge" />
              </SelectTrigger>
              <SelectContent>
                {judges.map(judge => (
                    <SelectItem key={judge.id} value={judge.id.toString()}>
                      {judge.firstname} {judge.lastname}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddSlot} className="h-10" disabled={!isEditing}>Add Slot</Button>
        </div>

        {/* Emplois du temps with cards */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-4 text-white font-semibold w-40">Time Slot</th>
              <th className="text-left p-4 text-white font-semibold">Presentations</th>
            </tr>
            </thead>
            <tbody>
            {slotsByTime.map(ts => (
                <tr key={ts.id} className="border-b border-slate-700">
                  <td className="p-4 text-slate-300 font-medium w-40 align-top">
                    {ts.startTime}–{ts.endTime}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-4">
                      {ts.slots.length === 0 ? (
                          <span className="text-slate-500 italic">No presentations</span>
                      ) : (
                          ts.slots.map((slot, idx) => (
                              <div
                                  key={idx}
                                  className="bg-slate-800 border border-slate-700 rounded-lg shadow p-4 min-w-fit min-h-fit flex flex-col justify-between items-center gap-3 relative"
                              >
                                <div>
                                  <div className="font-semibold text-white mb-1 flex justify-between items-center">{slot.team.name}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-1/2 "
                                        onClick={() => handleRemoveSlot(schedule.indexOf(slot))}
                                    >
                                      Remove
                                    </Button></div>
                                  <div className="text-slate-400 text-sm mb-1">
                                    <span className="font-medium">Room:</span> {slot.room}
                                  </div>
                                  <div className="text-slate-400 text-sm">
                                    <span className="font-medium">Judge:</span>{" "}
                                    {slot.judges[0]?.user?.name ||
                                        `${slot.judges[0]?.firstname ?? ""} ${slot.judges[0]?.lastname ?? ""}`}
                                  </div>
                                </div>

                              </div>
                          ))
                      )}
                    </div>
                  </td>
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