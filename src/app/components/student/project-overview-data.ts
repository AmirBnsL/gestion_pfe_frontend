// Team member type
export interface TeamMember {
  id: number
  name: string
  avatar: string
  role: string
}

// Task type
export interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  assignee?: TeamMember
  dueDate?: string
  priority: "low" | "medium" | "high"
}

// Submission type
export interface Submission {
  id: number
  title: string
  submittedBy: TeamMember
  submittedAt: string
  status: "pending" | "approved" | "rejected" | "needs-revision"
  feedback?: string
}

// Deadline type
export interface Deadline {
  id: number
  title: string
  date: string
  description: string
  isCompleted: boolean
}

// Project data
export const projectData = {
  name: "Smart City Traffic Management System",
  description: "An IoT-based solution for optimizing traffic flow in urban areas using machine learning algorithms.",
  status: "ongoing", // ongoing, submitted, approved, needsRevision
  progress: 68,
  lastUpdated: "2 hours ago",

  // Team members
  teamMembers: [
    {
      id: 1,
      name: "Sarah Chiwawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
      department: "Computer Science",
      email: "sarah.c@university.edu",
    },
    {
      id: 2,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
      department: "Computer Science",
      email: "alex.j@university.edu",
    },
    {
      id: 3,
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Data Scientist",
      department: "Mathematics",
      email: "maya.p@university.edu",
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UI/UX Designer",
      department: "Design",
      email: "david.k@university.edu",
    },
    {
      id: 5,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
      department: "Computer Science",
      email: "emma.w@university.edu",
    },
  ],

  // Tasks
  tasks: [
    {
      id: 1,
      title: "Design database schema",
      description: "Create the database schema for storing traffic data and sensor information",
      status: "completed",
      assignee: {
        id: 2,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Backend Developer",
      },
      dueDate: "2025-04-05",
      priority: "high",
    },
    {
      id: 2,
      title: "Implement data collection module",
      description: "Develop the module for collecting data from traffic sensors",
      status: "in-progress",
      assignee: {
        id: 3,
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
      },
      dueDate: "2025-04-15",
      priority: "high",
    },
    {
      id: 3,
      title: "Create dashboard UI",
      description: "Design and implement the user interface for the traffic monitoring dashboard",
      status: "in-progress",
      assignee: {
        id: 4,
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI/UX Designer",
      },
      dueDate: "2025-04-20",
      priority: "medium",
    },
    {
      id: 4,
      title: "Develop prediction algorithm",
      description: "Implement the machine learning algorithm for traffic prediction",
      status: "todo",
      assignee: {
        id: 3,
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Data Scientist",
      },
      dueDate: "2025-05-01",
      priority: "high",
    },
    {
      id: 5,
      title: "Integrate with city API",
      description: "Connect the system with the city's traffic management API",
      status: "todo",
      assignee: {
        id: 2,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Backend Developer",
      },
      dueDate: "2025-05-10",
      priority: "medium",
    },
    {
      id: 6,
      title: "Write technical documentation",
      description: "Document the system architecture and API endpoints",
      status: "todo",
      assignee: {
        id: 1,
        name: "Sarah Chiwawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
      },
      dueDate: "2025-05-15",
      priority: "low",
    },
  ],

  // Submissions
  submissions: [
    {
      id: 1,
      title: "Project Proposal",
      submittedBy: {
        id: 1,
        name: "Sarah Chiwawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
      },
      submittedAt: "2025-03-01",
      status: "approved",
      feedback: "Excellent proposal with clear objectives and methodology.",
    },
    {
      id: 2,
      title: "Requirements Document",
      submittedBy: {
        id: 1,
        name: "Sarah Chiwawa",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Team Leader",
      },
      submittedAt: "2025-03-15",
      status: "approved",
      feedback: "Comprehensive requirements. Consider adding more details about data security.",
    },
    {
      id: 3,
      title: "Database Design",
      submittedBy: {
        id: 2,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Backend Developer",
      },
      submittedAt: "2025-03-25",
      status: "needs-revision",
      feedback: "Good start, but needs more normalization and indexing strategy.",
    },
    {
      id: 4,
      title: "UI Mockups",
      submittedBy: {
        id: 4,
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI/UX Designer",
      },
      submittedAt: "2025-04-05",
      status: "pending",
    },
  ],

  // Deadlines
  deadlines: [
    {
      id: 1,
      title: "Project Proposal Submission",
      date: "2025-03-01",
      description: "Submit the initial project proposal with scope and objectives",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Requirements Document",
      date: "2025-03-15",
      description: "Submit detailed requirements and specifications document",
      isCompleted: true,
    },
    {
      id: 3,
      title: "First Progress Review",
      date: "2025-04-10",
      description: "Present initial progress and prototype to supervisor",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Midterm Evaluation",
      date: "2025-05-01",
      description: "Midterm project evaluation with department committee",
      isCompleted: false,
    },
    {
      id: 5,
      title: "Beta Version Demo",
      date: "2025-05-15",
      description: "Demonstrate beta version with core functionality",
      isCompleted: false,
    },
    {
      id: 6,
      title: "Final Submission",
      date: "2025-06-01",
      description: "Submit final project with all documentation",
      isCompleted: false,
    },
  ],

  // Supervisor
  supervisor: {
    id: 101,
    name: "Sarah Chiwawa",
    avatar: "/placeholder.svg?height=64&width=64",
    title: "Associate Professor",
    department: "Computer Science",
    availability: "available", // available, busy, away
    officeHours: ["Mon, Wed: 2:00 PM - 4:00 PM", "Fri: 10:00 AM - 12:00 PM"],
    recentFeedback:
      "Good progress on the data collection module. Please focus on improving the algorithm efficiency for the next milestone.",
    feedbackDate: "3 days ago",
  },
}
