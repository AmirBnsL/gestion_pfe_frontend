"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, MoreHorizontal, Trash, User } from "lucide-react"
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
import type { Teacher } from "@/app/components/pending-approval/pending-approval-types"

interface TeachersTableProps {
  teachers: Teacher[]
  selectedTeachers: string[]
  handleSelectAll: (checked: boolean) => void
  handleSelect: (id: string, checked: boolean) => void
}

export function TeachersTable({ teachers, selectedTeachers, handleSelectAll, handleSelect }: TeachersTableProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

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
                    checked={selectedTeachers.length === teachers.length && teachers.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">First Name</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Last Name</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Email</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Role</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Rank</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="p-4 text-left text-sm font-medium text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className="border-b border-slate-800 hover:bg-slate-800/50 group/row cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedTeacher(teacher)
                    }}
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedTeachers.includes(teacher.id.toString())}
                        onCheckedChange={(checked) => handleSelect(teacher.id.toString(), checked as boolean)}
                        className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                    </td>
                    <td className="p-4 font-medium group-hover/row:text-purple-300 transition-colors">
                      {teacher.firstname}
                    </td>
                    <td className="p-4 font-medium group-hover/row:text-purple-300 transition-colors">
                      {teacher.lastname}
                    </td>
                    <td className="p-4 text-sm">{teacher.user.email}</td>
                    <td className="p-4 text-sm">{teacher.role}</td>
                    <td className="p-4 text-sm">{teacher.rank}</td>
                    <td className="p-4">
                      <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">Pending</Badge>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                          <DropdownMenuItem
                            className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                            onClick={() => setSelectedTeacher(teacher)}
                          >
                            <User className="h-4 w-4 mr-2" />
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
                    No pending teacher approvals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTeacher && (
        <Dialog open={!!selectedTeacher} onOpenChange={(open) => !open && setSelectedTeacher(null)}>
          <DialogContent className="bg-[#1E2142] border-[#2A2F52] text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Teacher Details</DialogTitle>
              <p className="text-sm text-slate-400 mt-1">View detailed information about this teacher</p>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-slate-700 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <AvatarFallback className="bg-slate-700 text-slate-300 text-xl">
                  {selectedTeacher.firstname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-medium">
                  {selectedTeacher.firstname} {selectedTeacher.lastname}
                </h3>
                <p className="text-sm text-slate-400">{selectedTeacher.user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-purple-500/20 text-purple-300">{selectedTeacher.role}</Badge>
                  <Badge className="bg-green-500/20 text-green-300">{selectedTeacher.rank}</Badge>
                </div>
              </div>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Edit button clicked for", selectedTeacher.firstname)
                }}
              >
                Edit
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-[#161A35]/60 p-4 rounded-lg border border-[#2A2F52]">
                <h3 className="font-medium mb-3">Professional Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subject:</span>
                    <span>{selectedTeacher.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rank:</span>
                    <span>{selectedTeacher.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Role:</span>
                    <span>{selectedTeacher.role}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161A35]/60 p-4 rounded-lg border border-[#2A2F52]">
                <h3 className="font-medium mb-3">Personal Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Birthdate:</span>
                    <span>{new Date(selectedTeacher.birthdate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span>{selectedTeacher.user.email}</span>
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
                  <h3 className="font-medium mb-3">Projects Supervised</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md">
                      <div>
                        <div className="font-medium">AI Research Project</div>
                        <div className="text-xs text-slate-400">Role: Supervisor</div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-300">In Progress</Badge>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md">
                      <div>
                        <div className="font-medium">Machine Learning Workshop</div>
                        <div className="text-xs text-slate-400">Role: Instructor</div>
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
                        <div className="font-medium">Started Supervising AI Research Project</div>
                        <div className="text-xs text-slate-400">2 days ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 bg-slate-800/50 rounded-md">
                      <div className="w-1 h-full bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">Completed Workshop</div>
                        <div className="text-xs text-slate-400">5 days ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 bg-slate-800/50 rounded-md">
                      <div className="w-1 h-full bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">Account Created</div>
                        <div className="text-xs text-slate-400">
                          {new Date(selectedTeacher.birthdate).toLocaleDateString()}
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
