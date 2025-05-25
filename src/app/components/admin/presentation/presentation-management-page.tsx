"use client"

import { useState } from "react"
import { PresentationDayCard } from "./presentation-day-card"
import { CreatePresentationCard } from "./create-presentation-card"
import { ScheduleTable } from "./schedule-table"
import { mockPresentationDays, type ScheduleSlot } from "./presentation-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"

export function PresentationManagementPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [presentationDays, setPresentationDays] = useState(mockPresentationDays)

  const handleCreatePresentation = (schedule: ScheduleSlot[], status: "draft" | "published") => {
    // In a real app, this would save to the backend
    console.log("Creating presentation with schedule:", schedule, "status:", status)
    setShowCreateModal(false)
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="">
        <div className="mb-8">
          
          <p className="text-slate-400">Manage presentation schedules and assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presentationDays.map((day) => (
            <PresentationDayCard
              key={day.id}
              presentationDay={day}
              onClick={() => console.log("Edit presentation day:", day.id)}
            />
          ))}
          <CreatePresentationCard onClick={() => setShowCreateModal(true)} />
        </div>

        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create Presentation Day</DialogTitle>
            </DialogHeader>
            <ScheduleTable onSave={handleCreatePresentation} onCancel={() => setShowCreateModal(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
