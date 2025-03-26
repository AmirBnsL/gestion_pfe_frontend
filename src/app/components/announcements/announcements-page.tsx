"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { AnnouncementsList } from "./announcements-list"
import { CreateAnnouncementDialog } from "./create-announcement-dialog"
import { ParticleBackground } from "@/app/components/ui/particle-background"
import { PendingApprovalsSearch } from "../pending-approval/pending-approvals-search"

// Sample announcements data
const announcements = [
  {
    id: "1",
    name: "New grading system",
    datePosted: "11/10/2023",
    audience: "students",
    priorityLevel: "medium",
    message:
      "We are implementing a new grading system starting next semester. Please check the academic portal for details.",
  },
  {
    id: "2",
    name: "Final exam schedule",
    datePosted: "11/15/2023",
    audience: "students",
    priorityLevel: "high",
    message:
      "The final exam schedule has been posted. Please check your student portal for your personalized schedule.",
  },
  {
    id: "3",
    name: "AICTE rules for project...",
    datePosted: "11/12/2023",
    audience: "all",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
  {
    id: "4",
    name: "AICTE rules for project...",
    datePosted: "11/15/2023",
    audience: "students",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
  {
    id: "5",
    name: "AICTE rules for project...",
    datePosted: "11/16/2023",
    audience: "students",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
  {
    id: "6",
    name: "AICTE rules for project...",
    datePosted: "11/17/2023",
    audience: "students",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
  {
    id: "7",
    name: "AICTE rules for project...",
    datePosted: "11/18/2023",
    audience: "students",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
  {
    id: "8",
    name: "AICTE rules for project...",
    datePosted: "11/19/2023",
    audience: "students",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
  {
    id: "9",
    name: "AICTE rules for project...",
    datePosted: "11/20/2023",
    audience: "students",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
  {
    id: "10",
    name: "AICTE rules for project...",
    datePosted: "11/21/2023",
    audience: "students",
    priorityLevel: "urgent",
    message:
      "New AICTE rules for project submissions have been announced. All projects must comply with the new guidelines.",
  },
]

export function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.audience.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Particle overlay */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
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

        {/* Create New Announcement Button (centered) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8 z-10"
        >
          <Button
            className="bg-[#161A35]/80 hover:bg-[#1E2142] border border-[#2A2F52] text-white px-8 py-6"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Announcement
          </Button>
        </motion.div>

        {/* Announcements List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnnouncementsList announcements={filteredAnnouncements} />
        </motion.div>

        {/* Create Announcement Dialog */}
        <CreateAnnouncementDialog
          open={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
        />
      </div>
    </div>
  )
}
