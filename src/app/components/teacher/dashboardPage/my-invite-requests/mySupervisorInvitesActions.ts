import {SupervisorInvite} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";
import {fetchApi} from "@/app/lib/api-client";


export async function getMySupervisionInvites(): Promise<SupervisorInvite[]> {
    return (await fetchApi<SupervisorInvite[]>(`/teacher/project/invites`)).data;
}