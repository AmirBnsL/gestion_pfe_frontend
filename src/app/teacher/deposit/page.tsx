import { DepositPage } from "@/app/components/teacher/deposit/deposit-page"
import {getMyProject} from "@/app/components/teacher/deposit/depositActions";

export default async function TeacherDepositPage() {
  const projects = getMyProject()

  return <DepositPage projects={projects} />
}
