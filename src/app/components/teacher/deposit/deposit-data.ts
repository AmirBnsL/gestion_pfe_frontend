export interface Supervisor {
  id: string
  name: string
  department: string
  email: string
  expertise: string[]
}

export interface Deposit {
  id: string
  title: string
  description: string
  year: string
  specialty: string
  invitedSupervisors: Supervisor[]
  status: "draft" | "pending" | "approved" | "rejected"
  feedback?: string
  createdAt: string
  updatedAt: string
}

export const supervisorsData: Supervisor[] = [
  {
    id: "sup-1",
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    email: "sarah.johnson@university.edu",
    expertise: ["Machine Learning", "Data Science", "Python"],
  },
  {
    id: "sup-2",
    name: "Prof. Michael Chen",
    department: "Software Engineering",
    email: "michael.chen@university.edu",
    expertise: ["Web Development", "React", "Node.js"],
  },
  {
    id: "sup-3",
    name: "Dr. Emily Rodriguez",
    department: "Cybersecurity",
    email: "emily.rodriguez@university.edu",
    expertise: ["Network Security", "Cryptography", "Ethical Hacking"],
  },
  {
    id: "sup-4",
    name: "Prof. David Kim",
    department: "Information Systems",
    email: "david.kim@university.edu",
    expertise: ["Database Design", "System Architecture", "Cloud Computing"],
  },
  {
    id: "sup-5",
    name: "Dr. Lisa Thompson",
    department: "Artificial Intelligence",
    email: "lisa.thompson@university.edu",
    expertise: ["Neural Networks", "Computer Vision", "NLP"],
  },
  {
    id: "sup-6",
    name: "Prof. James Wilson",
    department: "Mobile Development",
    email: "james.wilson@university.edu",
    expertise: ["iOS Development", "Android", "React Native"],
  },
]

export const depositsData: Deposit[] = [
  {
    id: "dep-1",
    title: "AI-Powered Student Management System",
    description:
      "Develop an intelligent system for managing student records, grades, and academic progress using machine learning algorithms to predict student performance and provide personalized recommendations.",
    year: "4th Year",
    specialty: "Artificial Intelligence",
    invitedSupervisors: [supervisorsData[0], supervisorsData[4]],
    status: "approved",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "dep-2",
    title: "Blockchain-Based Voting System",
    description:
      "Create a secure and transparent voting system using blockchain technology to ensure vote integrity and prevent fraud in student elections.",
    year: "5th Year",
    specialty: "Cybersecurity",
    invitedSupervisors: [supervisorsData[2]],
    status: "pending",
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-02-01T09:15:00Z",
  },
  {
    id: "dep-3",
    title: "Mobile Learning Platform",
    description:
      "Design and develop a comprehensive mobile application for online learning with features like video streaming, interactive quizzes, and progress tracking.",
    year: "3rd Year",
    specialty: "Mobile Development",
    invitedSupervisors: [supervisorsData[5], supervisorsData[1]],
    status: "rejected",
    feedback:
      "The scope is too broad for a 3rd year project. Please narrow down the features and focus on core functionality.",
    createdAt: "2024-01-28T16:45:00Z",
    updatedAt: "2024-02-05T11:20:00Z",
  },
  {
    id: "dep-4",
    title: "Smart Campus IoT Network",
    description:
      "Implement an Internet of Things network across campus to monitor environmental conditions, energy usage, and security systems.",
    year: "4th Year",
    specialty: "Network Engineering",
    invitedSupervisors: [supervisorsData[3]],
    status: "draft",
    createdAt: "2024-02-10T13:30:00Z",
    updatedAt: "2024-02-12T08:45:00Z",
  },
]
