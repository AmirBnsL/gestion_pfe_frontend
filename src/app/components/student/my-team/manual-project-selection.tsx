"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { CheckCircle, Star } from "lucide-react"

// Dummy data for available projects
const availableProjects = [
  {
    id: "1",
    name: "AI Chatbot",
    description: "A chatbot powered by AI for student support.",
    supervisors: ["Dr. Smith", "Prof. Lee"],
  },
  {
    id: "2",
    name: "Smart Attendance",
    description: "Automated attendance system using facial recognition.",
    supervisors: ["Dr. Brown"],
  },
  {
    id: "3",
    name: "IoT Weather Station",
    description: "A weather station using IoT sensors and cloud analytics.",
    supervisors: ["Prof. Green"],
  },
]

export function ManualProjectSelection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelect = (id: string) => {
    setSelectedProject(id)
  }

  const handleUnselect = () => {
    setSelectedProject(null)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Project selection submitted!")
    }, 1200)
  }

  return (
    <Card className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg mt-8">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Select Your Project</h2>
            <Button
              onClick={handleSubmit}
              disabled={!selectedProject || isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20 px-8 py-2 rounded-md font-semibold transition-all duration-300"
            >
              {isSubmitting ? "Submitting..." : "Submit Selection"}
            </Button>
          </div>

          <div>
            {selectedProject ? (
              <div className="p-4 bg-[#1A1F3D] border border-[#2A2F52] rounded-lg flex items-center gap-4 mb-6">
                <CheckCircle className="h-7 w-7 text-green-400" />
                <div className="flex-1">
                  <div className="text-lg font-semibold text-white">
                    {availableProjects.find((p) => p.id === selectedProject)?.name}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {availableProjects.find((p) => p.id === selectedProject)?.description}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Supervisors: {availableProjects.find((p) => p.id === selectedProject)?.supervisors.join(", ")}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUnselect}
                  disabled={isSubmitting}
                  className="ml-4 px-4 py-1 rounded-md font-semibold transition-all duration-300 bg-red-600/20 text-red-400 border-red-600 hover:bg-red-700/30 hover:text-white"
                >
                  Unselect
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-slate-700 rounded-lg mb-6">
                <Star className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400">No project selected</p>
                <p className="text-xs text-slate-500 mt-1">Choose a project from the list below</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-200 mb-4">Available Projects</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {availableProjects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 bg-[#1A1F3D] border border-[#2A2F52] rounded-lg flex items-center gap-4 relative group transition-all duration-200 ${
                    selectedProject === project.id ? "opacity-60 pointer-events-none" : "hover:border-purple-500"
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-white font-semibold">{project.name}</div>
                    <div className="text-slate-400 text-sm">{project.description}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Supervisors: {project.supervisors.join(", ")}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={selectedProject === project.id || isSubmitting}
                    onClick={() => handleSelect(project.id)}
                    className={`ml-4 px-4 py-1 rounded-md font-semibold transition-all duration-300
                      ${selectedProject === project.id
                        ? "bg-green-600/20 text-green-400 border-green-600"
                        : "bg-[#23275a] text-white border-[#2A2F52] hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white hover:border-transparent"}
                    `}
                  >
                    {selectedProject === project.id ? "Selected" : "Select"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ManualProjectSelection