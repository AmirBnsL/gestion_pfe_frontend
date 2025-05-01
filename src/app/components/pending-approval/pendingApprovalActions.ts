// 'use server'

// import { fetchApi} from "@/app/lib/api-client";
// import {Teacher,Student} from "@/app/components/pending-approval/pending-approval-types";


// export async function getTeachers() {
//     return  (await fetchApi<Teacher[]>('/teachers?page=1&size=100')).data
// }

// export async function getStudents() {
//     return  (await fetchApi<Student[]>('/teachers?page=1&size=100')).data
// }

"use server"
import { sampleStudents, sampleTeachers } from "./pending-approvals-data"

export async function getTeachers() {
  // For now, return sample data
  // In production, this would fetch from API
  // return (await fetchApi<Teacher[]>("/teachers?page=1&size=100")).data
  return Promise.resolve(sampleTeachers)
}

export async function getStudents() {
  // For now, return sample data
  // In production, this would fetch from API
  // return (await fetchApi<Student[]>("/students?page=1&size=100")).data
  return Promise.resolve(sampleStudents)
}


