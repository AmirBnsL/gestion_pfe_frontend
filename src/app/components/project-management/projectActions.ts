'use server'


import type { Project} from '@/app/lib/api-client'; // Assuming Project type is defined here
import {fetchApi} from '@/app/lib/api-client'; // Assuming fetchApi is defined here


const API_URL = "http://localhost:8080/api"

export async function getProjects(): Promise<Project[]> { // Export the function and add return type

    return (await fetchApi<Project[]>(`/projects?size=100&page=1`)).data;
}