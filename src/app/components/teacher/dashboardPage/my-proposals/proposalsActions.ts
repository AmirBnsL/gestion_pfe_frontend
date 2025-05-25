'use server'




import {fetchApi} from "@/app/lib/api-client";
import {Project} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";

export const getMyProposedProjects = async () => {
    return (await fetchApi<Project[]>('/teacher/projects/proposed', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })).data;

}

