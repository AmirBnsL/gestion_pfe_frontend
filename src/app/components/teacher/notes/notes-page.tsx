"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { studentGroups } from "@/app/components/admin/presentation/presentation-data"

interface GroupGrade {
  groupId: string
  rating: number
  comments: string
}

export function NotesPage() {
  const [grades, setGrades] = useState<GroupGrade[]>(
    studentGroups.map((group) => ({
      groupId: group.id,
      rating: 0,
      comments: "",
    })),
  )

  const updateGrade = (groupId: string, field: "rating" | "comments", value: string | number) => {
    setGrades((prev) => prev.map((grade) => (grade.groupId === groupId ? { ...grade, [field]: value } : grade)))
  }

  const handleSave = () => {
    console.log("Saving grades:", grades)
  }

  const handleSubmit = () => {
    console.log("Submitting grades:", grades)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="">
        <div className="mb-8">
        
          <p className="text-slate-400">Review and grade student presentations</p>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="text-left p-4 text-white font-semibold w-1/4">Group Name</th>
                  <th className="text-left p-4 text-white font-semibold w-1/6">Rating (0-20)</th>
                  <th className="text-left p-4 text-white font-semibold w-7/12">Comments</th>
                </tr>
              </thead>
              <tbody>
                {studentGroups.map((group) => {
                  const grade = grades.find((g) => g.groupId === group.id)
                  return (
                    <tr key={group.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="p-4">
                        <div>
                          <div className="text-white font-medium">{group.name}</div>
                          <div className="text-slate-400 text-sm">{group.members.join(", ")}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Input
                          type="number"
                          min="0"
                          max="20"
                          value={grade?.rating || 0}
                          onChange={(e) => updateGrade(group.id, "rating", Number.parseInt(e.target.value) || 0)}
                          className="bg-slate-700 border-slate-600 text-white w-20"
                        />
                      </td>
                      <td className="p-4">
                        <Textarea
                          value={grade?.comments || ""}
                          onChange={(e) => updateGrade(group.id, "comments", e.target.value)}
                          placeholder="Enter comments and feedback..."
                          className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={handleSave}
            className="bg-slate-700/50 border-slate-600 hover:bg-blue-600/20 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 font-semibold transition-all duration-300"
          >
            Save Draft
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20 px-8 py-2 rounded-md font-semibold transition-all duration-300"
          >
            Submit Grades
          </Button>
        </div>
      </div>
    </div>
  )
}
