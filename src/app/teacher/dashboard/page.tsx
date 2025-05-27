import { TeacherDashboardPage } from "@/app/components/teacher/dashboardPage/teacher-dashboard-page"
import {getMyProposedProjects} from "@/app/components/teacher/dashboardPage/my-proposals/proposalsActions";
import {getMySupervisedProjects} from "@/app/components/teacher/dashboardPage/my-supervisions/supervisionsActions";
import {
  getMySupervisionInvites
} from "@/app/components/teacher/dashboardPage/my-invite-requests/mySupervisorInvitesActions";

export default async function TeacherPage() {
  const proposals =  getMyProposedProjects()
  const supervisions =  getMySupervisedProjects()
  const inviteRequests = getMySupervisionInvites() // Placeholder for invite requests, if needed in the future


  return <TeacherDashboardPage proposals={proposals} supervisions={supervisions} inviteRequests={inviteRequests} />
}
