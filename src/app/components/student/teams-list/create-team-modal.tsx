"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { X, Plus, Search, Users } from "lucide-react"
import { Textarea } from "../../../components/ui/textarea"

// Sample available students data
const availableStudents = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Computer Science",
  },
  {
    id: 2,
    name: "Michael Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Electrical Engineering",
  },
  {
    id: 3,
    name: "Sophia Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Computer Science",
  },
  {
    id: 4,
    name: "Daniel Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Mechanical Engineering",
  },
  {
    id: 5,
    name: "Olivia Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Computer Science",
  },
  {
    id: 6,
    name: "James Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Information Technology",
  },
  {
    id: 7,
    name: "Ava Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Data Science",
  },
  {
    id: 8,
    name: "Alexander Moore",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Computer Engineering",
  },
]

// Sample project options
const projectOptions = [
  { id: 1, name: "Smart City Traffic Management" },
  { id: 2, name: "Sustainable Energy Monitoring" },
  { id: 3, name: "Remote Patient Monitoring" },
  { id: 4, name: "Predictive Analytics Platform" },
  { id: 5, name: "Serverless Application Framework" },
  { id: 6, name: "Network Security Monitoring" },
  { id: 7, name: "Augmented Reality Navigation" },
  { id: 8, name: "Blockchain Payment System" },
  { id: 9, name: "Custom Project" },
]

