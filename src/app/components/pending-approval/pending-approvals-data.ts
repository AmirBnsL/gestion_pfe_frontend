import {
  AcademicYear,
  type Student,

} from "./pending-approval-types"



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
