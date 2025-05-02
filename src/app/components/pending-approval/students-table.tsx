import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import StudentTableHeader from "./StudentTableHeader"
import StudentTableRow from "./StudentTableRow"
import StudentDetailsDialog from "./StudentDetailsDialog";
import type { Student } from "./pending-approval-types"
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
                <StudentTableHeader
                    allSelected={selectedStudents.length === students.length && students.length > 0}
                    onSelectAll={handleSelectAll}
                />
                </thead>
                <tbody>
                {students.length > 0 ? (
                    students.map((student, index) => (
                        <StudentTableRow
                            key={student.id}
                            student={student}
                            index={index}
                            isSelected={selectedStudents.includes(student.id.toString())}
                            onSelect={handleSelect}
                            onViewDetails={() => setSelectedStudent(student)}
                        />
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
            <StudentDetailsDialog
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
            />
        )}
      </>
  )
}
