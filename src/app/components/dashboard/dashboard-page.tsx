"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

import { StatCard } from "./stat-card"

// Dynamically import heavy components with fallback loading indicators
const ProjectsOverviewChart = dynamic(() => import("./projects-overview-chart"));
const RecentProjectsTable = dynamic(() => import("./recent-projects-table"));
const UpcomingDeadlines = dynamic(() => import("./upcoming-deadlines"));
const StudentsDistribution = dynamic(() => import("./students-distribution"));
const ProjectCompletionRate = dynamic(() => import("./project-completion-rate"));
const ParticleBackground = dynamic(
  () => import("@/app/components/ui/particle-background"),
  { loading: () => null }
)

import { projectData, years, recentProjects, upcomingDeadlines, completionRate } from "./dashboard-data"

export function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0F1022] text-white overflow-hidden relative">
      {/* Ambient light effect */}
      <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse" />
      <div
        className="fixed top-3/4 right-1/4 w-1/3 h-1/3 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed bottom-1/4 left-1/3 w-1/4 h-1/4 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Particle overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleBackground />
      </div>

      <div className="flex">
        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Dashboard grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Projects"
                  value="222"
                  description="Active projects across departments"
                  change="+12% from last month"
                  positive={true}
                  delay={0.1}
                />
                <StatCard
                  title="Total Students"
                  value="222"
                  description="Students enrolled in projects"
                  change="+8% from last month"
                  positive={true}
                  delay={0.2}
                />
                <StatCard
                  title="Total Teachers"
                  value="222"
                  description="Teachers supervising projects"
                  change="+6% from last month"
                  positive={true}
                  delay={0.3}
                />
              </div>

              {/* Projects Overview Chart */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ProjectsOverviewChart data={projectData} years={years} />
              </motion.div>

              {/* Recent Projects */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <RecentProjectsTable projects={recentProjects} isLoaded={isLoaded} />
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <UpcomingDeadlines deadlines={upcomingDeadlines} isLoaded={isLoaded} />
              </motion.div>

              {/* Charts */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-1 gap-6"
              >
                {/* Students Distribution */}
                <StudentsDistribution />
                {/* Project Completion Rate */}
                <ProjectCompletionRate data={completionRate} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
