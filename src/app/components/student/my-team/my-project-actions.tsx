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

// Get all join requests for the current student
export async function getMyJoinRequests(): Promise<Student[]> {
    try {
        return (await fetchApi<Student[]>('/student/requests')).data
        
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