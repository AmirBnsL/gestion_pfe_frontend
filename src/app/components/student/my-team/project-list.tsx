"use client"

import { useState } from "react"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import { Star, StarOff } from "lucide-react"
import { Avatar } from "../../ui/avatar"

// Mock data for available projects
const availableProjects = [
  {
    id: "project-1",
    name: "AI-Powered Learning Platform",
    description:
      "Developing an AI-powered learning platform to enhance student engagement and personalize learning experiences.",
    supervisors: [
      { name: "Dr. Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Prof. John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    ],
  },
  {
    id: "project-2",
    name: "Smart City Traffic Management System",
    description: "An IoT-based solution for optimizing traffic flow in urban areas using machine learning algorithms.",
    supervisors: [{ name: "Prof. Michael Chen", avatar: "/placeholder.svg?height=40&width=40" }],
  },
  {
    id: "project-3",
    name: "Virtual Reality Educational Environment",
    description: "Creating immersive VR environments for enhanced learning experiences in STEM subjects.",
    supervisors: [{ name: "Dr. Emily Rodriguez", avatar: "/placeholder.svg?height=40&width=40" }],
  },
  {
    id: "project-4",
    name: "Blockchain-Based Academic Credential System",
    description:
      "Developing a secure and transparent system for verifying and sharing academic credentials using blockchain technology.",
    supervisors: [{ name: "Prof. David Kim", avatar: "/placeholder.svg?height=40&width=40" }],
  },
  {
    id: "project-5",
    name: "Sustainable Campus Energy Management",
    description:
      "Creating a system to monitor and optimize energy usage across campus buildings using IoT sensors and data analytics.",
    supervisors: [{ name: "Dr. Lisa Patel", avatar: "/placeholder.svg?height=40&width=40" }],
  },
  {
    id: "project-6",
    name: "Augmented Reality Campus Tour",
    description:
      "Developing an AR application that provides interactive tours of the campus for new students and visitors.",
    supervisors: [{ name: "Prof. James Wilson", avatar: "/placeholder.svg?height=40&width=40" }],
  },
]

export function ProjectList() {
  const [selectedProjects, setSelectedProjects] = useState<typeof availableProjects>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddToWishlist = (project: (typeof availableProjects)[0]) => {
    if (selectedProjects.length >= 5) {
      alert("You can only select up to 5 projects. Please remove one before adding another.")
      return
    }

    if (!selectedProjects.some((p) => p.id === project.id)) {
      setSelectedProjects([...selectedProjects, project])
    }
  }

  const handleRemoveFromWishlist = (projectId: string) => {
    setSelectedProjects(selectedProjects.filter((project) => project.id !== projectId))
  }

  const handleSubmitWishlist = () => {
    // In a real app, you would make an API call here to submit the wishlist
    console.log("Submitting wishlist:", selectedProjects)
    // You could show a success message here
  }

  const filteredProjects = availableProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-lg mt-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Project Wishlist
            </h2>
            <p className="text-slate-400 text-sm">Select and rank your top 5 preferred projects</p>
          </div>
          <Button
            onClick={handleSubmitWishlist}
            disabled={selectedProjects.length === 0}
            className={`${
              selectedProjects.length > 0
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Submit Preferences
          </Button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selected Projects (Wishlist) */}
          <div>
            <h3 className="text-lg font-medium text-slate-200 mb-4">Your Wishlist ({selectedProjects.length}/5)</h3>

            {selectedProjects.length > 0 ? (
              <div className="space-y-3">
                {selectedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-4 bg-[#1A1F3D] border border-[#2A2F52] rounded-lg relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white text-sm font-medium">
                              {index + 1}
                            </div>
                            <h4 className="font-medium text-slate-200">{project.name}</h4>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromWishlist(project.id)}
                            className="z-99 h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <StarOff className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-slate-400 mt-1 line-clamp-2">{project.description}</p>

                        <div className="flex items-center mt-2 gap-2">
                          {project.supervisors.map((supervisor, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Avatar className="h-6 w-6 border border-slate-700">
                                <img
                                  src={supervisor.avatar || "/placeholder.svg"}
                                  alt={supervisor.name}
                                />
                              </Avatar>
                              <span className="text-xs text-slate-500">{supervisor.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-slate-700 rounded-lg">
                <Star className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400">No projects selected</p>
                <p className="text-xs text-slate-500 mt-1">Add projects from the list below</p>
              </div>
            )}
          </div>

          {/* Available Projects */}
          <div>
            <h3 className="text-lg font-medium text-slate-200 mb-4">Available Projects</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredProjects.map((project) => {
                const isSelected = selectedProjects.some((p) => p.id === project.id)

                return (
                  <div
                    key={project.id}
                    className={`p-4 border rounded-lg relative group ${
                      isSelected ? "bg-[#1A1F3D]/50 border-[#2A2F52]/50 opacity-70" : "bg-[#1A1F3D] border-[#2A2F52]"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-slate-200">{project.name}</h4>
                        <p className="text-sm text-slate-400 mt-1 line-clamp-2">{project.description}</p>

                        <div className="flex items-center mt-2 gap-2">
                          {project.supervisors.map((supervisor, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Avatar className="h-6 w-6 border border-slate-700">
                                <img
                                  src={supervisor.avatar || "/placeholder.svg"}
                                  alt={supervisor.name}
                                />
                              </Avatar>
                              <span className="text-xs text-slate-500">{supervisor.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToWishlist(project)}
                        disabled={isSelected || selectedProjects.length >= 5}
                        className={`z-99 h-8 min-w-[100px] ${
                          isSelected
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-not-allowed"
                            : selectedProjects.length >= 5
                              ? "bg-slate-700/50 text-slate-500 border-slate-600/50 cursor-not-allowed"
                              : "bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
                        }`}
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-purple-300" />
                            Selected
                          </span>
                        ) : (
                          <span className="z-99 flex items-center gap-1">
                            <Star className="h-3.5 w-3.5" />
                            Add
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}