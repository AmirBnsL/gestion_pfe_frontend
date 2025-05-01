"use client"

import { useState, useEffect, useMemo,use } from "react"
import dynamic from "next/dynamic"
  import {Student,Teacher} from "@/app/components/pending-approval/pending-approval-types";
import {approvalHistory} from "./pending-approvals-data"
// Dynamically import sub-components:
const PendingApprovalsSearch = dynamic(
  () => import("./pending-approvals-search"), 
  { ssr: true, }
)
const PendingApprovalsTabs = dynamic(
  () => import("./pending-approvals-tabs"),
  { ssr: true, }
)
const ApprovalHistoryComponent = dynamic(
  () => import("./approval-history"),
  { ssr: true,  }
)
const ParticleBackground = dynamic(
  () => import("@/app/components/ui/particle-background"),
  { ssr: false, loading: () => null }
)

// Sample data:

export function PendingApprovalsPage({students,teachers}:{students:Promise<Student[]>,teachers:Promise<Teacher[]>}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("students")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const allStudents = use(students);
  const allTeachers = use(teachers);

  // Memoize filtered results to avoid recomputation on each render:
  const filteredStudents = useMemo(() => {
    console.log(allStudents)
    return allStudents.filter(
      (student) =>
        student.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastname.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [allStudents, searchQuery])

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(
      (teacher) =>
        teacher.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [allTeachers, searchQuery])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle bulk selection:
  const handleSelectAllStudents = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map((student) => student.user.email.toLowerCase()))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectAllTeachers = (checked: boolean) => {
    if (checked) {
      setSelectedTeachers(filteredTeachers.map((teacher) => teacher.user.email.toLowerCase()))
    } else {
      setSelectedTeachers([])
    }
  }

  // Handle individual selection:
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

      {/* Particle overlay (lazy load visuals, SSR disabled) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters (SSR enabled) */}
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
          // The project-related props below are optional:
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

        {/* Approval History (lazy load, SSR disabled) */}
        <ApprovalHistoryComponent approvalHistory={approvalHistory} />
      </div>
    </div>
  )
}
