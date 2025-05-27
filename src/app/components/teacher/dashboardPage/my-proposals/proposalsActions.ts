'use server'




import {fetchApi} from "@/app/lib/api-client";
import {Project} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";
import {Teacher} from "@/app/components/pending-approval/pending-approval-types";

export const getMyProposedProjects = async () => {
    return (await fetchApi<Project[]>('/teacher/projects/proposed', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })).data;

}


export const sendInviteToSupervisor = async (projectId: number, supervisorId: number) => {
    console.log(`Sending invite to supervisor with ID ${supervisorId} for project with ID ${projectId}`);
    return await fetchApi<string>(`/project/${projectId}/supervise/invite/${supervisorId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
}


export const getAvailableSupervisors = async () => {
    return (await fetchApi<Teacher[]>(`/teachers/unpaged`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })).data;
}
