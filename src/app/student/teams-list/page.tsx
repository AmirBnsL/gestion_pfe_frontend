"use client"

import dynamic from "next/dynamic"

const TeamsListPage = dynamic(() => import("../../components/student/teams-list/teams-list-page"), {
  ssr: true,
})

export default function StudentTeamsListPage() {
  return <TeamsListPage />
}
