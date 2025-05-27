import {SupervisorInvite} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";
import {fetchApi} from "@/app/lib/api-client";


export async function getMySupervisionInvites(): Promise<SupervisorInvite[]> {
    return (await fetchApi<SupervisorInvite[]>(`/teacher/project/invites`)).data;
}

export async function acceptInviteAction(inviteId: number): Promise<string> {
    return (await fetchApi<string>(`/project/supervise/invite/accept/${inviteId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })).data;
}

export async function rejectInviteAction(inviteId: number): Promise<string> {
    return (await fetchApi<string>(`/project/supervise/invite/reject/${inviteId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })).data;
}