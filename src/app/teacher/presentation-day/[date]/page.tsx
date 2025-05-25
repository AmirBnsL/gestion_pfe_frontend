import { TeacherPresentationSchedule } from "@/app/components/teacher/presentation-day/teacher-presentation-schedule"

interface PageProps {
  params: {
    date: string
  }
}

export default function SpecificDatePage({ params }: PageProps) {
  return <TeacherPresentationSchedule />
}
