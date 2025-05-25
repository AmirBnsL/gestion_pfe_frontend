'use server'




import {fetchApi} from "@/app/lib/api-client";
import {Project} from "@/app/components/teacher/dashboardPage/my-proposals/requestsData";

export const getMySupervisedProjects = async () => {
    return (await fetchApi<Project[]>('/teacher/projects/supervised', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })).data;

}
