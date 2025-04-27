
import dynamic from "next/dynamic"
import {getProjects} from "@/app/components/project-management/projectActions";

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
    const projects = getProjects()
  return <ProjectManagementPage projects={projects} />
}
