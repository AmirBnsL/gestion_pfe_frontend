"use client"

import React, { Suspense, useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { AnnouncementsList } from "./announcements-list"
import ParticleBackground from "@/app/components/ui/particle-background"
import { PendingApprovalsSearch } from "../pending-approval/pending-approvals-search"
import { announcements } from "./announcementsData"

// Lazy load the CreateAnnouncementDialog
const CreateAnnouncementDialog = React.lazy(() => import("./create-announcement-dialog"));

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(
      (announcement) =>
        announcement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.audience.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [announcements, searchQuery])

  return (
    <div className="min-h-screen bg-[#0F1022] text-white overflow-hidden relative">
      {/* Ambient light and particle background */}
      <div className="fixed top-1/4 right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse" />
      <div
        className="fixed bottom-1/4 left-1/4 w-1/3 h-1/3 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed top-1/3 left-1/3 w-1/4 h-1/4 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
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

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnnouncementsList announcements={filteredAnnouncements} />
        </motion.div>

        {/*
          Wrap the lazy component with Suspense so that a fallback UI
          displays while CreateAnnouncementDialog is being loaded.
        */}
        {isCreateDialogOpen && (
          <Suspense fallback={<div>Loading dialog...</div>}>
            <CreateAnnouncementDialog
              open={isCreateDialogOpen}
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
