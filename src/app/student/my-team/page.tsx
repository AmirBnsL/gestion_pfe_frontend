import dynamic from "next/dynamic"
import { getAllStudents, getMyJoinRequests, getMyTeam } from "@/app/components/student/my-team/my-project-actions"

const MyProjectPage = dynamic(
  () =>
    import("../../components/student/my-team/my-project-page").then(
      (mod) => mod.default
    ),
  {
    ssr: true,
  }
)

export default async function MyProject() {
  const myTeam =  getMyTeam()
  const joinRequests =  getMyJoinRequests()
  const students =  getAllStudents()
  return <MyProjectPage team={ myTeam} joinRequests={ joinRequests} students={ students} />
}