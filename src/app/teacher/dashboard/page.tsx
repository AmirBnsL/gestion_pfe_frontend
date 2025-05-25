import { TeacherDashboardPage } from "@/app/components/teacher/dashboardPage/teacher-dashboard-page"
import {getMyProposedProjects} from "@/app/components/teacher/dashboardPage/my-proposals/proposalsActions";
import {getMySupervisedProjects} from "@/app/components/teacher/dashboardPage/my-supervisions/supervisionsActions";

export default async function TeacherPage() {
  const proposals = getMyProposedProjects()
  const supervisions = getMySupervisedProjects()

  return <TeacherDashboardPage proposals={proposals} supervisions={supervisions} />
}
