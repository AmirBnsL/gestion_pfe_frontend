import dynamic from "next/dynamic"
import { getAllStudents, getMyJoinRequests, getMyTeam, TeamJoinRequest } from "@/app/components/student/my-team/my-project-actions"
import { Team } from "@/app/components/student/teams-list/teamTypes";
import { Student } from "@/app/lib/api-client";





const MyProjectPageDynamic = dynamic(
  () =>
    import("../../components/student/my-team/my-project-page").then(
      (mod) => mod.default
    ),
  {
    ssr: true,
  }
)

export default  function MyProjectPage() {
  const myTeamPromise =  getMyTeam();

  return <MyProjectPageDynamic team={myTeamPromise} />;
}