export interface PresentationDay {
  id: string
  date: string
  academicYear: string
  status: "draft" | "published"
  groupsCount: number
  scheduledSlots: number
}

export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
}

export interface StudentGroup {
  id: string
  name: string
  members: string[]
}

export interface ScheduleSlot {
  timeSlotId: string
  groupId: string
  room: string
  judges: string[]
}

export const mockPresentationDays: PresentationDay[] = [
  {
    id: "1",
    date: "May 30, 2025",
    academicYear: "2024–25",
    status: "published",
    groupsCount: 12,
    scheduledSlots: 8,
  },
  {
    id: "2",
    date: "June 15, 2025",
    academicYear: "2024–25",
    status: "draft",
    groupsCount: 10,
    scheduledSlots: 6,
  },
]

export const timeSlots: TimeSlot[] = [
  { id: "1", startTime: "08:00", endTime: "09:00" },
  { id: "2", startTime: "09:00", endTime: "10:00" },
  { id: "3", startTime: "10:00", endTime: "11:00" },
  { id: "4", startTime: "11:00", endTime: "12:00" },
  { id: "5", startTime: "12:00", endTime: "13:00" },
  { id: "6", startTime: "13:00", endTime: "14:00" },
  { id: "7", startTime: "14:00", endTime: "15:00" },
  { id: "8", startTime: "15:00", endTime: "16:00" },
  { id: "9", startTime: "16:00", endTime: "17:00" },
]

export const studentGroups: StudentGroup[] = [
  { id: "1", name: "Group A", members: ["Alice Johnson", "Bob Smith"] },
  { id: "2", name: "Group B", members: ["Carol Davis", "David Wilson"] },
  { id: "3", name: "Group C", members: ["Eva Brown", "Frank Miller"] },
  { id: "4", name: "Group D", members: ["Grace Lee", "Henry Taylor"] },
]

export const availableRooms = ["Room 101", "Room 102", "Room 201", "Room 202", "Lab A", "Lab B"]

export const availableJudges = [
  "Dr. Smith",
  "Prof. Johnson",
  "Dr. Williams",
  "Prof. Brown",
  "Dr. Davis",
  "Prof. Wilson",
]
