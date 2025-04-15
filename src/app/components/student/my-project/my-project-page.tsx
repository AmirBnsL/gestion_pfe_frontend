"use client"
import { motion } from "framer-motion"
import { ProjectSettings } from "./project-settings"
import { SprintManagement } from "./sprint-management"

export function MyProjectPage() {
  return (
    <div className="p-6 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <ProjectSettings />
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