// Available roles
const roleOptions = [
  { id: 1, name: "Team Leader" },
  { id: 2, name: "Developer" },
  { id: 3, name: "Designer" },
  { id: 4, name: "Researcher" },
  { id: 5, name: "Data Scientist" },
  { id: 6, name: "Project Manager" },
]

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("")
  const [projectId, setProjectId] = useState("")
  const [customProject, setCustomProject] = useState("")
  const [teamType, setTeamType] = useState("open")
  const [maxMembers, setMaxMembers] = useState("6")
  const [description, setDescription] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showMemberSelector, setShowMemberSelector] = useState(false)

  // Filter students based on search query
  const filteredStudents = availableStudents.filter(
    (student) =>
      !selectedMembers.some((member) => member.id === student.id) &&
      student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddMember = (student: any) => {
    setSelectedMembers([...selectedMembers, { ...student, role: "" }])
    setSearchQuery("")
  }

  const handleRemoveMember = (studentId: number) => {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== studentId))
  }

  const handleRoleChange = (studentId: number, role: string) => {
    setSelectedMembers(selectedMembers.map((member) => (member.id === studentId ? { ...member, role } : member)))
  }

  const handleCreateTeam = () => {
    // Validate form
    if (!teamName.trim()) {
      alert("Please enter a team name")
      return
    }

    if (!projectId) {
      alert("Please select a project")
      return
    }

    if (projectId === "9" && !customProject.trim()) {
      alert("Please enter a custom project name")
      return
    }

    // In a real application, this would send data to the backend
    const teamData = {
      name: teamName,
      project:
        projectId === "9" ? customProject : projectOptions.find((p) => p.id === Number.parseInt(projectId))?.name,
      type: teamType,
      maxMembers: Number.parseInt(maxMembers),
      description,
      members: selectedMembers,
    }

    console.log("Creating team:", teamData)

    // Reset form and close modal
    resetForm()

    // For demo purposes
    alert("Team created successfully!")
  }

  const resetForm = () => {
    setTeamName("")
    setProjectId("")
    setCustomProject("")
    setTeamType("open")
    setMaxMembers("6")
    setDescription("")
    setSelectedMembers([])
    setSearchQuery("")
    setShowMemberSelector(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetForm}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#161A35]/95 backdrop-blur-xl border border-[#2A2F52] shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
            Create New Team
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Fill in the details below to create a new team for your project.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Team Name */}
          <div className="grid gap-2">
            <Label htmlFor="team-name" className="text-slate-300">
              Team Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="team-name"
              placeholder="Enter a name for your team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="bg-[#1A1F3D] border-[#2A2F52] text-white focus-visible:ring-purple-500 focus-visible:ring-offset-[#161A35]"
            />
          </div>

          {/* Project Selection */}
          <div className="grid gap-2">
            <Label htmlFor="project" className="text-slate-300">
              Project <span className="text-red-500">*</span>
            </Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger
                id="project"
                className="bg-[#1A1F3D] border-[#2A2F52] text-white focus:ring-purple-500 focus:ring-offset-[#161A35]"
              >
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F3D] border-[#2A2F52] text-white">
                {projectOptions.map((project) => (
                  <SelectItem
                    key={project.id}
                    value={project.id.toString()}
                    className="text-white focus:bg-purple-500/20 focus:text-white"
                  >
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Custom Project Input (shown only when "Custom Project" is selected) */}
            {projectId === "9" && (
              <div className="mt-2">
                <Input
                  placeholder="Enter custom project name"
                  value={customProject}
                  onChange={(e) => setCustomProject(e.target.value)}
                  className="bg-[#1A1F3D] border-[#2A2F52] text-white focus-visible:ring-purple-500 focus-visible:ring-offset-[#161A35]"
                />
              </div>
            )}
          </div>

          {/* Project Description */}
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-slate-300">
              Project Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write the full details of your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-[#1A1F3D] border-[#2A2F52] text-white focus-visible:ring-purple-500 focus-visible:ring-offset-[#161A35]"
            />
          </div>

          {/* Team Type */}
          <div className="grid gap-2">
            <Label className="text-slate-300">Team Type</Label>
            <RadioGroup value={teamType} onValueChange={setTeamType} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="open" id="open" className="border-[#2A2F52] text-purple-500" />
                <Label htmlFor="open" className="cursor-pointer text-slate-300">
                  Open (Anyone can request to join)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" className="border-[#2A2F52] text-purple-500" />
                <Label htmlFor="private" className="cursor-pointer text-slate-300">
                  Private (By invitation only)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Max Members */}
          <div className="grid gap-2">
            <Label htmlFor="max-members" className="text-slate-300">
              Maximum Team Size
            </Label>
            <Select value={maxMembers} onValueChange={setMaxMembers}>
              <SelectTrigger
                id="max-members"
                className="bg-[#1A1F3D] border-[#2A2F52] text-white focus:ring-purple-500 focus:ring-offset-[#161A35]"
              >
                <SelectValue placeholder="Select maximum team size" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F3D] border-[#2A2F52] text-white">
                {[2, 3, 4, 5, 6, 8, 10].map((size) => (
                  <SelectItem
                    key={size}
                    value={size.toString()}
                    className="text-white focus:bg-purple-500/20 focus:text-white"
                  >
                    {size} Members
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Members */}
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label className="text-slate-300">Team Members</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowMemberSelector(!showMemberSelector)}
                className="text-xs h-8 flex items-center gap-1 bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Members
              </Button>
            </div>

            {/* Selected Members List */}
            {selectedMembers.length > 0 ? (
              <div className="border border-[#2A2F52] rounded-md divide-y divide-[#2A2F52] bg-[#1A1F3D]/50">
                {selectedMembers.map((member) => (
                  <div key={member.id} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-slate-700">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-slate-700 text-slate-300">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={member.role} onValueChange={(value) => handleRoleChange(member.id, value)}>
                        <SelectTrigger className="h-8 w-[130px] text-xs bg-[#161A35] border-[#2A2F52] text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1F3D] border-[#2A2F52] text-white">
                          {roleOptions.map((role) => (
                            <SelectItem
                              key={role.id}
                              value={role.name}
                              className="text-white focus:bg-purple-500/20 focus:text-white"
                            >
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMember(member.id)}
                        className="h-8 w-8 text-slate-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove member</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-[#2A2F52] rounded-md p-6 flex flex-col items-center justify-center text-center bg-[#1A1F3D]/30">
                <Users className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-sm font-medium text-slate-300">No members added yet</p>
                <p className="text-xs text-slate-400 mt-1">Click "Add Members" to invite students to your team</p>
              </div>
            )}

            {/* Member Selector */}
            {showMemberSelector && (
              <div className="border border-[#2A2F52] rounded-md p-4 mt-2 bg-[#1A1F3D]/50">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search students..."
                      className="pl-9 bg-[#1A1F3D] border-[#2A2F52] text-white focus-visible:ring-purple-500 focus-visible:ring-offset-[#161A35]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="max-h-[200px] overflow-y-auto">
                  {filteredStudents.length > 0 ? (
                    <div className="divide-y divide-[#2A2F52]">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.id}
                          className="py-2 flex items-center justify-between cursor-pointer hover:bg-[#1F2347] px-2 rounded-md"
                          onClick={() => handleAddMember(student)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-slate-700">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback className="bg-slate-700 text-slate-300">
                                {student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-slate-200">{student.name}</p>
                              <p className="text-xs text-slate-400">{student.department}</p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs cursor-pointer bg-purple-500/20 text-purple-300 border-purple-500/30"
                          >
                            Add
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-slate-400">No students found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={resetForm}
            className="bg-[#161A35] border-[#2A2F52] hover:bg-[#1F2347] text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTeam}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Create Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
