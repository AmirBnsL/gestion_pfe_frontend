"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AppNavbar } from "@/app/components/app-navbar/page"
import { WishlistTable } from "./wishlist-table"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { ArrowLeft, Calendar, Users, FolderOpen, Shuffle } from "lucide-react"

interface YearDetailPageProps {
  year: string
}

// Sample data for the year detail
const yearData = {
  "2024-25": {
    year: "2024–25",
    status: "Active",
    totalTeams: 45,
    totalProjects: 38,
    assignedTeams: 32,
    pendingTeams: 13,
  },
  "2023-24": {
    year: "2023–24",
    status: "Completed",
    totalTeams: 42,
    totalProjects: 35,
    assignedTeams: 42,
    pendingTeams: 0,
  },
}

export function YearDetailPage({ year }: YearDetailPageProps) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [isDistributing, setIsDistributing] = useState(false)

  const currentYear = yearData[year as keyof typeof yearData] || yearData["2024-25"]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleDistributeProjects = () => {
    setIsDistributing(true)
    // TODO: Implement backend logic
    console.log("Distributing projects for year:", year)
    setTimeout(() => {
      setIsDistributing(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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

      <div className="container mx-auto">
        {/* Navbar */}
        <AppNavbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">{currentYear.year}</h1>
              <Badge className={`${getStatusColor(currentYear.status)}`}>{currentYear.status}</Badge>
            </div>
          </div>
          <p className="text-gray-400">Manage project distribution and team preferences</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{currentYear.totalTeams}</p>
                  <p className="text-sm text-gray-400">Total Teams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{currentYear.totalProjects}</p>
                  <p className="text-sm text-gray-400">Available Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 font-bold">✓</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{currentYear.assignedTeams}</p>
                  <p className="text-sm text-gray-400">Assigned Teams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-400 font-bold">⏳</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{currentYear.pendingTeams}</p>
                  <p className="text-sm text-gray-400">Pending Teams</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wishlist Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <WishlistTable year={year} />
        </motion.div>

        {/* Distribute Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleDistributeProjects}
            disabled={isDistributing}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            {isDistributing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 mr-2"
                >
                  <Shuffle className="w-5 h-5" />
                </motion.div>
                Distributing...
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5 mr-2" />
                Distribute Projects
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
