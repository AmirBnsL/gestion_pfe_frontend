"use client"

import {use} from 'react'
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import {Team} from "@/app/components/student/teams-list/teamTypes";

// Lazy load with SSR enabled
const ProjectSettings = dynamic(
  () => import("./project-settings").then(mod => mod.ProjectSettings),
  { ssr: true, }
)

const SprintManagement = dynamic(
  () => import("./sprint-management").then(mod => mod.SprintManagement),
  { ssr: true, }
)

export function MyProjectPage({team}:{team:Promise<Team>}) {

    const myTeam = use(team)
  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProjectSettings team={myTeam}/>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SprintManagement />
      </motion.div>
    </div>
  )
}
