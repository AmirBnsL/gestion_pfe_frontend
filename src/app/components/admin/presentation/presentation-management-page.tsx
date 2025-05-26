"use client"

import { useState ,use} from "react"
import { PresentationDayCard } from "./presentation-day-card"
import { CreatePresentationCard } from "./create-presentation-card"
import { ScheduleTable } from "./schedule-table"
import {PresentationDay, PresentationSlot} from "./presentation-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import {Team} from "@/app/components/student/teams-list/teamTypes";
import {Teacher} from "@/app/lib/api-client";
import {
  addSlotToPresentationDayAction,
  createPresentationDayAction
} from "@/app/components/admin/presentation/presentationActions";

export function PresentationManagementPage({days,judges,teams}: { days: Promise<PresentationDay[]>, judges: Promise<Teacher[]>, teams: Promise<Team[]> }) {

  const [presentationDay, setPresentationDay] = useState<PresentationDay | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const presentationDays = use(days)
  console.log(presentationDays)

  const handleCreatePresentation = async (
      schedule: PresentationSlot[],
      status: "draft" | "published",
      date: string,
      academicYear: string
  ) => {
    try {
      // 1. Create the presentation day
      const day = await createPresentationDayAction({ date, status, academicYear });

      console.log(schedule);
      // 2. Add each slot to the created day
      for (const slot of schedule) {
        await addSlotToPresentationDayAction({
          dayId: day.id.toString(),
          slot: {
            startTime: slot.startTime,
            endTime: slot.endTime,
            room: slot.room,
            teamId: slot.team.id,
            judges : slot.judges.map(judge => judge.id)

          }
        });
      }

      setShowCreateModal(false);
    } catch (e) {
      // Handle error (show toast, etc.)
      console.error("Failed to create presentation day:", e);
    }
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="">
        <div className="mb-8">

          <p className="text-slate-400">Manage presentation schedules and assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presentationDays?.map((day) => (
            <PresentationDayCard
              key={day.id}
              presentationDay={day}
              onClick={() => {
                console.log("Clicked on day:", day);
                setPresentationDay(day)
                setShowCreateModal(true)
              }}
            />
          ))}
          <CreatePresentationCard onClick={() => setShowCreateModal(true)} />
        </div>

        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create Presentation Day</DialogTitle>
            </DialogHeader>
            <ScheduleTable onSave={handleCreatePresentation} onCancel={() => setShowCreateModal(false)} judgesPromise={judges} teamsPromise={teams} presentationDay={presentationDay}/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
