'use server'




import {fetchApi} from "@/app/lib/api-client";

export async function acceptTeamJoinRequest(requestId: string): Promise<void> {
        await fetchApi(`/team/request/accept/${requestId}`, {
            method: 'POST',
        });

}


export async function rejectTeamJoinRequest(requestId: string): Promise<void> {
        await fetchApi(`/team/request/decline/${requestId}`, {
            method: 'POST',
        });

}