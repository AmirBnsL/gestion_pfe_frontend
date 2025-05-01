"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Check, MoreHorizontal, Trash, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import type { Student } from "@/app/components/pending-approval/pending-approval-types"
import type { AcademicYear } from "./pending-approval-types"

interface StudentsTableProps {
  students: Student[]
  selectedStudents: string[]
  handleSelectAll: (checked: boolean) => void
  handleSelect: (id: string, checked: boolean) => void
  academicYear: AcademicYear
  group: number
  onBack: () => void
}

export function StudentsTable({
  students,
  selectedStudents,
  handleSelectAll,
  handleSelect,
  academicYear,
  group,
  onBack,
}: StudentsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-700"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Groups
          </Button>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
            {academicYear} - Group {group} - Students
          </h2>
        </div>

        <div className="bg-[#161A35]/60 backdrop-blur-md rounded-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm"></div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectedStudents.length === students.length && students.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">First Name</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">Last Name</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">Email</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">Role</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">Academic Year</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">Group</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">Specialty</th>
                  <th className="p-4 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="z-99 p-4 text-left text-sm font-medium text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      className="z-99 border-b border-slate-800 hover:bg-slate-800/50 group/row cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedStudent(student)
                      }}
                    >
                      <td className="z-99 p-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedStudents.includes(student.id.toString())}
                          onCheckedChange={(checked) => handleSelect(student.id.toString(), checked as boolean)}
                          className="z-19 border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                      </td>
                      <td className="z-99 p-4 font-medium group-hover/row:text-purple-300 transition-colors">
                        {student.firstname}
                      </td>
                      <td className="p-4 font-medium group-hover/row:text-purple-300 transition-colors">
                        {student.lastname}
                      </td>
                      <td className="z-99 p-4 text-sm">{student.user.email}</td>
                      <td className="z-99 p-4 text-sm">{student.user.role}</td>
                      <td className="z-99 p-4 text-sm">{student.academicYear}</td>
                      <td className="z-99 p-4 text-sm">Group {student.group}</td>
                      <td className="z-99 p-4 text-sm">{student.specialty}</td>
                      <td className="z-99 p-4">
                        <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">{student.status}</Badge>
                      </td>
                      <td className="p-4 z-99" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild className="z-10">
                            <Button variant="ghost" size="icon" className="h-8 w-8 z-10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white z-10">
                            <DropdownMenuItem
                              className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <User className="z-99 h-4 w-4 mr-2 z-10" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                              <Check className="z-99 h-4 w-4 mr-2 text-green-400" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="z-99 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                              <Trash className="z-99 h-4 w-4 mr-2 text-red-400" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="p-4 text-center text-slate-400">
                      No students found in this group
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
          <DialogContent className="bg-[#1E2142] border-[#2A2F52] text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Student Details</DialogTitle>
              <p className="text-sm text-slate-400 mt-1">View detailed information about this student</p>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <AvatarFallback className="bg-slate-700 text-slate-300 text-xl">
                  {selectedStudent.firstname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-medium">
                  {selectedStudent.firstname} {selectedStudent.lastname}
                </h3>
                <p className="text-sm text-slate-400">{selectedStudent.user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-indigo-500/20 text-indigo-300">{selectedStudent.user.role}</Badge>
                  <Badge className="bg-green-500/20 text-green-300">{selectedStudent.status}</Badge>
                </div>
              </div>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Edit button clicked for", selectedStudent.firstname)
                }}
              >
                Edit
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-[#161A35]/60 p-4 rounded-lg border border-[#2A2F52]">
                <h3 className="font-medium mb-3">Academic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Academic Year:</span>
                    <span>{selectedStudent.academicYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Group:</span>
                    <span>{selectedStudent.group}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Specialty:</span>
                    <span>{selectedStudent.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Promotional Year:</span>
                    <span>{selectedStudent.promotionalYear}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161A35]/60 p-4 rounded-lg border border-[#2A2F52]">
                <h3 className="font-medium mb-3">Personal Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Job:</span>
                    <span>{selectedStudent.job}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Birthdate:</span>
                    <span>{new Date(selectedStudent.birthdate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span>{selectedStudent.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="projects" className="mt-6">
              <TabsList className="bg-[#161A35] border border-[#2A2F52]">
                <TabsTrigger value="projects" className="data-[state=active]:bg-[#2A2F52]">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-[#2A2F52]">
                  Activity Log
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-4 space-y-4">
                <div className="bg-[#161A35]/60 p-4 rounded-lg border border-[#2A2F52]">
                  <h3 className="font-medium mb-3">Projects Enrolled</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md">
                      <div>
                        <div className="font-medium">Science Project</div>
                        <div className="text-xs text-slate-400">Role: Leader</div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-300">In Progress</Badge>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md">
                      <div>
                        <div className="font-medium">Science Project</div>
                        <div className="text-xs text-slate-400">Role: Member</div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300">Completed</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <div className="bg-[#161A35]/60 p-4 rounded-lg border border-[#2A2F52]">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-2 bg-slate-800/50 rounded-md">
                      <div className="w-1 h-full bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">Joined Science Project</div>
                        <div className="text-xs text-slate-400">2 days ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 bg-slate-800/50 rounded-md">
                      <div className="w-1 h-full bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">Completed Assignment</div>
                        <div className="text-xs text-slate-400">5 days ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 bg-slate-800/50 rounded-md">
                      <div className="w-1 h-full bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">Account Created</div>
                        <div className="text-xs text-slate-400">
                          {new Date(selectedStudent.birthdate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
