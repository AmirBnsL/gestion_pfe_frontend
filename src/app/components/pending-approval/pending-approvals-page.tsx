"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import type { Student, Teacher, AcademicYear } from "@/app/components/pending-approval/pending-approval-types"
import {
  approvalHistory,
  sampleStudents,
  sampleTeachers,
  getAcademicYears,
  getGroupsByAcademicYear,
  getStudentsByYearAndGroup,
} from "./pending-approvals-data"

// Dynamically import sub-components:
const PendingApprovalsSearch = dynamic(() => import("./pending-approvals-search"), { ssr: true })
const PendingApprovalsTabs = dynamic(() => import("./pending-approvals-tabs"), { ssr: true })

const AcademicYearCards = dynamic(() => import("./academic-year-cards"), { ssr: true })
const GroupCards = dynamic(() => import("./group-cards"), { ssr: true })
const StudentsTable = dynamic(() => import("./students-table").then((mod) => mod.StudentsTable), { ssr: true })
const TeachersTable = dynamic(() => import("./teachers-table").then((mod) => mod.TeachersTable), { ssr: true })
const ParticleBackground = dynamic(() => import("@/app/components/ui/particle-background"), {
  ssr: false,
  loading: () => null,
})

export function PendingApprovalsPage({
  students: studentsPromise,
  teachers: teachersPromise,
}: { students: Promise<Student[]>; teachers: Promise<Teacher[]> }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("students")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Navigation state for students
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<AcademicYear | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

  // Using sample data for now
  const allStudents = sampleStudents
  const allTeachers = sampleTeachers

  // Memoize filtered results to avoid recomputation on each render:
  const filteredStudents = useMemo(() => {
    return allStudents.filter(
      (student) =>
        student.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [allStudents, searchQuery])

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(
      (teacher) =>
        teacher.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [allTeachers, searchQuery])

  // Get academic years and groups
  const academicYears = useMemo(() => getAcademicYears(filteredStudents), [filteredStudents])

  const groupsByYear = useMemo(
    () => (selectedAcademicYear ? getGroupsByAcademicYear(filteredStudents, selectedAcademicYear) : []),
    [filteredStudents, selectedAcademicYear],
  )

  const studentsInGroup = useMemo(
    () =>
      selectedAcademicYear && selectedGroup !== null
        ? getStudentsByYearAndGroup(filteredStudents, selectedAcademicYear, selectedGroup)
        : [],
    [filteredStudents, selectedAcademicYear, selectedGroup],
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle bulk selection:
  const handleSelectAllStudents = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(studentsInGroup.map((student) => student.id.toString()))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSelectAllTeachers = (checked: boolean) => {
    if (checked) {
      setSelectedTeachers(filteredTeachers.map((teacher) => teacher.id.toString()))
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

  // Navigation handlers
  const handleSelectAcademicYear = (year: AcademicYear) => {
    setSelectedAcademicYear(year)
    setSelectedGroup(null)
  }

  const handleSelectGroup = (group: number) => {
    setSelectedGroup(group)
  }

  const handleBackToYears = () => {
    setSelectedAcademicYear(null)
    setSelectedGroup(null)
  }

  const handleBackToGroups = () => {
    setSelectedGroup(null)
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
          handleSelectAllProjects={(checked: boolean): void => {
            throw new Error("Function not implemented.")
          }}
          handleProjectSelect={(id: string, checked: boolean): void => {
            throw new Error("Function not implemented.")
          }}
          setSelectedProjects={(projects: string[]): void => {
            throw new Error("Function not implemented.")
          }}
        >
          {/* Student View - Conditional rendering based on navigation state */}
          {activeTab === "students" && (
            <>
              {!selectedAcademicYear && (
                <AcademicYearCards academicYears={academicYears} onSelectYear={handleSelectAcademicYear} />
              )}

              {selectedAcademicYear && !selectedGroup && (
                <GroupCards
                  academicYear={selectedAcademicYear}
                  groups={groupsByYear}
                  onSelectGroup={handleSelectGroup}
                  onBack={handleBackToYears}
                />
              )}

              {selectedAcademicYear && selectedGroup !== null && (
                <StudentsTable
                  students={studentsInGroup}
                  selectedStudents={selectedStudents}
                  handleSelectAll={handleSelectAllStudents}
                  handleSelect={handleStudentSelect}
                  academicYear={selectedAcademicYear}
                  group={selectedGroup}
                  onBack={handleBackToGroups}
                />
              )}
            </>
          )}

          {/* Teacher View */}
          {activeTab === "teachers" && (
            <TeachersTable
              teachers={filteredTeachers}
              selectedTeachers={selectedTeachers}
              handleSelectAll={handleSelectAllTeachers}
              handleSelect={handleTeacherSelect}
               
            />
          )}
        </PendingApprovalsTabs>


    
      </div>
    </div>
  )
}

export default PendingApprovalsPage
