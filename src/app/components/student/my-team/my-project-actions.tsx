'use server'

import { fetchApi} from "@/app/lib/api-client";
import {Team} from "@/app/components/student/teams-list/teamTypes";

export async function getMyTeam ():Promise<Team > {

    try {
        return (await fetchApi<Team>('/team/full')).data
    } catch (error) {
        throw error.body;
    }
}