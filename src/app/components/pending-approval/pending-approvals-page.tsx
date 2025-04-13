"use client"

import { useState, useEffect } from "react"
import { PendingApprovalsSearch } from "./pending-approvals-search"
import { PendingApprovalsTabs } from "./pending-approvals-tabs"
import { ApprovalHistory } from "./approval-history"
import ParticleBackground  from "@/app/components/ui/particle-background"

// Sample data
import { pendingStudents, pendingTeachers, approvalHistory } from "./pending-approvals-data"

export function PendingApprovalsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("students")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Filter data based on search query and filters
  const filteredStudents = pendingStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTeachers = pendingTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle bulk selection
  const handleSelectAllStudents = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map((student) => student.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectAllTeachers = (checked: boolean) => {
    if (checked) {
      setSelectedTeachers(filteredTeachers.map((teacher) => teacher.id))
    } else {
      setSelectedTeachers([])
    }
  }

  const handleStudentSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, id])
    } else {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id))
    }
  }

  const handleTeacherSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTeachers([...selectedTeachers, id])
    } else {
      setSelectedTeachers(selectedTeachers.filter((teacherId) => teacherId !== id))
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
        {/* Search and Filters */}
        <PendingApprovalsSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* Main Content */}
        <PendingApprovalsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredStudents={filteredStudents}
          filteredTeachers={filteredTeachers}
          selectedStudents={selectedStudents}
          selectedTeachers={selectedTeachers}
          handleSelectAllStudents={handleSelectAllStudents}
          handleSelectAllTeachers={handleSelectAllTeachers}
          handleStudentSelect={handleStudentSelect}
          handleTeacherSelect={handleTeacherSelect}
          isLoaded={isLoaded}
          setSelectedStudents={setSelectedStudents}
          setSelectedTeachers={setSelectedTeachers}
          // These project-related props are optional or can be omitted if not needed:
          filteredProjects={[]} 
          selectedProjects={[]} 
          handleSelectAllProjects={function (checked: boolean): void {
            throw new Error("Function not implemented.")
          }}
          handleProjectSelect={function (id: string, checked: boolean): void {
            throw new Error("Function not implemented.")
          }}
          setSelectedProjects={function (projects: string[]): void {
            throw new Error("Function not implemented.")
          }}
        />

        {/* Approval History */}
        <ApprovalHistory approvalHistory={approvalHistory} />
      </div>
    </div>
  )
}
