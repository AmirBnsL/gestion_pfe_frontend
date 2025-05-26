"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { YearCard } from "./year-card"

// Sample academic years data
const academicYears = [
  { id: "2024-25", year: "2024–25", totalTeams: 45, totalProjects: 38, status: "Active" },
  { id: "2023-24", year: "2023–24", totalTeams: 42, totalProjects: 35, status: "Completed" },
  { id: "2022-23", year: "2022–23", totalTeams: 38, totalProjects: 32, status: "Completed" },
  { id: "2021-22", year: "2021–22", totalTeams: 35, totalProjects: 28, status: "Completed" },
  { id: "2020-21", year: "2020–21", totalTeams: 33, totalProjects: 26, status: "Completed" },
  { id: "2019-20", year: "2019–20", totalTeams: 30, totalProjects: 24, status: "Completed" },
]

export function ProjectDistributionPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredYears = academicYears.filter(
    (year) =>
      year.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      year.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-gray-400">Manage project assignments across academic years</p>
        </motion.div>

        {/* Academic Years Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredYears.map((year, index) => (
            <motion.div
              key={year.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <YearCard year={year} />
            </motion.div>
          ))}
        </motion.div>

        {filteredYears.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No academic years found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}