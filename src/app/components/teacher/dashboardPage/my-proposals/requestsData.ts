import { requestsData } from "./requests-data"

export const proposalsData = [
  {
    id: 1,
    title: "AI-Powered Student Feedback System",
    description:
      "Develop an intelligent system that analyzes student performance and provides personalized feedback using machine learning algorithms.",
    teamsCount: 3,
    status: "Open",
    requirements:
      "Strong background in machine learning, Python programming, and data analysis. Experience with educational technology is preferred.",
    duration: "8 months",
    maxTeams: 5,
    skills: ["Python", "Machine Learning", "Data Analysis", "React", "Node.js"],
    teams: [
      {
        id: 1,
        name: "Team Alpha",
        leader: "John Smith",
        progress: 75,
      },
      {
        id: 2,
        name: "Team Beta",
        leader: "Sarah Johnson",
        progress: 60,
      },
      {
        id: 3,
        name: "Team Gamma",
        leader: "Mike Wilson",
        progress: 45,
      },
    ],
    supervisors: [
      {
        id: 1,
        name: "Dr. Emily Chen",
        role: "Primary Supervisor",
        department: "Computer Science",
      },
      {
        id: 2,
        name: "Prof. David Brown",
        role: "Co-Supervisor",
        department: "Education",
      },
    ],
    supervisorRequests: requestsData[1]?.supervisorRequests || [],
    studentRequests: requestsData[1]?.studentRequests || [],
  },
  {
    id: 2,
    title: "Sustainable Urban Planning Model",
    description:
      "Create a comprehensive model for sustainable urban development that considers environmental, social, and economic factors.",
    teamsCount: 2,
    status: "Open",
    requirements:
      "Knowledge of urban planning principles, GIS systems, and environmental science. Programming skills in Python or R preferred.",
    duration: "10 months",
    maxTeams: 3,
    skills: ["GIS", "Python", "Environmental Science", "Data Visualization"],
    teams: [
      {
        id: 4,
        name: "Green City",
        leader: "Lisa Anderson",
        progress: 80,
      },
      {
        id: 5,
        name: "EcoPlanning",
        leader: "Tom Davis",
        progress: 55,
      },
    ],
    supervisors: [
      {
        id: 3,
        name: "Dr. Maria Rodriguez",
        role: "Primary Supervisor",
        department: "Urban Planning",
      },
    ],
    supervisorRequests: requestsData[2]?.supervisorRequests || [],
    studentRequests: requestsData[2]?.studentRequests || [],
  },
  {
    id: 3,
    title: "Blockchain-Based Voting System",
    description:
      "Design and implement a secure, transparent voting system using blockchain technology to ensure election integrity.",
    teamsCount: 1,
    status: "In Progress",
    requirements:
      "Strong understanding of blockchain technology, cryptography, and security principles. Experience with Solidity and web development.",
    duration: "6 months",
    maxTeams: 2,
    skills: ["Blockchain", "Solidity", "Cryptography", "Web Development", "Security"],
    teams: [
      {
        id: 6,
        name: "CryptoVote",
        leader: "Alex Thompson",
        progress: 30,
      },
    ],
    supervisors: [
      {
        id: 4,
        name: "Dr. James Wilson",
        role: "Primary Supervisor",
        department: "Computer Science",
      },
      {
        id: 5,
        name: "Dr. Anna Lee",
        role: "Security Advisor",
        department: "Cybersecurity",
      },
    ],
    supervisorRequests: requestsData[3]?.supervisorRequests || [],
    studentRequests: requestsData[3]?.studentRequests || [],
  },
]
