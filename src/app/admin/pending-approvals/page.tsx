

import dynamic from "next/dynamic"
import {getStudents, getTeachers} from "@/app/components/pending-approval/pendingApprovalActions";

const PendingApprovalsPage = dynamic(() => import("@/app/components/pending-approval/pending-approvals-page").then(mod => mod.PendingApprovalsPage))

export default function PendingApprovals() {
  const students = getStudents()
  const teachers = getTeachers()
  return <PendingApprovalsPage students={students} teachers={teachers} />
}
