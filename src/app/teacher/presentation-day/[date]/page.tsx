import { TeacherPresentationSchedule } from "@/app/components/teacher/presentation-day/teacher-presentation-schedule"
import { getMySlotsAsTeacher } from "@/app/components/admin/presentation/presentationActions"

interface PageProps {
  params: { date: string }
}

export default async function SpecificDatePage({ params }: PageProps) {
  const slots = await getMySlotsAsTeacher()
  const filteredSlots = slots.filter(slot => slot.presentationDay?.date === params.date)

  return <TeacherPresentationSchedule slots={filteredSlots} date={params.date} />
}