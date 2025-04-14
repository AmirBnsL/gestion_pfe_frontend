export interface ProjectTask {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  dueDate: string
  assignedTo: {
    id: number
    name: string
    avatar?: string
  }
  priority: "low" | "medium" | "high"
}

export interface ProjectSubmission {
  id: number
  title: string
  submittedBy: {
    id: number
    name: string
    avatar?: string
  }
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  feedback?: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  avatar?: string
  department?: string
  email?: string
}

export interface ProjectDeadline {
  id: number
  title: string
  date: string
  description: string
  type: "milestone" | "submission" | "meeting"
}

export interface ProjectOverview {
  id: number
  name: string
  description: string
  progress: number
  startDate: string
  endDate: string
  teamMembers: TeamMember[]
  tasks: ProjectTask[]
  submissions: ProjectSubmission[]
  deadlines: ProjectDeadline[]
}

export const projectOverviewData: ProjectOverview = {
  id: 1,
  name: "Smart City Traffic Management",
  description:
    "Developing an AI-powered traffic management system to reduce congestion in urban areas. The system will use computer vision to analyze traffic patterns and optimize signal timing.",
  progress: 65,
  startDate: "2025-02-15",
  endDate: "2025-05-30",
  teamMembers: [
    {
      id: 101,
      name: "Sarah Ishikawa",
      role: "Team Leader",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Computer Science",
      email: "sarah.ishikawa@example.com",
    },
    {
      id: 102,
      name: "David Chen",
      role: "Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Computer Science",
      email: "david.chen@example.com",
    },
    {
      id: 103,
      name: "Maria Rodriguez",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Mathematics",
      email: "maria.rodriguez@example.com",
    },
    {
      id: 104,
      name: "Alex Johnson",
      role: "UI Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Design",
      email: "alex.johnson@example.com",
    },
  ],
  tasks: [
    {
      id: 1,
      title: "Set up development environment",
      description: "Install and configure all necessary tools and libraries for the project.",
      status: "completed",
      dueDate: "2025-02-20",
      assignedTo: {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "medium",
    },
    {
      id: 2,
      title: "Design database schema",
      description: "Create the database schema for storing traffic data and analysis results.",
      status: "completed",
      dueDate: "2025-02-25",
      assignedTo: {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "high",
    },
    {
      id: 3,
      title: "Implement traffic detection algorithm",
      description: "Develop the computer vision algorithm for detecting vehicles and traffic patterns.",
      status: "in-progress",
      dueDate: "2025-03-15",
      assignedTo: {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "high",
    },
    {
      id: 4,
      title: "Design user interface",
      description: "Create wireframes and mockups for the traffic management dashboard.",
      status: "completed",
      dueDate: "2025-03-10",
      assignedTo: {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "medium",
    },
    {
      id: 5,
      title: "Implement dashboard frontend",
      description: "Develop the frontend for the traffic management dashboard.",
      status: "in-progress",
      dueDate: "2025-04-05",
      assignedTo: {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "medium",
    },
    {
      id: 6,
      title: "Train traffic prediction model",
      description: "Train and validate the machine learning model for predicting traffic patterns.",
      status: "todo",
      dueDate: "2025-04-20",
      assignedTo: {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "high",
    },
    {
      id: 7,
      title: "Integrate with traffic signal API",
      description: "Connect the system with the traffic signal control API for real-time adjustments.",
      status: "todo",
      dueDate: "2025-05-10",
      assignedTo: {
        id: 102,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "medium",
    },
    {
      id: 8,
      title: "Prepare final documentation",
      description: "Create comprehensive documentation for the system architecture and usage.",
      status: "todo",
      dueDate: "2025-05-25",
      assignedTo: {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      priority: "low",
    },
  ],
  submissions: [
    {
      id: 1,
      title: "Project Proposal",
      submittedBy: {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      submittedAt: "2025-02-18",
      status: "approved",
      feedback: "Excellent proposal with clear objectives and methodology.",
    },
    {
      id: 2,
      title: "Database Design Document",
      submittedBy: {
        id: 103,
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      submittedAt: "2025-02-27",
      status: "approved",
      feedback: "Well-structured database design. Consider adding indexes for performance.",
    },
    {
      id: 3,
      title: "UI Mockups",
      submittedBy: {
        id: 104,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      submittedAt: "2025-03-12",
      status: "approved",
      feedback: "Clean and intuitive design. Make sure to consider accessibility.",
    },
    {
      id: 4,
      title: "Progress Report - March",
      submittedBy: {
        id: 101,
        name: "Sarah Ishikawa",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      submittedAt: "2025-04-01",
      status: "pending",
    },
  ],
  deadlines: [
    {
      id: 1,
      title: "Project Kickoff",
      date: "2025-02-15",
      description: "Initial team meeting to discuss project goals and assign roles.",
      type: "meeting",
    },
    {
      id: 2,
      title: "Project Proposal Submission",
      date: "2025-02-18",
      description: "Submit the detailed project proposal document.",
      type: "submission",
    },
    {
      id: 3,
      title: "Database Design Completion",
      date: "2025-02-25",
      description: "Finalize the database schema and submit for review.",
      type: "milestone",
    },
    {
      id: 4,
      title: "UI Design Review",
      date: "2025-03-10",
      description: "Present UI mockups for feedback and approval.",
      type: "meeting",
    },
    {
      id: 5,
      title: "Mid-project Review",
      date: "2025-04-01",
      description: "Present progress to date and adjust timeline if needed.",
      type: "meeting",
    },
    {
      id: 6,
      title: "Algorithm Testing Phase",
      date: "2025-04-15",
      description: "Complete testing of traffic detection and prediction algorithms.",
      type: "milestone",
    },
    {
      id: 7,
      title: "Integration Testing",
      date: "2025-05-15",
      description: "Test the complete integrated system.",
      type: "milestone",
    },
    {
      id: 8,
      title: "Final Project Submission",
      date: "2025-05-30",
      description: "Submit the completed project with documentation.",
      type: "submission",
    },
  ],
}
