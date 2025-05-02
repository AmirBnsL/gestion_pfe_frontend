

import dynamic from "next/dynamic"
import {getTeams} from "@/app/components/student/teams-list/teamActions";

import {getMyParameter} from "@/app/components/parameters/parameters-actions";

const TeamsListPage = dynamic(() => import("../../components/student/teams-list/teams-list-page"), {
  ssr: true,
})

export default function StudentTeamsListPage() {
  const teams = getTeams();
  const parameters = getMyParameter();
  return <TeamsListPage teams={teams} parameters={parameters} />
}
