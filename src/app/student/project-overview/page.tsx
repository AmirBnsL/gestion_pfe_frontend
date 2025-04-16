"use client"

import dynamic from "next/dynamic"

const ProjectOverviewPage = dynamic(
  () =>
    import("../../components/student/project-overview/project-overview-page").then(
      (mod) => mod.ProjectOverviewPage
    ),
  {
    ssr: true, // Render on the server for SEO and faster initial load.
    
  }
)

export default function StudentProjectOverviewPage() {
  return <ProjectOverviewPage />
}
