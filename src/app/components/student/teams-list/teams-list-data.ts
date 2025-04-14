export interface TeamMember {
  id: number
  name: string
  avatar?: string
  role: string
  department?: string
}

export interface Team {
  id: number
  name: string
  project: string
  description: string
  isOpen: boolean
  currentMembers: number
  maxMembers: number
  leader: TeamMember
  members: TeamMember[]
  pendingRequests: number
}

// Sample data for teams
export const teamsData: Team[] = [
  {
    id: 1,
    name: "Innovators",
    project: "Smart City Traffic Management",
    description: "Developing an AI-powered traffic management system to reduce congestion in urban areas.",
    isOpen: true,
    currentMembers: 4,
    maxMembers: 6,
    leader: {
      id: 101,
      name: "Sarah Ishikawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
      department: "Computer Science",
    },
    members: [
      {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
        department: "Computer Science",
      },
      {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Developer",
        department: "Computer Science",
      },
      {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
        department: "Mathematics",
      },
      {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI Designer",
        department: "Design",
      },
    ],
    pendingRequests: 2,
  },
  {
    id: 2,
    name: "Innovators",
    project: "Smart City Traffic Management",
    description: "Developing an AI-powered traffic management system to reduce congestion in urban areas.",
    isOpen: true,
    currentMembers: 4,
    maxMembers: 6,
    leader: {
      id: 101,
      name: "Sarah Ishikawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
      department: "Computer Science",
    },
    members: [
      {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
        department: "Computer Science",
      },
      {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Developer",
        department: "Computer Science",
      },
      {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
        department: "Mathematics",
      },
      {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI Designer",
        department: "Design",
      },
    ],
    pendingRequests: 0,
  },
  {
    id: 3,
    name: "Innovators",
    project: "Smart City Traffic Management",
    description: "Developing an AI-powered traffic management system to reduce congestion in urban areas.",
    isOpen: false,
    currentMembers: 6,
    maxMembers: 6,
    leader: {
      id: 101,
      name: "Sarah Ishikawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
      department: "Computer Science",
    },
    members: [
      {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
        department: "Computer Science",
      },
      {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Developer",
        department: "Computer Science",
      },
      {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
        department: "Mathematics",
      },
      {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI Designer",
        department: "Design",
      },
      {
        id: 105,
        name: "Emily Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Backend Developer",
        department: "Computer Science",
      },
      {
        id: 106,
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "QA Engineer",
        department: "Computer Science",
      },
    ],
    pendingRequests: 0,
  },
  {
    id: 4,
    name: "Innovators",
    project: "Smart City Traffic Management",
    description: "Developing an AI-powered traffic management system to reduce congestion in urban areas.",
    isOpen: true,
    currentMembers: 4,
    maxMembers: 6,
    leader: {
      id: 101,
      name: "Sarah Ishikawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
      department: "Computer Science",
    },
    members: [
      {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
        department: "Computer Science",
      },
      {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Developer",
        department: "Computer Science",
      },
      {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
        department: "Mathematics",
      },
      {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI Designer",
        department: "Design",
      },
    ],
    pendingRequests: 1,
  },
  {
    id: 5,
    name: "Innovators",
    project: "Smart City Traffic Management",
    description: "Developing an AI-powered traffic management system to reduce congestion in urban areas.",
    isOpen: false,
    currentMembers: 3,
    maxMembers: 6,
    leader: {
      id: 101,
      name: "Sarah Ishikawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
      department: "Computer Science",
    },
    members: [
      {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
        department: "Computer Science",
      },
      {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Developer",
        department: "Computer Science",
      },
      {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
        department: "Mathematics",
      },
    ],
    pendingRequests: 0,
  },
  {
    id: 6,
    name: "Innovators",
    project: "Smart City Traffic Management",
    description: "Developing an AI-powered traffic management system to reduce congestion in urban areas.",
    isOpen: true,
    currentMembers: 4,
    maxMembers: 6,
    leader: {
      id: 101,
      name: "Sarah Ishikawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
      department: "Computer Science",
    },
    members: [
      {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
        department: "Computer Science",
      },
      {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Developer",
        department: "Computer Science",
      },
      {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
        department: "Mathematics",
      },
      {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI Designer",
        department: "Design",
      },
    ],
    pendingRequests: 0,
  },
]
