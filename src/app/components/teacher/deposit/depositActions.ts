'use server'



import {fetchApi, Project} from "@/app/lib/api-client";
import {Specialty} from "@/app/components/teacher/deposit/deposit-data";
import {AcademicYear} from "@/app/components/parameters/parameters-types";

interface ProjectRequest {
    title: string;
    description: string;
    specialty: Specialty;
    academicYear: AcademicYear;
}




export const depositProject = async (project: ProjectRequest) => {
    return (await fetchApi<string>(`/project`, {
        body: JSON.stringify(project),
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })).data;

}

export const getMyProject = async () => {
    return (await fetchApi<Project[]>(`/teacher/me/projects`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })).data;

}



