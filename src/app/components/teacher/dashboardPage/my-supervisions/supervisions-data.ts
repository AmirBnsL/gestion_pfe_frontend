export const supervisionsData = [
  {
    year: "2",
    projects: [
      {
        id: 1,
        title: "AI-Powered Student Feedback System",
        teams: [
          {
            id: 1,
            name: "Team Alpha",
            currentSprint: "Sprint 3",
            currentTask: "Design Mockups",
            members: [
              { id: 1, name: "John Smith", role: "Team Leader" },
              { id: 2, name: "Emma Wilson", role: "Frontend Developer" },
              { id: 3, name: "Mike Johnson", role: "Backend Developer" },
              { id: 4, name: "Sarah Davis", role: "UI/UX Designer" },
            ],
            sprints: [
              {
                id: 1,
                title: "Sprint 1: Research & Planning",
                startDate: "2024-01-15",
                endDate: "2024-02-15",
                status: "completed",
                progress: 100,
              },
              {
                id: 2,
                title: "Sprint 2: System Architecture",
                startDate: "2024-02-16",
                endDate: "2024-03-15",
                status: "completed",
                progress: 100,
              },
              {
                id: 3,
                title: "Sprint 3: UI Development",
                startDate: "2024-03-16",
                endDate: "2024-04-15",
                status: "active",
                progress: 65,
              },
            ],
            tasks: [
              { id: 1, title: "Create wireframes", status: "Done", assignee: "Sarah Davis" },
              { id: 2, title: "Design system components", status: "In Progress", assignee: "Sarah Davis" },
              { id: 3, title: "API integration", status: "To Do", assignee: "Mike Johnson" },
              { id: 4, title: "User authentication", status: "In Progress", assignee: "Mike Johnson" },
              { id: 5, title: "Dashboard layout", status: "Done", assignee: "Emma Wilson" },
            ],
            uploadedFiles: [
              {
                id: 1,
                name: "Project_Proposal_v2.pdf",
                type: "document",
                size: "2.4 MB",
                uploadDate: "2024-03-10",
                uploadedBy: "John Smith",
              },
              {
                id: 2,
                name: "UI_Mockups.fig",
                type: "image",
                size: "15.7 MB",
                uploadDate: "2024-03-12",
                uploadedBy: "Sarah Davis",
              },
              {
                id: 3,
                name: "Demo_Video.mp4",
                type: "video",
                size: "45.2 MB",
                uploadDate: "2024-03-14",
                uploadedBy: "Emma Wilson",
              },
            ],
          },
          {
            id: 2,
            name: "Team Beta",
            currentSprint: "Sprint 2",
            currentTask: "Database Design",
            members: [
              { id: 5, name: "Alex Thompson", role: "Team Leader" },
              { id: 6, name: "Lisa Chen", role: "Data Scientist" },
              { id: 7, name: "David Brown", role: "Backend Developer" },
            ],
            sprints: [
              {
                id: 4,
                title: "Sprint 1: Requirements Analysis",
                startDate: "2024-01-15",
                endDate: "2024-02-15",
                status: "completed",
                progress: 100,
              },
              {
                id: 5,
                title: "Sprint 2: Data Architecture",
                startDate: "2024-02-16",
                endDate: "2024-03-15",
                status: "active",
                progress: 40,
              },
            ],
            tasks: [
              { id: 6, title: "Database schema design", status: "In Progress", assignee: "David Brown" },
              { id: 7, title: "Data collection strategy", status: "Done", assignee: "Lisa Chen" },
              { id: 8, title: "ML model research", status: "To Do", assignee: "Lisa Chen" },
            ],
            uploadedFiles: [
              {
                id: 4,
                name: "Requirements_Document.pdf",
                type: "document",
                size: "1.8 MB",
                uploadDate: "2024-02-28",
                uploadedBy: "Alex Thompson",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Sustainable Urban Planning Model",
        teams: [
          {
            id: 3,
            name: "Green City",
            currentSprint: "Sprint 1",
            currentTask: "Literature Review",
            members: [
              { id: 8, name: "Maria Garcia", role: "Team Leader" },
              { id: 9, name: "Tom Wilson", role: "Environmental Analyst" },
              { id: 10, name: "Anna Lee", role: "Urban Planner" },
            ],
            sprints: [
              {
                id: 6,
                title: "Sprint 1: Research Phase",
                startDate: "2024-02-01",
                endDate: "2024-03-01",
                status: "active",
                progress: 80,
              },
            ],
            tasks: [
              { id: 9, title: "Environmental impact study", status: "Done", assignee: "Tom Wilson" },
              { id: 10, title: "Urban planning best practices", status: "In Progress", assignee: "Anna Lee" },
              { id: 11, title: "Stakeholder analysis", status: "To Do", assignee: "Maria Garcia" },
            ],
            uploadedFiles: [
              {
                id: 5,
                name: "Literature_Review.pdf",
                type: "document",
                size: "3.2 MB",
                uploadDate: "2024-02-25",
                uploadedBy: "Anna Lee",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    year: "3",
    projects: [
      {
        id: 3,
        title: "Blockchain-Based Voting System",
        teams: [
          {
            id: 4,
            name: "CryptoVote",
            currentSprint: "Completed",
            currentTask: "Project Delivered",
            members: [
              { id: 11, name: "Robert Kim", role: "Team Leader" },
              { id: 12, name: "Jennifer Liu", role: "Blockchain Developer" },
              { id: 13, name: "Mark Anderson", role: "Security Specialist" },
            ],
            sprints: [
              {
                id: 7,
                title: "Sprint 1: Blockchain Research",
                startDate: "2023-09-01",
                endDate: "2023-10-01",
                status: "completed",
                progress: 100,
              },
              {
                id: 8,
                title: "Sprint 2: System Development",
                startDate: "2023-10-02",
                endDate: "2023-11-15",
                status: "completed",
                progress: 100,
              },
              {
                id: 9,
                title: "Sprint 3: Testing & Deployment",
                startDate: "2023-11-16",
                endDate: "2023-12-15",
                status: "completed",
                progress: 100,
              },
            ],
            tasks: [
              { id: 12, title: "Smart contract development", status: "Done", assignee: "Jennifer Liu" },
              { id: 13, title: "Security audit", status: "Done", assignee: "Mark Anderson" },
              { id: 14, title: "User interface", status: "Done", assignee: "Robert Kim" },
            ],
            uploadedFiles: [
              {
                id: 6,
                name: "Final_Report.pdf",
                type: "document",
                size: "5.1 MB",
                uploadDate: "2023-12-10",
                uploadedBy: "Robert Kim",
              },
              {
                id: 7,
                name: "System_Demo.mp4",
                type: "video",
                size: "78.3 MB",
                uploadDate: "2023-12-12",
                uploadedBy: "Jennifer Liu",
              },
            ],
          },
        ],
      },
    ],
  },
]
