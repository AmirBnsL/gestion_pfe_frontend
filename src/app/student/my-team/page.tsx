
import dynamic from "next/dynamic"
import {getMyTeam} from "@/app/components/student/my-team/my-project-actions";


const MyProjectPage = dynamic(
  () =>
    import("../../components/student/my-team/my-project-page").then(
      (mod) => mod.default
    ),
  {
    ssr: true, // This enables server-side rendering for MyProjectPage
    
  }
)

export default function MyProject() {
    const myTeam = getMyTeam()
  return <MyProjectPage team={myTeam} />
}
