'use server'


import { fetchApi } from "@/app/lib/api-client";
import {Team} from "@/app/components/student/teams-list/teamTypes";


export const getTeams = async () => {
    return (await fetchApi<Team[]>(`/teams`)).data

}

export const createTeam = async (name : string) => {
    const requestOptions:RequestInit = {
        method: "POST",
        body :{
            name: name,
        }
    }

    return (await fetchApi<Team>(`/team`,requestOptions)).data
}