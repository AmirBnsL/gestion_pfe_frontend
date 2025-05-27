'use server'


import type { Project} from '@/app/lib/api-client'; // Assuming Project type is defined here
import {fetchApi} from '@/app/lib/api-client'; // Assuming fetchApi is defined here



export async function getProjects(): Promise<Project[]> { // Export the function and add return type

    return (await fetchApi<Project[]>(`/projects?size=100&page=1`)).data;
}


export async function approveProjectAction(projectId: number): Promise<void> {
    await fetchApi(`/project/approve/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function deleteProjectAction(projectId: number): Promise<void> {
    await fetchApi(`/project/${projectId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
}