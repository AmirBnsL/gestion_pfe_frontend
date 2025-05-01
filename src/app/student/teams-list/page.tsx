

import dynamic from "next/dynamic"
import {getTeams} from "@/app/components/student/teams-list/teamActions";

const TeamsListPage = dynamic(() => import("../../components/student/teams-list/teams-list-page"), {
  ssr: true,
})

export default function StudentTeamsListPage() {
  const teams = getTeams()
  return <TeamsListPage teams={teams}/>
}
