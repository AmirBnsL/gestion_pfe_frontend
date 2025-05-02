'use server'


import { fetchApi } from "@/app/lib/api-client";
import {Team} from "@/app/components/student/teams-list/teamTypes";


export const getTeams = async () => {
    return (await fetchApi<Team[]>(`/teams`)).data

}

export const createTeam = async (name: string) => {
    // This log should now execute
    console.log("Executing createTeam server action with name:", name);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Add Content-Type header
        },
        // Stringify the body
        body: JSON.stringify({
            name: name,
        })
    };

    try {
        const result = await fetchApi<Team>(`/team`, requestOptions);
        console.log("Team creation API call successful:", result);
        return result.data;
    } catch (error) {
        console.error("Error calling createTeam API:", error);
        // Re-throw the error or handle it as needed for the client-side catch block
        throw error;
    }
}