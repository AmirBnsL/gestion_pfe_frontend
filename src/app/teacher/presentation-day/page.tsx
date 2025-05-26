import { PresentationCalendar } from "@/app/components/teacher/presentation-day/presentation-calendar"
import { getMySlotsAsTeacher } from "@/app/components/admin/presentation/presentationActions"
import { PresentationDay } from "@/app/components/admin/presentation/presentation-data"

export default async function TeacherPresentationDayPage() {
  const slots = await getMySlotsAsTeacher()

  // Group slots by presentationDay.id
  const dayMap = new Map<number, PresentationDay>()

  for (const slot of slots) {
    const day = slot.presentationDay
    if (!day) continue
    if (!dayMap.has(day.id)) {
      dayMap.set(day.id, { ...day, slots: [] })
    }
    dayMap.get(day.id)!.slots.push(slot)
  }

  const presentationDays = Array.from(dayMap.values())

  return <PresentationCalendar presentationDays={presentationDays} />
}