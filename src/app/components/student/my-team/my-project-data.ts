export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
}

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  status: string
  comments?: Comment[]
  attachments?: Attachment[]
}

export interface Comment {
  id: string
  userId: string
  text: string
  timestamp: string
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: string
}

export interface Sprint {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  tasks: Task[]
}

export interface Project {
  id: string
  title: string
  description: string
  supervisor: {
    id: string
    name: string
    avatar: string
  }
  teamMembers: TeamMember[]
  sprints: Sprint[]
  availableProjects: {
    id: string
    name: string
  }[]
}

export const projectData: Project = {
  id: "project-1",
  title: "AI-Powered Learning Platform",
  description:
    "Developing an AI-powered learning platform to enhance student engagement and personalize learning experiences.",
  supervisor: {
    id: "user-1",
    name: "Sarah Chiwawa",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  teamMembers: [
    {
      id: "user-2",
      name: "Sarah Chiwawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Team Leader",
    },
    {
      id: "user-3",
      name: "Sarah Chiwawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Front end",
    },
    {
      id: "user-4",
      name: "Sarah Chiwawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Front end",
    },
    {
      id: "user-5",
      name: "Sarah Chiwawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Front end",
    },
    {
      id: "user-6",
      name: "Sarah Chiwawa",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Front end",
    },
  ],
  sprints: [
    {
      id: "sprint-1",
      title: "Initial project setup, requirements gathering, and team onboarding",
      description: "Setting up the project infrastructure, gathering requirements, and onboarding team members.",
      startDate: "2025-03-15T00:00:00.000Z",
      endDate: "2025-03-18T00:00:00.000Z",
      status: "On Going",
      tasks: [
        {
          id: "task-1",
          title: "Work on design",
          description: "Create wireframes and mockups for the main dashboard.",
          assignedTo: "user-3",
          status: "Active",
        },
      ],
    },
  ],
  availableProjects: [
    {
      id: "project-1",
      name: "AI-Powered Learning Platform",
    },
    {
      id: "project-2",
      name: "Student Management System",
    },
    {
      id: "project-3",
      name: "Virtual Classroom Environment",
    },
  ],
}
