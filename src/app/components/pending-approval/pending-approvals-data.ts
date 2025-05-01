import {
  AcademicYear,
  type Student,
  StudentJob,
  StudentStatus,
  type Teacher,
  TeacherRole,
  Rank,
} from "./pending-approval-types"

// Sample student data based on the provided example
export const sampleStudents: Student[] = [
  {
    id: 36,
    status: StudentStatus.ACTIVE,
    job: StudentJob.FRONTEND,
    firstname: "LOKMANE",
    lastname: "BENHAMMADI",
    birthdate: "2025-04-22T11:07:57.000Z",
    promotionalYear: 2023,
    academicYear: AcademicYear.THIRD,
    group: 1,
    specialty: "Informations Systems and Internet",
    user: {
      id: 36,
      email: "l.benhammadi@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 37,
    status: StudentStatus.ACTIVE,
    job: StudentJob.BACKEND,
    firstname: "AHMED",
    lastname: "BENALI",
    birthdate: "2024-08-15T09:30:00.000Z",
    promotionalYear: 2023,
    academicYear: AcademicYear.THIRD,
    group: 1,
    specialty: "Informations Systems and Internet",
    user: {
      id: 37,
      email: "a.benali@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 38,
    status: StudentStatus.ACTIVE,
    job: StudentJob.FULLSTACK,
    firstname: "FATIMA",
    lastname: "ZAHRA",
    birthdate: "2024-09-05T14:20:00.000Z",
    promotionalYear: 2023,
    academicYear: AcademicYear.THIRD,
    group: 2,
    specialty: "Informations Systems and Internet",
    user: {
      id: 38,
      email: "f.zahra@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 39,
    status: StudentStatus.ACTIVE,
    job: StudentJob.DATA_SCIENTIST,
    firstname: "KARIM",
    lastname: "BOUDIAF",
    birthdate: "2024-07-12T10:15:00.000Z",
    promotionalYear: 2022,
    academicYear: AcademicYear.FOURTH,
    group: 1,
    specialty: "Data Science",
    user: {
      id: 39,
      email: "k.boudiaf@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 40,
    status: StudentStatus.ACTIVE,
    job: StudentJob.MOBILE_DEV,
    firstname: "AMINA",
    lastname: "KHELIFI",
    birthdate: "2024-06-28T16:45:00.000Z",
    promotionalYear: 2022,
    academicYear: AcademicYear.FOURTH,
    group: 2,
    specialty: "Mobile Development",
    user: {
      id: 40,
      email: "a.khelifi@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 41,
    status: StudentStatus.ACTIVE,
    job: StudentJob.DEVOPS,
    firstname: "YOUCEF",
    lastname: "MANSOURI",
    birthdate: "2024-05-10T11:30:00.000Z",
    promotionalYear: 2022,
    academicYear: AcademicYear.FOURTH,
    group: 2,
    specialty: "Cloud Computing",
    user: {
      id: 41,
      email: "y.mansouri@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 42,
    status: StudentStatus.ACTIVE,
    job: StudentJob.GAME_DEV,
    firstname: "MOHAMED",
    lastname: "BELKACEM",
    birthdate: "2024-04-15T08:20:00.000Z",
    promotionalYear: 2021,
    academicYear: AcademicYear.FIFTH,
    group: 1,
    specialty: "Game Development",
    user: {
      id: 42,
      email: "m.belkacem@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 43,
    status: StudentStatus.ACTIVE,
    job: StudentJob.UI_UX,
    firstname: "SARAH",
    lastname: "BENOMAR",
    birthdate: "2024-03-22T13:40:00.000Z",
    promotionalYear: 2021,
    academicYear: AcademicYear.FIFTH,
    group: 1,
    specialty: "UI/UX Design",
    user: {
      id: 43,
      email: "s.benomar@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 44,
    status: StudentStatus.ACTIVE,
    job: StudentJob.QA,
    firstname: "AMINE",
    lastname: "RAHMANI",
    birthdate: "2024-02-18T15:10:00.000Z",
    promotionalYear: 2024,
    academicYear: AcademicYear.FIRST,
    group: 1,
    specialty: "Software Engineering",
    user: {
      id: 44,
      email: "a.rahmani@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 45,
    status: StudentStatus.ACTIVE,
    job: StudentJob.FRONTEND,
    firstname: "YASMINE",
    lastname: "HAMIDI",
    birthdate: "2024-01-25T09:50:00.000Z",
    promotionalYear: 2024,
    academicYear: AcademicYear.FIRST,
    group: 2,
    specialty: "Software Engineering",
    user: {
      id: 45,
      email: "y.hamidi@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 46,
    status: StudentStatus.ACTIVE,
    job: StudentJob.BACKEND,
    firstname: "OMAR",
    lastname: "BENABDALLAH",
    birthdate: "2023-12-12T14:30:00.000Z",
    promotionalYear: 2023,
    academicYear: AcademicYear.SECOND,
    group: 1,
    specialty: "Computer Science",
    user: {
      id: 46,
      email: "o.benabdallah@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 47,
    status: StudentStatus.ACTIVE,
    job: StudentJob.FULLSTACK,
    firstname: "LINA",
    lastname: "MESSAOUDI",
    birthdate: "2023-11-05T10:20:00.000Z",
    promotionalYear: 2023,
    academicYear: AcademicYear.SECOND,
    group: 2,
    specialty: "Computer Science",
    user: {
      id: 47,
      email: "l.messaoudi@esi-sba.dz",
      role: "student",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
]

// Sample teacher data
export const sampleTeachers: Teacher[] = [
  {
    id: 1,
    subject: "Artificial Intelligence",
    firstname: "KAMEL",
    lastname: "DAOUD",
    birthdate: "1980-05-15T00:00:00.000Z",
    rank: Rank.Professor,
    role: TeacherRole.LECTURER,
    user: {
      id: 101,
      email: "k.daoud@esi-sba.dz",
      role: "teacher",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 2,
    subject: "Database Systems",
    firstname: "NADIA",
    lastname: "BENALI",
    birthdate: "1985-08-22T00:00:00.000Z",
    rank: Rank.Associate,
    role: TeacherRole.LECTURER,
    user: {
      id: 102,
      email: "n.benali@esi-sba.dz",
      role: "teacher",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 3,
    subject: "Web Development",
    firstname: "MOHAMED",
    lastname: "KHELIFI",
    birthdate: "1990-03-10T00:00:00.000Z",
    rank: Rank.Assistant,
    role: TeacherRole.INSTRUCTOR,
    user: {
      id: 103,
      email: "m.khelifi@esi-sba.dz",
      role: "teacher",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 4,
    subject: "Machine Learning",
    firstname: "AMINA",
    lastname: "RAHMANI",
    birthdate: "1988-11-28T00:00:00.000Z",
    rank: Rank.Associate,
    role: TeacherRole.LECTURER,
    user: {
      id: 104,
      email: "a.rahmani@esi-sba.dz",
      role: "teacher",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
  {
    id: 5,
    subject: "Software Engineering",
    firstname: "YOUCEF",
    lastname: "MANSOURI",
    birthdate: "1982-07-15T00:00:00.000Z",
    rank: Rank.Professor,
    role: TeacherRole.LECTURER,
    user: {
      id: 105,
      email: "y.mansouri@esi-sba.dz",
      role: "teacher",
      passwordHash: "$2b$08$N.eQHnVtn2hjq38YIRtr5en6fBaNLhJ9pYP4VT9caD/idilRqaFYa",
    },
  },
]

export const pendingStudents = [
  {
    id: "STU-1001",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    department: "Computer Science",
    registrationDate: "2023-05-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU-1002",
    name: "Samantha Lee",
    email: "samantha.lee@university.edu",
    department: "Electrical Engineering",
    registrationDate: "2023-05-16",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU-1003",
    name: "Michael Chen",
    email: "michael.chen@university.edu",
    department: "Mechanical Engineering",
    registrationDate: "2023-05-17",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU-1004",
    name: "Emily Wilson",
    email: "emily.wilson@university.edu",
    department: "Computer Science",
    registrationDate: "2023-05-18",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU-1005",
    name: "David Kim",
    email: "david.kim@university.edu",
    department: "Physics",
    registrationDate: "2023-05-19",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export const pendingTeachers = [
  {
    id: "TCH-2001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    department: "Computer Science",
    specialization: "Artificial Intelligence",
    registrationDate: "2023-05-10",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "TCH-2002",
    name: "Prof. Robert Chen",
    email: "robert.chen@university.edu",
    department: "Electrical Engineering",
    specialization: "Robotics",
    registrationDate: "2023-05-11",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "TCH-2003",
    name: "Dr. Lisa Wang",
    email: "lisa.wang@university.edu",
    department: "Physics",
    specialization: "Quantum Computing",
    registrationDate: "2023-05-12",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export const pendingProjects = [
  {
    id: "PRJ-3001",
    title: "AI-Powered Student Feedback System",
    description: "A system that uses AI to provide automated feedback on student assignments and projects.",
    submittedBy: "Alex Johnson",
    supervisor: "Dr. Sarah Johnson",
    department: "Computer Science",
    submissionDate: "2023-05-20",
  },
  {
    id: "PRJ-3002",
    title: "Sustainable Urban Planning Model",
    description: "A model that uses data analytics to optimize urban planning for sustainability and efficiency.",
    submittedBy: "Samantha Lee",
    supervisor: "Prof. Robert Chen",
    department: "Civil Engineering",
    submissionDate: "2023-05-21",
  },
  {
    id: "PRJ-3003",
    title: "Quantum Computing Algorithm for Drug Discovery",
    description: "An algorithm that leverages quantum computing to accelerate drug discovery processes.",
    submittedBy: "Michael Chen",
    supervisor: "Dr. Lisa Wang",
    department: "Physics",
    submissionDate: "2023-05-22",
  },
  {
    id: "PRJ-3004",
    title: "Renewable Energy Grid Optimization",
    description: "A project focused on optimizing energy distribution in grids powered by renewable sources.",
    submittedBy: "Emily Wilson",
    supervisor: "Prof. Robert Chen",
    department: "Electrical Engineering",
    submissionDate: "2023-05-23",
  },
  {
    id: "PRJ-3005",
    title: "Machine Learning for Climate Prediction",
    description: "Using machine learning models to improve climate change prediction accuracy.",
    submittedBy: "David Kim",
    supervisor: "Dr. Lisa Wang",
    department: "Environmental Science",
    submissionDate: "2023-05-24",
  },
]

export const approvalHistory = [
  {
    id: "STU-1000",
    name: "Jessica Parker",
    type: "Student",
    action: "Approved",
    date: "2023-05-14",
    approvedBy: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "TCH-2000",
    name: "Dr. James Wilson",
    type: "Teacher",
    action: "Approved",
    date: "2023-05-09",
    approvedBy: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PRJ-3000",
    name: "Blockchain for Academic Records",
    type: "Project",
    action: "Rejected",
    date: "2023-05-19",
    approvedBy: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU-999",
    name: "Thomas Brown",
    type: "Student",
    action: "Approved",
    date: "2023-05-13",
    approvedBy: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PRJ-2999",
    name: "Virtual Reality Learning Environment",
    type: "Project",
    action: "Approved",
    date: "2023-05-18",
    approvedBy: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Helper function to get academic years from students
export function getAcademicYears(students: Student[]) {
  const academicYearsMap = new Map<AcademicYear, number>()

  students.forEach((student) => {
    const count = academicYearsMap.get(student.academicYear) || 0
    academicYearsMap.set(student.academicYear, count + 1)
  })

  return Array.from(academicYearsMap.entries()).map(([year, count]) => ({
    year,
    count,
  }))
}

// Helper function to get groups for a specific academic year
export function getGroupsByAcademicYear(students: Student[], academicYear: AcademicYear) {
  const groupsMap = new Map<number, { count: number; specialty: string }>()

  students
    .filter((student) => student.academicYear === academicYear)
    .forEach((student) => {
      const existingGroup = groupsMap.get(student.group)
      if (existingGroup) {
        groupsMap.set(student.group, {
          count: existingGroup.count + 1,
          specialty: student.specialty, // Using the last specialty found for simplicity
        })
      } else {
        groupsMap.set(student.group, {
          count: 1,
          specialty: student.specialty,
        })
      }
    })

  return Array.from(groupsMap.entries()).map(([group, data]) => ({
    group,
    count: data.count,
    specialty: data.specialty,
  }))
}

// Helper function to get students for a specific academic year and group
export function getStudentsByYearAndGroup(students: Student[], academicYear: AcademicYear, group: number) {
  return students.filter((student) => student.academicYear === academicYear && student.group === group)
}
