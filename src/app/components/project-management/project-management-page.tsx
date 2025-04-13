"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import  ParticleBackground  from "@/app/components/ui/particle-background"

import { ProjectCard } from "./project-card"
import { ProjectDetailsModal } from "./project-details-modal"
import { PendingApprovalsSearch } from "../pending-approval/pending-approvals-search"
import { projects } from "../project-management/projectData"
// Sample project data


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
