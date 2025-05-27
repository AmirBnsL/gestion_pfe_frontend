"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Avatar } from "../../ui/avatar"
import { Search, UserPlus } from "lucide-react"
import { Checkbox } from "../../ui/checkbox"

const staticStudents = [
  {
    id: "3",
    firstname: "David",
    lastname: "Williams",
    specialty: "Frontend",
    academicYear: "2nd Year"
  },
  {
    id: "4",
    firstname: "Eva",
    lastname: "Martinez",
    specialty: "Backend",
    academicYear: "3rd Year"
  }
]

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const filteredStudents = staticStudents.filter((student) =>
    `${student.firstname} ${student.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    )
  }

  const handleInviteStudents = () => {
    // In a real app, you would make an API call here to invite the selected students
    console.log("Inviting students:", selectedStudents)
    setSelectedStudents([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-900 border border-slate-800 text-slate-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Add Team Members
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-slate-400">Search and invite students to join your team.</p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="pl-10 bg-slate-800 border-slate-700 text-slate-200"
            />
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border border-slate-700">
                      <img src={"/placeholder.svg"} alt={`${student.firstname} ${student.lastname}`} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-200 text-sm">
                        {student.firstname} {student.lastname}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-400">{student.specialty}</p>
                        <span className="text-slate-500 text-xs">•</span>
                        <p className="text-xs text-slate-500">{student.academicYear}</p>
                      </div>
                    </div>
                  </div>
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => handleToggleStudent(student.id)}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-slate-400">No students found</p>
                <p className="text-xs text-slate-500 mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleInviteStudents}
            disabled={selectedStudents.length === 0}
            className={`flex items-center gap-2 ${
              selectedStudents.length > 0
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            Invite {selectedStudents.length > 0 ? `(${selectedStudents.length})` : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}