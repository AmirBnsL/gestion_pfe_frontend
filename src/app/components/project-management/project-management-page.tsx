"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ParticleBackground } from "@/app/components/ui/particle-background"

import { ProjectCard } from "./project-card"
import { ProjectDetailsModal } from "./project-details-modal"
import { PendingApprovalsSearch } from "../pending-approval/pending-approvals-search"

// Sample project data
const projects = [
  {
    id: "1",
    name: "AI-Based Security System",
    status: "pending",
    leader: "Mousa balo",
    supervisor: "Si mouh",
    category: "AI",
    submittedDate: "Jan 15, 2024",
    description:
      "A security system that uses artificial intelligence to detect and prevent unauthorized access. The system uses facial recognition and behavior analysis to identify potential threats.",
    teamMembers: ["gatoz0", "jhony stone"],
    files: [
      { name: "project_proposal.pdf", size: "2.4 MB", uploadedOn: "Jan 10, 2024" },
      { name: "system_architecture.png", size: "1.1 MB", uploadedOn: "Jan 12, 2024" },
      { name: "budget_estimation.xlsx", size: "0.8 MB", uploadedOn: "Jan 14, 2024" },
    ],
  },
  {
    id: "2",
    name: "Smart Campus Navigation",
    status: "pending",
    leader: "Sarah Johnson",
    supervisor: "Dr. Robert Chen",
    category: "Mobile App",
    submittedDate: "Jan 14, 2024",
    description:
      "A mobile application that helps students and visitors navigate the campus efficiently. The app includes indoor mapping, class schedules, and real-time updates on events.",
    teamMembers: ["sarah_j", "mike_t", "alex_w"],
    files: [
      { name: "app_wireframes.pdf", size: "3.2 MB", uploadedOn: "Jan 8, 2024" },
      { name: "database_schema.sql", size: "0.5 MB", uploadedOn: "Jan 11, 2024" },
    ],
  },
  {
    id: "3",
    name: "Renewable Energy Monitoring",
    status: "pending",
    leader: "David Kim",
    supervisor: "Prof. Lisa Wang",
    category: "IoT",
    submittedDate: "Jan 12, 2024",
    description:
      "An IoT system that monitors and optimizes energy consumption from renewable sources across campus buildings. The system provides real-time analytics and suggestions for energy conservation.",
    teamMembers: ["david_k", "emma_l", "jason_m", "sophia_p"],
    files: [
      { name: "system_design.pdf", size: "4.1 MB", uploadedOn: "Jan 7, 2024" },
      { name: "sensor_specifications.docx", size: "1.3 MB", uploadedOn: "Jan 9, 2024" },
      { name: "dashboard_mockup.fig", size: "2.7 MB", uploadedOn: "Jan 11, 2024" },
    ],
  },
  {
    id: "4",
    name: "Student Mental Health Platform",
    status: "pending",
    leader: "Emily Wilson",
    supervisor: "Dr. James Carter",
    category: "Web App",
    submittedDate: "Jan 10, 2024",
    description:
      "A web platform that provides mental health resources, anonymous counseling, and wellness tracking for students. The platform aims to improve student wellbeing and academic performance.",
    teamMembers: ["emily_w", "ryan_b", "zoe_c"],
    files: [
      { name: "platform_features.pdf", size: "1.8 MB", uploadedOn: "Jan 5, 2024" },
      { name: "user_research.pdf", size: "2.2 MB", uploadedOn: "Jan 8, 2024" },
    ],
  },
]

export function ProjectManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewProject = (project: any) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  const handleApproveProject = (projectId: string) => {
    console.log(`Approving project ${projectId}`)
    // Implement approval logic here
  }

  const handleDeleteProject = (projectId: string) => {
    console.log(`Deleting project ${projectId}`)
    // Implement delete logic here
  }

  return (
    <div className="min-h-screen bg-[#0F1022] text-white overflow-hidden relative">
      {/* Ambient light effects */}
      <div className="fixed top-1/4 right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse" />
      <div
        className="fixed bottom-1/4 left-1/4 w-1/3 h-1/3 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed top-1/3 left-1/3 w-1/4 h-1/4 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Particle overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <PendingApprovalsSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* Projects Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={() => handleViewProject(project)}
              onApprove={() => handleApproveProject(project.id)}
              onDelete={() => handleDeleteProject(project.id)}
              delay={0.1 + index * 0.05}
            />
          ))}
        </motion.div>

        {/* Project Details Modal */}
        {selectedProject && (
          <ProjectDetailsModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  )
}
