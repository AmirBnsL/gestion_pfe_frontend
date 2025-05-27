"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { use } from 'react'
import { approveProjectAction, deleteProjectAction } from "./projectActions"
import { ProjectCard } from "./project-card"
import { Project } from "@/app/components/student/my-team/my-project-data"

// Lazy load components
const ParticleBackground = dynamic(
    () => import("@/app/components/ui/particle-background"),
    { ssr: false, loading: () => null }
)
const PendingApprovalsSearch = dynamic(
    () => import("../pending-approval/pending-approvals-search"),
    { ssr: true, loading: () => <div className="text-white p-4">Loading search...</div> }
)
const ProjectDetailsModal = dynamic(
    () => import("./project-details-modal"),
    { ssr: false }
)

export function ProjectManagementPage({ projects }: { projects: Promise<Project[]> }) {
    const allProjects = use(projects)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [sortOrder, setSortOrder] = useState("newest")
    const [selectedProject, setSelectedProject] = useState<any>(null)
    const [projectList, setProjectList] = useState<Project[]>([])
    const [loadingIds, setLoadingIds] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        setProjectList(allProjects)
    }, [allProjects])

    const filteredProjects = useMemo(() => {
        return projectList.filter(
            (project) =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (Array.isArray(project.teamMembers)
                    ? project.teamMembers.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
                    : (project.teamMembers ?? "").toLowerCase().includes(searchQuery.toLowerCase())) ||
                (project.supervisor ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.specialty ?? "").toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery, projectList])

    const handleViewProject = (project: any) => {
        setSelectedProject(project)
    }

    const handleCloseModal = () => {
        setSelectedProject(null)
    }

    const handleApproveProject = async (projectId: string) => {
        setLoadingIds((ids) => [...ids, projectId])
        try {
            await approveProjectAction(Number(projectId))
            router.refresh()
        } finally {
            setLoadingIds((ids) => ids.filter((id) => id !== projectId))
        }
    }

    const handleDeleteProject = async (projectId: string) => {
        setLoadingIds((ids) => [...ids, projectId])
        try {
            await deleteProjectAction(Number(projectId))
            router.refresh()
        } finally {
            setLoadingIds((ids) => ids.filter((id) => id !== projectId))
        }
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
                <PendingApprovalsSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />

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
                            disabled={loadingIds.includes(project.id)}
                        />
                    ))}
                </motion.div>

                {selectedProject && (
                    <ProjectDetailsModal project={selectedProject} onClose={handleCloseModal} />
                )}
            </div>
        </div>
    )
}