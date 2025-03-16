"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, MoreHorizontal, Trash, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

interface StudentsTableProps {
  students: any[]
  selectedStudents: string[]
  handleSelectAll: (checked: boolean) => void
  handleSelect: (id: string, checked: boolean) => void
}

export function StudentsTable({ students, selectedStudents, handleSelectAll, handleSelect }: StudentsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  return (
    <>
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
                <th className="p-4 text-left text-sm font-medium text-slate-300">Name</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Email</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Role</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Date Joined</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Department</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Action</th>
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
                    className="z-10 border-b border-slate-800 hover:bg-slate-800/50 group/row cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedStudent(student)
                    }}
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={(checked) => handleSelect(student.id, checked as boolean)}
                        className="z-19 border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium group-hover/row:text-purple-300 transition-colors">
                          {student.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{student.email}</td>
                    <td className="p-4 text-sm">Student</td>
                    <td className="p-4 text-sm">{student.registrationDate}</td>
                    <td className="p-4 text-sm">{student.department}</td>
                    <td className="p-4">
                      <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">Pending</Badge>
                    </td>
                    <td className="p-4 z-10" onClick={(e) => e.stopPropagation()}>
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
                            <User className="h-4 w-4 mr-2 z-10" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                            <Check className="h-4 w-4 mr-2 text-green-400" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                            <Trash className="h-4 w-4 mr-2 text-red-400" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-slate-400">
                    No pending student approvals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
          <DialogContent className="bg-[#1E2142] border-[#2A2F52] text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">User Details</DialogTitle>
              <p className="text-sm text-slate-400 mt-1">View detailed information about this user</p>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                <AvatarFallback className="bg-slate-700 text-slate-300 text-xl">
                  {selectedStudent.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-medium">{selectedStudent.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-indigo-500/20 text-indigo-300">Student</Badge>
                  <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                </div>
              </div>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Edit button clicked for", selectedStudent.name)
                  // Add your edit functionality here
                }}
              >
                Edit
              </Button>
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
                        <div className="text-xs text-slate-400">{selectedStudent.registrationDate}</div>
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

