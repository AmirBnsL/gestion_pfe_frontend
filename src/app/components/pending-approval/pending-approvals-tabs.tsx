"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Users, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import type { ReactNode } from "react"

interface PendingApprovalTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  filteredStudents: any[]
  filteredTeachers: any[]
  filteredProjects: any[]
  selectedStudents: string[]
  selectedTeachers: string[]
  selectedProjects: string[]
  handleSelectAllStudents: (checked: boolean) => void
  handleSelectAllTeachers: (checked: boolean) => void
  handleSelectAllProjects: (checked: boolean) => void
  handleStudentSelect: (id: string, checked: boolean) => void
  handleTeacherSelect: (id: string, checked: boolean) => void
  handleProjectSelect: (id: string, checked: boolean) => void
  isLoaded: boolean
  setSelectedStudents: (students: string[]) => void
  setSelectedTeachers: (teachers: string[]) => void
  setSelectedProjects: (projects: string[]) => void
  children?: ReactNode
}

export default function PendingApprovalsTabs({
  activeTab,
  setActiveTab,
  filteredStudents,
  filteredTeachers,
  filteredProjects,
  selectedStudents,
  selectedTeachers,
  selectedProjects,
  handleSelectAllStudents,
  handleSelectAllTeachers,
  handleSelectAllProjects,
  handleStudentSelect,
  handleTeacherSelect,
  handleProjectSelect,
  isLoaded,
  setSelectedStudents,
  setSelectedTeachers,
  setSelectedProjects,
  children,
}: PendingApprovalTabsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Tabs defaultValue="students" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 bg-[#161A35]/50 border border-[#2A2F52] p-1 rounded-lg">
          <TabsTrigger
            value="students"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300"
          >
            <div className="flex items-center gap-2 z-10">
              <Users className="h-4 w-4" />
              <span>Students</span>
              <Badge className="ml-1 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                {filteredStudents.length}
              </Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="teachers"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(139,92,246,0.5)] rounded-md transition-all duration-300"
          >
            <div className="flex items-center gap-2 z-10">
              <Users className="h-4 w-4" />
              <span>Teachers</span>
              <Badge className="ml-1 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                {filteredTeachers.length}
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Bulk Actions */}
        <AnimatePresence>
          {((activeTab === "students" && selectedStudents.length > 0) ||
            (activeTab === "teachers" && selectedTeachers.length > 0)) && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="z-99 bg-slate-800/80 backdrop-blur-md rounded-lg border border-slate-700 p-3 mb-4 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="z-99 flex items-center gap-2">
                <span className="text-sm text-slate-300">
                  {activeTab === "students" && `${selectedStudents.length} students selected`}
                  {activeTab === "teachers" && `${selectedTeachers.length} teachers selected`}
                </span>
              </div>
              <div className="z-99 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                  onClick={() => {
                    if (activeTab === "students") setSelectedStudents([])
                    if (activeTab === "teachers") setSelectedTeachers([])
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
                <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <X className="h-4 w-4 mr-1" />
                  Reject Selected
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve Selected
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content for each tab */}
        <TabsContent value="students" className="space-y-4">
          {children}
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          {children}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
