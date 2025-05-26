import { PresentationManagementPage } from "@/app/components/admin/presentation/presentation-management-page"
import {getPresentationDays} from "@/app/components/admin/presentation/presentationActions";
import {getTeams} from "@/app/components/student/teams-list/teamActions";
import {getTeachers} from "@/app/components/pending-approval/pendingApprovalActions";

export default function AdminPresentationPage() {
  const presentations = getPresentationDays()
  const teams = getTeams();
  const judges = getTeachers()
  return <PresentationManagementPage days={presentations} teams={teams} judges={judges}/>
}
