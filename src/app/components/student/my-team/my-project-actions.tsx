'use server'

import { fetchApi} from "@/app/lib/api-client";
import {Team} from "@/app/components/student/teams-list/teamTypes";
import {
    Student,

} from "@/app/components/pending-approval/pending-approval-types";
export async function getMyTeam ():Promise<Team > {

    try {
        return (await fetchApi<Team>('/team/full')).data
    } catch (error) {
        throw error.body;
    }
}


export interface TeamJoinRequest {
  id: string
  team: Team
  fromUser: Student
  status: string
  createdAt: string
}

// Get all join requests for the current student
export async function getMyJoinRequests(): Promise<TeamJoinRequest[]> {
    try {
        return (await fetchApi<TeamJoinRequest[]>('/student/requests')).data
        
    } catch (error) {
        throw error.body;
    }
}


export async function getAllStudents(): Promise<Student[]> {
    try {
        return (await fetchApi<Student[]>('/students')).data
    } catch (error) {
        throw error.body
    }
}