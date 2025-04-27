
import dynamic from "next/dynamic"

const ProjectManagementPage = dynamic(
  () =>
    import("@/app/components/project-management/project-management-page").then(
      (mod) => mod.ProjectManagementPage
    ),
  {
    ssr: true, // The component will render on the server

  }
)

export default function ProjectManagement() {
  return <ProjectManagementPage  />
}
